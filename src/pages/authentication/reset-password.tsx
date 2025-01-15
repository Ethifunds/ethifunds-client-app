import ResetPassword from "@/features/authentication/recovery/reset-password";
import useSeo from "@/hooks/use-seo";

export default function ResetPasswordPage() {
	useSeo({ pageTitle: "Reset Password" });
	return <ResetPassword />;
}
