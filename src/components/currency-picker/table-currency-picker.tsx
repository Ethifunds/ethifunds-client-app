import * as React from "react";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

import sanitizeText from "@/lib/sanitize-text";
import useExtras from "@/hooks/use-extras";

type CurrencyPickerProps = {
	currency: string;
	setCurrency(currency: string): void;
	disabled: boolean;
};

export default React.memo(function TableCurrencyPicker(props: CurrencyPickerProps) {
	const { supportedCurrencies } = useExtras();

	const currencyIdx = React.useMemo(() => {
		const match = supportedCurrencies.findIndex(
			(item) => sanitizeText(item.code) === sanitizeText(props.currency)
		);

		if (match > -1) return match;
		return 0;
	}, [props.currency, supportedCurrencies]);

	return (
		<Select onValueChange={(value) => props.setCurrency(value)} disabled={props.disabled}>
			<SelectTrigger className="w-[99px] p-1 bg-neutral-50">
				<SelectValue asChild placeholder={props.currency}>
					<span>{supportedCurrencies[currencyIdx].code.toLocaleUpperCase()}</span>
				</SelectValue>
			</SelectTrigger>
			<SelectContent position="popper" side="bottom" className="max-h-60" align="end">
				{supportedCurrencies.map((item) => (
					<SelectItem key={item.code} value={item.code} className="capitalize">
						{item.code.toLocaleUpperCase()}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
});
