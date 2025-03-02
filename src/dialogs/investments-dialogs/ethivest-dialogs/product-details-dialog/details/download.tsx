import AppButton from "@/components/app-button";
import { assets } from "@/constants";
import ensureError from "@/lib/ensure-error";
import { InvestmentProduct } from "@/types/investments.types";
import { toast } from "sonner";

export default function DownloadMemo(props: { id: InvestmentProduct["id"] }) {
  const download = async () => {
    if (!props.id) return;
    try {
      const fileUrl = assets.sample_pdf;
      const link = document.createElement("a");
      link.href = fileUrl;
      link.setAttribute("download", "Investment_Memo.pdf");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (e) {
      const errMsg = ensureError(e).message;
      toast.error(errMsg);
    }
  };

  return (
    <div className="flex items-center justify-between rounded-lg border p-2">
      <div className="inline-flex gap-3">
        <img src={assets.file_01} alt="file" className="size-5" />

        <span className="content-standard text-neutral-700">
          Investment Memo (PDF)
        </span>
      </div>

      <AppButton
        variant="ghost"
        className="flex items-center gap-2 text-primary"
        onClick={download}
      >
        <img src={assets.download_01} alt="download" />
        Download
      </AppButton>
    </div>
  );
}
