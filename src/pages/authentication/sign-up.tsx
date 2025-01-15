import SignUp from "@/features/authentication/sign-up";
import useSeo from "@/hooks/use-seo";

export default function SignUpPage() {
	useSeo({ pageTitle: "Sign up" });
	return <SignUp />;
}
