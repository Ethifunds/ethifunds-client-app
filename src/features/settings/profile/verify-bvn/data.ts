import { FORM_FIELDS } from "@/components/ui/form-input/form.types";

export const formFields: FORM_FIELDS[] = [
  {
    name: "bvn",
    type: "text",
    label: "BVN",
    placeholder: "Enter BVN",
    required: true,
  },

  {
    name: "firstname",
    type: "text",
    label: "Firstname",
    placeholder: "Enter Firstname",
    required: true,
  },

  {
    name: "lastname",
    type: "text",
    label: "Lastname",
    placeholder: "Enter Lastname",
    required: true,
  },
];
