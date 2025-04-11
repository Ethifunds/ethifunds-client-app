import { DatePickerWithRange } from "@/components/ui/date-range-picker";

import useCustomNavigation from "@/hooks/use-navigation";

type DateFilterProps = {
  disabled: boolean;
};
export function DateFilter(props: DateFilterProps) {
  const { queryParams } = useCustomNavigation();

  const onSelect = (range: string) => {
    queryParams.delete("page");
    queryParams.set("range", range);
  };

  return (
    <div className="overflow-cli">
      {" "}
      <DatePickerWithRange {...props} handleChange={onSelect} />
    </div>
  );
}
