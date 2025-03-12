import AppButton from "@/components/app-button";
import { assets } from "@/constants";
import { Plus } from "lucide-react";

type NoSavedCardProps = {
  open(): void;
};
export default function NoSavedCard(props: NoSavedCardProps) {
  return (
    <div className="flex flex-col items-center gap-5">
      <img src={assets.cards_01} alt="bank icon" className="size-28" />

      <div className="flex flex-col items-center gap-3">
        <h1 className="highlight-accent text-neutral-1000">
          You have not added a card
        </h1>
        <span className="caption-standard text-neutral-500">
          Kindly add a card to initiate your transactions
        </span>
      </div>
      <AppButton
        variant="primary"
        onClick={props.open}
        className="flex items-center gap-3 rounded-lg"
      >
        <Plus />
        <span>Add Card</span>
      </AppButton>
    </div>
  );
}
