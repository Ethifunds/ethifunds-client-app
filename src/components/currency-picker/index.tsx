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
};

export default React.memo(function CurrencyPicker(props: CurrencyPickerProps) {
	const { supportedCurrencies } = useExtras();

	const currencyIdx = React.useMemo(() => {
    const match = supportedCurrencies.findIndex(
      (item) => sanitizeText(item.code) === sanitizeText(props.currency),
    );

    if (match > -1) return match;
    return 0;
  }, [props.currency, supportedCurrencies]);

	return (
		<Select onValueChange={(value) => props.setCurrency(value)}>
			<SelectTrigger className="w-[99px] p-1 rounded-full">
				<SelectValue
					asChild
					placeholder={
						<div className="flex items-center gap-3">
							<div className="flex items-center justify-center rounded-full border size-6">
								<img
									src={supportedCurrencies[currencyIdx].flag}
									alt={supportedCurrencies[currencyIdx].name}
									className="size-full object-cover rounded-full "
								/>
							</div>

							<span>{supportedCurrencies[currencyIdx].code.toLocaleUpperCase()}</span>
						</div>
					}
				>
					<div className="flex items-center gap-3">
						<div className="flex items-center justify-center rounded-full border size-6">
							<img
								src={supportedCurrencies[currencyIdx].flag}
								alt={supportedCurrencies[currencyIdx].name}
								className="size-full object-cover rounded-full "
							/>
						</div>

						<span>{supportedCurrencies[currencyIdx].code.toLocaleUpperCase()}</span>
					</div>
				</SelectValue>
			</SelectTrigger>
			<SelectContent position="popper" side="bottom" className="max-h-60" align="end">
				{supportedCurrencies.map((item) => (
					<SelectItem key={item.code} value={item.code}>
						<div className="flex items-center gap-3">
							<div className="flex items-center justify-center rounded-full border size-6">
								<img
									src={item.flag}
									alt={item.name}
									className="size-full object-cover rounded-full"
								/>
							</div>
							<span>{item.code.toLocaleUpperCase()}</span>
						</div>
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
});
