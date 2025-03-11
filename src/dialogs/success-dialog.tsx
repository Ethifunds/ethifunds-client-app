import SuccessBox from "@/components/prompts/success-box";
import { PopupModal } from "@/components/ui/modal";
import useActions from "@/store/actions";
import { useAppSelector } from "@/store/hooks";
import * as React from "react";

export default React.memo(function SuccessDialog() {
  const { dialog } = useAppSelector((state) => state.ui);
  const { ui } = useActions();

  const open = React.useMemo(() => {
    return dialog.show && dialog.type === "success_dialog";
  }, [dialog.type, dialog.show]);

  const close = () => {
    if (dialog.action) {
      dialog.action();
    }
    if (dialog.dismiss) {
      dialog.dismiss();
    }
    ui.resetDialog();
  };

  if (!dialog.data) return;

  return (
    <PopupModal
      handleClose={close}
      open={open}
      className="relative w-full rounded-xl border bg-white p-8 px-4 py-8 shadow-lg lg:w-1/3 lg:rounded-3xl lg:px-8 lg:py-5"
    >
      <SuccessBox
        icon={dialog.data.icon}
        title={dialog.data.title}
        subtitle={dialog.data.subtitle}
        btnText={dialog.data.btnText}
        action={close}
      />
    </PopupModal>
  );
});
