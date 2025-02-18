import * as React from "react";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { assets } from "@/constants";

export function DatePickerWithRange({
	className,
	...rest
}: React.HTMLAttributes<HTMLDivElement> & { disabled: boolean }) {
	const [date, setDate] = React.useState<DateRange | undefined>({
		from: new Date(),
		to: new Date(),
	});



	return (
		<div className={cn("grid gap-2", className)} {...rest}>
			<Popover>
				<PopoverTrigger asChild>
					<Button
						id="date"
						variant={"outline"}
						className={cn(
							"w-fit justify-start text-left font-normal overflow-x-auto hide-scrollbar",
							!date && "text-muted-foreground"
						)}
						disabled={rest.disabled}
					>
						<img src={assets.calendar_icon_01} alt="calendar icon" />
						{date?.from ? (
							date.to ? (
								<>
									{format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}
								</>
							) : (
								format(date.from, "LLL dd, y")
							)
						) : (
							<span>Pick a date</span>
						)}
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-auto p-0" align="start">
					<Calendar
						initialFocus
						mode="range"
						defaultMonth={date?.from}
						selected={date}
						onSelect={setDate}
						numberOfMonths={2}
					/>
				</PopoverContent>
			</Popover>
		</div>
	);
}
