import * as React from "react";
import SetPinDialog from "./set-pin-dialog";
import EnterPinDialog from "./enter-pin-dialog";

export default React.memo(function PinDialogs() {
  return (
    <React.Fragment>
      <SetPinDialog />
      <EnterPinDialog />
    </React.Fragment>
  );
});
