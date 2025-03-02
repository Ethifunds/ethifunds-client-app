import useCustomNavigation from "@/hooks/use-navigation";
import getInvestmentCategoryDetails from "@/services/investments/get-investment-category-details";
import { useQuery } from "react-query";

export default function useRealEstateInvestment() {
  const { params } = useCustomNavigation();

  const categoryId = String(params.categoryId);

  const query = useQuery(["real-estate", params.categoryId], () =>
    getInvestmentCategoryDetails({ categoryId }),
  );

  return {
    ...query,
  };
}
