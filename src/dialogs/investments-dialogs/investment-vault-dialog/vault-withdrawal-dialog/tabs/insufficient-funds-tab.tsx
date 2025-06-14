import AppButton from "@/components/app-button";
import ErrorBoundary from "@/components/error-boundary";
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
    <ErrorBoundary>
      <TabsContent
        value="insufficient_funds"
        className="flex flex-col items-center justify-center gap-3"
      >
        <PopupModal
          handleClose={props.dismiss}
          open={props.open}
          className="relative flex w-full flex-col items-center lg:w-1/4"
        >
          <button
            onClick={props.dismiss}
            className="absolute right-0 top-0 flex size-8 items-center justify-center rounded-full bg-white p-2 lg:-right-8 lg:-top-8"
          >
            <X color="#908b8b" />
          </button>
          <img src={assets.safe_box_01} alt="success-icon" />

          <div className="text-center">
            <h1 className="feature-accent text-neutral-1000">
              Insufficient Balance
            </h1>
            <small className="caption-standard text-neutral-500">
              Insufficient funds, please fund your vault
            </small>
          </div>
          <div className="w-full pt-5 text-center">
            <AppButton
              onClick={props.action}
              variant="mute"
              className="content-accent w-full rounded-xl !py-3 text-white"
            >
              Dismiss
            </AppButton>
          </div>
        </PopupModal>
      </TabsContent>
    </ErrorBoundary>
  );
}
