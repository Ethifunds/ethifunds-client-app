import { BankAccount } from "@/types/bank-account.types";
import AccountCard from "./account-card";
import { PlusCircle } from "lucide-react";

type AccountListProps = {
  data: BankAccount[];
  open(): void;
};
export default function AccountList(props: AccountListProps) {
  return (
    <div className="flex w-full flex-col gap-3">
      {props.data.map((item) => (
        <AccountCard key={item.id} {...item} />
      ))}
      <button
        onClick={props.open}
        className="content-bold flex items-center justify-center gap-4 rounded-lg border bg-primary-100 p-4 text-primary"
      >
        <PlusCircle strokeWidth={1.2} size={35} />
        <span>Add New Bank Account </span>
      </button>
    </div>
  );
}
