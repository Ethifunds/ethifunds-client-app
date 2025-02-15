import ErrorBoundary from "@/components/error-boundary";
import Render from "@/components/render";
import useCustomNavigation from "@/hooks/use-navigation";
import ensureError from "@/lib/ensure-error";
import getInvestmentCategories from "@/services/investments/get-investment-categories";
import * as React from "react";
import { toast } from "sonner";
import RealEstateInvestment from "../real-estate-investment";
import useUi from "@/hooks/use-ui";

export default function InvestmentCategories() {
  const [categoryIdx, setCategoryIdx] = React.useState(-1);
  const [isLoading, setIsLoading] = React.useState(true);
  const { params } = useCustomNavigation();
  const { changeBackBtn } = useUi({});
  const categoryId = String(params.categoryId ?? "");

  const categories = [<RealEstateInvestment />];

  const init = React.useCallback(async () => {
    try {
      const response = await getInvestmentCategories();
      if (response) {
        const match = response.findIndex(
          (item) => item.id === Number(categoryId),
        );
        if (match > -1) {
          setCategoryIdx(match);
          setIsLoading(false);
        }
      }
    } catch (err) {
      const errMsg = ensureError(err).message;
      toast.error(errMsg);
    }
  }, [categoryId]);

  React.useLayoutEffect(() => {
    changeBackBtn({
      show: true,
    });
    init();
    return () => {
      changeBackBtn(null);
    };
  }, [changeBackBtn, init]);

  return (
    <ErrorBoundary>
      <Render isLoading={isLoading} loadingPosition="center">
        {categories[categoryIdx]}
      </Render>
    </ErrorBoundary>
  );
}
