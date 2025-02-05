import classNames from "classnames";
import { opportunityList } from "./data";
import OpportunityCard from "./opportunity-card";

export default function OpportunityList(props: { scope?: "1" | "2" }) {
	const cn = classNames("flex gap-5 py-3 lg:py-0 overflow-auto lg:overflow-hidden lg:max-w-5xl", {
		"flex-col lg:flex-row": props.scope === "2",
	});
	return (
		<div className={cn}>
			{opportunityList.map((item) => (
				<OpportunityCard key={item.title} {...item} scope={props.scope} />
			))}
		</div>
	);
}
