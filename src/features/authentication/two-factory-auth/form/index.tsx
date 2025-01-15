import PinInput from "@/components/ui/form-input/otp-input";
import useForm from "./use-form";
import Button from "@/components/ui/button";

export default function Form() {
	const { isLoading, formData, updateForm, submit } = useForm();

	return (
		<form
			className="flex flex-col gap-4 rounded-xl lg:rounded-3xl bg-white shadow border px-4 py-8 lg:px-12 lg:py-5 lg:w-full"
			onSubmit={submit}
		>
			<div className="text-center space-y-5">
				<h1 className="feature-accent text-neutral-base_black">Authentication Code</h1>

				<PinInput
					value={formData.token}
					valueLength={6}
					onChange={(e) => updateForm(e)}
					inputClass="!size-12 bg-neutral-200 border-white"
				/>
			</div>

			<div className="text-center pt-5">
				<Button
					type="submit"
					isLoading={isLoading}
					variant="primary"
					className="text-white w-full lg:w-3/4 rounded-xl content-accent"
					disabled={isLoading}
				>
					Verify
				</Button>
			</div>
		</form>
	);
}
