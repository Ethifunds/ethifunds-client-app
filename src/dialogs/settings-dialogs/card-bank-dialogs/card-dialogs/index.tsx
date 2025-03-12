import * as React from "react";
import RemoveCardDialog from "./remove-card-dialog";

export default React.memo(function CardDialogs() {
  return (
    <React.Fragment>
      <RemoveCardDialog />
    </React.Fragment>
  );
});
