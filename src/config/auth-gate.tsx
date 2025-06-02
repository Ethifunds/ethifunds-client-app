import LoadingBox from "@/components/loading-box";
import { variables } from "@/constants";
import useCookie from "@/hooks/use-cookie";
import useCustomNavigation from "@/hooks/use-navigation";
import axios from "@/lib/axios";
import logoutAccount from "@/services/account/logout";
import whoami from "@/services/account/whoami";
import useActions from "@/store/actions";
import * as React from "react";

export default React.memo(function AuthGate({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = React.useState(true);
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const interceptor = React.useRef(0);
  const { cookie: authToken, deleteCookie } = useCookie(
    variables.STORAGE.session,
    "",
  );
  const { cookie: remember_me } = useCookie(
    variables.STORAGE.remember_me,
    false,
  );
  const { account } = useActions();
  const { navigate } = useCustomNavigation();

  const INACTIVITY_LIMIT = variables.INACTIVE_LIMIT * 60 * 1000;
  const logout = React.useCallback(async (autoLogout = false) => {
    try {
      await logoutAccount();
      if (!remember_me) {
        deleteCookie();
      }

      if (autoLogout) {
        const path = `/?redirect=${location.pathname}${location.search}`;
        navigate(path);
        return;
      }

      navigate("/");
    } catch (error) {
      console.error(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const autoLogout = React.useCallback(() => {
    logout(true);
  }, [logout]);

  const resetTimer = React.useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      autoLogout();
    }, INACTIVITY_LIMIT);
  }, [INACTIVITY_LIMIT, autoLogout]);

  const session = React.useCallback(async () => {
    setIsLoading(true);
    if (!authToken) {
      logout();
      setIsLoading(false);
      return;
    }
    try {
      const value = axios.interceptors.request.use(
        (config) => {
          try {
            const accessToken = authToken;

            config.headers.Authorization = `Bearer ${accessToken}`;
            return config;
          } catch (error) {
            return Promise.reject(error);
          }
        },
        (error) => {
          return Promise.reject(error);
        },
      );

      interceptor.current = value;
      const response = await whoami();
      account.changeAccount(response);
    } catch {
      logout();
    } finally {
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authToken, logout]);

  React.useEffect(() => {
    const events = ["mousemove", "keydown", "click"];

    const handleActivity = resetTimer;

    events.forEach((event) => window.addEventListener(event, handleActivity));

    return () => {
      events.forEach((event) =>
        window.removeEventListener(event, handleActivity),
      );
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [resetTimer]);

  React.useEffect(() => {
    session();
    return () => {
      axios.interceptors.request.eject(interceptor.current);
    };
  }, [session]);



  if (isLoading) return <LoadingBox type="screen" />;

  return <React.Fragment>{children}</React.Fragment>;
});
