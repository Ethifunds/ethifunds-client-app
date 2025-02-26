import AppButton from "@/components/app-button";
import ErrorBoundary from "@/components/error-boundary";
import { PopupModal } from "@/components/ui/modal";
import { amountSeparator } from "@/lib/amount-separator";
import useActions from "@/store/actions";
import { useAppSelector } from "@/store/hooks";
import * as React from "react";

export default React.memo(function PreviewDialog() {
  const { dialog } = useAppSelector((state) => state.ui);
  const { currency } = useAppSelector((state) => state.account);
  const { ui } = useActions();

  const open = React.useMemo(() => {
    return (
      dialog.show && dialog.type === "real-estate-marketplace-purchase-preview"
    );
  }, [dialog.show, dialog.type]);

  const charges = "0.00";
  if (!dialog.data) return;

  const click = () => {
    if (dialog.action) {
      dialog.action();
    }
  };

  const close = () => {
    ui.resetDialog();
    if (dialog.dismiss) {
      dialog.dismiss();
    }
  };
  const data = {
    seller_username: dialog.data.seller_username,
    date: new Date().toLocaleDateString("en-us", {
      dateStyle: "full",
    }),
    investment_type: "Real Estate Investment",
    interest_rate: dialog.data.interest_rate,
    counter_offer_price: dialog.data.counter_offer_price,
    purchasing_cost: dialog.data.purchasing_cost,
    purchasing_unit: dialog.data.purchasing_unit,
    charges: `${currency.sign} ${amountSeparator(charges)}`,
    status: "pending",
    total_cost: (
      <strong>
        {currency.sign}{" "}
        {amountSeparator(dialog.data.purchasing_cost + charges)}{" "}
      </strong>
    ),
  };

  return (
    <PopupModal
      handleClose={close}
      open={open}
      className="relative w-full overflow-auto p-8 lg:w-2/5"
      showCloseBtn
    >
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
