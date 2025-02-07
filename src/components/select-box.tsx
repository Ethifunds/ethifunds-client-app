import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import * as React from "react";
import classnames from "classnames";

type SelectItem = {
	value: string;
	title: string;
};

type SelectBoxProps = {
	className?: string;
	containerStyle?: string;
	label?: string;
	options?: SelectItem[];
	value?: string;
	onchange?: (item: string) => void;
	disabled?: boolean;
	placeholder?: string;
	name?: string;
	required?: boolean;
};

export default React.memo(function SelectBox(props: SelectBoxProps) {
	const { options = [], required = false, disabled = false } = props;

	const container = classnames(props.containerStyle);

	const selectContainer = classnames("shadow-none capitalize", props.className);

	const change = (val: string) => {
		if (props.onchange) {
			props.onchange(val);
		}
	};
	return (
		<div className={container}>
			{props.label && (
				<label htmlFor={props.name} className="capitalize">
					{props.label}
				</label>
			)}
			<Select
				value={props.value}
				onValueChange={change}
				name={props.name}
				disabled={disabled}
				required={required}
			>
				<SelectTrigger className={selectContainer}>
					<SelectValue placeholder={props.placeholder ?? "Select an item"} />
				</SelectTrigger>
				<SelectContent position="popper" side="bottom">
					{options.map((item, idx) => (
						<SelectItem value={item.value} key={idx} className="capitalize">
							{item.title}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</div>
	);
});
