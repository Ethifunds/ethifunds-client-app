import getEthivestTerms from "@/services/ethivest/get-ethivest-terms";
import { useQuery } from "react-query";
import * as React from "react";
export default function useEthivestInvestment() {
  const [showOverview, setShowOverview] = React.useState(false);

  const query = useQuery(["ethivest-terms"], () => getEthivestTerms(), {
    onSuccess(data) {
      setShowOverview(data);
    },
  });

  return {
    ...query,
    showOverview,
    setShowOverview,
  };
}
