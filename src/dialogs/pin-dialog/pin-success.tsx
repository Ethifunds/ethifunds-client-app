import AppButton from "@/components/app-button";
import { TabsContent } from "@/components/ui/tabs";
import { assets } from "@/constants";

type PinSuccessProps = {
	dismiss(): void;
};
export default function PinSuccess(props: PinSuccessProps) {
	return (
		<TabsContent value="pin_success" className="flex flex-col items-center justify-center gap-3">
			<img src={assets.success_badge_01} alt="success-icon" />

			<div className="text-center">
				<h1 className="feature-accent text-neutral-1000">Congratulations!!!</h1>
				<small className="caption-standard text-neutral-500">
					Your transaction pin has been set successfully.{" "}
				</small>
			</div>
			<div className="w-full text-center pt-5">
				<AppButton
					onClick={props.dismiss}
					variant="primary"
					className="text-white w-full rounded-xl !py-3 content-accent"
				>
					Dismiss
				</AppButton>
			</div>
		</TabsContent>
	);
}
