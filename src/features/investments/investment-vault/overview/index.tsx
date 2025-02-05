import AppContainer from "@/components/container/container";
import Render from "@/components/render";
import useUi from "@/hooks/use-ui";
import * as React from "react";
import useOverview from "./use-overview";
import AvailableBalance from "./available-balance";
import RecentTransactions from "./transactions/recent-transactions";
import ErrorBoundary from "@/components/error-boundary";

export default function InvestmentVaultOverview() {
	const { changeBackBtn } = useUi({ title: "investment vault" });
	const { isFetching, isError, error, data } = useOverview();

	React.useLayoutEffect(() => {
		changeBackBtn({ show: true });
		return () => {
			changeBackBtn(null);
		};
	}, [changeBackBtn]);

	return (
		<AppContainer className="space-y-10">
			<ErrorBoundary>
				<Render
					isLoading={isFetching}
					isError={isError}
					error={error}
					loadingPosition="center"
					loadingBoxClass="!h-96"
				>
					{data && <AvailableBalance {...data?.vault} />}
					<RecentTransactions data={data?.recent_transactions ?? []} />
				</Render>
			</ErrorBoundary>
		</AppContainer>
	);
}
