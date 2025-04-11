import AppContainer from "@/components/container/container";
import useUi from "@/hooks/use-ui";
import SavingsTerms from "./savings-terms";
import Render from "@/components/render";
import Redirect from "@/components/redirect";
import ErrorBoundary from "@/components/error-boundary";
import getSavingsBalance from "@/services/savings/get-savings-balance";
import { useQuery } from "react-query";

export default function Savings() {
  useUi({ title: "Savings" });
  const { isFetching, isError, error, data } = useQuery(
    ["ethicoop-savings-balance"],
    () => getSavingsBalance(),
  );

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
          {typeof data === "number" ? (
            <Redirect to="/savings/overview" replace />
          ) : (
            <SavingsTerms />
          )}
        </Render>
      </ErrorBoundary>
    </AppContainer>
  );
}
