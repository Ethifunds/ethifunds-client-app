import * as React from "react";
import TabContainer from "../tab-container";
import AppButton from "@/components/app-button";
import { UploadIcon } from "lucide-react";
import useActions from "@/store/actions";
import useCustomNavigation from "@/hooks/use-navigation";
import DocumentList from "./document-list";

export default React.memo(function Documents() {
  const { ui } = useActions();
  const { queryParams } = useCustomNavigation();
  const hasAction = React.useMemo(
    () => queryParams.has("action"),
    [queryParams],
  );

  const showUploadDialog = () => {
    queryParams.set("action", "upload_document");
    ui.changeDialog({
      show: true,
      type: "upload_documents",
    });
  };

  React.useLayoutEffect(() => {
    queryParams.delete("action");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      className="space-y-5"
    >
      <DocumentList hasAction={hasAction} openUpload={showUploadDialog} />
    </TabContainer>
  );
});
