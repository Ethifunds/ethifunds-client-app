import AppButton from "@/components/app-button";
import Render from "@/components/render";
import AppDrawer from "@/components/ui/app-drawer";
import * as React from "react";
import AccountCard from "./account-card";
import useFundWallet from "./use-fund-wallet";
import FundingReceiptDialog from "./funding-receipt.dialog";
import ErrorBoundary from "@/components/error-boundary";

export default React.memo(function FundWalletDialog() {
	const {
		isFetching,
		isError,
		error,
		data,
		open,
		copied,
		copiedRef,
		confirming,
		copy,
		toggleShow,
		confirm,
	} = useFundWallet();

	return (
		<React.Fragment>
			<ErrorBoundary>
				<AppDrawer
					title="Fund Wallet"
					open={open}
					direction="right"
					handleChange={toggleShow}
					className=""
				>
					<div className="pt-10 h-screen overflow-auto hide-scrollbar">
						<h1 className="content-standard text-neutral-500 px-3">
							Kindly fund your wallet by making a transfer to any of the bank accounts provided.
						</h1>
						<div className="flex flex-col gap-20 py-10">
							<Render isLoading={isFetching} isError={isError} error={error}>
								<div className="flex flex-col gap-10 grow p-3">
									{data?.map((item) => (
										<AccountCard key={item.id} {...item} copy={copy} />
									))}
								</div>
								<div ref={copiedRef} className="flex flex-col gap-10 p-3">
									{copied && (
										<div className="button-ghost bg-neutral-100 mx-3 hover:!bg-opacity-100 cursor-default">
											<p>Copied to clipboard</p>
										</div>
									)}
									<AppButton
										onClick={confirm}
										isLoading={confirming}
										variant="primary"
										className="highlight-accent w-full text-neutral-base_white"
										disabled={confirming}
									>
										I have made the transfer
									</AppButton>
								</div>
							</Render>
						</div>
					</div>
				</AppDrawer>
				<FundingReceiptDialog />
			</ErrorBoundary>
		</React.Fragment>
	);
});
