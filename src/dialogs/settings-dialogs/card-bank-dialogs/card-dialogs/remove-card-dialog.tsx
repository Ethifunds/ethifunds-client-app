import AppButton from "@/components/app-button";
import Render from "@/components/render";
import { Badge } from "@/components/ui/badge";
import { PopupModal } from "@/components/ui/modal";
import cardBrands from "@/constants/card-brands";
import useCustomNavigation from "@/hooks/use-navigation";
import ensureError from "@/lib/ensure-error";
import sanitizeText from "@/lib/sanitize-text";
import getSavedCards from "@/services/settings/card/get-saved-cards";
import removeCard from "@/services/settings/card/remove-card";
import useActions from "@/store/actions";
import { useAppSelector } from "@/store/hooks";
import { SavedCard } from "@/types/saved-card.types";
import * as React from "react";
import { useQuery } from "react-query";
import { toast } from "sonner";

export default React.memo(function RemoveCardDialog() {
  const [card, setCard] = React.useState<SavedCard | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const { dialog } = useAppSelector((state) => state.ui);
  const { ui } = useActions();
  const { queryParams } = useCustomNavigation();

  const open = React.useMemo(() => {
    return dialog.show && dialog.type === "remove_card";
  }, [dialog.show, dialog.type]);

  const { isFetching, isError, error } = useQuery(
    ["remove-savedCard", dialog.id],
    () => getSavedCards(),
    {
      enabled: open,
      onSuccess(data) {
        const match = data.find((item) => item.id === Number(dialog.id));

        if (match) {
          return setCard(match);
        }
      },
    },
  );

  const logoIdx = React.useMemo(() => {
    if (!card) return 0;
    return cardBrands.findIndex(
      (item) => sanitizeText(item.name) === sanitizeText(card.brand),
    );
  }, [card]);

  const close = () => {
    if (isLoading) return;
    queryParams.delete("action");

    ui.changeDialog({
      show: false,
      type: "",
      id: "",
    });
  };

  const showSuccess = () => {
    const data = {
      title: "Success!!!",
      subtitle: "Card has been successfully removed from your saved cards",
    };

    ui.changeDialog({
      show: true,
      type: "success_dialog",
      data,
      action: close,
    });
  };

  const remove = async () => {
    if (!card) {
      return toast.info("No Card was selected try restarting the process");
    }

    setIsLoading(true);
    try {
      await removeCard({ user_saved_card_id: card.id });
      showSuccess();
    } catch (error) {
      const errMsg = ensureError(error).message;
      toast.error(errMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PopupModal
      handleClose={close}
      open={open}
      className="relative h-60 w-full space-y-5 rounded-xl py-8 lg:h-auto lg:w-[30%] lg:rounded-3xl"
      showCloseBtn
    >
      <div className="text-center">
        <h1 className="feature-accent text-neutral-1000">Remove Saved Card</h1>
        <span className="caption-standard text-neutral-500">
          Are you sure you want to remove this card?
        </span>
      </div>
      <Render
        isLoading={isFetching}
        isError={isError}
        error={error}
        loadType="simple"
        size="md"
      >
        {card && (
          <div className="flex flex-col gap-5">
            <div className="flex items-start justify-between rounded-lg border p-4 transition hover:bg-neutral-100/20">
              <div className="flex grow items-center gap-3">
                <Badge
                  variant={"outline"}
                  className="flex h-8 w-10 items-center justify-center rounded-sm border-neutral-100 p-1"
                >
                  <img
                    src={cardBrands[logoIdx < 0 ? 0 : logoIdx].logo}
                    alt={card.brand}
                    className="size-full"
                  />
                </Badge>

                <div className="flex grow flex-col gap-1 capitalize">
                  <h1 className="content-bold">
                    {card.account_name.toLowerCase()}
                  </h1>
                  <div className="caption-accent flex grow justify-between text-neutral-500">
                    <span>**** **** **** {card.last4}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-between gap-5 [&_button]:w-full">
              <AppButton
                variant="outline"
                className="rounded-lg text-neutral-700"
                onClick={close}
                disabled={isLoading}
              >
                Cancel
              </AppButton>

              <AppButton
                variant="destructive"
                className="rounded-lg text-neutral-base_white"
                onClick={remove}
                isLoading={isLoading}
              >
                Remove
              </AppButton>
            </div>
          </div>
        )}
      </Render>
    </PopupModal>
  );
});
