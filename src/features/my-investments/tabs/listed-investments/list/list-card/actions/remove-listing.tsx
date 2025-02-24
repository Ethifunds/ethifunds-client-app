import { TrashIcon } from "lucide-react";

type RemoveListingProps = {
  remove(): void;
};
export default function RemoveListing(props: RemoveListingProps) {
  return (
    <button
      onClick={props.remove}
      className="flex items-center gap-3 text-error-200"
    >
      <TrashIcon size={20} />
      <span className="caption-standard">Delete Account </span>
    </button>
  );
}
