import AppDrawer from "@/components/ui/app-drawer";
import * as React from "react";
import useUploadDocument from "./use-upload-document";
import SelectBox from "@/components/select-box";
import { documentUploadTypes } from "./data";
import { Badge } from "@/components/ui/badge";
import { assets } from "@/constants";
import AppButton from "@/components/app-button";
import { Input } from "@/components/ui/form-input";

export default React.memo(function UploadDocumentDialog() {
  const { isLoading, open, formData, updateForm, toggleDrawer, submit } =
    useUploadDocument();

  return (
    <AppDrawer
      open={open}
      title="Upload Document"
      handleChange={toggleDrawer}
      direction="right"
    >
      <div className="flex h-full flex-col gap-5 p-4">
        <span className="content-standard text-neutral-500">
          Select and upload documents here to complete account verification.
        </span>

        <div className="flex flex-col gap-4">
          <SelectBox
            value={formData.document_type}
            placeholder="Select Upload Type"
            onchange={(e) => updateForm("document_type", e)}
            options={documentUploadTypes}
            disabled={isLoading}
          />

          {formData.document_type === "id" && (
            <Input
              name="id_number"
              // label="Identity Number"
              placeholder="enter ID number(NIN, Passport No, license No)"
              value={formData.id_number}
              onChange={(e) => updateForm("id_number", e.target.value)}
              className="placeholder:text-sm"
              disabled={isLoading}
            />
          )}

          {formData.document_type === "proof_of_address" && (
            <div>
              <label htmlFor="proof_of_address" className="inline-flex gap-1 items-center">
                <span className="caption-accent"> Residential Address </span>
                <small className="cation-standard">(must match with address in bill)</small>
              </label>
              <Input
                name="proof_of_address"
                placeholder="Enter Residential Address"
                value={formData.address}
                onChange={(e) => updateForm("address", e.target.value)}
                className="placeholder:text-sm"
                disabled={isLoading}
              />
            </div>
          )}

          {formData.document_type && (
            <div className="flex justify-center rounded-lg border p-3">
              <label
                htmlFor="upload-doc"
                className="flex cursor-pointer flex-col items-center gap-2"
              >
                <Badge className="size-10 rounded-full bg-neutral-100">
                  <img src={assets.upload_icon_01} alt="upload-icon" />
                </Badge>
                <span className="caption-accent">
                  {formData?.document?.name ?? "Click to Upload"}
                </span>
                <span className="caption-standard text-neutral-500">
                  SVG, PNG, JPG (max. 800x400px)
                </span>
              </label>

              <input
                type="file"
                name="upload-doc"
                id="upload-doc"
                accept=".png, .jpg, .jpeg, .pdf"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0] || null;
                  if (file) updateForm("document", file);
                }}
                disabled={isLoading}
              />
            </div>
          )}
        </div>

        <div className="flex h-full grow items-end">
          <AppButton
            variant="primary"
            className="w-full"
            isLoading={isLoading}
            onClick={submit}
          >
            Submit
          </AppButton>
        </div>
      </div>
    </AppDrawer>
  );
});
