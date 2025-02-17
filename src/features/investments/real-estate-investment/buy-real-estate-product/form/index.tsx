import useWalletBalance from "@/hooks/use-wallet-balance";
import useForm, { FormProps } from "./use-form";
import Spinner from "@/components/spinner";
import { amountSeparator } from "@/lib/amount-separator";
import { Input } from "@/components/ui/input";
import { assets } from "@/constants";
import { unitsList } from "./data";
import { Badge } from "@/components/ui/badge";
import AppButton from "@/components/app-button";
import useSeo from "@/hooks/use-seo";
import useUi from "@/hooks/use-ui";

export default function Form(props: FormProps) {
  useSeo({ pageTitle: "REITs - Buy Now" });
  useUi({ title: "REIT" });

  const { isFetching, currency, wallet, refreshBalance } = useWalletBalance();
  const refresh = () => {
    refreshBalance();
  };
  const useFormProps = {
    ...props,
    refresh,
  };
  const {
    isLoading,
    formData,
    purchaseAmount,
    availableUnits,
    setUnits,
    proceed,
    updateForm,
  } = useForm(useFormProps);

  return (
    <form className="space-y-5 lg:max-w-[40%]">
      <div className="flex items-center gap-3 text-primary">
        <span>Wallet Balance:</span>{" "}
        {isFetching ? (
          <Spinner />
        ) : (
          <span className="font-bold">
            {currency.sign} {amountSeparator(wallet)}
          </span>
        )}
      </div>

      <div className="space-y-2">
        <div className="flex justify-between">
          <label htmlFor="units">Units</label>
          <span className="content-accent text-success-200">
            {availableUnits} Available Units
          </span>
        </div>
        <Input
          name="units"
          value={formData.units}
          inputMode="numeric"
          placeholder="Enter Units"
          onChange={(value) => updateForm("units", value)}
          className="rounded-lg"
          disabled={isLoading}
        />
        <div className="content-standard flex gap-1 pl-1 text-neutral-500">
          <img src={assets.info_icon_02} alt="info icon" />
          <strong>
            {currency.sign} {amountSeparator(props.unit_price)}
          </strong>
          <span>Current Unit Price</span>
        </div>

        <div className="flex flex-wrap gap-2 py-3">
          {unitsList.map((item) => (
            <Badge
              onClick={() => setUnits(item.value)}
              key={item.value}
              variant={"outline"}
              className="cursor-pointer rounded-sm px-2.5 py-1.5 text-neutral-500 transition-all hover:bg-primary hover:text-white"
            >
              {item.title}
            </Badge>
          ))}

          <Badge
            onClick={() => setUnits(availableUnits)}
            variant={"outline"}
            className="cursor-pointer rounded-sm px-2.5 py-1.5 text-neutral-500 transition-all hover:bg-primary hover:text-white"
          >
            Max Units
          </Badge>
        </div>
      </div>

      <div className="space-y-1">
        <label htmlFor="amount">Amount({currency.sign}) </label>

        <Input
          name="amount"
          value={amountSeparator(purchaseAmount)}
          placeholder="Purchase Amount"
          className="rounded-lg"
          readOnly
          disabled
        />
      </div>

      <div className="flex">
        <AppButton
          isLoading={isLoading}
          onClick={proceed}
          variant="primary"
          className="w-full rounded-lg text-white"
        >
          Proceed to Payment
        </AppButton>
      </div>
    </form>
  );
}
