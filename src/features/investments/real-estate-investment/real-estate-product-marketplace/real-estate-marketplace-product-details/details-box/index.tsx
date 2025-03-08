import { Badge } from "@/components/ui/badge";
import { amountSeparator } from "@/lib/amount-separator";
import capitalize from "@/lib/capitalize";
import { useAppSelector } from "@/store/hooks";
import { investmentMarketplaceProduct } from "@/types/investments.types";
import useUi from "@/hooks/use-ui";

export default function DetailsBox(props: investmentMarketplaceProduct) {
  useUi({ title: "REITs" });

  const { currency } = useAppSelector((state) => state.account);

  const availableUnits = props.units;

  return (
    <div className="w-full space-y-5 rounded-xl border border-neutral-100 p-4">
      <div className="space-y-5">
        <Badge className="highlight-standard border-success-100 !bg-[#A4F4E74D] text-success-300">
          Real Estate
        </Badge>
        <div className="flex flex-col justify-between gap-2 text-neutral-1000 lg:flex-row lg:items-center">
          <h1 className="feature-bold capitalize">{props.product.name}</h1>
          <span className="highlight-accent">
            by {capitalize(props.product.custodian.name)}
          </span>
        </div>
        <div className="flex items-center">
          Seller's Username:
          <span className="highlight-accent">
            {capitalize(props.seller_investment_info.user.username)}
          </span>
        </div>

        <div className="flex items-center justify-between lg:justify-normal lg:gap-10">
          <div className="flex flex-col gap-2 lg:flex-row lg:items-center">
            <span className="feature-bold text-success-200">
              {props.product.expected_roi}%
            </span>
            <span className="highlight-standard text-neutral-500">
              Expected Returns
            </span>
          </div>

          <div className="flex flex-col gap-2 lg:flex-row lg:items-center">
            <span className="feature-bold text-neutral-1000">
              {availableUnits}
            </span>
            <span className="highlight-accent text-secondary">
              Available Units
            </span>
          </div>
        </div>
      </div>
      {/* <div>
        <p className="highlight-standard text-neutral-500">
          {props.product.description}
        </p>
      </div> */}
      <div className="flex flex-col gap-5 lg:flex-row lg:justify-between lg:items-center">
        <h1 className="feature-bold flex items-center gap-3 text-neutral-1000">
          <span className="highlight-accent">Asking price</span>
          {currency.sign}
          {amountSeparator(props.asking_price_per_unit)}{" "}
          <span className="highlight-bold text-primary">Per Unit</span>
        </h1>

        <h1 className="highlight-accent text-neutral-1000">
          Listing Date:{" "}
          {new Date(props.created_at).toLocaleDateString("en-us", {
            dateStyle: "full",
          })}
        </h1>
      </div>
  
    </div>
  );
}
