import useCustomNavigation from "@/hooks/use-navigation";
import useActions from "@/store/actions";
import { TrashIcon } from "lucide-react";

export default function DeleteAccount(props: { id: number }) {
  const { ui } = useActions();
  const { queryParams } = useCustomNavigation();

  const click = () => {
    ui.changeDialog({
      show: true,
      type: "remove_bank",
      id: props.id.toString(),
    });
    queryParams.set("action", "remove_account");
  };

  return (
    <button onClick={click} className="flex items-center gap-3 text-error-200">
      <TrashIcon size={20} />
      <span className="caption-standard">Delete Account </span>
    </button>
  );
}
