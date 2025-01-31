import { assets } from "@/constants";
import useCustomNavigation from "@/hooks/use-navigation";
import classNames from "classnames";

type GoBackProps = {
	className?: string;
	action?: () => void;
	icon?: string;
	text?: string;
};
export default function GoBack(props: GoBackProps) {
	const { navigate } = useCustomNavigation();

	const goBack = () => {
		if (props.action) return props.action();
		navigate(-1);
	};

	const cn = classNames("flex justify-center items-center gap-2 hover:scale-105 hover:underline transition", props.className);

	return (
		<button onClick={goBack} className={cn}>
			<img src={props.icon ?? assets.arrow_left_01} alt="back icon" />
			<span>{props.text ?? "Back"}</span>
		</button>
	);
}
