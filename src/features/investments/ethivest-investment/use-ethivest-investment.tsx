import getEthivestConsent from "@/services/ethivest/get-ethivest-terms";
import { useQuery } from "react-query";
import * as React from "react";
export default function useEthivestInvestment() {
  const [showOverview, setShowOverview] = React.useState(false);

  const query = useQuery(["ethivest-terms"], () => getEthivestConsent(), {
    onSuccess(data) {
      const responseData = data as any;
      console.log(data);
      if (responseData !== null) {
        setShowOverview(true);
      }
    },
  });

  return {
    ...query,
    showOverview,
    setShowOverview,
  };
}
