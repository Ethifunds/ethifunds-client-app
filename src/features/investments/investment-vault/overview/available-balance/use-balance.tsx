import useExtras from "@/hooks/use-extras";
import useActions from "@/store/actions";

export default function useBalance() {
	const { sign, currency, changeCurrency } = useExtras();
	const { ui } = useActions();

	const fundWallet = () => {
		ui.changeDialog({
			type: "fund_vault",
			id: "",
			show: true,
		});
	};

	const withdrawal = () => {
		ui.changeDialog({
			type: "vault_withdrawal",
			id: "",
			show: true,
		});
	};

	return {
		currency,
		sign,
		changeCurrency,
		fundWallet,
		withdrawal,
	};
}
