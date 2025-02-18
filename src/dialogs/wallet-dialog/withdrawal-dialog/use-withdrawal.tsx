import useCustomNavigation from "@/hooks/use-navigation";
import useActions from "@/store/actions";
import { useAppSelector } from "@/store/hooks";
import * as React from "react";

export type ChangeTab = (tab: string, closeDrawer?: boolean) => void;
export default function useWithdrawal() {
	const { dialog } = useAppSelector((state) => state.ui);
	const [activeTab, setActiveTab] = React.useState("withdraw_funds"); //withdraw_funds | add_account
	const { queryParams } = useCustomNavigation();
	const { ui } = useActions();

	const toggleShow = (val: boolean) => {
		ui.changeDialog({ show: val, type: "", id: "" });
		changeTab("withdraw_funds");
	};

	const changeTab = (tab: typeof activeTab, closeDrawer = false) => {
		setActiveTab(tab);
		if (closeDrawer) {
			toggleShow(false);
		}

		if (tab === "add_account") {
      queryParams.set("tab", "add_account");
    }
	};

	const open = React.useMemo(() => {
		return dialog.show && dialog.type === "withdrawal";
	}, [dialog.show, dialog.type]);

	return {
		open,
		activeTab,
		changeTab,
		toggleShow,
	};
}
