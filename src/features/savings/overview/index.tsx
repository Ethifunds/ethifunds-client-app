import AppContainer from "@/components/container/container";
import useUi from "@/hooks/use-ui";
import SavingsBalance from "./savings-balance";
import useOverview from "./use-overview";
import RecentTransactions from "./transactions/recent-transactions";

export default function SavingsOverview() {
  useUi({ title: "Ethicoop Savings" });
  const { ...rest } = useOverview();

  return (
    <AppContainer className="space-y-10">
      <div className="flex flex-col gap-3 items-start lg:flex-row">
        <SavingsBalance />
      </div>

      {rest.savings && (
        <RecentTransactions cycle_id={rest?.savings?.ethicoop_cycle_id} />
      )}
    </AppContainer>
  );
}
