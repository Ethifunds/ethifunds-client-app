import { assets } from "@/constants";
import * as React from "react";
import { toast } from "sonner";
import ensureError from "@/lib/ensure-error";
import AppButton from "@/components/app-button";
import ErrorBoundary from "@/components/error-boundary";
import acceptEthivestTerms from "@/services/ethivest/accept-ethivest-terms";
import useCustomNavigation from "@/hooks/use-navigation";
import { useQuery } from "react-query";
import getInvestmentCategoryDetails from "@/services/investments/get-investment-category-details";
import Render from "@/components/render";
import AppContainer from "@/components/container/container";

type EthivestInvestmentProps = {
  showOverview(value: boolean): void;
};

export default function EthivestTerms(props: EthivestInvestmentProps) {
  const [isSettingUp, setIsSettingUp] = React.useState(false);

  const { params } = useCustomNavigation();

  const categoryId = String(params.categoryId);

  const { isFetching, error, isError, data } = useQuery(
    ["ethivest-category-details", params.categoryId],
    () => getInvestmentCategoryDetails({ categoryId }),
  );

  const acceptTerms = async () => {
    setIsSettingUp(true);
    try {
      await acceptEthivestTerms();
      props.showOverview(true);
    } catch (error) {
      const err = ensureError(error);
      toast.error(err.message);
    } finally {
      setIsSettingUp(false);
    }
  };

  return (
    <AppContainer>
      <Render isLoading={isFetching} isError={isError} error={error}>
        <ErrorBoundary>
          {data?.category && (
            <div className="flex flex-wrap lg:gap-16">
              <div className="w-1/4 lg:w-[15%]">
                <img
                  src={data.category.display_image}
                  alt={data.category.display_title}
                  className="w-full"
                />
              </div>
              <div className="[&_p]:highlight-standard flex flex-col gap-5 pt-5 text-neutral-1000 lg:w-[70%]">
                <h1 className="feature-standard">
                  {data.category.display_title}
                </h1>
                <div className="space-y-5">
                  <p>{data.category.description}</p>
                </div>

                <div className="flex items-start gap-3 rounded-lg bg-[#FFECE7] p-4">
                  <img src={assets.info_icon_01} alt="info icon" />
                  <p>
                    By clicking continue I agree to the <b>Terms</b> and{" "}
                    <b> Conditions</b> of the Ethifunds Investment Vault
                  </p>
                </div>

                <AppButton
                  variant="primary"
                  className="!rounded-lg text-white lg:w-1/2"
                  onClick={acceptTerms}
                  isLoading={isSettingUp}
                  disabled={isSettingUp}
                >
                  Continue
                </AppButton>
              </div>
            </div>
          )}
        </ErrorBoundary>
      </Render>
    </AppContainer>
  );
}
