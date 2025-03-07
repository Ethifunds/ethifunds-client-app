import * as React from "react";
import TwoFactoryAuthDialogs from "./two-factory-auth-dialogs";

export default React.memo(function SecurityDialogs() {
  return (
    <React.Fragment>
      <TwoFactoryAuthDialogs />
    </React.Fragment>
  );
});
