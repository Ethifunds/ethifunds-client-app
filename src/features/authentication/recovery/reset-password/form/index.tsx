import { Input } from "@/components/ui/form-input";
import useForm from "./use-form";
import Button from "@/components/app-button";
import Password from "@/components/ui/form-input/password";

export default function Form() {
  const { isLoading, formData, updateForm, submit } = useForm();

  return (
    <form
      className="flex flex-col gap-4 overflow-auto rounded-xl border bg-white px-4 py-8 shadow lg:rounded-3xl lg:px-8 lg:py-6 2xl:h-auto"
      onSubmit={submit}
    >
      <Password
        name="password"
        label="New password"
        placeholder="Enter password"
        isLoading={isLoading}
        value={formData.password}
        updateForm={updateForm}
      />

      <Input
        name="password_confirmation"
        type="password"
        label="Confirm Password"
        placeholder="Enter Password"
        value={formData.password_confirmation}
        onChange={updateForm}
        disabled={isLoading}
        required
      />

      <div className="pt-5">
        <Button
          type="submit"
          isLoading={isLoading}
          variant="primary"
          className="content-accent w-full rounded-xl text-white"
          disabled={isLoading}
        >
          Reset Password
        </Button>
      </div>
    </form>
  );
}
