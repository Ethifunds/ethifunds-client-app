import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useCustomNavigation from "@/hooks/use-navigation";
import * as React from "react";

type StatusFilterProps = {
  disabled: boolean;
};
export default function StatusFilter(props: StatusFilterProps) {
  const { queryParams } = useCustomNavigation();
  const statusQuery = queryParams.get("status");
  const status = React.useMemo(() => {
    return statusQuery ?? "All";
  }, [statusQuery]);

  const changeStatus = (value: string) => {
    if (value === "all") return queryParams.delete("status");
    queryParams.set("status", value);
  };
  // "success" | "failed" | "pending";
  const statusList = [
    {
      name: "all",
      path: "all",
    },
    {
      name: "success",
      path: "success",
    },
    {
      name: "pending",
      path: "pending",
    },
    {
      name: "failed",
      path: "failed",
    },
  ];

  return (
    <div className="flex items-center gap-5">
      <h1>Status</h1>

      <Select
        onValueChange={(value) => changeStatus(value)}
        disabled={props.disabled}
      >
        <SelectTrigger className="w-[99px] bg-neutral-50 p-1">
          <SelectValue asChild placeholder={status}>
            <span className="capitalize">{status}</span>
          </SelectValue>
        </SelectTrigger>
        <SelectContent
          position="popper"
          side="bottom"
          className="max-h-60"
          align="end"
        >
          {statusList.map((item) => (
            <SelectItem
              key={item.path}
              value={item.path}
              className="capitalize"
            >
              <span>{item.name}</span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
