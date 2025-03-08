import AppButton from "@/components/app-button";
import ErrorBoundary from "@/components/error-boundary";
import { PopupModal } from "@/components/ui/modal";
import { TabsContent } from "@/components/ui/tabs";
import { assets } from "@/constants";

type TabProps = {
  dismiss(): void;
  open: boolean;
  amount: string;
};
export default function SuccessTab(props: TabProps) {
  return (
    <ErrorBoundary>
      <TabsContent
        value="success"
        className="flex flex-col items-center justify-center gap-3"
      >
        <PopupModal
          handleClose={props.dismiss}
          open={props.open}
          className="relative flex w-full flex-col items-center space-y-5 py-8 lg:w-1/3"
        >
          <img src={assets.success_badge_01} alt="success-icon" />

          <div className="text-center">
            <h1 className="feature-accent text-neutral-1000">
              Withdrawal Successful
            </h1>
            <small className="caption-standard text-neutral-500">
              <strong>{props.amount}</strong> has been transferred from your Investment
              Vault to your Ethifunds Wallet.
            </small>
          </div>
          <div className="w-full pt-5 text-center">
            <AppButton
              onClick={props.dismiss}
              variant="primary"
              className="content-accent w-3/4 rounded-xl py-4 text-white"
            >
              Dismiss
            </AppButton>
          </div>
        </PopupModal>
      </TabsContent>
    </ErrorBoundary>
  );
}
