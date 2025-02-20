import AppButton from "@/components/app-button";
import Render from "@/components/render";
import { Badge } from "@/components/ui/badge";
import { PopupModal } from "@/components/ui/modal";
import { assets } from "@/constants";
import useCustomNavigation from "@/hooks/use-navigation";
import ensureError from "@/lib/ensure-error";
import getUserAccounts from "@/services/settings/bank/get-user-accounts";
import removeAccount from "@/services/settings/bank/remove-account";
import useActions from "@/store/actions";
import { useAppSelector } from "@/store/hooks";
import { BankAccount } from "@/types/bank-account.types";
import * as React from "react";
import { useQuery } from "react-query";
import { toast } from "sonner";

export default React.memo(function RemoveBankDialog() {
  const { currency } = useAppSelector((state) => state.account);
  const [account, setAccount] = React.useState<BankAccount | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const { dialog } = useAppSelector((state) => state.ui);
  const { ui } = useActions();
  const { queryParams } = useCustomNavigation();

  const { isFetching, isError, error } = useQuery(
    ["user-accounts-remove", dialog.id, currency.code],
    () => getUserAccounts({ currency: currency.code }),
    {
      onSuccess(data) {
        const match = data.find((item) => item.id === Number(dialog.id));

        if (match) {
          return setAccount(match);
        }
      },
    },
  );

  const open = React.useMemo(() => {
    return dialog.show && dialog.type === "remove_bank";
  }, [dialog.show, dialog.type]);

  const close = () => {
    if (isLoading) return;
    queryParams.delete("action");

    ui.changeDialog({
      show: false,
      type: "",
      id: "",
    });
  };

  const showSuccess = () => {
    const data = {
      title: "Success!!!",
      subtitle:
        "You have successfully removed your bank account from your list of banks for withdrawal",
    };

    ui.changeDialog({
      show: true,
      type: "success_dialog",
      data,
      action: close,
    });
  };

  const remove = async () => {
    if (!account) {
      return toast.info("No account was selected try restarting the process");
    }

    setIsLoading(true);
    try {
      await removeAccount({ id: account.id });
      showSuccess();
    } catch (error) {
      const errMsg = ensureError(error).message;
      toast.error(errMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PopupModal
      handleClose={close}
      open={open}
      className="relative h-60 w-full space-y-5 rounded-xl py-8 lg:h-auto lg:w-[30%] lg:rounded-3xl"
      showCloseBtn
    >
      <div className="text-center">
        <h1 className="feature-accent text-neutral-1000">Remove Account</h1>
        <span className="caption-standard text-neutral-500">
          Are you sure you want to remove this account?
        </span>
      </div>
      <Render
        isLoading={isFetching}
        isError={isError}
        error={error}
        loadType="simple"
        size="md"
      >
        {account && (
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-3 rounded-lg bg-neutral-100/30 p-2">
              <Badge
                variant={"outline"}
                className="flex size-10 items-center justify-center rounded-full border-neutral-500"
              >
                <img
                  src={assets.bank_01}
                  alt="bank icon"
                  className="size-full"
                />
              </Badge>

              <div className="[&_span]:content-accent flex flex-col gap-1 capitalize [&_span]:text-neutral-700">
                <h4 className="content-bold text-neutral-1000">
                  {account.account_name.toLowerCase()}{" "}
                </h4>
                <span>{account.account_number}</span>
                <span>{account.bank_name}</span>
              </div>
            </div>
            <div className="flex justify-between gap-5 [&_button]:w-full">
              <AppButton
                variant="outline"
                className="rounded-lg text-neutral-700"
                onClick={close}
                disabled={isLoading}
              >
                Cancel
              </AppButton>

              <AppButton
                variant="destructive"
                className="rounded-lg text-neutral-base_white"
                onClick={remove}
                isLoading={isLoading}
              >
                Remove
              </AppButton>
            </div>
          </div>
        )}
      </Render>
    </PopupModal>
  );
});
