export const amountSeparator = (num: string | number, separator = ",") => {
	if (!num) return num;
	return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator);
};
