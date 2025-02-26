import { TrashIcon } from "lucide-react";

type RemoveListingProps = {
  remove(): void;
};
export default function RemoveListing(props: RemoveListingProps) {
  return (
    <button
      onClick={props.remove}
      className="flex items-center gap-3 text-error-200 w-full"
    >
      <TrashIcon size={20} />
      <span className="caption-standard">Remove Listings </span>
    </button>
  );
}
