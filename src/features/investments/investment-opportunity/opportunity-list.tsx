import { opportunityList } from "./data";
import OpportunityCard from "./opportunity-card";

export default function OpportunityList() {
	return (
		<div className="flex gap-5 py-3 lg:py-0 overflow-auto lg:overflow-hidden lg:max-w-5xl">
			{opportunityList.map((item) => (
				<OpportunityCard key={item.title} {...item} />
			))}
		</div>
	);
}
