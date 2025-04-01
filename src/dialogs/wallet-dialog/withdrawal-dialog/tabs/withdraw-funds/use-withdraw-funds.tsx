import getUserAccounts from "@/services/settings/bank/get-user-accounts";
import { useAppSelector } from "@/store/hooks";
import { useQuery } from "react-query";
import * as React from "react";
import { BankAccount } from "@/types/bank-account.types";
import { toast } from "sonner";
import ensureError from "@/lib/ensure-error";
import withdrawFunds from "@/services/wallet/withdraw-funds";
import { ChangeTab } from "../../use-withdrawal";
import useActions from "@/store/actions";

export default function useWithdrawFunds(changeTab: ChangeTab) {
  const [amount, setAmount] = React.useState("");
  const [sending, setSending] = React.useState(false);
  const [selected, setSelected] = React.useState<BankAccount | null>(null);
  const [bankAccounts, setBankAccounts] = React.useState<BankAccount[]>([]);
  const { currency } = useAppSelector((state) => state.account);

  const { ui } = useActions();
  const code = currency.code;
  const submitRef = React.useRef<HTMLDivElement>(null);

  const query = useQuery(
    ["bank-accounts", code],
    () => getUserAccounts({ currency: code }),
    {
      onSuccess(data) {
        setBankAccounts(data);
      },
    },
  );

  const reset = () => {
    setSelected(null);
  };

  const updateList = (updates: BankAccount) => {
    const originals = bankAccounts.map((item) => item.id);
    if (originals.includes(updates.id)) return;
    setBankAccounts((prev) => [updates, ...prev]);
  };

  const scrollIntoView = React.useCallback(() => {
    if (submitRef.current) {
      submitRef.current.scrollIntoView({
        block: "end",
        behavior: "smooth",
      });
    }
  }, []);

  const select = (id: number) => {
    const match = bankAccounts.find((item) => item.id === id);
    if (match) {
      setSelected(match);
      scrollIntoView();
    }
  };

	
  const submit = async () => {
    if (!amount || !selected) return toast.error("Amount and Bank is Required");
    setSending(true);
    try {
      await withdrawFunds({
        amount,
        recipient: selected.recipient_code,
      });

      toast.success("Withdrawal successful, funds on it's way to you.", {
        duration: 10000,
        dismissible: true,
      });
      changeTab("withdraw_funds", true);
      reset();
    } catch (error) {
      const err = ensureError(error);
      if (err.message.toLocaleLowerCase().includes("insufficient")) return showInsufficientDialog();
      toast.error(err.message, {dismissible:true,  duration: 10000});
    } finally {
      setSending(false);
    }
  };

  function showInsufficientDialog() {
    ui.changeDialog({
      show: true,
      type: "insufficient_funds",
      dismiss: reset,
    });
  }

  return {
    ...query,
    sending,
    selected,
    currency,
    submitRef,
    bankAccounts,
    updateList,
    setAmount,
    select,
    submit,
  };
}
