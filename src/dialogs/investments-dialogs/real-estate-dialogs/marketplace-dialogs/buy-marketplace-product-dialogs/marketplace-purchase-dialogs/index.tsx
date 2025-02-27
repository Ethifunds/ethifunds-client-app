import ErrorBoundary from "@/components/error-boundary";
import Render from "@/components/render";
import AppDrawer from "@/components/ui/app-drawer";
import getMarketplaceProductDetails from "@/services/investments/get-marketplace-product-details";
import useActions from "@/store/actions";
import { useAppSelector } from "@/store/hooks";
import * as React from "react";
import { useQuery } from "react-query";
import Form from "./form";

export default function MarketplacePurchaseDialog() {
  const { dialog } = useAppSelector((state) => state.ui);
  const { ui } = useActions();

  const { isFetching, isError, error, data } = useQuery(
    ["market-place-purchase", dialog.id],
    () => getMarketplaceProductDetails({ listingId: Number(dialog.id) }),
  );

  const open = React.useMemo(() => {
    return dialog.show && dialog.type === "real-estate-marketplace-purchase";
  }, [dialog.show, dialog.type]);

  const toggleShow = (val: boolean) => {
    ui.changeDialog({
      show: val,
      type: "",
      id: "",
    });
  };

  return (
    <React.Fragment>
      <ErrorBoundary>
        <AppDrawer
          title="Marketplace"
          open={open}
          direction="right"
          handleChange={toggleShow}
          className="hide-scrollbar"
        >
          <div className="flex h-full flex-col space-y-10 overflow-auto px-4 py-10">
            <h1 className="content-standard text-neutral-500">
              Use the form below to buy units from other in this investment.
            </h1>

            <Render isLoading={isFetching} isError={isError} error={error}>
              {data && <Form data={data} />}
            </Render>
          </div>
        </AppDrawer>
      </ErrorBoundary>
    </React.Fragment>
  );
}
