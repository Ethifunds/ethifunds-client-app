import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/app-sidebar";
import * as React from "react";
import { Outlet } from "react-router-dom";
import AuthGate from "@/config/auth-gate";
import SidebarHeader from "@/components/app-sidebar/sidebar-header";

export default React.memo(function DashboardLayout() {
	return (
		<AuthGate>
			<SidebarProvider>
				<AppSidebar />
				<div className="flex flex-col w-full">
					<SidebarHeader />
					<Outlet />
				</div>
			</SidebarProvider>
		</AuthGate>
	);
});
