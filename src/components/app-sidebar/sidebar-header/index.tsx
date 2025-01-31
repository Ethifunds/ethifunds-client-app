import { SidebarTrigger } from "@/components/ui/sidebar";
import * as React from "react";
import SearchBar from "./search-bar";
import Notifications from "./notifications";
import UserIcon from "./user-icon";

export default React.memo(function SidebarHeader() {
	return (
		<header className="flex justify-between items-center pt-5 pb-3.5 border-b px-3 lg:px-5">
			<SidebarTrigger />

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
