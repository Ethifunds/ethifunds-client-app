import * as React from "react";
import TabContainer from "../../../tab-container";
import { useAppSelector } from "@/store/hooks";
import SetPinForm from "./forms/set-pin-form";
import ChangePinForm from "./forms/change-pin-form";

export default React.memo(function TransactionPinTab() {
  const { account } = useAppSelector((state) => state.account);
  // const [changePin, setChangePin] = React.useState(false);

  const hasPin = React.useMemo(() => {
    return account.user_verifications.has_set_pin;
  }, [account.user_verifications.has_set_pin]);

  // const toggle = () => {
  //   setChangePin(!changePin);
  // };

  return (
    <TabContainer
      title="Transaction Pin"
      subTitle="Secure your transactions with a 4-digit PIN"
      value="transaction_pin"
      // utilityComponent={
      //   hasPin && (
      //     <AppButton
      //       variant="outline"
      //       onClick={toggle}
      //       className="rounded-lg border-primary py-2 text-primary"
      //     >
      //       {changePin ? "Set Pin" : "Change Pin"}
      //     </AppButton>
      //   )
      // }
    >
      {!hasPin ? <SetPinForm /> : <ChangePinForm />}
    </TabContainer>
  );
});
