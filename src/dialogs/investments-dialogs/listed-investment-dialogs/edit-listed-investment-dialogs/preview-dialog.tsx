import AppButton from "@/components/app-button";
import ErrorBoundary from "@/components/error-boundary";
import { Badge } from "@/components/ui/badge";
import { PopupModal } from "@/components/ui/modal";
import { amountSeparator } from "@/lib/amount-separator";
import capitalize from "@/lib/capitalize";
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

  const click = () => {
    if (dialog.action) {
      dialog.action();
    }
  };

  const close = () => {
    if (dialog.dismiss) {
      dialog.dismiss();
    }
    ui.resetDialog();
  };

  if (!dialog.data) return;

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
        {amountSeparator(dialog.data["value_of_the_units"])}{" "}
      </strong>
    ),
  };

  return (
    <PopupModal
      handleClose={close}
      open={open}
      className="overflow-auto relative p-8 w-full lg:w-2/5"
    >
      <button
        onClick={close}
        className="flex absolute top-0 right-0 justify-center items-center p-2 bg-white rounded-full size-8"
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
                  className="flex justify-between caption-standard text-neutral-700"
                >
                  <span className="w-full"> {capitalize(key.split("_").join(" "))} </span>
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
