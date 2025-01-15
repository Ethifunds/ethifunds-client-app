import VerifyEmail from "@/features/authentication/verify-email";
import useSeo from "@/hooks/use-seo";

export default function VerifyEmailPage() {
	useSeo({ pageTitle: "Verify Email" });
	return <VerifyEmail />;
}
