import useCustomNavigation from "@/hooks/use-navigation";
import getOngoingSavings from "@/services/savings/get-ongoing-savings";
import useActions from "@/store/actions";
import { Savings } from "@/types/savings.types";
import * as React from "react";

import { useQuery } from "react-query";

export type SavingDetailsProps = ReturnType<typeof useQuery> & {
  savings: Savings | null;
  openSavingsDialog(): void;
};

export default function useOverview() {
  const [savings, setSavings] = React.useState<Savings | null>(null);
  const [showManualFunding, setShowManualFunding] = React.useState(false);

  const { queryParams } = useCustomNavigation();
  const { ui } = useActions();
  const hasAction = queryParams.has("action");

  const query = useQuery(["savings-details"], () => getOngoingSavings(), {
    enabled: !hasAction && true,
    onSuccess(data) {
      if (data) {
        if (data.length > 0) {
          const details = data[0];
          if (
            details.funding_preference === "manual" &&
            !details.has_contributed
          ) {
            setShowManualFunding(true);
          }
          setSavings(details);
        }
      }
    },
  });
  
  

  

  const openSavingsDialog = () => {
    queryParams.set("action", "savings_preference");
    ui.changeDialog({
      show: true,
      type: "savings_preference",
      data: savings,
    });
  };

 



  React.useLayoutEffect(() => {
    queryParams.delete("action");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    ...query,
    savings,
    showManualFunding,
    openSavingsDialog,
  };
}
