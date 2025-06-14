import { TabsContent } from "@/components/ui/tabs";
import * as React from "react";
import { EthivestTabsProps } from "../../use-buy-ethivest";
import { Badge } from "@/components/ui/badge";
import { amountSeparator } from "@/lib/amount-separator";
import { useAppSelector } from "@/store/hooks";
import ProductProgress from "@/components/investment/product-progress";
import DownloadMemoButton from "@/components/investment/download-memo-button";

export default React.memo(function ProductDetails(props: EthivestTabsProps) {
  const { currency } = useAppSelector((state) => state.account);
  const data = props.data;

  const statusBadge = (
    <Badge
      className={`capitalize ${data.status === "active" ? "bg-success-200/20 text-success-300" : "bg-error-200/20 text-error-300"}`}
    >
      {props.data.status}{" "}
    </Badge>
  );

  const available_units = data.total_units - data.units_sold;

  const infoData = {
    status: statusBadge,
    investment_name: data.name,
    trustee: data?.custodian?.name,
    expected_return: `${amountSeparator(data.expected_roi)}%`,
    current_unit_price: `${currency.sign} ${data.unit_price}`,
    tenure: `${data.tenor_value} ${data.tenor_unit}`,
    section: `${data?.product_section?.name?.replace("_", " ")}`,
    label: (
      <Badge className="capitalize bg-primary-100 text-primary">
        {data.product_label?.name}
      </Badge>
    ),
    available_units: `${amountSeparator(available_units)} Units`,
    investment_due_date: new Date(data.funding_deadline).toLocaleDateString(
      "en-us",
      {
        dateStyle: "medium",
      },
    ),
  };

  return (
    <TabsContent value="product_details" className="flex flex-col gap-5 py-5">
      <h1 className="content-standard text-neutral-500">{data.description}</h1>

      <div className="flex flex-col gap-3 p-2 border rounded-md">
        {Object.entries(infoData).map(([key, value]) => (
          <div
            key={key}
            className="flex w-full items-center justify-between border-b p-1.5 capitalize last:border-none"
          >
            <span className="caption-standard text-neutral-700">
              {key.split("_").join(" ")}
            </span>
            <span className="caption-accent text-end text-neutral-700">
              {value}
            </span>
          </div>
        ))}
      </div>

      <ProductProgress
        units_sold={data.units_sold}
        unit_price={data.unit_price}
        total_units={data.total_units}
        sign={currency.sign}
      />

      <DownloadMemoButton url={data.product_memo} />
    </TabsContent>
  );
});
