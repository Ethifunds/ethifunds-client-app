import getTransactionDetails from "@/services/wallet/get-transaction-details";
import { useAppSelector } from "@/store/hooks";
import * as React from "react";
import { useQuery } from "react-query";

import useActions from "@/store/actions";
import { PopupModal } from "@/components/ui/modal";
import { X } from "lucide-react";
import Render from "@/components/render";
import { amountSeparator } from "@/lib/amount-separator";
import ErrorBoundary from "@/components/error-boundary";

export default React.memo(function VaultTransactionDetailsDialog() {
	const { currency } = useAppSelector((state) => state.account);
	const { dialog } = useAppSelector((state) => state.ui);
	const id = dialog.id;

	const { ui } = useActions();
	const { isFetching, isError, error, data } = useQuery(
		["vault-transaction-id", id],
		() =>
			getTransactionDetails({
				id,
				currency: currency.code,
			}),
		{
			enabled: dialog.type === "vault_transaction_details",
		}
	);

	const toggleShow = (val: boolean) => {
		ui.changeDialog({ show: val, type: "", id: "" });
	};

	const open = React.useMemo(() => {
		return dialog.show && dialog.type === "vault_transaction_details";
	}, [dialog.show, dialog.type]);

	const close = () => {
		toggleShow(false);
	};

	const details = React.useMemo(() => {
		return {
			session_ID: data?.transaction_reference || "",
			date: new Date(data?.created_at ?? "").toLocaleDateString("en-us", {
				dateStyle: "full",
			}),
			transaction_type: data?.transaction_type || "",
			amount: `${currency.sign} ${amountSeparator(data?.amount ?? "")}`,
			status: data?.status || "",
		};
	}, [data, currency.sign]);

	return (
		<PopupModal handleClose={close} open={open} className="relative w-full lg:w-1/2 h-96 p-8">
			<ErrorBoundary>
				<Render isLoading={isFetching} isError={isError} error={error}>
					<button
						onClick={close}
						className="absolute top-0 right-0 lg:-top-8 lg:-right-8 flex items-center justify-center size-8 p-2 rounded-full bg-white"
					>
						<X color="#908b8b" />
					</button>
					<div className="flex flex-col gap-10">
						<h1 className="highlight-standard text-neutral-1000">Transaction Details</h1>

						<div className="space-y-5">
							{Object.entries(details).map(([key, value]) => {
								return (
									<div
										key={key}
										className="flex justify-between capitalize text-neutral-700 caption-standard"
									>
										<span className="w-full">{key.replace("_", " ")} </span>
										<span className="w-full">{value}</span>
									</div>
								);
							})}
						</div>
					</div>
				</Render>
			</ErrorBoundary>
		</PopupModal>
	);
});
