import AppButton from "@/components/app-button";
import AppDrawer from "@/components/ui/app-drawer";
import { Input } from "@/components/ui/form-input";
import { TabsContent } from "@/components/ui/tabs";
import * as React from "react";
import { FormKeys, UpdateForm } from "../../use-vault-withdrawal";
import { amountList } from "./data";
import { amountSeparator } from "@/lib/amount-separator";
import classNames from "classnames";
import ErrorBoundary from "@/components/error-boundary";

type TabProps = {
	openDrawer: boolean;
	sign: string;
	fromValue: { amount: number };
	setAmount(id: number): void;
	activeAmount: number;
	updateForm: UpdateForm;
	toggleDrawer(val: boolean): void;
	proceed(): void;
};
export default React.memo(function VaultWithdrawalTab(props: TabProps) {
	const updateForm = (
		name: FormKeys,
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> | string
	) => {
		if (props.updateForm) {
			if (typeof e === "string") {
				return props.updateForm(name, e);
			}
			props.updateForm(name, e.target.value);
		}
	};

	return (
		<ErrorBoundary>
			<TabsContent value="vault_withdrawal">
				<AppDrawer
					title="Withdrawal"
					open={props.openDrawer}
					direction="right"
					handleChange={props.toggleDrawer}
					className=""
				>
					<div className="flex flex-col pt-10 px-5 h-screen overflow-auto hide-scrollbar">
						<h1 className="content-standard text-neutral-500">
							Kindly add amount and select the account you would like to withdraw funds to.
						</h1>
						<div className="flex flex-col gap-5 py-10">
							<div className="space-y-3">
								<Input
									label={`Amount (${props.sign})`}
									placeholder="Enter Amount"
									inputMode="numeric"
									value={props.fromValue.amount}
									onChange={(e) => updateForm("amount", e)}
								/>
								<div className="flex gap-2 flex-wrap">
									{amountList.map((item) => {
										const cn = classNames("p-1.5 rounded bg-neutral-100 text-neutral-700", {
											"bg-primary text-white": item.id === props.activeAmount,
										});
										return (
											<button key={item.id} className={cn} onClick={() => props.setAmount(item.id)}>
												{props.sign}
												{amountSeparator(item.amount)}
											</button>
										);
									})}
								</div>
							</div>
						</div>
						<div className="flex items-end grow pb-8">
							<AppButton
								onClick={props.proceed}
								variant="primary"
								className="highlight-accent w-full text-neutral-base_white"
							>
								Proceed
							</AppButton>
						</div>
					</div>
				</AppDrawer>
			</TabsContent>
		</ErrorBoundary>
	);
});
