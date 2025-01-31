import TableCurrencyPicker from "@/components/currency-picker/table-currency-picker";
import useCurrency from "@/hooks/use-currency";
import { useAppSelector } from "@/store/hooks";
import { FilterProps } from ".";

export default function CurrencyFilter(props: FilterProps) {
	const { currency } = useAppSelector((state) => state.account);
	const { changeCurrency } = useCurrency();
	return (
		<div className="flex items-center gap-5">
			<h1>Wallet</h1>
			<TableCurrencyPicker {...props} currency={currency.code} setCurrency={changeCurrency} />
		</div>
	);
}
