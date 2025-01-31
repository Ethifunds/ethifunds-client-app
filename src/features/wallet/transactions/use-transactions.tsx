import getTransactions from "@/services/wallet/get-transactions";
import { useAppSelector } from "@/store/hooks";
import { useQuery } from "react-query";

export default function useTransactions() {
	const { currency } = useAppSelector((state) => state.account);

	const query = useQuery(["transactions", currency], () =>
		getTransactions({ currency: currency.code })
	);
	return {
		...query,
		sign: currency.sign,
	};
}
