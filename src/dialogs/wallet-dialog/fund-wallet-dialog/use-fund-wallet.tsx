import getAccountWallets from "@/services/wallet/get-account-wallets";
import useActions from "@/store/actions";
import { useAppSelector } from "@/store/hooks";
import * as React from "react";
import { useQuery } from "react-query";
import { toast } from "sonner";

export default function useFundWallet() {
	const { currency } = useAppSelector((state) => state.account);
	const { dialog } = useAppSelector((state) => state.ui);
	const [copied, setCopied] = React.useState(false);
	const [confirming, setConfirming] = React.useState(false);
	const { ui } = useActions();

	const code = currency.code;

	const copiedRef = React.useRef<HTMLDivElement>(null);

	const query = useQuery(["account-wallets", code], () => getAccountWallets({ currency: code }));

	const toggleShow = (val: boolean) => {
		ui.changeDialog({ show: val, type: "", id: "" });
	};

	const open = React.useMemo(() => {
		return dialog.show && dialog.type === "fund_wallet";
	}, [dialog.show, dialog.type]);

	React.useMemo(() => {
		if (!copied) return;
		setTimeout(() => {
			setCopied(false);
		}, 3000);
	}, [copied]);

	const scrollIntoView = () => {
		if (copiedRef.current) {
			copiedRef.current.scrollIntoView({
				behavior: "smooth",
				block: "end",
			});
		}
	};

	const copy = async (text: string) => {
		try {
			await navigator.clipboard.writeText(text);
			setCopied(true);
			scrollIntoView();
		} catch (err) {
			toast.error("Failed to copy text");
			console.error("Failed to copy text:", err);
		}
	};

	// const showReceipt = () => {
	// 	toggleShow(false);
	// 	ui.changeDialog({
	// 		type: "funding_receipt",
	// 		id: "",
	// 		show: true,
	// 	});
	// };

	const confirm = async () => {
		setConfirming(true);
		toggleShow(false);
		toast.info("Confirming Payment, Amount would reflect on wallet once confirmed", {
			duration: 10000,
			closeButton: true,
        });
		setConfirming(false);
        
	};

	return {
		...query,
		open,
		copied,
		copiedRef,
		confirming,
		copy,
		toggleShow,
		confirm,
	};
}
