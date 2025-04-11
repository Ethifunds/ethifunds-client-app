import useCustomNavigation from "@/hooks/use-navigation";
import * as React from "react";
import DetailsBox from "./details-box";
import { investmentMarketplaceProduct } from "@/types/investments.types";
import ErrorBoundary from "@/components/error-boundary";
import AppButton from "@/components/app-button";
import useActions from "@/store/actions";

export default React.memo(function RealEstateMarketplaceProductDetails(
  props: investmentMarketplaceProduct,
) {
  const { params } = useCustomNavigation();
  const categoryId = Number(params.categoryId);
  const { ui } = useActions();

  if (categoryId !== props.product?.product_category_id) return;

  const openDrawer = () => {
    ui.changeDialog({
      show: true,
      type: "real-estate-marketplace-purchase",
      id: props.id.toString(),
    });
  };

  return (
    <ErrorBoundary>
      <div className="flex flex-col items-start gap-10 lg:flex-row">
        <div className="w-full lg:w-1/5">
          <img
            src={props.product?.display_image}
            alt={props.product?.name.slice(0, 5)}
            className="size-full max-h-96 rounded-lg object-cover"
          />
        </div>

        <div className="w-full space-y-8">
          <DetailsBox {...props} />
          {/* <MetricsBox /> */}
          <div className="">
            <AppButton
              variant="primary"
              className="w-full rounded-lg text-white lg:w-1/3"
              onClick={openDrawer}
            >
              Buy Now
            </AppButton>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
});
