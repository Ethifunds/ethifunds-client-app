import { TabsContent } from "@/components/ui/tabs";
import classNames from "classnames";

type ContainerProps = {
	title: string;
	subTitle: string;
	value: string;
	children: React.ReactNode;
	className?: string;
};
export default function TabContainer(props: ContainerProps) {
	const cn = classNames("pt-8", props.className);
	return (
		<TabsContent value={props.value} className={cn}>
			<div>
				<h1 className="highlight-accent text-neutral-1000">{props.title}</h1>
				<span className="caption-standard text-neutral-500">{props.subTitle}</span>
			</div>

			{props.children}
		</TabsContent>
	);
}
