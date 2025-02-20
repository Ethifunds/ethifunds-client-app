import * as React from "react";
import { useAppSelector } from "@/store/hooks";
import useActions from "@/store/actions";
import useCustomNavigation from "@/hooks/use-navigation";

export default function useAddAccount() {
  const { dialog } = useAppSelector((state) => state.ui);
  const { queryParams } = useCustomNavigation();

  const { ui } = useActions();

  const deleteQueryParams = () => {
    queryParams.delete("action");
  };

  const open = React.useMemo(() => {
    return dialog.show && dialog.type === "add_new_bank";
  }, [dialog.show, dialog.type]);

  const toggleDrawer = (value: boolean) => {
    ui.changeDialog({
      show: value,
      type: "",
      data: null,
      action: null,
    });
    deleteQueryParams();
  };

  return {
    open,
    toggleDrawer,
  };
}
