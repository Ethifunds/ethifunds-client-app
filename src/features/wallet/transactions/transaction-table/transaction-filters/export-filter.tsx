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

export default function ExportFilter(props: FilterProps) {
	const { queryParams } = useCustomNavigation();
	const statusQuery = queryParams.get("export_type");
	const exportType = React.useMemo(() => {
		return statusQuery ?? "CVS";
	}, [statusQuery]);

	const changeStatus = (value: string) => {
		if (value === "csv") return queryParams.delete("export_type");
		queryParams.set("export_type", value);
	};
	// "cvs" | "pdf"
	const statusList = [
		{
			name: "CSV",
			path: "csv",
		},
		{
			name: "PDF",
			path: "pdf",
		},
	];

	return (
		<div className="flex items-center gap-5">
			<h1>Export</h1>

			<Select onValueChange={(value) => changeStatus(value)} disabled={props.disabled}>
				<SelectTrigger className="w-[99px] p-1 bg-neutral-50">
					<SelectValue asChild placeholder={exportType}>
						<span className="capitalize">{exportType}</span>
					</SelectValue>
				</SelectTrigger>
				<SelectContent position="popper" side="bottom" className="max-h-60" align="end">
					{statusList.map((item) => (
						<SelectItem key={item.path} value={item.path}>
							<span>{item.name}</span>
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</div>
	);
}
