import useExtras from "@/hooks/use-extras";
import { useAppSelector } from "@/store/hooks";
import TableCurrencyPicker from "../currency-picker/table-currency-picker";

type CurrencyFilterProps = {
  disabled: boolean;
};
export default function CurrencyFilter(props: CurrencyFilterProps) {
  const { currency } = useAppSelector((state) => state.account);
  const { changeCurrency } = useExtras();
  return (
    <div className="flex items-center gap-5">
      <h1>Wallet</h1>
      <TableCurrencyPicker
        {...props}
        currency={currency.code}
        setCurrency={changeCurrency}
      />
    </div>
  );
}
