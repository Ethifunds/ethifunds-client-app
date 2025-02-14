import useCustomNavigation from "@/hooks/use-navigation";
import getRealEstateProducts from "@/services/investments/real-estate/get-real-estate-products";
import { useQuery } from "react-query";

export default function useRealEstateInvestment() {
	const { params } = useCustomNavigation();

	const categoryId = String(params.categoryId);

	const query = useQuery(["real-estate", params.categoryId], () =>
		getRealEstateProducts({ categoryId })
	);

	return {
		...query,
	};
}
