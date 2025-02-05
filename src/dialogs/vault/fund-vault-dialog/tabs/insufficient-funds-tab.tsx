import AppButton from "@/components/app-button";
import { PopupModal } from "@/components/ui/modal";
import { TabsContent } from "@/components/ui/tabs";
import { assets } from "@/constants";
import { X } from "lucide-react";

type TabProps = {
	dismiss(): void;
	action(): void;
	open: boolean;
};
export default function InsufficientFundsTab(props: TabProps) {
	return (
		<TabsContent
			value="insufficient_funds"
			className="flex flex-col items-center justify-center gap-3"
		>
			<PopupModal
				handleClose={props.dismiss}
				open={props.open}
				className="relative flex flex-col items-center w-full lg:w-1/4"
			>
				<button
					onClick={props.dismiss}
					className="absolute top-0 right-0 lg:-top-8 lg:-right-8 flex items-center justify-center size-8 p-2 rounded-full bg-white"
				>
					<X color="#908b8b" />
				</button>
				<img src={assets.safe_box_01} alt="success-icon" />

				<div className="text-center">
					<h1 className="feature-accent text-neutral-1000">Insufficient Balance</h1>
					<small className="caption-standard text-neutral-500">
						Insufficient funds, please fund your wallet
					</small>
				</div>
				<div className="w-full text-center pt-5">
					<AppButton
						onClick={props.action}
						variant="primary"
						className="text-white w-full rounded-xl !py-3 content-accent"
					>
						Fund your wallet
					</AppButton>
				</div>
			</PopupModal>
		</TabsContent>
	);
}
