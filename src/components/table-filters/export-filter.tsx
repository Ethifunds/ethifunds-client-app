import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import * as React from "react";

import exportTransactions from "@/services/export-transactions";
import { toast } from "sonner";
import ensureError from "@/lib/ensure-error";
import Spinner from "@/components/spinner";

type ExportFilterProps = {
  disabled: boolean;
  url: string;
};
export default function ExportFilter(props: ExportFilterProps) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [exportFormat, setExportFormat] = React.useState("Format");

  const sendExport = React.useCallback(
    async (format: string) => {
      setIsLoading(true);
      try {
        const url = `${props.url}?${format}`;
        await exportTransactions({ url });
        toast.info(
          "Transactions export successful, Check your email for details",
        );
      } catch (err) {
        const errMsg = ensureError(err);
        toast.error("Failed to export transactions; " + errMsg);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [props.url],
  );

  const changeExportType = (value: string) => {
    setExportFormat(value);
    sendExport(value);
  };
  // "cvs" | "pdf"
  const exportTypeList = [
    {
      name: "CSV",
      path: "csv",
    },
    {
      name: "PDF",
      path: "pdf",
    },
  ];

  return (
    <div className="flex items-center gap-5">
      <h1>Export</h1>

      <Select
        onValueChange={(value) => changeExportType(value)}
        disabled={props.disabled}
      >
        <SelectTrigger className="w-[99px] bg-neutral-50 p-1">
          <SelectValue asChild placeholder={exportFormat}>
            <React.Fragment>
              <span className="uppercase">{exportFormat}</span>{" "}
              {isLoading && <Spinner />}
            </React.Fragment>
          </SelectValue>
        </SelectTrigger>
        <SelectContent
          position="popper"
          side="bottom"
          className="max-h-60"
          align="end"
        >
          {exportTypeList.map((item) => (
            <SelectItem key={item.path} value={item.path}>
              <span>{item.name}</span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
