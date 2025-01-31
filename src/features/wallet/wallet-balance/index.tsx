import * as React from "react";
import useWalletBalance from "./use-wallet-balance";
import Render from "@/components/render";
import CurrencyPicker from "@/components/currency-picker";
import { amountSeparator } from "@/lib/amount-separator";
import classNames from "classnames";

export default React.memo(function WalletBalance() {
	const {
		isFetching,
		isError,
		error,
		balance,
		currency,
		sign,
		changeCurrency,
		fundWallet,
		withdrawal,
	} = useWalletBalance();

	const container = classNames(
		"py-8 px-6 border rounded-lg shrink-0 lg:shrink w-full lg:w-1/2 min-h-48 lg:min-h-52"
	);
	return (
		<div className="flex gap-10 py-3 lg:py-0 overflow-auto lg:overflow-hidden lg:max-w-5xl">
			<div className={container}>
				<Render isLoading={isFetching} isError={isError} error={error}>
					<div className="flex flex-col gap-6">
						<div className="flex justify-between">
							<div className="flex flex-col gap-5">
								<h1 className="content-standard text-neutral-700">Wallet Balance</h1>
								<h2 className="heading-4 uppercase">
									{sign} {amountSeparator(balance.wallet)}
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
								Fund Wallet
							</button>

							<button
								onClick={withdrawal}
								className="button-outline  lg:w-1/3 !py-2 !rounded-lg !border-primary text-primary"
							>
								Withdraw
							</button>
						</div>
					</div>
				</Render>
			</div>

			<div className={container}>
				<Render isLoading={isFetching} isError={isError} error={error}>
					<div className="flex flex-col gap-6">
						<div className="flex justify-between">
							<div className="flex flex-col gap-5">
								<h1 className="content-standard text-neutral-700">Investment Balance</h1>
								<h2 className="heading-4 uppercase">
									{sign} {amountSeparator(balance.investment)}
								</h2>
							</div>

							<div>
								<CurrencyPicker currency={currency} setCurrency={changeCurrency} />
							</div>
						</div>
					</div>
				</Render>
			</div>
		</div>
	);
});
