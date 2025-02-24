import * as React from "react";
import TabContainer from "../tab-container";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { assets } from "@/constants";
import { MyActiveInvestment } from "@/types/my-investments.types";
import { useAppSelector } from "@/store/hooks";
import { amountSeparator } from "@/lib/amount-separator";

type OngoingInvestmentsProps = {
  data: MyActiveInvestment[];
};
export default React.memo(function OngoingInvestments(
  props: OngoingInvestmentsProps,
) {
  const { currency } = useAppSelector((state) => state.account);

  return (
    <TabContainer value="ongoing_investments">
      <div className="flex flex-col gap-5">
        {props.data.map((item, idx) => (
          <Link
            key={idx}
            to={`${item.category.id}/overview`}
            className="flex rounded-xl border p-6 transition hover:shadow-md"
          >
            <div className="flex grow items-center gap-5">
              <Badge className="flex size-12 items-center justify-center rounded-full bg-secondary-100">
                <img
                  src={item.category.display_image}
                  alt={item.category.name}
                  className="h-auto w-full object-fill"
                />
              </Badge>

              <div className="space-y-5">
                <h1 className="highlight-accent text-neutral-1000">
                  {currency.sign}
                  {amountSeparator(item.sum)}
                </h1>
                <span className="content-standard text-neutral-500">
                  {item.category.name.trim()}
                </span>
              </div>
            </div>

            <img src={assets.arrow_left_01} alt="" className="rotate-180" />
          </Link>
        ))}
      </div>
    </TabContainer>
  );
});
