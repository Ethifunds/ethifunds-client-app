import AppButton from "@/components/app-button";
import { PopupModal } from "@/components/ui/modal";
import useCustomNavigation from "@/hooks/use-navigation";
import ensureError from "@/lib/ensure-error";
import logoutAccount from "@/services/account/logout";

import useActions from "@/store/actions";
import { useAppSelector } from "@/store/hooks";
import * as React from "react";
import { toast } from "sonner";

export default React.memo(function LogoutDialog() {
  const { dialog } = useAppSelector((state) => state.ui);

  const [isLoading, setIsLoading] = React.useState(false);

  const { navigate } = useCustomNavigation();
  const { ui } = useActions();

  const open = React.useMemo(() => {
    return dialog.show && dialog.type === "logout";
  }, [dialog.show, dialog.type]);

  const close = () => {
    if (isLoading) return;

    ui.resetDialog();
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await logoutAccount();
      navigate("/", { replace: true });
      ui.resetDialog();
    } catch (error) {
      const errMsg = ensureError(error).message;
      toast.error(errMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PopupModal
      handleClose={close}
      open={open}
      className="relative h-60 w-full space-y-5 rounded-xl py-8 lg:h-auto lg:w-[30%] lg:rounded-3xl"
      showCloseBtn
    >
      <div className="text-center">
        <h1 className="feature-accent text-neutral-1000">Logout</h1>
        <span className="caption-standard text-neutral-500">
          Are you sure you want to logout ?
        </span>
      </div>
      <div className="flex justify-between gap-5 [&_button]:w-full">
        <AppButton
          variant="outline"
          className="rounded-lg text-neutral-700"
          onClick={close}
          disabled={isLoading}
        >
          Cancel
        </AppButton>

        <AppButton
          variant="destructive"
          className="rounded-lg text-neutral-base_white"
          onClick={logout}
          isLoading={isLoading}
        >
          Logout
        </AppButton>
      </div>
    </PopupModal>
  );
});
