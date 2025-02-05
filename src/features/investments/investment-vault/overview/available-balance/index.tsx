import * as React from "react";
import CurrencyPicker from "@/components/currency-picker";
import { amountSeparator } from "@/lib/amount-separator";
import classNames from "classnames";
import useBalance from "./use-balance";
import { InvestmentVault } from "@/types/investment-vault.types";

type AvailableBalanceProps = InvestmentVault & {};
export default React.memo(function AvailableBalance(props: AvailableBalanceProps) {
	const { currency, sign, changeCurrency, fundWallet, withdrawal } = useBalance();

	const container = classNames(
		"py-8 px-6 border rounded-lg shrink-0 lg:shrink w-full lg:w-1/2 min-h-48 lg:min-h-52"
	);
	return (
		<div className={container}>
			<div className="flex flex-col gap-6">
				<div className="flex justify-between">
					<div className="flex flex-col gap-5">
						<h1 className="content-standard text-neutral-700">Available Balance</h1>
						<h2 className="heading-4 uppercase">
							{sign} {amountSeparator(props.withdrawable_balance)}
						</h2>
					</div>

					<div>
						<CurrencyPicker currency={currency} setCurrency={changeCurrency} />
					</div>
				</div>
				<div className="flex justify-end grow gap-5">
					<button
						onClick={fundWallet}
						className="button-primary  lg:w-1/3 !py-2 !rounded-lg text-white"
					>
						Fund Vault
					</button>

					<button
						onClick={withdrawal}
						className="button-outline  lg:w-1/3 !py-2 !rounded-lg !border-primary text-primary"
					>
						Withdraw
					</button>
				</div>
			</div>
		</div>
	);
});
