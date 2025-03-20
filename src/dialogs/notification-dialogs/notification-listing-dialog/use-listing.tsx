import * as React from "react";
import useAppSelectors from "@/store/use-app-selectors";
import useActions from "@/store/actions";
import { NotificationData } from "@/types/notification.types";
import { MyInvestmentMarketplace } from "@/types/my-investments.types";
import getProductDetails from "@/services/investments/get-product-details";
import { useQuery } from "react-query";
import { amountSeparator } from "@/lib/amount-separator";
import getUserById from "@/services/account/get-user-by-id";
import ensureError from "@/lib/ensure-error";
import { toast } from "sonner";
import acceptRejectOffer from "@/services/investments/accept-reject-offer";
import { Badge } from "@/components/ui/badge";

export default function useListing() {
  const { currency, account } = useAppSelectors("account");
  const { type, data } = useAppSelectors("notification");

  const [loadingType, setLoadingType] = React.useState<
    "rejected" | "approved" | ""
  >("");

  const { notification, ui } = useActions();

  const open = React.useMemo(() => {
    return type === "listing";
  }, [type]);

  const notificationData: NotificationData = React.useMemo(() => data, [data]);
  const activeUserIsSeller = React.useMemo(
    () => account.id === notificationData?.listing?.seller_product_id,
    [account.id, notificationData?.listing?.seller_product_id],
  );

  const productId = notificationData?.listing?.product_id;

  const buyerId = !activeUserIsSeller
    ? String(notificationData?.listing?.buyer_product_id ?? "")
    : null;

  const {
    isFetching,
    isError,
    error,
    data: investmentDetails,
  } = useQuery([productId], () => getProductDetails({ productId }), {
    enabled: productId && true,
  });

  const { isFetching: fetchingUser, data: userData } = useQuery(
    ["user-by-id", buyerId],
    () => getUserById({ id: buyerId ?? "" }),
    {
      enabled: !buyerId && false,
      onError(err) {
        const errMsg = ensureError(err).message;
        toast.error(errMsg);
      },
    },
  );

  const toggleShow = (value: boolean) => {
    if (loadingType) return value;

    notification.changeNotificationDialog({ type: "notifications" });
  };

  const close = () => {
    toggleShow(false);
  };
  const getDate = (date: string) =>
    new Date(date).toLocaleDateString("en-us", {
      dateStyle: "full",
    });

//   if (!notificationData?.listing) return;

  const details = notificationData?.listing as MyInvestmentMarketplace;

  const productDetails = {
    date: getDate(details?.created_at),
    investment_type: investmentDetails?.category.display_title,
    counter_price_per_unit: `${currency.sign} ${amountSeparator(details?.counter_price_per_unit)}`,
    purchasing_price: `${currency.sign} ${amountSeparator(details?.offer.offer_price)}`,
    purchasing_units: amountSeparator(details?.offer.units),
    status: <Badge className="bg-primary-500"> {details?.status} </Badge>,
  };

  const submit = async (status: "approved" | "rejected") => {
    if (!details?.id) return toast.error("listing Id not found, try refreshing");

    setLoadingType(status);
    try {
      await acceptRejectOffer({ status, listing_id: details.id.toString() });
      notification.resetNotificationDialog();
      showSuccessDialog(status);
    } catch (error) {
      const errMsg = ensureError(error).message;
      toast.error(errMsg);
    } finally {
      setLoadingType("");
    }
  };

  const showSuccessDialog = (status: typeof loadingType) => {
    const text =
      status === "approved"
        ? "Your Investment has been transferred successfully and your account will be credited shortly. Kindly check your email for your transfer details ."
        : "You have successfully rejected the investment offer. The relevant parties will be updated accordingly.";

    const data = {
      title: "Congratulations!!!",
      subtitle: text,
    };

    const dismiss = () => {
      ui.resetDialog();
      close();
    };
    ui.changeDialog({
      show: true,
      type: "success_dialog",
      data,
      dismiss: dismiss,
    });
  };

  return {
    open,
    isFetching: isFetching || fetchingUser,
    isError,
    error,
    userData,
    activeUserIsSeller,
    loadingType,
    productDetails,
    data,
    account,
    toggleShow,
    submit,
  };
}
