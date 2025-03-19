import AppContainer from "@/components/container/container";
import useUi from "@/hooks/use-ui";
import SavingsBalance from "./savings-balance";
import SavingsDetails from "./savings-details";
import useOverview from "./use-overview";
import RecentTransactions from "./transactions/recent-transactions";

export default function SavingsOverview() {
  useUi({ title: "Ethicoop Savings" });
  const { initiating, showManualFunding, makeManualPayment, ...rest } =
    useOverview();

  return (
    <AppContainer className="space-y-10">
      <div className="flex flex-col items-start gap-3 lg:flex-row">
        <SavingsBalance
          isLoading={initiating}
          showManualFunding={showManualFunding}
          makeManualPayment={makeManualPayment}
        />
        <SavingsDetails {...rest} />
      </div>

      {!rest.isFetching && rest.savings && <RecentTransactions />}
    </AppContainer>
  );
}
