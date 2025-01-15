import { Input } from "@/components/ui/form-input";
import useForm from "./use-form";
import Button from "@/components/ui/button";
import Password from "./password";

export default function Form() {
	const { isLoading, formData, updateForm, submit } = useForm();

	return (
		<form
			className="flex flex-col gap-4 rounded-xl lg:rounded-3xl bg-white shadow border px-4 py-8 lg:px-8 lg:py-6 overflow-auto 2xl:h-auto"
			onSubmit={submit}
		>
			<Password isLoading={isLoading} password={formData.password} updateForm={updateForm} />

			<Input
				name="confirm_password"
				type="password"
				label="Confirm Password"
				placeholder="Enter Password"
				value={formData.confirm_password}
				onChange={updateForm}
				disabled={isLoading}
				required
			/>

			<div className="pt-5">
				<Button
					type="submit"
					isLoading={isLoading}
					variant="primary"
					className="text-white w-full rounded-xl content-accent"
					disabled={isLoading}
				>
					Reset Password
				</Button>
			</div>
		</form>
	);
}
