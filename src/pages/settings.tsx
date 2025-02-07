import Settings from "@/features/settings";
import useSeo from "@/hooks/use-seo";

export default function SettingsPage() {
	useSeo({ pageTitle: "Settings" });
	return <Settings />;
}
