import AppDrawer from "@/components/ui/app-drawer";
import * as React from "react";
import useUploadDocument from "./use-upload-document";
import SelectBox from "@/components/select-box";
import { documentUploadTypes, identityType } from "./data";
import { Badge } from "@/components/ui/badge";
import { assets } from "@/constants";
import AppButton from "@/components/app-button";

export default React.memo(function UploadDocumentDialog() {
  const {
    isLoading,
    open,
    uploadType,
    formData,
    changeUploadType,
    updateForm,
    toggleDrawer,
  } = useUploadDocument();

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
            value={uploadType}
            placeholder="Select Upload Type"
            onchange={(e) => changeUploadType(e)}
            options={documentUploadTypes}
            disabled={isLoading}
          />

          {uploadType === "identity_card" && (
            <SelectBox
              value={formData.type}
              placeholder="Select Identity type"
              onchange={(e) => updateForm("type", e)}
              options={identityType}
              disabled={isLoading}
            />
          )}

          {uploadType && (
            <div className="flex justify-center rounded-lg border p-3">
              <label
                htmlFor="upload-doc"
                className="flex cursor-pointer flex-col items-center gap-2"
              >
                <Badge className="size-10 rounded-full bg-neutral-100">
                  <img src={assets.upload_icon_01} alt="upload-icon" />
                </Badge>
                <span className="caption-accent">Click to Upload</span>
                <span className="caption-standard text-neutral-500">
                  SVG, PNG, JPG (max. 800x400px)
                </span>
              </label>

              <input
                type="file"
                name="upload-doc"
                id="upload-doc"
                className="hidden"
                disabled={isLoading}
              />
            </div>
          )}
        </div>

        <div className="flex h-full grow items-end">
          <AppButton variant="primary" className="w-full" isLoading={isLoading}>
            Submit
          </AppButton>
        </div>
      </div>
    </AppDrawer>
  );
});
