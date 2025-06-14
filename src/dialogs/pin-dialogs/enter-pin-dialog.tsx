import AppButton from "@/components/app-button";
import PinInput from "@/components/ui/form-input/otp-input";
import { PopupModal } from "@/components/ui/modal";
import useActions from "@/store/actions";
import { useAppSelector } from "@/store/hooks";
import classNames from "classnames";
import { X } from "lucide-react";
import * as React from "react";
import { toast } from "sonner";

export default function EnterPinDialog() {
  const { dialog } = useAppSelector((state) => state.ui);
  const { ui } = useActions();
  const [isLoading, setIsLoading] = React.useState(false);
  const [pin, setPin] = React.useState("");

  const open = React.useMemo(() => {
    setPin("");
    return dialog.show && dialog.type === "enter_pin";
  }, [dialog.show, dialog.type]);

  const close = () => {
    setPin("");
    
    ui.resetDialog();

    if (dialog.dismiss) {
      dialog.dismiss();
    }
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!dialog.action) return toast.info("there is no action provided");
    setIsLoading(true);
    try {
      await dialog.action(pin);
    } finally {
      setIsLoading(false);
    }
  };

  const inputClass = classNames("!size-14 bg-neutral-200 border-white");

  return (
    <PopupModal
      handleClose={close}
      open={open}
      className="relative w-full py-8 h-60 rounded-xl lg:h-auto lg:w-1/4 lg:rounded-3xl"
    >
      <button
        onClick={close}
        className="absolute top-0 right-0 flex items-center justify-center p-2 bg-white rounded-full size-8 lg:-right-8 lg:-top-8"
      >
        <X color="#908b8b" />
      </button>
      <h1 className="text-center highlight-bold text-neutral-700">
        Enter Transaction Pin
      </h1>
      <form onSubmit={submit}>
        <div className="space-y-2 text-center">
          <small className="caption-standard text-neutral-500">
            Enter your transaction pin to initiate this action
          </small>
          <PinInput
            value={pin}
            valueLength={4}
            onChange={setPin}
            masked={true}
            inputClass={inputClass}
          />
        </div>

        <div className="pt-5 text-center">
          <AppButton
            type="submit"
            isLoading={isLoading}
            variant="primary"
            className="w-full py-4 text-white content-accent rounded-xl"
            disabled={isLoading}
          >
            Proceed
          </AppButton>
        </div>
      </form>
    </PopupModal>
  );
}
