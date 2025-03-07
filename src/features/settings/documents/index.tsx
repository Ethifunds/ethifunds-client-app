import * as React from "react";
import TabContainer from "../tab-container";
import AppButton from "@/components/app-button";

import { UploadIcon } from "lucide-react";
import useActions from "@/store/actions";

export default React.memo(function Documents() {
  const { ui } = useActions();

  const showUploadDialog = () => {
    ui.changeDialog({
      show: true,
      type: "upload_documents",
    });
  };

  return (
    <TabContainer
      value="documents"
      title="Documents Verification"
      subTitle="Verify your identity by uploading the required documents to complete your Ethifunds account setup"
      utilityComponent={
        <AppButton
          variant="outline"
          onClick={showUploadDialog}
          className="mt-1 flex items-center justify-center border-primary text-primary"
          leftIcon={<UploadIcon strokeWidth={1.5} />}
        >
          Upload Document
        </AppButton>
      }
    >
      upload document
    </TabContainer>
  );
});
