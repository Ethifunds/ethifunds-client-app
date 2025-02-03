import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import useCustomNavigation from "@/hooks/use-navigation";
import * as React from "react";
import { FilterProps } from ".";

export default function TransactionTypeFilter(props: FilterProps) {
	const { queryParams } = useCustomNavigation();
	const statusQuery = queryParams.get("transaction_type");
	const transactionType = React.useMemo(() => {
		return statusQuery ?? "All";
	}, [statusQuery]);

	const changeType = (value: string) => {
		if (value === "all") return queryParams.delete("transaction_type");
		queryParams.set("transaction_type", value);
	};
	// "credit" | "debit" | "transfer";
	const statusList = [
		{
			name: "all",
			path: "all",
		},
		{
			name: "credit",
			path: "credit",
		},
		{
			name: "debit",
			path: "debit",
		},
		{
			name: "transfer",
			path: "transfer",
		},
	];

	return (
		<div className="flex items-center gap-5">
			<h1>Type</h1>

			<Select onValueChange={(value) => changeType(value)} disabled={props.disabled}>
				<SelectTrigger className="w-[99px] p-1 bg-neutral-50">
					<SelectValue asChild placeholder={transactionType}>
						<span className="capitalize">{transactionType}</span>
					</SelectValue>
				</SelectTrigger>
				<SelectContent position="popper" side="bottom" className="max-h-60" align="end">
					{statusList.map((item) => (
						<SelectItem key={item.path} value={item.path} className="capitalize">
							<span>{item.name}</span>
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</div>
	);
}
