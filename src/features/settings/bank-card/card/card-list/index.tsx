import CardItem from "./card-item";
import { PlusCircle } from "lucide-react";
import { SavedCard } from "@/types/saved-card.types";

type CardListProps = {
  data: SavedCard[];
  open(): void;
};

export default function CardList(props: CardListProps) {
  return (
    <div className="flex w-full flex-col gap-3">
      {props.data.map((item) => (
        <CardItem key={item.id} {...item} />
      ))}
      <button
        onClick={props.open}
        className="content-bold flex items-center justify-center gap-4 rounded-lg border bg-primary-100 p-4 text-primary"
      >
        <PlusCircle strokeWidth={1.2} size={35} />
        <span>Add New Card </span>
      </button>
    </div>
  );
}
