import OpportunityList from "./opportunity-list";

export default function InvestmentOpportunity({ scope = "1" }: { scope?: "1" | "2" }) {
	return (
		<div className="space-y-5">
			<h1 className="highlight-accent text-neutral-1000">Investment Opportunity</h1>
			<OpportunityList scope={scope} />
		</div>
	);
}
