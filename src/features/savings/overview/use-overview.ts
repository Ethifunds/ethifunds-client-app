import useCustomNavigation from "@/hooks/use-navigation";
import ensureError from "@/lib/ensure-error";
import getOngoingSavings from "@/services/savings/get-ongoing-savings";
import initiateManualPayment from "@/services/savings/initiate-manual-payment";
import useActions from "@/store/actions";
import { Savings } from "@/types/savings.types";
import * as React from "react";

import { useQuery } from "react-query";
import { toast } from "sonner";

export type SavingDetailsProps = ReturnType<typeof useQuery> & {
  savings: Savings | null;
  openSavingsDialog(): void;
};

export default function useOverview() {
  const [savings, setSavings] = React.useState<Savings | null>(null);
  const [showManualFunding, setShowManualFunding] = React.useState(false);
  const [initiating, setInitiating] = React.useState(false);

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
  
  

  const reset = () => {
    setShowManualFunding(false);
  };

  const openSavingsDialog = () => {
    queryParams.set("action", "savings_preference");
    ui.changeDialog({
      show: true,
      type: "savings_preference",
      data: savings,
    });
  };

  const makeManualPayment = async () => {
    setInitiating(true);
    try {
      await initiateManualPayment();
      openSuccessDialog();
    } catch (error) {
      const errMsg = ensureError(error).message;
      toast.error(errMsg);
    }
  };

  const openSuccessDialog = () => {
    const currentDate = new Date()
      .toLocaleDateString("default", {
        dateStyle: "long",
      })
      .split(" ")[0];

    const data = {
      title: "Successful!!",
      subtitle: `you have successfully made payment for the month of ${currentDate}`,
    };

    ui.changeDialog({
      show: true,
      type: "success_dialog",
      data,
      dismiss: reset,
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
    initiating,
    openSavingsDialog,
    makeManualPayment,
  };
}
