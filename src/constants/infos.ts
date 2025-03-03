type TooltipInfoKeys = "asking_price" | "units_aggregate";
type TooltipInfo = {
  title: string;
  content: string;
};

export const tooltipInfo: Record<TooltipInfoKeys, TooltipInfo> = {
  asking_price: {
    title: "What’s the Asking Price",
    content: `The asking price is the amount you choose to sell each REIT
                  unit for. It can be higher or lower than the original price on
                  Ethifunds. Buyers will see this price when purchasing your
                  listed units.`,
  },
  units_aggregate: {
    title: "",
    content:
      "This is an aggregate of all the investments units purchased under this investment category.",
  },
};
