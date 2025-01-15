import classNames from "classnames";
import { authContainerData } from "./data";

export default function Dots({ current }: { current: number }) {
	return (
		<div className="flex gap-2">
			{Array.from({ length: authContainerData.length }, (_, idx) => {
				const cn = classNames("size-1.5 rounded-full", {
					"bg-primary w-5": idx === current,
					"bg-secondary-200": idx !== current,
				});
				return <div className={cn} key={idx} />;
			})}
		</div>
	);
}
