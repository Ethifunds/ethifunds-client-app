import * as React from "react";
import BvnSuccessDialog from "./bvn-success-dialog";
import BvnErrorDialog from "./bvn-error-dialog";

export default function ProfileDialogs() {
  return (
    <React.Fragment>
      <BvnSuccessDialog />
      <BvnErrorDialog />
    </React.Fragment>
  );
}
