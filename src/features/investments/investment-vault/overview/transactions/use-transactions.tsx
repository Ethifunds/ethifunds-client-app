import getVaultTransactions from "@/services/investments/vault/get-vault-transactions";
import { useAppSelector } from "@/store/hooks";
import { useQuery } from "react-query";

export default function useTransactions() {
	const { currency } = useAppSelector((state) => state.account);

	const query = useQuery(["vault-transactions", currency], () =>
		getVaultTransactions({ currency: currency.code })
	);
	return {
		...query,
		sign: currency.sign,
	};
}
