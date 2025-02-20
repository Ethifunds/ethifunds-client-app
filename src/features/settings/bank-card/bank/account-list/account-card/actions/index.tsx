import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { assets } from "@/constants";
import MakeDefault from "./make-default";
import DeleteAccount from "./delete-account";

export default function Actions(props: { id: number }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="!bg-transparent outline-none">
        <img
          src={assets.option_icon_01}
          alt="option icon"
          className="size-5 rotate-90"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="space-y-3 p-3">
        <DropdownMenuItem >
          <MakeDefault id={props.id} />
        </DropdownMenuItem>
        <DropdownMenuItem >
          <DeleteAccount id={props.id} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
