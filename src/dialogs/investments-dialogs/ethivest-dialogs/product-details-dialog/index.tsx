import AppButton from "@/components/app-button";
import ErrorBoundary from "@/components/error-boundary";
import Render from "@/components/render";
import AppDrawer from "@/components/ui/app-drawer";
import getProductDetails from "@/services/investments/get-product-details";
import { useAppSelector } from "@/store/hooks";
import * as React from "react";
import { useQuery } from "react-query";
import Details from "./details";
import useActions from "@/store/actions";

export default React.memo(function ProductDetailsDialog() {
  const { dialog } = useAppSelector((state) => state.ui);

  const { ui } = useActions();

  const productId = dialog.id;

  const { isFetching, isError, error, data } = useQuery(
    ["ethivest-product-details-dialog", productId],
    () => getProductDetails({ productId: Number(productId) }),
  );

  const open = React.useMemo(() => {
    return dialog.show && dialog.type === "ethivest_product_details";
  }, [dialog.show, dialog.type]);

  const toggleDrawer = (value: boolean) => {
    ui.changeDialog({
      show: value,
      id: "",
      type: "",
    });
  };

  const dismiss = () => toggleDrawer(false);

  return (
    <AppDrawer
      title="Investment Details"
      direction="right"
      open={open}
      handleChange={toggleDrawer}
      footer={
        !isFetching && (
          <AppButton
            variant="mute"
            className="bg-neutral-100 text-neutral-700"
            onClick={dismiss}
          >
            Dismiss
          </AppButton>
        )
      }
    >
      <Render isLoading={isFetching} isError={isError} error={error} loadingPosition="center">
        <ErrorBoundary>{data && <Details {...data} />}</ErrorBoundary>
      </Render>
    </AppDrawer>
  );
});
