import SuccessBox from "@/components/prompts/success-box";
import { PopupModal } from "@/components/ui/modal";
import useActions from "@/store/actions";
import { useAppSelector } from "@/store/hooks";
import * as React from "react";

export default React.memo(function SuccessDialog() {
  const { dialog } = useAppSelector((state) => state.ui);
  const { ui } = useActions();

  const open = React.useMemo(() => {
    return dialog.show && dialog.type === "real-estate-purchase-success";
  }, [dialog.type, dialog.show]);

  const close = () => {
    ui.changeDialog({ show: false, type: "" });
    if (dialog.action) {
      dialog.action();
    }
  };

  return (
    <PopupModal
      handleClose={close}
      open={open}
      className="relative w-full rounded-xl border bg-white p-8 px-4 py-8 shadow-lg lg:w-1/3 lg:rounded-3xl lg:px-8 lg:py-5"
    >
      <SuccessBox
        title="Congratulations!!!"
        subtitle="Your Investment was successfully created. Kindly check your email for your investment details ."
        btnText="Dismiss"
        action={close}
      />
    </PopupModal>
  );
});
