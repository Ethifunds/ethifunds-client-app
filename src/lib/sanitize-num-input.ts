export function sanitizeNumInput(num: string, allowDecimals = false) {
	const RE_DIGIT = allowDecimals ? /^\d*\.?\d*$/ : /^\d+$/;
	return RE_DIGIT.test(num) ? num : num.slice(0, -1); // Remove last invalid char
}
