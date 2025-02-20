import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TabContainer from "../tab-container";
import classNames from "classnames";

import useCustomNavigation from "@/hooks/use-navigation";
import * as React from "react";
import Bank from "./bank";
import Card from "./card";

export default React.memo(function Profile() {
  const { queryParams } = useCustomNavigation();

  const query = React.useMemo(() => {
    return queryParams.get("sub_tab");
  }, [queryParams]);

  const click = (path: string) => {
    queryParams.set("sub_tab", path);
  };

  const triggerClx = classNames(
    "justify-center px-2 lg:px-0 text-neutral-500 capitalize !bg-transparent  !shadow-none content-standard lg:w-full border-b-2 border-transparent !rounded-none hover:border-primary hover:text-primary hover:content-bold data-[state=active]:content-bold data-[state=active]:!text-primary data-[state=active]:border-primary",
  );

  return (
    <TabContainer value="card_bank" className="space-y-8">
      <Tabs
        defaultValue={query ?? "card"}
        value={query ?? "card"}
        className="flex flex-col lg:flex-row lg:gap-10"
      >
        <TabsList className="justify-start gap-3 rounded-none bg-transparent !p-0 !pb-3 lg:w-[10%] lg:flex-col lg:items-start lg:gap-5 [&_button]:w-1/2">
          <TabsTrigger
            onClick={() => click("card")}
            value="card"
            className={triggerClx}
          >
            Card
          </TabsTrigger>
          <TabsTrigger
            onClick={() => click("bank")}
            value="bank"
            className={triggerClx}
          >
            Bank
          </TabsTrigger>
        </TabsList>
        <Card />
        <Bank />
      </Tabs>
    </TabContainer>
  );
});
