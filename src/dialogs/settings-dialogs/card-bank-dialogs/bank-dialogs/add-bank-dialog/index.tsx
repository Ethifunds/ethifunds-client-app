import ErrorBoundary from "@/components/error-boundary";
import AppDrawer from "@/components/ui/app-drawer";
import * as React from "react";
import useAddAccount from "./use-add-bank";
import Form from "./form";

export default React.memo(function AddBankDialog() {
  const { open, toggleDrawer } = useAddAccount();
  return (
    <React.Fragment>
      <ErrorBoundary>
        <AppDrawer
          title="Withdraw Funds"
          open={open}
          direction="right"
          handleChange={toggleDrawer}
          className="hide-scrollbar overflow-auto"
        >
          <Form toggleDrawer={toggleDrawer} open={open} />
        </AppDrawer>
      </ErrorBoundary>
    </React.Fragment>
  );
});
