import useCustomNavigation from "@/hooks/use-navigation";
import ensureError from "@/lib/ensure-error";
import getUserSecurityQuestions from "@/services/account/get-user-security-questions";
import whoami from "@/services/account/whoami";
import useActions from "@/store/actions";
import { useAppSelector } from "@/store/hooks";
import * as React from "react";
import { useQuery } from "react-query";
import { toast } from "sonner";

type Todos = {
  title: string;
  path: string;
  isDone: boolean;
  action(path: string): void;
};

export default function useTodos() {
  const { account } = useAppSelector((state) => state.account);
  const { ui, account: accountActions } = useActions();
  const [hasSecurity, setHasSecurity] = React.useState(false);

  const { navigate } = useCustomNavigation();

  const { isFetching } = useQuery(["whoami"], () => whoami(), {
    onSuccess(data) {
      accountActions.updateAccount(data);
    },
    onError(err) {
      const error = ensureError(err);
      toast.error(error.message);
    },
  });

  const hasSecurityQuestions = React.useCallback(async () => {
    if (!account.email) return;
    try {
      const response = await getUserSecurityQuestions({ email: account.email });
      setHasSecurity(response.length > 0);
    } catch (err) {
      const error = ensureError(err);
      toast.error(error.message);
    }
  }, [account.email]);

  React.useEffect(() => {
    hasSecurityQuestions();
  }, [hasSecurityQuestions]);

  const todos = React.useMemo(
    (): Todos[] => [
      {
        title: "Add your BVN",
        path: "/settings?tab=profile",
        isDone: account.user_verifications.has_verified_bvn,
        action: (path: string) => {
          navigate(path);
        },
      },
      {
        title: "Add Personal Information",
        path: "/settings?tab=profile&sub_tab=personal_info",
        isDone: account.user_profile !== null,
        action: (path: string) => {
          navigate(path);
        },
      },
      {
        title: "Setup your security",
        path: "/settings?tab=security&sub_tab=security_questions",
        isDone: hasSecurity,
        action: (path: string) => {
          navigate(path);
        },
      },

      {
        title: "Setup your Pin",
        path: "",
        isDone: account.has_set_pin,
        action: (path: string) => {
          ui.changeDialog({
            show: true,
            id: path,
            type: "set_pin",
          });
        },
      },
    ],

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      account.has_set_pin,
      account.user_profile,
      account.user_verifications.has_verified_bvn,
      hasSecurity,
      navigate,
    ],
  );

  const progress = React.useMemo(() => {
    const isDoneCount = todos.filter((item) => item.isDone).length;
    const value = (isDoneCount / todos.length) * 100;
    return value;
  }, [todos]);

  const continueBtn = React.useCallback(() => {
    const todo = todos.find((item) => !item.isDone);
    if (todo) {
      todo.action(todo.path);
    }
  }, [todos]);

  return { isFetching, todos, progress, continueBtn };
}
