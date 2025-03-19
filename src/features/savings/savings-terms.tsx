import { assets } from "@/constants";
import * as React from "react";
import { useAppSelector } from "@/store/hooks";
import useCustomNavigation from "@/hooks/use-navigation";
import { toast } from "sonner";
import setupVault from "@/services/investments/vault/setup-vault";
import ensureError from "@/lib/ensure-error";
import AppButton from "@/components/app-button";
import ErrorBoundary from "@/components/error-boundary";

export default function SavingsTerms() {
  const { currency } = useAppSelector((state) => state.account);
  const [isSettingUp, setIsSettingUp] = React.useState(false);
  const { navigate } = useCustomNavigation();

  const setup = async () => {
    if (!currency.code)
      return toast.error("no currency set, try switching currency");
    setIsSettingUp(true);
    try {
      await setupVault({ currency: currency.code });
      navigate("/investments/vault/overview", { replace: true });
    } catch (error) {
      const err = ensureError(error);
      toast.error(err.message);
    } finally {
      setIsSettingUp(false);
    }
  };

  return (
    <ErrorBoundary>
      <div className="flex flex-wrap lg:gap-16">
        <div className="w-1/4 lg:w-[15%]">
          <img
            src={assets.piggyBank_01}
            alt="investment vault"
            className="w-full"
          />
        </div>
        <div className="[&_p]:highlight-standard flex flex-col gap-5 pt-5 text-neutral-1000 lg:w-[70%]">
          <h1 className="feature-standard">Ethicoop Savings</h1>
          <div className="space-y-5">
            <p>
              Ethicoop is a high-yield, Shariah-compliant cooperative savings
              wallet that enables group savings with a minimum monthly
              contribution of N50,000. The product offers quarterly dividends to
              shareholders, providing a structured, interest-free savings model
              that aligns with Islamic finance principles. <br /> Subscribers to
              Ethicoop can benefit from automated or manual monthly
              contributions, with the flexibility to make surplus contributions.
              Quarterly dividends are credited to the Ethicoop wallet, accruing
              over time and becoming available for withdrawal after a one-year
              tenure. Users have the option for an early, quarterly withdrawal
              if they provide a one-month notice.
            </p>
          </div>

          <div className="flex items-start gap-3 rounded-lg bg-[#FFECE7] p-4">
            <img src={assets.info_icon_01} alt="info icon" />
            <p>
              By clicking Subscribe I agree to the <b>Terms</b> and{" "}
              <b> Conditions</b> of the Ethicoop Savings
            </p>
          </div>

          <AppButton
            variant="primary"
            className="!rounded-lg text-white lg:w-1/2"
            onClick={setup}
            isLoading={isSettingUp}
            disabled={isSettingUp}
          >
            Subscribe
          </AppButton>
        </div>
      </div>
    </ErrorBoundary>
  );
}
