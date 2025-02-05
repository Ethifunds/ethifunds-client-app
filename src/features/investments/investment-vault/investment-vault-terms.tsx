import { assets } from "@/constants";
import * as React from "react";
import { useAppSelector } from "@/store/hooks";
import useCustomNavigation from "@/hooks/use-navigation";
import { toast } from "sonner";
import setupVault from "@/services/investments/vault/setup-vault";
import ensureError from "@/lib/ensure-error";
import AppButton from "@/components/app-button";
export default function InvestmentVaultTerms() {
	const { currency } = useAppSelector((state) => state.account);
	const [isSettingUp, setIsSettingUp] = React.useState(false);
	const { navigate } = useCustomNavigation();

	const setup = async () => {
		if (!currency.code) return toast.error("no currency set, try switching currency");
		setIsSettingUp(true);
		try {
			await setupVault({ currency: currency.code });
			navigate("/investments/vault/overview", { replace: true });
		} catch (error) {
			const err = ensureError(error);
			toast.error(err.message);
		} finally {
			setIsSettingUp(false);
		}
	};
	return (
		<div className="flex flex-wrap lg:gap-16">
			<div className="w-1/4 lg:w-[15%]">
				<img src={assets.investment_vault} alt="investment vault" className="w-full" />
			</div>
			<div className="flex flex-col gap-5 lg:w-[70%] pt-5 [&_p]:highlight-standard text-neutral-1000">
				<h1 className="feature-standard">Investment Vault</h1>
				<div className="space-y-5">
					<p>
						The Ethifund Investment Vault is your secure digital vault for managing funds earmarked
						exclusively for investments. By separating your investment capital from your general
						wallet, you ensure your funds are safe and readily available for new opportunities.
					</p>
					<p>
						Ethifunds is designed to offer investors the opportunity to diversify their fund and
						income stream, and enhance return on investment.
					</p>
				</div>

				<div className="flex items-start gap-3 p-4 bg-[#FFECE7] rounded-lg">
					<img src={assets.info_icon_01} alt="info icon" />
					<p>
						By clicking continue I agree to the <b>Terms</b> and <b> Conditions</b> of the Ethifunds
						Investment Vault
					</p>
				</div>

				<AppButton
					variant="primary"
					className="lg:w-1/2 text-white !rounded-lg"
					onClick={setup}
					isLoading={isSettingUp}
					disabled={isSettingUp}
				>
					Continue
				</AppButton>
			</div>
		</div>
	);
}
