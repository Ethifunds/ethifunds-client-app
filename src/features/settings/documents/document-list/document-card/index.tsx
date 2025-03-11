import { assets } from "@/constants";
import { DocumentStatus, UserDocument } from "@/types/user-document.types";
import Actions from "./actions";
import classNames from "classnames";

export default function DocumentCard(
  props: UserDocument & { openUpload(): void },
) {
  return (
    <div className="flex justify-between items-center rounded-lg border p-3 shadow-sm [&_div]:space-y-1">
      <div className="">
        <h4 className="content-bold capitalize text-neutral-1000">
          {" "}
          {props.document_type === "id" ? "identity Card" : "Utility Bill"}
        </h4>

        <div className="content-standard flex items-center gap-1 text-neutral-500">
          <img src={assets.file_01} alt="document" />
          <span>{props.file_name}</span>
        </div>
      </div>

      <div className="flex flex-col items-end">
        <Actions openUpload={props.openUpload} />

        <UploadStatus status={props.status} />
      </div>
    </div>
  );
}

function UploadStatus({ status }: { status: DocumentStatus }) {
  const cn = classNames("caption-accent capitalize", {
    "text-success-200": status === "successful",
    "text-warning-200": status === "pending",
    "text-error-200": status === "failed",
  });

  return <span className={cn}>{status}</span>;
}
