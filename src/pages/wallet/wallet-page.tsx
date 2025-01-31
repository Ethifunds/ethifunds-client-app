import Wallet from "@/features/wallet";
import useSeo from "@/hooks/use-seo";

export default function WalletPage() {
	useSeo({ pageTitle: "Wallet" });

	return <Wallet />;
}
