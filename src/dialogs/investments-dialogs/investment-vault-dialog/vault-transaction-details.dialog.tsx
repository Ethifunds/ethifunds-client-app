import getTransactionDetails from "@/services/wallet/get-transaction-details";
import { useAppSelector } from "@/store/hooks";
import * as React from "react";
import { useQuery } from "react-query";

import useActions from "@/store/actions";
import { PopupModal } from "@/components/ui/modal";
import { X } from "lucide-react";
import Render from "@/components/render";
import { amountSeparator } from "@/lib/amount-separator";
import ErrorBoundary from "@/components/error-boundary";

export default React.memo(function VaultTransactionDetailsDialog() {
  const { currency } = useAppSelector((state) => state.account);
  const { dialog } = useAppSelector((state) => state.ui);
  const id = dialog.id;

  const { ui } = useActions();

  const open = React.useMemo(() => {
    return dialog.show && dialog.type === "vault_transaction_details";
  }, [dialog.show, dialog.type]);

  const { isFetching, isError, error, data } = useQuery(
    ["vault-transaction-id", id],
    () =>
      getTransactionDetails({
        id,
        currency: currency.code,
      }),
    {
      enabled: open,
    },
  );

  const toggleShow = (val: boolean) => {
    ui.changeDialog({ show: val, type: "", id: "" });
  };

  const close = () => {
    toggleShow(false);
  };

  const details = React.useMemo(() => {
    return {
      session_ID: data?.transaction_reference || "",
      date: new Date(data?.created_at ?? "").toLocaleDateString("en-us", {
        dateStyle: "full",
      }),
      transaction_type: data?.transaction_type || "",
      amount: `${currency.sign} ${amountSeparator(data?.amount ?? "")}`,
      status: data?.status || "",
    };
  }, [data, currency.sign]);

  return (
    <PopupModal
      handleClose={close}
      open={open}
      className="relative h-96 w-full p-8 lg:w-1/2"
    >
      <ErrorBoundary>
        <Render isLoading={isFetching} isError={isError} error={error}>
          <button
            onClick={close}
            className="absolute right-0 top-0 flex size-8 items-center justify-center rounded-full bg-white p-2 lg:-right-8 lg:-top-8"
          >
            <X color="#908b8b" />
          </button>
          <div className="flex flex-col gap-10">
            <h1 className="highlight-standard text-neutral-1000">
              Transaction Details
            </h1>

            <div className="space-y-5">
              {Object.entries(details).map(([key, value]) => {
                return (
                  <div
                    key={key}
                    className="caption-standard flex justify-between capitalize text-neutral-700"
                  >
                    <span className="w-full">{key.replace("_", " ")} </span>
                    <span className="w-full">{value}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </Render>
      </ErrorBoundary>
    </PopupModal>
  );
});
