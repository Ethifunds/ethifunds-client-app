import { Badge } from "@/components/ui/badge";
import { CardHeader } from "@/components/ui/card";
import classNames from "classnames";
import React from "react";

type CardImgProps = {
  display_image: string;
  name: string;
  section: string;
};

export default React.memo(function ProductImg(props: CardImgProps) {
  const section = props.section.trim().toLowerCase();
  const cn = classNames("absolute right-2 top-3 capitalize text-neutral-1000", {
    "bg-secondary-100": section === "asset financing",
    "bg-[#FEDAB8]": section === "lpo financing",
    "bg-[#E9FCDE]": section === "sme financing",
  });

  return (
    <CardHeader className="p-0">
      <div className="relative max-h-56">
        <img
          src={props.display_image}
          alt={props.name}
          className="size-full rounded object-cover"
        />
        <Badge className={cn}>{props?.section?.replace("_", " ")}</Badge>
      </div>
    </CardHeader>
  );
});
