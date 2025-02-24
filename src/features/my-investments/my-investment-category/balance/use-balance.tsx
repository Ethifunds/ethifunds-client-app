import useExtras from "@/hooks/use-extras";
import useCustomNavigation from "@/hooks/use-navigation";
import getMyInvestmentsBalance from "@/services/my-investments/get-my-investments-balance";
import useActions from "@/store/actions";
import { useQuery } from "react-query";

export default function useBalance() {
  const { sign, currency, changeCurrency } = useExtras();
const {ui} = useActions()
  const { navigate, params } = useCustomNavigation();



  const query = useQuery(["my-investment-balance", currency], () =>
    getMyInvestmentsBalance({ currency }),
  );

  const buyUnits = () => {
    navigate(`/investments/${params.categoryId}`);
  };

  const sellUnits = () => {
    ui.changeDialog({
      show: true,
      type: "sell-investment-units",
      id:""
   })


  };
  return {
    ...query,
    currency,
    sign,
    buyUnits,
    sellUnits,
    changeCurrency,
  };
}
