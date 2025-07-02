import { Badge } from "@/components/ui/badge";
import { amountSeparator } from "@/lib/amount-separator";
import sanitizeText from "@/lib/sanitize-text";
import { Currency } from "@/types/global.types";
import { MyInvestmentMarketplace } from "@/types/my-investments.types";
import classNames from "classnames";
import Actions from "./actions";
import useActions from "@/store/actions";
import useCustomNavigation from "@/hooks/use-navigation";

export default function ListCard(
  props: MyInvestmentMarketplace & { sign: Currency["sign"] },
) {
  const { queryParams } = useCustomNavigation();
  const { ui } = useActions();
  const getStatusBg = () => {
    let statusClass = "";

    switch (sanitizeText(props.status)) {
      case "active":
        case "approved":
        return (statusClass = "bg-success-100/50 text-success-300");
      case "pending":
        return (statusClass = "bg-warning-100/50 text-warning-300");
      default:
        statusClass = "bg-neutral-100/50 text-neutral-300";
    }

    return classNames("", statusClass);
  };

  const data = {
    date: new Date(props.created_at).toLocaleDateString("en-us", {
      dateStyle: "full",
    }),
    asking_price: `${props.sign} ${amountSeparator(props.asking_price_per_unit)}(per unit)`,
    number_of_units: amountSeparator(props.units),
    status: <Badge className={getStatusBg()}> {props.status}</Badge>,
    selling_price: `${props.sign} ${amountSeparator(props.total_price)}`,
  };

  const remove = () => {
    const data = {
      name: props.product.name,
    };
    ui.changeDialog({
      show: true,
      type: "remove-investment-listing",
      id: props.id.toString(),
      data,
    });
    queryParams.set("action", "remove_listing");
  };

  const edit = () => {
    ui.changeDialog({
      show: true,
      type: "edit-investment-listing",
      id: props.id.toString(),
      data: props,
    });
    queryParams.set("action", "edit_listing");
  };

  return (
    <div className="p-3 space-y-5 rounded-lg border transition hover:bg-neutral-50 hover:shadow">
      <div className="flex justify-between items-start">
        <h1 className="highlight-accent text-neutral-700">
          {props.product.name}
        </h1>
        <Actions edit={edit} remove={remove} />
      </div>

      <div className="space-y-2">
        {Object.entries(data).map(([key, value]) => {
          return (
            <div key={key} className="flex justify-between capitalize content-standard text-neutral-700">
              <span>{key.split("_").join(" ")}</span>

              <span>{value}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
