import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { assets } from "@/constants";
import EditListing from "./edit-listing";
import RemoveListing from "./remove-listing";

type ActionsProps = {
  remove(): void;
  edit(): void;
};

export default function Actions(props: ActionsProps) {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className="!bg-transparent outline-none">
        <img
          src={assets.option_icon_01}
          alt="option icon"
          className="size-5 rotate-90"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="space-y-3 p-3">
        <DropdownMenuItem>
          <EditListing edit={props.edit} />
        </DropdownMenuItem>
        <DropdownMenuItem>
          <RemoveListing remove={props.remove} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
