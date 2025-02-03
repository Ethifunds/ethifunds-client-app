import { Input } from "@/components/ui/form-input";
import { TabsContent } from "@/components/ui/tabs";
import useAddAccount from "./use-add-account";
import Spinner from "@/components/spinner";
import SelectBank from "./select.bank";
import AppButton from "@/components/app-button";
import { BankAccount } from "@/types/bank-account.types";
import * as React from "react";

type AddAccountProps = {
	changeTab(tab: string): void;
	setAddedAccount(account: BankAccount): void;
};
export default React.memo(function AddAccount(props: AddAccountProps) {
	const { isLoading, validating, formData, submitRef, bankList, formChange, selectBank, submit } =
		useAddAccount(props.changeTab, props.setAddedAccount);

	return (
		<TabsContent value="add_account" className="h-svh lg:h-screen">
			<div className="flex flex-col px-5 mt-10 space-y-5 h-full overflow-auto">
				<h1 className="content-standard text-neutral-500">
					Add your bank account to securely withdraw funds from your Ethifunds Wallet
				</h1>
				<div className="flex flex-col gap-5">
					<Input
						name="account_number"
						inputMode="numeric"
						label={"Account Number"}
						value={formData.account_number}
						placeholder="Enter Account Number"
						onChange={formChange}
						disabled={isLoading || validating}
					/>
					<SelectBank
						value={formData.bank_code}
						changeForm={selectBank}
						bankList={bankList}
						disabled={isLoading || validating || bankList.length < 1 || !formData.account_number}
					/>
					{validating ? (
						<Spinner load_type="simple" />
					) : (
						formData.name && <Input value={formData.name} readOnly />
					)}
				</div>
				<div ref={submitRef} className="flex flex-col justify-end gap-10 grow pb-10">
					<AppButton
						onClick={submit}
						isLoading={isLoading}
						variant="primary"
						className="highlight-accent w-full text-neutral-base_white"
						disabled={isLoading || validating}
					>
						Continue
					</AppButton>
				</div>
			</div>
		</TabsContent>
	);
});
