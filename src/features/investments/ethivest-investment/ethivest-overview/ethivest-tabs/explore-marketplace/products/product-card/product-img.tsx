import { Badge } from "@/components/ui/badge";
import { CardHeader } from "@/components/ui/card";
import classNames from "classnames";

type CardImgProps = {
  display_image: string;
  name: string;
  section: string;
};
export default function ProductImg(props: CardImgProps) {
  const cn = classNames("absolute right-2 top-3 capitalize text-neutral-1000", {
    "bg-white": props.section === "asset_financing",
    "bg-[#FEDAB8]": props.section === "lpo_financing",
    "bg-[#E9FCDE]": props.section === "sme_financing",
  });

  return (
    <CardHeader className="p-0">
      <div className="relative max-h-56">
        <img
          src={props.display_image}
          alt={props.name}
          className="size-full object-cover"
        />
        <Badge className={cn}>{props.section.replace("_", " ")}</Badge>
      </div>
    </CardHeader>
  );
}
