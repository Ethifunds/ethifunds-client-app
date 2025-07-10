import useExtras from "@/hooks/use-extras";
import retrieveVault from "@/services/investments/vault/retrieve-vault";
import getMyInvestmentsBalance from "@/services/my-investments/get-my-investments-balance";
import useActions from "@/store/actions";
import { useQuery } from "react-query";

export default function useBalance() {
  const { sign, currency, changeCurrency } = useExtras();
  const { ui } = useActions();

  const vaultQuery = useQuery(["retrieve-vault", currency], () =>
    retrieveVault({ currency: currency }),
  );

  const investmentBalanceQuery = useQuery(
    ["my-investment-balance", currency],
    () => getMyInvestmentsBalance({ currency }),
  );

  const fundWallet = () => {
    ui.changeDialog({
      type: "fund_vault",
      id: "",
      show: true,
    });
  };

  const withdrawal = () => {
    ui.changeDialog({
      type: "vault_withdrawal",
      id: "",
      show: true,
    });
  };

  return {
    vaultQuery,
    investmentBalanceQuery,
    currency,
    sign,
    changeCurrency,
    fundWallet,
    withdrawal,
  };
}
