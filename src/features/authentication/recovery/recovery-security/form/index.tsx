import { Input } from "@/components/ui/form-input";
import useForm from "./use-form";
import Button from "@/components/app-button";
import Render from "@/components/render";
import ErrorBoundary from "@/components/error-boundary";

export default function Form() {
	const {
		isFetching,
		isError,
		error,
		formData,
		verifying,
		securityQuestions,
		invalidAnswers,
		updateForm,
		submit,
	} = useForm();

	return (
		<ErrorBoundary>
			<form
				className="flex flex-col justify-center gap-8 rounded-xl lg:rounded-3xl bg-white shadow border px-4 py-8 lg:px-8 lg:py-6 min-h-80"
				onSubmit={submit}
			>
				<Render isLoading={isFetching} isError={isError} error={error}>
					{securityQuestions.map((item, idx) => {
						const isInvalid = invalidAnswers.find((ans) => ans.question_id === item.id);
						return (
              <Input
                key={idx}
                name={`response ${idx}`}
                type="text"
                label={item.security_question}
                placeholder="Enter Security Answer"
                value={formData[idx].answer}
                onChange={(e) => updateForm(e, idx)}
                disabled={verifying}
                overrideInvalid={isInvalid && true}
                required
              />
            );
					})}

					<div className="flex items-end pt-5  grow">
						<Button
							type="submit"
							isLoading={verifying}
							variant="primary"
							className="text-white w-full rounded-xl content-accent"
							disabled={verifying}
						>
							Continue
						</Button>
					</div>
				</Render>
			</form>
		</ErrorBoundary>
	);
}
