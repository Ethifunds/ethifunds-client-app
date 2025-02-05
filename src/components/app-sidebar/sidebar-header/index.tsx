import { SidebarTrigger } from "@/components/ui/sidebar";
import * as React from "react";
import SearchBar from "./search-bar";
import Notifications from "./notifications";
import UserIcon from "./user-icon";
import { useAppSelector } from "@/store/hooks";
import GoBack from "@/components/go-back";

export default React.memo(function SidebarHeader() {
	const {backBtn}= useAppSelector(state=> state.ui)
	return (
		<header className="flex justify-between items-center pt-5 pb-3.5 border-b px-3 lg:px-5">
			{!backBtn ? <SidebarTrigger /> : <GoBack {...backBtn} />}

			<div className="flex justify-between items-center gap-10">
				<SearchBar />
				<div className="flex gap-5 items-center">
					<Notifications />
					<UserIcon />
				</div>
			</div>
		</header>
	);
});
