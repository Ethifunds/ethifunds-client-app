import { Input } from "@/components/ui/form-input";
import useForm from "./use-form";
import AppButton from "@/components/app-button";
import Password from "@/components/ui/form-input/password";

export default function Form() {
  const { isLoading, errorMsg, formData, updateForm, submit } = useForm();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        submit();
      }}
      className="flex flex-col gap-4 lg:w-1/2"
    >
      {errorMsg && <p className="error-message">{errorMsg}</p>}
      <Input
        name="current_password"
        label="Current Password"
        type="password"
        placeholder="Enter current password"
        value={formData.current_password}
        onChange={updateForm}
        disabled={isLoading}
        required
      />

      <Password
        name="new_password"
        label="New Password"
        placeholder="Enter New password"
        value={formData.new_password}
        updateForm={updateForm}
        isLoading={isLoading}
      />
      <Input
        name="confirm_password"
        label="Confirm New Password"
        type="password"
        placeholder="Enter Password "
        value={formData.confirm_password}
        onChange={updateForm}
        disabled={isLoading}
        required
      />

      <AppButton
        type="submit"
        variant="primary"
        className="rounded-lg"
        isLoading={isLoading}
      >
        Save
      </AppButton>
    </form>
  );
}
