import classNames from "classnames";
import { type OpportunityCard } from "./data";
import { Link } from "react-router-dom";

export default function OpportunityCard(props: OpportunityCard & { scope?: "1" | "2" }) {
	const container = classNames(
		"flex flex-col px-5 p-4 space-y-5 border rounded-lg shrink-0 lg:shrink w-[85%] hover:scale-95 transition",
		props.boarder,
		props.bg,
		{
		"!w-full": props.scope === "2"
		}
	);

	return (
		<Link to={props.path} className={container}>
			<img src={props.image} alt={props.title} className="size-16" />
			<h1 className="highlight-accent !mt-2">{props.title}</h1>
			<p className="caption-standard line-clamp-6 !mt-2">{props.description}</p>
		</Link>
	);
}
