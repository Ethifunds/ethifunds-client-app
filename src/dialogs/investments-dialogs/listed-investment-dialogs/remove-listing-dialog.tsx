import AppButton from "@/components/app-button";
import { PopupModal } from "@/components/ui/modal";
import useCustomNavigation from "@/hooks/use-navigation";
import ensureError from "@/lib/ensure-error";
import removeMyInvestmentListing from "@/services/my-investments/remove-investment-listing";

import useActions from "@/store/actions";
import { useAppSelector } from "@/store/hooks";
import * as React from "react";

import { toast } from "sonner";

export default React.memo(function RemoveListingDialog() {
  const { dialog } = useAppSelector((state) => state.ui);

  const [isLoading, setIsLoading] = React.useState(false);

  const { ui } = useActions();
  const { queryParams } = useCustomNavigation();

  const open = React.useMemo(() => {
    return dialog.show && dialog.type === "remove-investment-listing";
  }, [dialog.show, dialog.type]);

  const close = () => {
    if (isLoading) return;
    queryParams.delete("action");

    ui.resetDialog();
  };

  const showSuccess = () => {
    const data = {
      title: "Success!!!",
      subtitle: `You have successfully removed ${dialog.data?.name} from your listed Investments`,
    };

    ui.changeDialog({
      show: true,
      type: "success_dialog",
      data,
      action: close,
    });
  };

  const remove = async () => {
    if (!dialog.id) {
      return toast.info(
        "No Listing investment was selected try restarting the process",
      );
    }

    setIsLoading(true);
    try {
      await removeMyInvestmentListing({ listing_id: dialog.id });
      showSuccess();
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
        <h1 className="feature-accent text-neutral-1000">Remove Listing</h1>
        <span className="caption-standard text-neutral-500">
          Are you sure you want to remove this (
          <strong> {dialog?.data?.name}</strong>) from the marketplace listing?
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
          onClick={remove}
          isLoading={isLoading}
        >
          Remove
        </AppButton>
      </div>
    </PopupModal>
  );
});
