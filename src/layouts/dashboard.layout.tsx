import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/app-sidebar";
import * as React from "react";
import { Outlet } from "react-router-dom";
import AuthGate from "@/config/auth-gate";
import SidebarHeader from "@/components/app-sidebar/sidebar-header";
import PageTitle from "@/components/app-sidebar/page-title";
import Dialogs from "@/dialogs";

export default React.memo(function DashboardLayout() {
  return (
    <AuthGate>
      <SidebarProvider>
        <AppSidebar />
        <div className="flex w-full flex-col">
          <SidebarHeader />
          <PageTitle />
          <Outlet />
        </div>
      </SidebarProvider>
      <Dialogs />
    </AuthGate>
  );
});
