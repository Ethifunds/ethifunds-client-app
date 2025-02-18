import { Input } from "@/components/ui/form-input";
import useForm from "./use-form";
import Button from "@/components/app-button";
import Password from "./password";
import Spinner from "@/components/spinner";
import Terms from "./terms";

export default function Form() {
	const { isLoading, formData, isEmailValid, usernameTaken, checking, updateForm, submit } =
		useForm();

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
          overrideInvalid={usernameTaken}
          required
        />
        {
          <div className="flex justify-between">
            {usernameTaken && (
              <small className="caption-standard shake-animation text-error-200">
                Username already taken, please try a different one
              </small>
            )}
            {checking && <Spinner size="xs" load_type="spinner" />}
          </div>
        }
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
        isLoading={isLoading}
        password={formData.password}
        updateForm={updateForm}
      />

      <div>
        <Input
          name="confirm_password"
          type="text"
          label="Confirm Password"
          placeholder="Enter Password"
          value={formData.confirm_password}
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
