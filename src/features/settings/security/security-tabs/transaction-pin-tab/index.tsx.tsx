import * as React from "react";
import TabContainer from "../../../tab-container";
import { useAppSelector } from "@/store/hooks";
import SetPinForm from "./forms/set-pin-form";
import ChangePinForm from "./forms/change-pin-form";
import GoBack from "@/components/go-back";

export default React.memo(function TransactionPinTab() {
  const { account } = useAppSelector((state) => state.account);
  // const [changePin, setChangePin] = React.useState(false);

  const hasPin = React.useMemo(() => {
    return account.has_set_pin;
  }, [account.has_set_pin]);

  // const toggle = () => {
  //   setChangePin(!changePin);
  // };

  return (
    <TabContainer
      title="Transaction Pin"
      subTitle="Secure your transactions with a 4-digit PIN"
      value="transaction_pin"
      utilityComponent={
       <GoBack className="absolute left-0 -top-7 text-xs"/>
      }
    >
      {!hasPin ? <SetPinForm /> : <ChangePinForm />}
    </TabContainer>
  );
});
