import useUi from "@/hooks/use-ui";
import * as React from "react";
import Render from "@/components/render";
import ErrorBoundary from "@/components/error-boundary";
import EthivestTerms from "./ethivest-terms";
import useEthivestInvestment from "./use-ethivest-investment";
import EthivestOverview from "./ethivest-overview";

export default React.memo(function EthivestInvestment() {
  const { changeBackBtn } = useUi({ title: "Ethivest" });
  const { isFetching, isError, error, showOverview, setShowOverview } =
    useEthivestInvestment();

  React.useLayoutEffect(() => {
    changeBackBtn({ show: true });
    return () => {
      changeBackBtn(null);
    };
  }, [changeBackBtn]);

  return (
    <ErrorBoundary>
      <Render
        isLoading={isFetching}
        isError={isError}
        error={error}
        loadingPosition="center"
        loadingBoxClass="!h-96"
      >
        {/* TODO: remove the inverse ! */}
        {!showOverview ? (
          <EthivestOverview />
        ) : (
          <EthivestTerms showOverview={setShowOverview} />
        )}
      </Render>
    </ErrorBoundary>
  );
});
