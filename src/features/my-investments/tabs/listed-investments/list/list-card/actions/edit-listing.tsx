import { assets } from "@/constants";

type EditListingProps = {
  edit(): void;
};
export default function EditListing(props: EditListingProps) {
  return (
    <button className="flex w-full items-center gap-3" onClick={props.edit}>
      <img src={assets.edit_01} alt={"icon"} />
      <span className="caption-standard text-neutral-1000">Edit </span>
    </button>
  );
}
