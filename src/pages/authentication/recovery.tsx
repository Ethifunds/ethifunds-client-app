import Recovery from "@/features/authentication/recovery";
import useSeo from "@/hooks/use-seo";

export default function RecoveryPage() {
	useSeo({ pageTitle: "Recover Password" });

	return <Recovery />;
}
