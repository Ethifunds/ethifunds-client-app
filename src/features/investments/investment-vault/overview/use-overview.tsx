import useCustomNavigation from "@/hooks/use-navigation";
import retrieveVault from "@/services/investments/vault/retrieve-vault";
import { useAppSelector } from "@/store/hooks";
import * as React from "react";
import { useQuery } from "react-query";

export default function useOverview() {
	const { currency } = useAppSelector((state) => state.account);
	const { queryParams } = useCustomNavigation();
	const hasTabs = queryParams.has("tab");
	const query = useQuery(["retrieve-vault", currency.code], () =>
		retrieveVault({ currency: currency.code })
	);

	React.useEffect(() => {
		if (query.isFetching) return;
		if (!hasTabs && query.isFetchedAfterMount) {
			query.refetch();
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [hasTabs]);

	return {
		...query,
	};
}
