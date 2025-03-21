import { SidebarTrigger } from "@/components/ui/sidebar";
import * as React from "react";
import SearchBar from "./search-bar";
import Notifications from "./notifications";
import { useAppSelector } from "@/store/hooks";
import GoBack from "@/components/go-back";

export default React.memo(function SidebarHeader() {
	const {backBtn}= useAppSelector(state=> state.ui)
	return (
    <header className="flex items-center justify-between border-b px-3 pb-3.5 pt-5 lg:px-5">
      {!backBtn ? <SidebarTrigger /> : <GoBack {...backBtn} />}

      <div className="flex items-center justify-between gap-10">
        <SearchBar />
        <div className="flex items-center gap-5">
          <Notifications />
          {/* <UserIcon /> */}
        </div>
      </div>
    </header>
  );
});
