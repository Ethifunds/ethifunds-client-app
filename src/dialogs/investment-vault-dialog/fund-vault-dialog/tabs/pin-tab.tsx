import AppButton from "@/components/app-button";
import PinInput from "@/components/ui/form-input/otp-input";
import classNames from "classnames";

import { TabsContent } from "@/components/ui/tabs";
import { UpdateForm } from "../use-fund-vault";
import { PopupModal } from "@/components/ui/modal";
import ErrorBoundary from "@/components/error-boundary";
import { X } from "lucide-react";
import * as React from "react";
type PinProps = {
	open: boolean;
	value: string;
	isLoading: boolean;
	errMsg: string;
	close(): void;
	updateForm: UpdateForm;
	submit(): void;
};
export default React.memo(function PinTab(props: PinProps) {
	const inputClass = classNames("!size-14 bg-neutral-200 border-white", {
		"!border-error-200 border-2 shake-animation !bg-white": props.errMsg && props.errMsg.length > 0,
	});

	const submit = (e: React.FormEvent) => {
		e.preventDefault();
		props.submit();
	};
	return (
		<ErrorBoundary>
			<TabsContent value="pin">
				<ErrorBoundary>
					<PopupModal
						handleClose={props.close}
						open={props.open}
						className="relative w-full lg:w-1/4 h-60 lg:h-auto py-8"
					>
						<button
							onClick={props.close}
							className="absolute top-0 right-0 lg:-top-8 lg:-right-8 flex items-center justify-center size-8 p-2 rounded-full bg-white"
						>
							<X color="#908b8b" />
						</button>
						<h1 className="highlight-bold text-neutral-700 text-center">Enter Transaction Pin</h1>
						<form onSubmit={submit}>
							<div className="text-center space-y-2">
								<small className="caption-standard text-neutral-500">
									Enter your transaction pin to initiate this transaction
								</small>
								<PinInput
									value={props.value}
									valueLength={4}
									onChange={(e) => props.updateForm("pin", e)}
									inputClass={inputClass}
								/>
							</div>

							<div className="text-center pt-5">
								<AppButton
									type="submit"
									isLoading={props.isLoading}
									variant="primary"
									className="text-white w-full rounded-xl py-4 content-accent"
									disabled={props.isLoading}
								>
									Proceed
								</AppButton>
							</div>
						</form>
					</PopupModal>
				</ErrorBoundary>
			</TabsContent>
		</ErrorBoundary>
	);
});
