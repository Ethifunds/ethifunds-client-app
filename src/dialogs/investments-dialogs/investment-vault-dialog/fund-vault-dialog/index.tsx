import * as React from "react";
import useFundVault from "./use-fund-vault";
import { Tabs } from "@/components/ui/tabs";

import FundVaultTab from "./tabs/fund-vault-tab";
import PreviewTab from "./tabs/preview-tab";
import PinTab from "./tabs/pin-tab";
import SuccessTab from "./tabs/success-tab";
import InsufficientFundsTab from "./tabs/insufficient-funds-tab";
import ErrorBoundary from "@/components/error-boundary";

export default React.memo(function FundVaultDialog() {
	const {
		openDrawer,
		sign,
		formData,
		isLoading,
		activeAmount,
		errMsg,
		activeTab,
		updateForm,
		setAmount,
		toggleDrawer,
		proceedToPin,
		proceedToPreview,
		close,
		submit,
		proceedToFundWallet,
	} = useFundVault();

	return (
		<ErrorBoundary>
			<Tabs defaultValue="fund_vault" value={activeTab}>
				<FundVaultTab
					openDrawer={openDrawer}
					sign={sign}
					fromValue={formData}
					activeAmount={activeAmount}
					setAmount={setAmount}
					updateForm={updateForm}
					toggleDrawer={toggleDrawer}
					proceed={proceedToPreview}
				/>

				<PreviewTab
					open={activeTab === "preview"}
					amount={formData.amount.toString()}
					source={formData.funding_source}
					sign={sign}
					close={close}
					proceed={proceedToPin}
				/>

				<PinTab
					open={activeTab === "pin"}
					isLoading={isLoading}
					value={formData.pin}
					errMsg={errMsg}
					close={close}
					updateForm={updateForm}
					submit={submit}
				/>

				<SuccessTab open={activeTab === "success"} dismiss={close} />
				<InsufficientFundsTab
					open={activeTab === "insufficient_funds"}
					dismiss={close}
					action={proceedToFundWallet}
				/>
			</Tabs>
		</ErrorBoundary>
	);
});
