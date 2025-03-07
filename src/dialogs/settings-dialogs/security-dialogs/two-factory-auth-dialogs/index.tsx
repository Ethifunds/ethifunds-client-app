import * as React from "react";
import QrCodeDialog from "./qr-code-dialog";

export default React.memo(function TwoFactoryAuthDialogs() {
  return (
    <React.Fragment>
      <QrCodeDialog />
    </React.Fragment>
  );
});
