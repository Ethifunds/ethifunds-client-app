import { Badge } from "@/components/ui/badge";
import { assets } from "@/constants";

import { BankAccount } from "@/types/bank-account.types";
import Actions from "./actions";

export default function AccountCard(props: BankAccount) {
  return (
    <div className="flex items-start justify-between rounded-lg border p-4 transition hover:bg-neutral-100/20">
      <div className="flex grow items-center gap-3">
        <Badge
          variant={"outline"}
          className="flex size-10 items-center justify-center rounded-full border-neutral-500"
        >
          <img src={assets.bank_01} alt="bank icon" className="size-full" />
        </Badge>

        <div className="flex grow flex-col gap-1 capitalize">
          <h1 className="content-bold">{props.account_name.toLowerCase()}</h1>
          <div className="content-accent flex grow justify-between text-neutral-500">
            <span>{props.account_number}</span>
            <span>{props.bank_name.toLowerCase()}</span>
          </div>
        </div>
      </div>
      <Actions id={props.id} />
    </div>
  );
}
