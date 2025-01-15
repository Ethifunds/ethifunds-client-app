import TwoFactoryAuth from "@/features/authentication/two-factory-auth";
import useSeo from "@/hooks/use-seo";

export default function TwoFactoryAuthPage() {
	useSeo({ pageTitle: "2-factory-authentication" });

	return <TwoFactoryAuth />;
}
