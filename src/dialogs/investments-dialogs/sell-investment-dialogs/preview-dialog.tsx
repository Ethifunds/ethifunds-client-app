import AppButton from "@/components/app-button";
import ErrorBoundary from "@/components/error-boundary";
import { Badge } from "@/components/ui/badge";
import { PopupModal } from "@/components/ui/modal";
import { amountSeparator } from "@/lib/amount-separator";
import useActions from "@/store/actions";
import { useAppSelector } from "@/store/hooks";
import { X } from "lucide-react";
import * as React from "react";

export default React.memo(function PreviewDialog() {
  const { dialog } = useAppSelector((state) => state.ui);
  const { currency } = useAppSelector((state) => state.account);
  const open = React.useMemo(() => {
    return dialog.show && dialog.type === "sell-investment-preview";
  }, [dialog.show, dialog.type]);

  const { ui } = useActions();
  if (!dialog.data) return;

  const click = () => {
    if (dialog.action) {
      dialog.action();
    }
  };
  const data = {
    date: new Date().toLocaleDateString("en-us", {
      dateStyle: "full",
    }),
    investment_type: "Real Estate Investment",
    ...dialog.data,
    status: <Badge className="bg-primary-100 text-primary"> pending </Badge>,
    expected_earnings: (
      <strong>
        {currency.sign}{" "}
        {amountSeparator(dialog.data["value_of_the_unit(s)"])}{" "}
      </strong>
    ),
  };

  const close = () => {
    if (dialog.dismiss) {
      dialog.dismiss();
    }
    ui.resetDialog();
  };
  return (
    <PopupModal
      handleClose={close}
      open={open}
      className="relative w-full overflow-auto p-8 lg:w-2/5"
    >
      <button
        onClick={close}
        className="absolute top-0 right-0 flex size-8 items-center justify-center rounded-full bg-white p-2"
      >
        <X color="#908b8b" />
      </button>
      <ErrorBoundary>
        <div className="flex flex-col gap-10">
          <h1 className="highlight-standard text-neutral-1000">Preview</h1>

          <div className="space-y-5">
            {Object.entries(data).map(([key, value]) => {
              return (
                <div
                  key={key}
                  className="caption-standard flex justify-between capitalize text-neutral-700"
                >
                  <span className="w-full">{key.split("_").join(" ")} </span>
                  <span className="w-full">{value}</span>
                </div>
              );
            })}
          </div>
          <AppButton
            onClick={click}
            variant="primary"
            className="w-full rounded-lg"
          >
            Continue
          </AppButton>
        </div>
      </ErrorBoundary>
    </PopupModal>
  );
});
