export function sanitizeNumInput(num: string) {
	const RE_DIGIT = RegExp(/^\d+$/);
	return RE_DIGIT.test(num) ? num : "";
}
