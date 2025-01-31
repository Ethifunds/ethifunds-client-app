import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarHeader,
} from "@/components/ui/sidebar";
import { sidebarLinks } from "./data";
import SidebarLink from "./sidebar-link";
import * as React from "react";
import useCustomNavigation from "@/hooks/use-navigation";
import AppLogo from "../app-logo";
import AppSidebarFooter from "./sidebar-footer";

export default function AppSidebar() {
	const [activeLink, setActiveLink] = React.useState("");
	const [currentPath, setCurrentPath] = React.useState("");
	const { location } = useCustomNavigation();

	React.useEffect(() => {
		setCurrentPath(location.pathname);
	}, [location]);
	const props = {
		activeLink,
		setActiveLink,
		currentPath,
	};
	return (
		<Sidebar collapsible="icon" className="py-5">
			<SidebarHeader>
				<div className="mx-auto">
					<AppLogo />
				</div>
			</SidebarHeader>
			<SidebarContent className="px-3 group-data-[collapsible=icon]:px-0">
				<SidebarGroup>
					<SidebarGroupContent className="space-y-3">
						{sidebarLinks.map((item) => (
							<SidebarLink key={item.name} {...item} {...props} />
						))}
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
			<AppSidebarFooter />
		</Sidebar>
	);
}

{
	/* <SidebarGroup className={"pt-0"}>
	<SidebarGroupContent>
		<SidebarMenu>
			{links.map((item) => (
				<SidebarMenuItem key={item.title}>
					<SidebarMenuButton asChild>
						<Link href={item.href}>
							<item.icon />
							<span>{item.title}</span>
						</Link>
					</SidebarMenuButton>
				</SidebarMenuItem>
			))}
		</SidebarMenu>
	</SidebarGroupContent>
</SidebarGroup>; */
}
