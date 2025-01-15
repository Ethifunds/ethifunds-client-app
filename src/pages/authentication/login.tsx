import Login from "@/features/authentication/login";
import useSeo from "@/hooks/use-seo";

export default function LoginPage() {
	useSeo({ pageTitle: "Sign In" });

	return <Login />;
}
