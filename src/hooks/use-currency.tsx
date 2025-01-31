import { currencyList } from "@/constants/currency-list";
import sanitizeText from "@/lib/sanitize-text";
import * as React from "react";
import useCookie from "./use-cookie";
import { variables } from "@/constants";
import useActions from "@/store/actions";
import { Currency } from "@/global.types";
import { useAppSelector } from "@/store/hooks";

export default function useCurrency() {
	const { currency:init } = useAppSelector((state) => state.account);
	const { cookie, setCookie, deleteCookie } = useCookie(variables.STORAGE.currency, "NGN");
	const [currency, setCurrency] = React.useState<Currency>(init);
	const { account } = useActions();

	const changeCurrency = (value: string) => {
		setCookie(value.toUpperCase());
	};

	const deleteCurrency = () => {
		deleteCookie();
	};

	const initCurrency = React.useCallback(() => {
		const match = currencyList.find((item) => sanitizeText(item.code) === sanitizeText(cookie));
		if (match) {
			setCurrency(match);
			account.changeCurrency(match);
			return;
		}
		setCurrency(init);
		account.changeCurrency(init);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [cookie, init]);

	React.useLayoutEffect(() => {
		initCurrency();
	}, [initCurrency]);

	return {
		sign: currency.sign,
		currency: currency.code,
		changeCurrency,
		deleteCurrency,
	};
}
