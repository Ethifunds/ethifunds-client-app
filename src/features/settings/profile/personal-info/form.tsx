import SelectBox from "@/components/select-box";
import { formFields } from "./data";

import useForm from "./use-form";
import { Input } from "@/components/ui/form-input";
import AppButton from "@/components/app-button";
import * as React from "react";

export default function Form() {
	const { edit, isLoading, formData, errorMsg, editForm, reset, updateForm, submit } = useForm();

	return (
		<form className="grid grid-cols-2 gap-5">
			{formFields.map((item, idx) => {
				if (item.type === "select")
					return (
						<SelectBox
							key={idx}
							{...item}
							onchange={(e) => updateForm(item.name as keyof typeof formData, e)}
							value={formData[item.name]}
							disabled={!edit || isLoading}
						/>
					);
				return (
					<Input
						key={idx}
						{...item}
						onChange={(e) => updateForm(item.name as keyof typeof formData, e.target.value)}
						value={formData[item.name]}
						disabled={!edit || isLoading}
						// readOnly={item.readOnly || }
						invalid={errorMsg.length > 0}
					/>
				);
			})}

			<div className="flex justify-between gap-5 col-span-2 [&_button]:w-1/2 text-white [&_button]:rounded-lg">
				{edit ? (
					<React.Fragment>
						<AppButton variant="mute" onClick={reset} disabled={isLoading}>
							Reset
						</AppButton>
						<AppButton
							variant="primary"
							onClick={submit}
							isLoading={isLoading}
							disabled={isLoading}
						>
							save
						</AppButton>
					</React.Fragment>
				) : (
					<AppButton variant="primary" onClick={editForm} className="flex-1" disabled={isLoading}>
						Edit
					</AppButton>
				)}
			</div>
		</form>
	);
}
