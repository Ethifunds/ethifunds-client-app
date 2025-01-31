import CurrencyFilter from "./currency-filter";
import { DateFilter } from "./date-filter";
import ExportFilter from "./export-filter";
import StatusFilter from "./status-filter";
import TableSearchBar from "./table-search-bar";

export type FilterProps = {
	disabled: boolean;
};
export default function TransactionFilters(props: FilterProps) {
	return (
		<div className="flex items-center gap-3 py-1 overflow-auto">
			<TableSearchBar {...props} />
			<CurrencyFilter {...props} />
			<StatusFilter {...props} />
			<ExportFilter {...props} />
			<DateFilter {...props} />
		</div>
	);
}
