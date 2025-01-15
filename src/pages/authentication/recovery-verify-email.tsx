import RecoveryVerifyEmail from "@/features/authentication/recovery/recovery-verify-email";
import useSeo from "@/hooks/use-seo";

export default function RecoveryVerifyEmailPage() {
	useSeo({ pageTitle: "Recovery Verify Email" });
	return <RecoveryVerifyEmail />;
}
