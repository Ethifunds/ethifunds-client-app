import Home from "@/features/home";
import useSeo from "@/hooks/use-seo";

export default function HomePage() {
	useSeo({ pageTitle: "Home" });
	return <Home />;
}
