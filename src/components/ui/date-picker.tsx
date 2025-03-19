import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import classNames from "classnames";

type DatePickerProps = {
  name?: string;
  value: Date;
  onChange: (value: Date) => void;
  disabled?: boolean;
  triggerStyle?: string;
  disableMonthNavigation?: boolean;
  daySelectedStyle?: string;
  showOutsideDays?: boolean;
};

export function DatePicker({
  value: date,
  onChange,
  showOutsideDays = true,
  ...props
}: DatePickerProps) {
  const daySelectedCn = classNames(
    "bg-primary text-stone-50 hover:bg-primary hover:text-stone-50 focus:bg-primary focus:text-stone-50",
    props.daySelectedStyle,
  );

  const triggerCn = classNames(
    "w-[280px] justify-start text-left font-normal",
    props.triggerStyle,
    {
      "text-muted-foreground": !date,
    },
  );
  return (
    <Popover modal={true}>
      <PopoverTrigger asChild>
        <Button name={props.name} variant={"outline"} className={triggerCn}>
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="z-50 w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(selected) => {
            if (selected) {
              onChange(selected);
            }
          }}
          initialFocus
          showOutsideDays={showOutsideDays}
          month={showOutsideDays ? undefined : new Date()}
          classNames={{
            day_selected: daySelectedCn,
          }}
          disableNavigation={!showOutsideDays && true}
        />
      </PopoverContent>
    </Popover>
  );
}
