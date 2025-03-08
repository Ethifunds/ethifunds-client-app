import { investmentMarketplaceProduct } from "@/types/investments.types";
import useForm from "./use-form";
import { Input } from "@/components/ui/form-input";
import { amountSeparator } from "@/lib/amount-separator";
import { assets, infos } from "@/constants";
import AppButton from "@/components/app-button";
import AppTooltip from "@/components/ui/app-tooltip";

type FormProps = {
  data: investmentMarketplaceProduct;
};
export default function Form(props: FormProps) {
  const { currency, formData, updateForm, showPreview, reset } = useForm(
    props.data,
  );



  return (
    <div className="flex h-full flex-1 flex-col gap-5 overflow-auto">
      <form className="flex flex-col gap-5">
        <Input
          name="seller_name"
          label="Sellers Username"
          containerStyle="[&_label]:text-neutral-700"
          value={`@${props.data.seller_investment_info.user.username}`}
          disabled
          readOnly
        />

        <div>
          <Input
            name="units"
            label="Select quantity"
            type="number"
            inputMode="numeric"
            containerStyle="[&_label]:text-neutral-700"
            value={formData.units}
            step={1}
            min={1}
            max={props.data.units}
            maxLength={props.data.units.toString().length}
            onChange={(e) => updateForm("units", e)}
          />

          <div className="flex items-center gap-1 px-1.5 text-neutral-500">
            <AppTooltip
              trigger={<img src={assets.info_icon_02} alt="info icon" />}
              title={infos.tooltipInfo.asking_price.title}
              content={infos.tooltipInfo.asking_price.content}
            />

            <span>
              <em>
                {currency.sign}{" "}
                {amountSeparator(props.data.asking_price_per_unit)}
              </em>{" "}
              per unit asking price
            </span>
          </div>
        </div>

        <Input
          name="counter_price_per_unit"
          label={`Preferred Price Per Unit (${currency.sign})`}
          value={formData.counter_price_per_unit}
          containerStyle="[&_label]:text-neutral-700"
          placeholder={`${amountSeparator(Number(props.data.asking_price_per_unit) * formData.units)}`}
          onChange={(e) => updateForm("counter_price_per_unit", e)}
        />
      </form>
      <div className="flex grow items-end justify-between gap-8">
        <AppButton variant="primary" onClick={showPreview} className="w-full">
          Proceed
        </AppButton>

        <AppButton
          variant="outline"
          className="w-full border-primary text-primary"
          onClick={reset}
        >
          Cancel
        </AppButton>
      </div>
    </div>
  );
}
