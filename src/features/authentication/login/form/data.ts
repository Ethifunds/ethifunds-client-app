import { FORM_FIELDS } from "@/components/ui/form-input/form.types";

export const formFields: FORM_FIELDS[] = [
	{
		name: "email",
		type: "email",
		label: "email/username",
		placeholder: "Enter Email or Username",
		required: true,
	},

	{
		name: "password",
		type: "password",
		label: "password",
		placeholder: "Enter Password",
		required: true,
	},
];
