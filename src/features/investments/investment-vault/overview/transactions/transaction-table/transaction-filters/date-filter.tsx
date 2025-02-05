import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { FilterProps } from ".";

export function DateFilter(props:FilterProps) {
	return (
		<div className="overflow-cli">
			{" "}
            <DatePickerWithRange  {...props} />
		</div>
	);
}
