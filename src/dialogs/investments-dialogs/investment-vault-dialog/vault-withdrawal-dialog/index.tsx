import * as React from "react";
import useVaultWithdrawal from "./use-vault-withdrawal";
import { Tabs } from "@/components/ui/tabs";
import VaultWithdrawalTab from "./tabs/vault-withdrawal-tab";
import PreviewTab from "./tabs/preview-tab";
import PinTab from "./tabs/pin-tab";
import SuccessTab from "./tabs/success-tab";
import InsufficientFundsTab from "./tabs/insufficient-funds-tab";
import ErrorBoundary from "@/components/error-boundary";
import { amountSeparator } from "@/lib/amount-separator";

export default React.memo(function VaultWithdrawalDialog() {
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
		proceedToFundVault,
	} = useVaultWithdrawal();

	return (
		<ErrorBoundary>
			<Tabs defaultValue="vault_withdrawal" value={activeTab}>
				<VaultWithdrawalTab
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

				<SuccessTab open={activeTab === "success"} dismiss={close} amount={`${sign} ${amountSeparator(formData.amount)}`} />
				<InsufficientFundsTab
					open={activeTab === "insufficient_funds"}
					dismiss={close}
					action={proceedToFundVault}
				/>
			</Tabs>
		</ErrorBoundary>
	);
});
