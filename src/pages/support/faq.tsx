import Faq from "@/features/support/faq";
import useSeo from "@/hooks/use-seo";

export default function FaqPage() {
  useSeo({ pageTitle: "Faq" });
  return <Faq />;
}
