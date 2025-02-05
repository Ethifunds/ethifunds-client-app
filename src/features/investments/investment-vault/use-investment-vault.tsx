import retrieveVault from "@/services/investments/vault/retrieve-vault";
import { useAppSelector } from "@/store/hooks";
import { useQuery } from "react-query";

export default function useInvestmentVault() {
	const { currency } = useAppSelector((state) => state.account);

	const query = useQuery(["retrieve-vault", currency.code], () =>
		retrieveVault({ currency: currency.code })
	);

	return {
		...query,
	};
}
