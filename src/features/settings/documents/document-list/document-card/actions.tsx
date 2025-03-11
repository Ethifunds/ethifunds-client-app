import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { assets } from "@/constants";

type ActionsProps = {
  openUpload(): void;
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
        <DropdownMenuItem onClick={props.openUpload}>
          <img src={assets.upload_icon_01} alt="upload icon" />
          <span>Upload Document </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
