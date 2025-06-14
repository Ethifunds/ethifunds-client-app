import AppButton from "@/components/app-button";
import { assets } from "@/constants";
import { toast } from "sonner";

export default function DownloadMemoButton(props: { url: string }) {
  const download = async () => {
    if (!props.url) return;
    try {
      const fileUrl = props.url;
      window.open(fileUrl, "_blank");
    } catch (e) {
      toast.error("error occurred");
      throw e;
    }
  };
  if (!props.url) return null;

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
