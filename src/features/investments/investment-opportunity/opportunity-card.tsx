import classNames from "classnames";
import { type OpportunityCard } from "./data";
import { Link } from "react-router-dom";

export default function OpportunityCard(prop: OpportunityCard) {
	const container = classNames(
		"flex flex-col px-5 p-4 space-y-5 border rounded-lg shrink-0 lg:shrink w-full hover:scale-95 transition",
		prop.boarder,
		prop.bg
	);

	return (
		<Link to={""} className={container}>
			<img src={prop.image} alt={prop.title} className="size-16" />
			<h1 className="highlight-accent !mt-2">{prop.title}</h1>
			<p className="caption-standard line-clamp-6 !mt-2">{prop.description}</p>
		</Link>
	);
}
