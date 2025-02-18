import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TabContainer from "../tab-container";
import classNames from "classnames";
import VerifyBvn from "./verify-bvn";
import PersonalInfo from "./personal-info";
import useCustomNavigation from "@/hooks/use-navigation";
import * as React from "react";

export default React.memo(function Profile() {
  const { queryParams } = useCustomNavigation();

  const query = React.useMemo(() => {
    return queryParams.get("sub_tab");
  }, [queryParams]);

  const click = (path: string) => {
    queryParams.set("sub_tab", path);
  };

  const triggerClx = classNames(
    "justify-start px-2 lg:px-0 text-neutral-500 capitalize !bg-transparent  !shadow-none content-standard lg:w-full border-b-2 border-transparent !rounded-none hover:border-primary hover:text-primary hover:content-bold data-[state=active]:content-bold data-[state=active]:!text-primary data-[state=active]:border-primary",
  );

  return (
    <TabContainer
      value="profile"
      title="Profile"
      subTitle="Update your personal information to keep your Ethifund profile current and secure"
      className="space-y-8"
    >
      <Tabs
        defaultValue={query ?? "verify_bvn"}
        value={query ?? "verify_bvn"}
        className="flex flex-col lg:flex-row lg:gap-10"
      >
        <TabsList className="justify-start gap-3 rounded-none bg-transparent !p-0 !pb-3 lg:w-[10%] lg:flex-col lg:items-start lg:gap-5">
          <TabsTrigger
            onClick={() => click("verify_bvn")}
            value="verify_bvn"
            className={triggerClx}
          >
            Verify BVN
          </TabsTrigger>
          <TabsTrigger
            onClick={() => click("personal_info")}
            value="personal_info"
            className={triggerClx}
          >
            Personal Info
          </TabsTrigger>
        </TabsList>
        <VerifyBvn />
        <PersonalInfo />
      </Tabs>
    </TabContainer>
  );
});