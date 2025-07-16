import useActions from "@/store/actions";
import { useAppSelector } from "@/store/hooks";
import * as React from "react";
import { toast } from "sonner";

export default function useFundWallet() {
  const { currency } = useAppSelector((state) => state.account);
  const { dialog } = useAppSelector((state) => state.ui);
  const [amount, setAmount] = React.useState<number | null>(null);
  const [showPaystack, setShowPaystack] = React.useState(false);
  const { ui } = useActions();

  const code = currency.code;

  const open = React.useMemo(() => {
    return dialog.show && dialog.type === "fund_wallet_with_paystack";
  }, [dialog.show, dialog.type]);

  const toggleShow = (val: boolean) => {
    ui.changeDialog({ show: val, type: "fund_wallet" });
  };

  const fundWallet = () => {
    if (!amount) {
      toast.error("Please enter an amount");
      return;
    }
    setShowPaystack(true);
  };

  const handleClose = () => {
    setShowPaystack(false);
    setAmount(null);
    ui.resetDialog();
  };

  return {
    open,
    toggleShow,
    code,
    amount,
    setAmount,
    showPaystack,
    setShowPaystack,
    fundWallet,
    handleClose,
  };
}
