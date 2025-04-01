import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { FilterProps } from ".";
import useCustomNavigation from "@/hooks/use-navigation";

export function DateFilter(props: FilterProps) {
  const { queryParams } = useCustomNavigation();

  const onSelect = (range: string) => {
    queryParams.set("range", range);
  };

  return (
    <div className="overflow-cli">
      {" "}
      <DatePickerWithRange {...props} handleChange={onSelect} />
    </div>
  );
}
