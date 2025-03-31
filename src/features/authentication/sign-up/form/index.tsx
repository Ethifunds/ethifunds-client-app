import { Input } from "@/components/ui/form-input";
import useForm from "./use-form";
import Button from "@/components/app-button";
import Terms from "./terms";
import Password from "@/components/ui/form-input/password";

export default function Form() {
  const { isLoading, formData, isEmailValid, updateForm, submit } = useForm();

  return (
    <form
      className="flex flex-col gap-4 overflow-auto rounded-xl border bg-white px-4 py-8 shadow lg:h-96 lg:rounded-3xl lg:px-8 lg:py-6 2xl:h-auto"
      onSubmit={submit}
    >
      <div className="space-y-1">
        <Input
          name="username"
          type="text"
          label="username"
          placeholder="Enter username"
          value={formData.username}
          onChange={updateForm}
          disabled={isLoading}
          required
        />
      </div>

      <div>
        <Input
          name="email"
          type="email"
          label="email"
          placeholder="Enter email"
          value={formData.email}
          onChange={updateForm}
          disabled={isLoading}
          overrideInvalid={!isEmailValid}
          required
        />

        {!isEmailValid && (
          <small className="caption-standard shake-animation text-error-200">
            Please enter a valid email address
          </small>
        )}
      </div>

      <Password
        name="password"
        label="password"
        placeholder="Enter password"
        isLoading={isLoading}
        value={formData.password}
        updateForm={updateForm}
      />

      <div>
        <Input
          name="password_confirmation"
          type="text"
          label="Confirm Password"
          placeholder="Enter Password"
          value={formData.password_confirmation}
          onChange={updateForm}
          disabled={isLoading}
          required
        />
      </div>
      <Terms />
      <div className="pt-5">
        <Button
          type="submit"
          isLoading={isLoading}
          variant="primary"
          className="content-accent w-full rounded-xl text-white"
          disabled={isLoading}
        >
          Sign up
        </Button>
      </div>
    </form>
  );
}
