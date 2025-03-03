import { PopupModal } from "@/components/ui/modal";
import useActions from "@/store/actions";
import { useAppSelector } from "@/store/hooks";
import * as React from "react";

export default React.memo(function QrCodeDialog() {
  const { dialog } = useAppSelector((state) => state.ui);

  const { ui } = useActions();

  const data = dialog.data;

  const open = React.useMemo(() => {
    return dialog.show && dialog.type === "show_2fa_qr_code";
  }, [dialog.show, dialog.type]);

  const close = () => {
    ui.resetDialog();
  };
  return (
    <PopupModal
      open={open}
      handleClose={close}
      showCloseBtn
      className="flex justify-center space-y-5 !bg-transparent"
    >
      <div className="flex flex-col items-center rounded-lg bg-white py-2">
        <span className="hero-accent pt-5">Scan Code</span>
        <div
          dangerouslySetInnerHTML={{
            __html: data?.qr_code_url,
          }}
        />
      </div>
    </PopupModal>
  );
});
