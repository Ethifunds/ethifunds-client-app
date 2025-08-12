import Pagination from "@/components/ui/pagination";
import { PaginatedResponse } from "@/types/global.types";
import { Transaction } from "@/types/transaction.type";


export default function TablePagination(props: PaginatedResponse<Transaction>) {
	return (
		<div className="flex justify-center pt-3">
			<Pagination {...props} />
		</div>
	);
}
