import AppContainer from "@/components/container/container";
import useUi from "@/hooks/use-ui";
import InvestmentVaultTerms from "./investment-vault-terms";
import * as React from "react";
import useInvestmentVault from "./use-investment-vault";
import Render from "@/components/render";
import Redirect from "@/components/redirect";
import ErrorBoundary from "@/components/error-boundary";

export default function InvestmentVault() {
	const { changeBackBtn } = useUi({ title: "investment vault" });
	const { isFetching, isError, error, data } = useInvestmentVault();

	React.useLayoutEffect(() => {
		changeBackBtn({ show: true });
		return () => {
			changeBackBtn(null);
		};
	}, [changeBackBtn]);

	return (
		<AppContainer>
			<ErrorBoundary>
				<Render
					isLoading={isFetching}
					isError={isError}
					error={error}
					loadingPosition="center"
					loadingBoxClass="!h-96"
				>
					{data?.vault ? (
						<Redirect to="/investments/vault/overview" replace />
					) : (
						<InvestmentVaultTerms />
					)}
				</Render>
			</ErrorBoundary>
		</AppContainer>
	);
}
