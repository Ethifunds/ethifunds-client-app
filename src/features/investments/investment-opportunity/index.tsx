import ErrorBoundary from "@/components/error-boundary";
import OpportunityList from "./opportunity-list";

export default function InvestmentOpportunity({ scope = "1" }: { scope?: "1" | "2" }) {
	return (
		<div className="space-y-5">
			<ErrorBoundary>
				<h1 className="highlight-accent text-neutral-1000">Investment Opportunities</h1>
				<OpportunityList scope={scope} />
			</ErrorBoundary>
		</div>
	);
}
