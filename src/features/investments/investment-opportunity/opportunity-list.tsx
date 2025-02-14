import classNames from "classnames";
import { type OpportunityCard as Card, opportunityList } from "./data";
import OpportunityCard from "./opportunity-card";
import { useQuery } from "react-query";
import getInvestmentCategories from "@/services/investments/get-investment-categories";
import ErrorBoundary from "@/components/error-boundary";
import Render from "@/components/render";

export default function OpportunityList(props: { scope?: "1" | "2" }) {
	const { isFetching, isError, error, data } = useQuery(["investment-categories"], () =>
		getInvestmentCategories()
	);

	const cn = classNames("flex gap-5 py-3 lg:py-0 overflow-auto lg:overflow-hidden lg:max-w-5xl", {
		"flex-col lg:flex-row": props.scope === "2",
	});

	const categories =
		data?.map((item, idx): Card => {
			return {
				title: item.display_title,
				image: item.display_image,
				description: item.description,
				path: `/investments/${item.id}`,
				bg: idx === 0 ? "bg-secondary-200" : "bg-[#FDC2DF]",
				bg_img: item.display_image,
				boarder: idx === 0 ? "border-secondary-600" : "border-primary",
			};
		}) ?? [];

	return (
		<div className={cn}>
			<ErrorBoundary>
				<Render isLoading={isFetching} isError={isError} error={error}>
					{opportunityList.map((item) => (
						<OpportunityCard key={item.title} {...item} scope={props.scope} />
					))}

					{categories?.map((item) => (
						<OpportunityCard key={item.title} {...item} {...props} />
					))}
				</Render>
			</ErrorBoundary>
		</div>
	);
}
