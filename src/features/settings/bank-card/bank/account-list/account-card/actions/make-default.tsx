import { assets } from "@/constants";

export default function MakeDefault(props: { id: number }) {
  return (
    <button className="flex items-center gap-3">
      <img src={assets.default_icon_01} alt={"icon" + props} />
      <span className="caption-standard text-neutral-1000">Make default </span>
    </button>
  );
}
