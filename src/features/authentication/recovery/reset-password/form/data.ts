import { FORM_FIELDS } from "@/components/ui/form-input/form.types";

export const formFields: FORM_FIELDS[] = [
	{
		name: "username",
		type: "text",
		label: "username",
		placeholder: "Enter Username",
		required: true,
	},
	{
		name: "email",
		type: "email",
		label: "email",
		placeholder: "Enter Email",
		required: true,
	},

	{
		name: "password",
		type: "password",
		label: "password",
		placeholder: "Enter Password",
		required: true,
	},

	{
		name: "confirmPassword",
		type: "password",
		label: "Confirm Password",
		placeholder: "Enter Password",
		required: true,
	},
];
