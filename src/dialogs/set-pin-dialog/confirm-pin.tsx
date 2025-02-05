import AppButton from "@/components/app-button";
import PinInput from "@/components/ui/form-input/otp-input";
import classNames from "classnames";
import { PinProps } from ".";
import { TabsContent } from "@/components/ui/tabs";
import ErrorBoundary from "@/components/error-boundary";

export default function ConfirmPin(props: PinProps) {
	const inputClass = classNames("!size-12 bg-neutral-200 border-white", {
		"!border-error-200 border-2 shake-animation !bg-white": props.errMsg && props.errMsg.length > 0,
	});
	return (
		<ErrorBoundary>
			<TabsContent value="confirm_pin" className="flex flex-col gap-4 ">
				<h1 className="highlight-bold text-neutral-700 text-center">Confirm Transaction Pin</h1>
				<div className="text-center space-y-2">
					<small className="caption-standard text-neutral-500">Kindly set a 4-Digit PIN </small>
					<PinInput
						value={props.value}
						valueLength={4}
						onChange={(e) => props.updateForm(e, "confirm_pin")}
						inputClass={inputClass}
					/>
				</div>

				<div className="text-center pt-5">
					<AppButton
						onClick={props.submit}
						isLoading={props.isLoading}
						variant="primary"
						className="text-white w-full rounded-xl !py-3 content-accent"
						disabled={props.isLoading}
					>
						Submit
					</AppButton>
				</div>
			</TabsContent>
		</ErrorBoundary>
	);
}
