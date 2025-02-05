import { currencyList } from "@/constants/currency-list";
import sanitizeText from "@/lib/sanitize-text";
import * as React from "react";
import useCookie from "./use-cookie";
import { variables } from "@/constants";
import useActions from "@/store/actions";
import { Currency, FundingSource } from "@/types/global.types";
import { useAppSelector } from "@/store/hooks";
import { toast } from "sonner";
import getSupportedCurrencies from "@/services/extras/get-supported-currencies";
import getFundingSources from "@/services/extras/get-funding-sources";

export default function useExtras() {
	const { currency: init } = useAppSelector((state) => state.account);
	const { cookie, setCookie, deleteCookie } = useCookie(variables.STORAGE.currency, "NGN");
	const [currency, setCurrency] = React.useState<Currency>(init);
	const [supportedCurrencies, setSupportedCurrencies] = React.useState<Currency[]>([init]);
	const [fundingSources, setFundingSources] = React.useState<FundingSource[]>([]);

	const { account } = useActions();

	const changeCurrency = (value: string) => {
		setCookie(value.toUpperCase());
	};

	const deleteCurrency = () => {
		deleteCookie();
	};

	const getSupportedFundingSource = React.useCallback(async () => {
		try {
			const response = await getFundingSources();
			setFundingSources(response);
		} catch (error) {
			toast.warning("Failed to get funding sources");
			throw error;
		}
	}, []);

	const getCurrencies = async () => {
		try {
			return await getSupportedCurrencies();
		} catch (error) {
			toast.warning("failed to get supported currencies");
			throw error;
		}
	};

	const initCurrency = React.useCallback(async () => {
		const supported_currencies = await getCurrencies();
		const filteredList = currencyList.filter((item) => supported_currencies.includes(item.code));

		setSupportedCurrencies(filteredList);

		const match = filteredList.find((item) => sanitizeText(item.code) === sanitizeText(cookie));

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
	}, [initCurrency, getSupportedFundingSource]);

	React.useEffect(() => {
		getSupportedFundingSource();
	}, [getSupportedFundingSource]);

	return {
		sign: currency.sign,
		currency: currency.code,
		fundingSources,
		supportedCurrencies,
		changeCurrency,
		deleteCurrency,
	};
}
