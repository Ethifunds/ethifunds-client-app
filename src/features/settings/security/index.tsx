import { Tabs } from "@/components/ui/tabs";
import TabContainer from "../tab-container";

import useCustomNavigation from "@/hooks/use-navigation";

import SecurityTabs from "./security-tabs";


export default function Security() {
  const { queryParams } = useCustomNavigation();
  const query = queryParams.get("sub_tab");

  const change = (path: string) => {
    queryParams.set("sub_tab", path);
  };
  return (
    <TabContainer value="security" className="pt-0">
      <Tabs
        defaultValue={query ?? "default"}
        onValueChange={change}
        value={query ?? "default"}
      >
        <SecurityTabs/>
      </Tabs>
    </TabContainer>
  );
}
