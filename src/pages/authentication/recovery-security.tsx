import RecoverSecurity from "@/features/authentication/recovery/recovery-security";
import useSeo from "@/hooks/use-seo";

export default function RecoverSecurityPage() {
	useSeo({ pageTitle: "Recovery Security Question" });
	return <RecoverSecurity />;
}
