import CurrencyFilter from "@/components/table-filters/currency-filter";
import { DateFilter } from "@/components/table-filters/data-filter";
import ExportFilter from "@/components/table-filters/export-filter";
import StatusFilter from "@/components/table-filters/status-filter";
import TransactionTypeFilter from "@/components/table-filters/transaction-type-filter";


export type FilterProps = {
	disabled: boolean;
};
export default function TransactionFilters(props: FilterProps) {
	return (
		<div className="flex items-center gap-3 py-1 overflow-auto">
			<TransactionTypeFilter {...props} />
			<CurrencyFilter {...props} />
			<StatusFilter {...props} />
			<ExportFilter {...props} url="" />
			<DateFilter {...props} />
		</div>
	);
}
