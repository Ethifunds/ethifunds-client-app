import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import * as React from "react";
import { EthivestTab } from "../../data";

export default React.memo(function TabHeader() {
  const tabs: EthivestTab[] = [
    {
      title: "all",
      value: "all",
    },
    {
      title: "asset financing",
      value: "asset_financing",
    },
    {
      title: "SME financing",
      value: "sme_financing",
    },
    {
      title: "LPO financing",
      value: "lpo_financing",
    },
  ];
  return (
    <TabsList className="w-full justify-start gap-2 rounded-none bg-transparent lg:gap-5 overflow-x-auto overflow-y-hidden hide-scrollbar">
      {tabs.map((item) => (
        <TabsTrigger
          key={item.value}
          value={item.value}
          className="button bg-neutral-100 capitalize hover:bg-primary hover:text-white data-[state=active]:bg-primary data-[state=active]:text-white transition"
        >
          {item.title}
        </TabsTrigger>
      ))}
    </TabsList>
  );
});
