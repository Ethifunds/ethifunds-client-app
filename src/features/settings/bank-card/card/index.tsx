import * as React from "react";
import TabContainer from "../../tab-container";
import getSavedCards from "@/services/settings/card/get-saved-cards";
import { useQuery } from "react-query";
import useCustomNavigation from "@/hooks/use-navigation";
import { SavedCard } from "@/types/saved-card.types";
import NoSavedCard from "./no-saved-card";
import Render from "@/components/render";
import CardList from "./card-list";
import AddNewCard from "./add-new-card";

export default React.memo(function Card() {
  const [savedCards, setSavedCards] = React.useState<SavedCard[]>([]);

  const { queryParams } = useCustomNavigation();

  const hasAction = queryParams.has("action");

  const { isFetching, isError, error } = useQuery(
    ["saved-cards", hasAction],
    () => getSavedCards(),
    {
      enabled: !hasAction && true,
      onSuccess(data) {
        setSavedCards(data);
      },
    },
  );

  const openAddNewCard = () => {
    queryParams.set("action", "add_card_popup");
  };

  const closePopup = () => {
    queryParams.delete("action");
  };

  React.useLayoutEffect(() => {
    queryParams.delete("action");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  
  return (
    <React.Fragment>
      <TabContainer
        value="card"
        title="Card"
        subTitle="Seamlessly manage your transactions by linking your bank cards to your Ethifunds Wallet"
        className="w-full space-y-5 py-0"
      >
        <div className="flex justify-center lg:w-3/5">
          <Render isLoading={isFetching} isError={isError} error={error}>
            {savedCards.length < 1 ? (
              <NoSavedCard open={openAddNewCard} />
            ) : (
              <CardList data={savedCards} open={openAddNewCard} />
            )}
          </Render>
        </div>
      </TabContainer>
    <AddNewCard close={closePopup} />
    </React.Fragment>
  );
});
