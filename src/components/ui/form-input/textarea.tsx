import classNames from "classnames";
import React from "react";

type TextareaNativeAttributes = React.ComponentPropsWithRef<"textarea">;

type Ref = HTMLTextAreaElement;

interface TextareaProps extends TextareaNativeAttributes {
	label?: string;
	disabled?: boolean;
	containerStyle?: string;
	invalid?: boolean;
}

const Textarea = React.forwardRef<Ref, TextareaProps>((props: TextareaProps, ref) => {
	const {
		name,

		label,
		className,
		placeholder,
		disabled,
		containerStyle,

		invalid,
		...rest
	} = props;

	const { isInvalid } = React.useMemo(() => {
		let isInvalid = false;
		const userInput = rest.value?.toString();
		if (invalid && !userInput && rest.required) {
			isInvalid = true;
		}
		return { isInvalid };
	}, [invalid, rest.value, rest.required]);

	const container = classNames("input-container", containerStyle);
	const cn = classNames(className, {
		invalid: isInvalid,
	});

	return (
		<div className={container}>
			{label && (
				<label htmlFor={name} className="capitalize ">
					{label} {rest.required && "*"}
				</label>
			)}
			<textarea
				ref={ref}
				className={cn}
				id={name}
				name={name}
				placeholder={placeholder}
				disabled={disabled}
				{...rest}
			/>
		</div>
	);
});

Textarea.defaultProps = {
	label: undefined,
	disabled: false,
	className: "",
	containerStyle: "",
	invalid: false,
};

export default Textarea;
