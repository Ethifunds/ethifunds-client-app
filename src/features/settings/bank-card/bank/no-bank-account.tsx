import AppButton from "@/components/app-button";
import { assets } from "@/constants";
import { Plus } from "lucide-react";

type NoBankAccountProps = {
  open(): void;
};
export default function NoBankAccount(props: NoBankAccountProps) {
  return (
    <div className="flex flex-col items-center gap-5">
      <img src={assets.bank_02} alt="bank icon" className="size-28" />

      <div className="flex flex-col items-center gap-3">
        <h1 className="highlight-accent text-neutral-1000">
          You have not added a bank account
        </h1>
        <span className="caption-standard text-neutral-500">
          Kindly add a bank account to initiate withdrawals
        </span>
      </div>
      <AppButton
        variant="primary"
        onClick={props.open}
        className="flex items-center gap-3 rounded-lg"
      >
        <Plus />
        <span>Add Bank Account</span>
      </AppButton>
    </div>
  );
}
