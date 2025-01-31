import * as React from "react";
import { SidebarFooter, SidebarMenuButton, SidebarMenuItem } from "../../ui/sidebar";
import { useAppSelector } from "@/store/hooks";
import AppButton from "../../app-button";
import { assets } from "@/constants";

export default React.memo(function AppSidebarFooter() {
	const { account } = useAppSelector((state) => state.account);

	const fullName = React.useMemo(() => {
		return `${account.user_profile?.first_name} ${account.user_profile?.last_name}`;
	}, [account.user_profile?.first_name, account.user_profile?.last_name]);

	return (
		<SidebarFooter>
			<div className="flex justify-between items-start p-3 group-data-[collapsible=icon]:hidden ">
				<div className="flex flex-col">
					<span className="capitalize content-standard text-neutral-1000 line-clamp-1">
						{fullName}
					</span>
					<small className="caption-standard text-[#667085]">@{account.username}</small>
				</div>
				<AppButton variant="ghost" className="!py-0">
					<img src={assets.logout_01} alt="logout" />
				</AppButton>
			</div>
			<SidebarMenuItem className="list-none">
				<SidebarMenuButton asChild>
					<AppButton
						variant="ghost"
						className="hidden !py-0 w-full group-data-[collapsible=icon]:flex"
					>
						<img src={assets.logout_01} alt="logout" className="size-" />
					</AppButton>
				</SidebarMenuButton>
			</SidebarMenuItem>
		</SidebarFooter>
	);
});
