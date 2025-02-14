import AppButton from "@/components/app-button";
import { PopupModal } from "@/components/ui/modal";
import { assets } from "@/constants";
import useCustomNavigation from "@/hooks/use-navigation";
import useActions from "@/store/actions";
import { useAppSelector } from "@/store/hooks";
import { X } from "lucide-react";
import * as React from "react";

export default React.memo(function InsufficientFundDialog() {
  const { dialog } = useAppSelector((state) => state.ui);
  const { navigate } = useCustomNavigation();

  const { ui } = useActions();
  const open = React.useMemo(() => {
    return dialog.show && dialog.type === "insufficient_funds";
  }, [dialog.show, dialog.type]);

  const dismiss = () => {
    ui.changeDialog({
      show: false,
      type: "",
    });
  };

  const action = () => {
    dismiss();
    navigate("/wallet");
    ui.changeDialog({
      show: true,
      type: "fund_wallet",
    });
  };

  return (
    <PopupModal
      handleClose={dismiss}
      open={open}
      className="relative flex w-full flex-col items-center lg:w-1/4"
    >
      <button
        onClick={dismiss}
        className="absolute right-0 top-0 flex size-8 items-center justify-center rounded-full bg-white p-2 lg:-right-8 lg:-top-8"
      >
        <X color="#908b8b" />
      </button>
      <img src={assets.safe_box_01} alt="success-icon" />

      <div className="text-center">
        <h1 className="feature-accent text-neutral-1000">
          Insufficient Balance
        </h1>
        <small className="caption-standard text-neutral-500">
          Insufficient funds, please fund your wallet
        </small>
      </div>
      <div className="w-full pt-5 text-center">
        <AppButton
          onClick={action}
          variant="primary"
          className="content-accent w-full rounded-xl !py-3 text-white"
        >
          Fund your wallet
        </AppButton>
      </div>
    </PopupModal>
  );
});
