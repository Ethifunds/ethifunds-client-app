import { Badge } from "@/components/ui/badge";

import Actions from "./actions";
import { SavedCard } from "@/types/saved-card.types";
import cardBrands from "@/constants/card-brands";
import sanitizeText from "@/lib/sanitize-text";
import * as React from "react";
export default function CardItem(props: SavedCard) {
  const logoIdx = React.useMemo(
    () =>
      cardBrands.findIndex(
        (item) => sanitizeText(item.name) === sanitizeText(props.brand),
      ),
    [props.brand],
  );
  return (
    <div className="flex items-start justify-between rounded-lg border p-4 transition hover:bg-neutral-100/20">
      <div className="flex grow items-center gap-3">
        <Badge
          variant={"outline"}
          className="flex h-8 w-10 items-center justify-center rounded-sm border-neutral-100 p-1"
        >
          <img
            src={cardBrands[logoIdx < 0 ? 0 : logoIdx].logo}
            alt={props.brand}
            className="size-full"
          />
        </Badge>

        <div className="flex grow flex-col gap-1 capitalize">
          <h1 className="content-bold">{props.account_name.toLowerCase()}</h1>
          <div className="caption-accent flex grow justify-between text-neutral-500">
            <span>**** **** **** {props.last4}</span>
          </div>
        </div>
      </div>
      <Actions id={props.id} />
    </div>
  );
}
