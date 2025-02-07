import SuccessBox from "@/components/prompts/success-box";
import { PopupModal } from "@/components/ui/modal";
import useActions from "@/store/actions";
import { useAppSelector } from "@/store/hooks";
import * as React from "react";

export default React.memo(function BvnSuccessDialog() {
	const { dialog } = useAppSelector((state) => state.ui);
	const { ui } = useActions();

	const open = React.useMemo(() => {
		return dialog.show && dialog.type === "verify_bvn_success";
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
			<SuccessBox
				title="Congratulations!!!"
				subtitle="Your BVN has been verified successfully kindly proceed to update your personal
						information."
				btnText="Dismiss"
				action={close}
			/>
		</PopupModal>
	);
});
