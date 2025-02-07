import { FORM_FIELDS } from "@/components/ui/form-input/form.types";

export const formFields: FORM_FIELDS[] = [
	{
		name: "first_name",
		type: "text",
		label: "First Name",
		placeholder: "enter first name",
		required: true,
		containerStyle: "col-span-2 lg:col-span-1",
	},
	{
		name: "last_name",
		type: "text",
		label: "Last Name",
		placeholder: "Enter last name",
		required: true,
		containerStyle: "col-span-2 lg:col-span-1",
	},
	{
		name: "middle_name",
		type: "text",
		label: "Middle Name (Optional)",
		placeholder: "Enter middle name",
		required: false,
		containerStyle: "col-span-2",
	},
	{
		name: "phone_number",
		type: "tel",
		label: "Phone number",
		placeholder: "",
		containerStyle: "col-span-2",
		required: false,
		readOnly: true,
	},
	{
		name: "username",
		type: "text",
		label: "Username",
		placeholder: "enter username",
		containerStyle: "col-span-2",
		required: true,
	},
	{
		name: "email",
		type: "text",
		label: "Email",
		placeholder: "enter Email",
		containerStyle: "col-span-2",
		required: false,
		readOnly: true,
	},
	{
		name: "date_of_birth",
		type: "date",
		label: "Date of Birth",
		containerStyle: "col-span-2 [&_input]:!w-full",
		placeholder: "",
		required: true,
	},
	{
		name: "gender",
		type: "select",
		label: "gender",
		placeholder: "select Gender",
		containerStyle: "col-span-2",
		options: [
			{ title: "male", value: "male" },
			{ title: "female", value: "female" },
		],
		required: false,
		readOnly: true,
	},
	// {
	// 	name: "address",
	// 	type: "text",
	// 	label: "Address",
	// 	placeholder: "Enter address",
	// 	required: true,
	// },
	{
		name: "occupation",
		type: "text",
		label: "occupation",
		placeholder: "Enter occupation",
		containerStyle: "col-span-2",
		required: true,
	},
	{
		name: "income_level",
		type: "text",
		label: "Income Level",
		placeholder: "Enter Income Level",
		containerStyle: "col-span-2",
		required: false,
	},
	// {
	// 	name: "referred_by",
	// 	type: "text",
	// 	label: "Income Level",
	// 	placeholder: "Enter Income Level",
	//     required: false,
	//     readOnly: true
	// },
	{
		name: "referral_code",
		type: "text",
		label: "Referral Code",
		placeholder: "",
		containerStyle: "col-span-2",
		required: false,
		readOnly: true,
	},
];

// id: number;
// user_id: number;
// first_name: string;
// middle_name: string;
// last_name: string;
// date_of_birth: string;
// occupation: string;
// income_level: string;
// referral_code: string;
// gender: string;
// referred_by: number;
// user_tag: string;
// created_at: string;
// updated_at: string;
