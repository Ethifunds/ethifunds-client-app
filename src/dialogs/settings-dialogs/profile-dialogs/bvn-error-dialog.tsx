import ErrorPrompt from "@/components/prompts/error-prompt";
import { PopupModal } from "@/components/ui/modal";
import useActions from "@/store/actions";
import { useAppSelector } from "@/store/hooks";
import * as React from "react";

export default React.memo(function BvnErrorDialog() {
	const { dialog } = useAppSelector((state) => state.ui);
	const { ui } = useActions();

	const open = React.useMemo(() => {
		return dialog.show && dialog.type === "verify_bvn_failed";
	}, [dialog.type, dialog.show]);

	const close = () => {
		ui.changeDialog({ show: false, type: "" });
	};

	return (
		<PopupModal
			handleClose={close}
			open={open}
			className="relative w-full lg:w-1/3 rounded-xl lg:rounded-3xl bg-white shadow-lg border px-4 py-8 lg:px-8 lg:py-5 p-8"
		>
			<ErrorPrompt
				title="Error!!!"
				subtitle="Verification failed, please try again. If you have further questions please contact our customer support."
				btnText="Try again"
				action={close}
			/>
		</PopupModal>
	);
});
