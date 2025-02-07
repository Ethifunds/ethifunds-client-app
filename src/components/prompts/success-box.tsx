import { assets } from "@/constants";
import AppButton from "../app-button";
import classNames from "classnames";

type SuccessBoxProps = {
	title?: string;
	subtitle?: string;
	icon?: string;
	btnText?: string;
	action?: () => void;
	className?: string;
};
export default function SuccessBox(props: SuccessBoxProps) {
	const action = () => {
		if (props.action) {
			props.action();
		}
	};

	const cn = classNames("flex flex-col items-center gap-5", props.className);
	return (
		<div className={cn}>
			<div>
				<img src={props.icon ?? assets.success_badge_01} alt="success-icon" />
			</div>

			<div className="text-center">
				<h1 className="feature-accent text-neutral-1000">{props.title ?? "Congratulations!!!"}</h1>
				<small className="caption-standard text-neutral-500">
					{props.subtitle ?? "Successful."}
				</small>
			</div>
			<div className="w-full text-center pt-5">
				<AppButton
					onClick={action}
					variant="primary"
					className="text-white w-3/4 rounded-xl !py-3 content-accent capitalize"
				>
					{props.btnText ?? "Dismiss"}
				</AppButton>
			</div>
		</div>
	);
}
