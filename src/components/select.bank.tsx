import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { assets } from "@/constants";
import { Bank } from "@/types/bank-account.types";
import * as React from "react";

type SelectBankProps = {
	changeForm(e: string): void;
	disabled: boolean;
	value: string;
	bankList: Bank[];
};

export default function SelectBank(props: SelectBankProps) {
	const bankName = React.useMemo(() => {
		if (!props.value) return "Select Bank";
		return props.bankList.find((item) => item.code === props.value)?.name ?? "Select Bank";
	}, [props.value, props.bankList]);
	return (
    <Select onValueChange={props.changeForm} disabled={props.disabled}>
      <SelectTrigger className="w-full bg-neutral-50 p-2">
        <SelectValue
          asChild
          placeholder={
            <div className="flex items-center gap-3">
              <img
                src={assets.bank_01}
                alt="bank icon"
                className="size-6 object-cover"
              />

              <span>Select Bank</span>
            </div>
          }
          className="flex items-center gap-3"
        >
          <div className="flex items-center gap-3">
            <img
              src={assets.bank_01}
              alt="bank icon"
              className="size-6 object-cover"
            />

            <span>{bankName}</span>
          </div>
        </SelectValue>
      </SelectTrigger>
      <SelectContent
        position="popper"
        side="bottom"
        className="max-h-60 max-w-[23rem]"
        align="end"
      >
        {props.bankList.map((item, idx) => (
          <SelectItem key={idx} value={item.code} className="capitalize">
            <div className="flex items-center gap-3">
              <img
                src={assets.bank_01}
                alt="bank icon"
                className="size-6 object-cover"
              />

              <span className="">{item.name.toLocaleUpperCase()}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
