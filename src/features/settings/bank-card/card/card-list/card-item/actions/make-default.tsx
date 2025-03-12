import { assets } from "@/constants";
import ensureError from "@/lib/ensure-error";
import setDefaultCard from "@/services/settings/card/set-default-card";
import { toast } from "sonner";

export default function MakeDefault(props: { id: number }) {
  const click = async () => {
    try {
      await setDefaultCard({ user_saved_card_id: props.id });
      toast.success("Card set as default");
    } catch (err) {
      const errMsg = ensureError(err).message;
      toast.error(errMsg);
    }
  };
  return (
    <button onClick={click} className="flex items-center gap-3">
      <img src={assets.default_icon_01} alt={"icon" + props} />
      <span className="caption-standard text-neutral-1000">Make default </span>
    </button>
  );
}
