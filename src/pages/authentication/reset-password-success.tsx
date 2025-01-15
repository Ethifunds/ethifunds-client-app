import ResetPasswordSuccess from "@/features/authentication/recovery/reset-password-success";
import useSeo from "@/hooks/use-seo";

export default function ResetPasswordSuccessPage() {
	useSeo({ pageTitle: "Reset Password Success" });
	return <ResetPasswordSuccess />;
}
