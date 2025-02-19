import Support from "@/features/support";
import useSeo from "@/hooks/use-seo";

export default function SupportPage() {
  useSeo({ pageTitle: "Support" });
  return <Support />;
}
