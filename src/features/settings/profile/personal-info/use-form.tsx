import ensureError from "@/lib/ensure-error";
import updateUser from "@/services/account/update-user";
import useActions from "@/store/actions";
import { useAppSelector } from "@/store/hooks";
import * as React from "react";
import { toast } from "sonner";
import { z } from "zod";


const validation = z.object({
  first_name: z
    .string({ message: "First Name is Required" })
    .trim()
    .min(3, "First name must be at least 3 characters long"),
  last_name: z
    .string({ message: "Last name is Required" })
    .trim()
    .min(3, "Last name must be at least 3 characters long"),
  middle_name: z
    .string()
    .trim()
    .min(3, "First name must be at least 3 characters long")
    .optional(),
  phone_number: z.string().trim().min(5, "Enter a valid Phone number"),
  username: z
    .string({ message: "Username is Required" })
    .trim()
    .min(3, "Username must be at least 3 characters long"),
  date_of_birth: z.string({ message: "date must be a valid date" }),
  gender: z.string().trim().min(4, "Gender is required"),
  address: z.string().trim().optional(),
  // occupation: z.string().trim().min(1, "occupation is required"),
  // income_level: z.string().trim().optional(),
});

type FormData = z.infer<typeof validation>;

export default function useForm() {
  const { account } = useAppSelector((state) => state.account);
  const init: FormData & { email: string; referral_code: string } = {
    first_name: account.user_profile?.first_name ?? "",
    last_name: account.user_profile?.last_name ?? "",
    middle_name: account.user_profile?.middle_name ?? "",
    phone_number: account.phone_number ?? "",
    username: account.username ?? "",
    gender: account.user_profile?.gender ?? "",
    address: account.user_profile?.residential_address??"",
    date_of_birth: account.user_profile?.date_of_birth ?? "",
    // occupation: "",
    // income_level: "",
    email: account.email,
    referral_code: account.user_profile?.referral_code ?? "",
  };

  const [formData, setFormData] = React.useState(init);
  const [isLoading, setIsLoading] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState("");
  const [edit, setEdit] = React.useState(false);
  const { account: accountActions } = useActions();

  const reset = () => {
    if (isLoading) return;
    setFormData(init);
    setEdit(false);
  };

  const editForm = () => {
    setEdit(true);
  };

  const updateForm = (
    name: keyof typeof formData,
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> | string,
  ) => {
    if (typeof e === "string") {
      return setFormData((prev) => ({
        ...prev,
        [name]: e,
      }));
    }

    return setFormData((prev) => ({
      ...prev,
      [name]: e.target.value,
    }));
  };

  const submit = async () => {
    setIsLoading(true);

    try {
      const formValues = validation.parse(formData);

      const response = await updateUser({
        ...formValues,
        user_tag: formValues.username,
      });
      
      accountActions.updateAccount({
        ...account,
        ...response,
      });
      toast.success("Account Updated successfully");
      setEdit(false);
    } catch (e) {
      const errMsg = ensureError(e).message;
      toast.error(errMsg);
      setErrorMsg(errMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    edit,
    isLoading,
    formData,
    errorMsg,
    editForm,
    reset,
    updateForm,
    submit,
  };
}
