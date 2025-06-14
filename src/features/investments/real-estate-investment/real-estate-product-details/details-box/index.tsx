import { Badge } from "@/components/ui/badge";
import { amountSeparator } from "@/lib/amount-separator";
import capitalize from "@/lib/capitalize";
import { useAppSelector } from "@/store/hooks";
import { InvestmentProduct } from "@/types/investments.types";
import ProductProgress from "@/components/investment/product-progress";
import useUi from "@/hooks/use-ui";

export default function DetailsBox(props: InvestmentProduct) {
  useUi({ title: "REITs" });

  const { currency } = useAppSelector((state) => state.account);
  const isSoldOut = props.units_sold === props.total_units;
  const availableUnits = Math.floor(props.total_units - props.units_sold);

  return (
    <div className="w-full p-4 space-y-5 border rounded-xl border-neutral-100">
      <div className="space-y-5">
        <Badge className="highlight-standard border-success-100 !bg-[#A4F4E74D] text-success-300">
          Real Estate
        </Badge>
        <div className="flex flex-col justify-between gap-2 text-neutral-1000 lg:flex-row lg:items-center">
          <h1 className="capitalize feature-bold">{props.name}</h1>
         {props.custodian?.name && <span className="highlight-accent">
            by {capitalize(props.custodian?.name??"")} 
          </span>}
        </div>

        <div className="flex items-center justify-between lg:justify-normal lg:gap-10">
          <div className="flex flex-col gap-2 lg:flex-row lg:items-center">
            <span className="feature-bold text-success-200">
              {props.expected_roi}%
            </span>
            <span className="highlight-standard text-neutral-500">
              Expected Returns
            </span>
          </div>
          {isSoldOut ? (
            <h2 className="highlight-accent text-error-200"> Sold Out</h2>
          ) : (
            <div className="flex flex-col gap-2 lg:flex-row lg:items-center">
              <span className="feature-bold text-neutral-1000">
                {availableUnits}
              </span>
              <span className="highlight-accent text-secondary">
                Available Units
              </span>
            </div>
          )}
        </div>
      </div>
      <div>
        <p className="highlight-standard text-neutral-500">
          {props.description}
        </p>
      </div>
      <h1 className="heading-4 text-neutral-1000">
        {currency.sign}
        {amountSeparator(props.unit_price)}{" "}
        <span className="feature-bold text-primary">Per Unit</span>
      </h1>

      <ProductProgress
        unit_price={props.unit_price}
        units_sold={props.units_sold}
        total_units={props.total_units}
        sign={currency.sign}
      />
    </div>
  );
}
