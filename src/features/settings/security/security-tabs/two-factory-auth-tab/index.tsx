import AppButton from "@/components/app-button";
import TabContainer from "@/features/settings/tab-container";
import { useAppSelector } from "@/store/hooks";
import classNames from "classnames";
import * as React from "react";
import Form from "./form";
import disable2fa from "@/services/account/disable-2fa";
import ensureError from "@/lib/ensure-error";
import { toast } from "sonner";
import EmptyData from "@/components/empty-data";
import { assets } from "@/constants";

export default React.memo(function TwoFactoryAuthTab() {
  const { account } = useAppSelector((state) => state.account);

  const is2faEnabled = React.useMemo(() => {
    return account.two_factor ? true : false;
  }, [account.two_factor]);

 console.log(account);
 

  const [enable2fa, setEnable2fa] = React.useState(is2faEnabled);
  const [isLoading, setIsLoading] = React.useState(false);

  const enable = () => {
    setEnable2fa(true);
  };

  const disable = async () => {
    setIsLoading(true);
    try {
      await disable2fa();
      toast.success("Two-Factory Authentication Disabled Successfully", {
        duration: 8000,
        dismissible: true,
      });
      setEnable2fa(false);
    } catch (error) {
      const errMsg = ensureError(error).message;
      toast.error(errMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const cn = classNames("text-primary border-primary lg:w-40", {
    "text-white bg-primary": !enable2fa,
  });

  return (
    <TabContainer
      value="2fa"
      title="Two-factor authentication"
      subTitle="Secure your account by enabling two-factor authentication to add an extra layer of security
"
      className="space-y-8"
      utilityComponent={
        <AppButton
          variant="outline"
          className={cn}
          onClick={enable2fa ? disable : enable}
          isLoading={isLoading}
        >
          {enable2fa ? "Disable" : "Enable"} 2FA
        </AppButton>
      }
    >
      {enable2fa ? (
        <Form />
      ) : (
        <EmptyData
          title="Two-Factory Authentication Not Enabled"
          text="Secure your account by enabling two-factor authentication to add an extra layer of security"
          icon={assets.safe_lock_01}
          className="space-y-2"
        />
      )}
    </TabContainer>
  );
});
