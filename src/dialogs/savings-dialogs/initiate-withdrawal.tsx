import { useAppSelector } from "@/store/hooks";
import * as React from "react";
import { useQuery } from "react-query";
import useActions from "@/store/actions";
import { PopupModal } from "@/components/ui/modal";
import { X } from "lucide-react";
import Render from "@/components/render";
import { amountSeparator } from "@/lib/amount-separator";
import ErrorBoundary from "@/components/error-boundary";
import getSavingsBalance from "@/services/savings/get-savings-balance";
import AppButton from "@/components/app-button";
import initiateWithdrawal from "@/services/savings/initiate-withdrawal";
import { toast } from "sonner";
import ensureError from "@/lib/ensure-error";
import { queryClient } from "@/config/query-client-config";

export default React.memo(function InitiateWithdrawal() {
  const { currency } = useAppSelector((state) => state.account);
  const { dialog } = useAppSelector((state) => state.ui);
  const [isLoading, setIsLoading] = React.useState(false);

  const { ui } = useActions();

  const open = React.useMemo(() => {
    return dialog.show && dialog.type === "savings_withdrawal";
  }, [dialog.show, dialog.type]);

  const { isFetching, isError, error, data } = useQuery(
    ["ethicoop-balance"],
    () => getSavingsBalance(),
    {
      enabled: open,
    },
  );

  const close = () => {
    ui.resetDialog();
  };

  const details = React.useMemo(() => {
    return {
      date: new Date().toLocaleDateString("en-us", {
        dateStyle: "full",
      }),
      transaction_type: "Withdrawal",
      amount: `${currency.sign} ${amountSeparator(data ?? "")}`,
      status: "Pending",
    };
  }, [data, currency.sign]);

  const handleWithdrawal = async () => {
    if (data && data < 1000) {
      toast.error("Minimum withdrawal amount is 1,000");
      return;
    }
    setIsLoading(true);
    try {
      await initiateWithdrawal({
        amount: data ?? 0,
      });
      showSuccessDialog();
    } catch (error) {
      const errMsg = ensureError(error).message;
      toast.error("Withdrawal failed", {
        description: errMsg,
      });
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };


  
  const showSuccessDialog = () => {
    const data = {
      title: "Successful!!",
      subtitle: "Your withdrawal has been initiated.",
    };
    
    const dismiss = () => {
      close();
      queryClient.invalidateQueries(["ethicoop-balance"]);
    };
    
    ui.changeDialog({
      show: true,
      type: "success_dialog",
      data,
      dismiss,
    });
  };
  return (
    <PopupModal
      handleClose={close}
      open={open}
      className="relative p-8 w-full min-h-60 lg:w-1/2"
    >
      <ErrorBoundary>
        <Render
          isLoading={isFetching}
          isError={isError}
          error={error}
          loadingPosition="center"
        >
          <button
            onClick={close}
            className="flex absolute top-0 right-0 justify-center items-center p-2 bg-white rounded-full size-8 lg:-right-8 lg:-top-8"
          >
            <X color="#908b8b" />
          </button>
          <div className="flex flex-col gap-10">
            <h1 className="highlight-standard text-neutral-1000">
              Initiate Withdrawal
            </h1>

            <div className="space-y-5">
              {Object.entries(details).map(([key, value]) => {
                return (
                  <div
                    key={key}
                    className="flex justify-between capitalize caption-standard text-neutral-700"
                  >
                    <span className="w-full">{key.replace("_", " ")} </span>
                    <span className="w-full">{value}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex gap-5 justify-end mt-5">
            <AppButton
              variant="mute"
              className="w-24 bg-neutral-100"
              onClick={close}
            >
              Cancel
            </AppButton>
            <AppButton variant="primary" onClick={handleWithdrawal} isLoading={isLoading} className="w-24">
              Withdraw
            </AppButton>
          </div>
        </Render>
      </ErrorBoundary>
    </PopupModal>
  );
});
