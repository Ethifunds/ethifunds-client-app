import AppButton from "@/components/app-button";
import { PopupModal } from "@/components/ui/modal";
import { TabsContent } from "@/components/ui/tabs";
import { assets } from "@/constants";

type TabProps = {
	dismiss(): void;
	open: boolean;
};
export default function SuccessTab(props: TabProps) {
	return (
		<TabsContent value="success" className="flex flex-col items-center justify-center gap-3">
			<PopupModal
				handleClose={props.dismiss}
				open={props.open}
				className="relative flex flex-col items-center w-full lg:w-1/3 py-8 space-y-5"
			>
				<img src={assets.success_badge_01} alt="success-icon" />

				<div className="text-center">
					<h1 className="feature-accent text-neutral-1000">Transfer Successful</h1>
					<small className="caption-standard text-neutral-500">
						Your investment vault has been funded successfully.
					</small>
				</div>
				<div className="w-full text-center pt-5">
					<AppButton
						onClick={props.dismiss}
						variant="primary"
						className="text-white w-3/4 rounded-xl py-4 content-accent"
					>
						Dismiss
					</AppButton>
				</div>
			</PopupModal>
		</TabsContent>
	);
}
