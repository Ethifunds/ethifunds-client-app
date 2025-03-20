import { User } from "@/types/user.types";
import * as React from "react";

type ListingUsernameProps = { isBuyer: boolean; user: User };
export default React.memo(function ListingUsername(
  props: ListingUsernameProps,
) {
  if (!props.user) return;

  return (
    <div className="caption-standard flex justify-between capitalize text-neutral-700">
      <span className="w-full">
        {props.isBuyer ? "Seller username" : "Buyer username"}{" "}
      </span>
      <span className="w-full">{props.user.username}</span>
    </div>
  );
});
