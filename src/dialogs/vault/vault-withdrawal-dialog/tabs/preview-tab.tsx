import AppButton from "@/components/app-button";
import ErrorBoundary from "@/components/error-boundary";
import { PopupModal } from "@/components/ui/modal";
import { assets } from "@/constants";
import { amountSeparator } from "@/lib/amount-separator";
import { TabsContent } from "@radix-ui/react-tabs";
import { X } from "lucide-react";
import * as React from "react";

type TabProps = {
	open: boolean;
	amount: string;
	sign: string;
	close(): void;
	proceed(): void;
};
export default React.memo(function PreviewTab(props: TabProps) {
	const details = {
		date: new Date().toLocaleDateString("en-us", {
			dateStyle: "full",
		}),
		investment_type: "Investment Vault",
		transfer_amount: (
			<b>
				{props.sign} {amountSeparator(props.amount)}
			</b>
		),
	};

	return (
		<TabsContent value="preview">
			<PopupModal
				handleClose={props.close}
				open={props.open}
				className="relative w-full lg:w-2/5 py-8"
			>
				<ErrorBoundary>
					<button
						onClick={props.close}
						className="absolute top-0 right-0 lg:-top-8 lg:-right-8 flex items-center justify-center size-8 p-2 rounded-full bg-white"
					>
						<X color="#908b8b" />
					</button>
					<div className="flex flex-col gap-8">
						<h1 className="highlight-standard text-neutral-1000">Preview</h1>
						<div className="flex items-center gap-3 py-2 px-1 bg-[#FFECE7] text-neutral-1000 rounded-lg">
							<img src={assets.alert_icon_01} alt="alert-icon" />
							<p className="caption-standard">
								Note that the total amount will be withdrawn from your investment Vault and credited
								to your account wallet to your
							</p>
						</div>
						<div className="space-y-5">
							{Object.entries(details).map(([key, value]) => {
								return (
									<div
										key={key}
										className="flex justify-between capitalize text-neutral-700 caption-standard"
									>
										<span className="w-full">{key.replace("_", " ")} </span>
										<span className="w-full">{value}</span>
									</div>
								);
							})}
						</div>
						<AppButton onClick={props.proceed} variant="primary" className="text-white">
							Proceed
						</AppButton>
					</div>
				</ErrorBoundary>
			</PopupModal>
		</TabsContent>
	);
});
