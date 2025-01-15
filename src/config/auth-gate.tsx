import { variables } from "@/constants";
import useCookie from "@/hooks/use-cookie";
import axios from "@/lib/axios";
import * as React from "react";

export default React.memo(function AuthGate({ children }: { children: React.ReactNode }) {
	const [isLoading, setIsLoading] = React.useState(true);
	const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
	const interceptor = React.useRef(0);
	const { cookie: authToken } = useCookie("_ef_auth_key", "");

	const INACTIVITY_LIMIT = variables.INACTIVE_LIMIT * 60 * 1000;

	const logout = React.useCallback(() => {}, []);

	const autoLogout = React.useCallback(() => {
		logout();
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
				}
			);

			interceptor.current = value;
		} catch {
			logout();
		} finally {
			setIsLoading(false);
		}
	}, [authToken, logout]);

	React.useEffect(() => {
		const events = ["mousemove", "keydown", "click"];

		const handleActivity = resetTimer;

		events.forEach((event) => window.addEventListener(event, handleActivity));

		return () => {
			events.forEach((event) => window.removeEventListener(event, handleActivity));
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

	if (isLoading) return "loading";

	return <React.Fragment>{children}</React.Fragment>;
});
