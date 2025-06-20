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
    <ErrorBoundary>
      <TabsContent value="preview">
        <PopupModal
          handleClose={props.close}
          open={props.open}
          className="relative w-full py-8 lg:w-2/5"
        >
          <ErrorBoundary>
            <button
              onClick={props.close}
              className="absolute right-0 top-0 flex size-8 items-center justify-center rounded-full bg-white p-2 lg:-right-8 lg:-top-8"
            >
              <X color="#908b8b" />
            </button>
            <div className="flex flex-col gap-8">
              <h1 className="highlight-standard text-neutral-1000">Preview</h1>
              <div className="flex items-center gap-3 rounded-lg bg-[#FFECE7] px-1 py-2 text-neutral-1000">
                <img src={assets.alert_icon_01} alt="alert-icon" />
                <p className="caption-standard">
                  Note that the total amount will be withdrawn from your
                  investment Vault and credited to your Ethifunds wallet
                </p>
              </div>
              <div className="space-y-5">
                {Object.entries(details).map(([key, value]) => {
                  return (
                    <div
                      key={key}
                      className="caption-standard flex justify-between capitalize text-neutral-700"
                    >
                      <span className="w-full">{key.replace("_", " ")} </span>
                      <span className="w-full">{value}</span>
                    </div>
                  );
                })}
              </div>
              <AppButton
                onClick={props.proceed}
                variant="primary"
                className="text-white"
              >
                Proceed
              </AppButton>
            </div>
          </ErrorBoundary>
        </PopupModal>
      </TabsContent>
    </ErrorBoundary>
  );
});
