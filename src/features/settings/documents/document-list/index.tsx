import EmptyData from "@/components/empty-data";
import ErrorBoundary from "@/components/error-boundary";
import Render from "@/components/render";
import getUserDocuments from "@/services/settings/documents/get-user-documents";
import * as React from "react";
import { useQuery } from "react-query";
import DocumentCard from "./document-card";

type DocumentListProps = {
  openUpload(): void;
  hasAction: boolean;
};
export default React.memo(function DocumentList(props: DocumentListProps) {

  const { isFetching, isError, error, data } = useQuery(
    ["user-documents"],
    () => getUserDocuments(),
    {
      enabled: !props.hasAction && true,
    },
  );
  return (
    <ErrorBoundary>
      <Render
        isLoading={isFetching}
        isError={isError}
        error={error}
        loadType="simple"
      >
        {data && data?.length < 1 ? (
          <EmptyData
            title="No document has been uploaded Yet"
            text="No document uploaded yet. All uploaded Documents will appear here."
          />
        ) : (
          <div className="space-y-4 lg:w-3/5">
            {data?.map((item) => (
              <DocumentCard
                key={item.id}
                {...item}
                openUpload={props.openUpload}
              />
            ))}
          </div>
        )}
      </Render>
    </ErrorBoundary>
  );
});
