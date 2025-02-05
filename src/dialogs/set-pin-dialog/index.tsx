import * as React from "react";
import { PopupModal } from "@/components/ui/modal";
import { X } from "lucide-react";
import { Tabs } from "@/components/ui/tabs";
import SetPin from "./set-pin";
import ConfirmPin from "./confirm-pin";
import usePin from "./use-pin";
import PinSuccess from "./pin-success";
import ErrorBoundary from "@/components/error-boundary";

export type PinProps = {
	value: string;
	updateForm(value: string, name: string): void;
	isLoading?: boolean;
	submit(): void;
	errMsg?: string;
};

export default React.memo(function SetPinDialog() {
	const { open, errMsg, formData, activeTab, isLoading, close, submit, changeTab, updateForm } =
		usePin();

	return (
		<PopupModal
			handleClose={close}
			open={open}
			className="relative w-full lg:!w-auto rounded-xl lg:rounded-3xl bg-white shadow-lg border px-4 py-8 lg:px-8 lg:py-5 p-8"
		>
			<ErrorBoundary>
				<button
					onClick={close}
					className="absolute top-0 right-0 lg:-top-8 lg:-right-8 flex items-center justify-center size-8 p-2 rounded-full bg-white"
				>
					<X color="#908b8b" />
				</button>

				<Tabs defaultValue="set_pin" onValueChange={changeTab} value={activeTab}>
					<SetPin
						value={formData.pin}
						updateForm={updateForm}
						submit={() => changeTab("confirm_pin")}
					/>
					<ConfirmPin
						value={formData.confirm_pin}
						errMsg={errMsg}
						isLoading={isLoading}
						updateForm={updateForm}
						submit={submit}
					/>

					<PinSuccess dismiss={close} />
				</Tabs>
			</ErrorBoundary>
		</PopupModal>
	);
});
