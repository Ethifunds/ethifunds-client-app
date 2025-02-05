import Investments from "@/features/investments";
import useSeo from "@/hooks/use-seo";

export default function InvestmentsPage() {
	useSeo({ pageTitle: "Investments" });
	return <Investments />;
}
