import AppContainer from "@/components/container/container";
import { Separator } from "@/components/ui/separator";
import { assets } from "@/constants";
import useUi from "@/hooks/use-ui";

export default function RealEstateInvestment() {
	useUi({ title: "REIT" });
	return (
		<AppContainer className="space-y-5">
			<div className="flex flex-wrap lg:gap-16">
				<div className="w-1/4 lg:w-[15%]">
					<img src={assets.real_estate_investment} alt="investment vault" className="w-full" />
				</div>
				<div className="flex flex-col gap-5 lg:w-[70%] pt-5 [&_p]:highlight-standard">
					<h1 className="feature-standard text-neutral-1000">Real Estate Investment</h1>

					<p className="text-neutral-500">
						Diversify your portfolio with Ethifund’s Real Estate Investment Trust (REIT)
						opportunities. Invest in a carefully curated pool of real estate assets that generate
						income through rental collections and property sales with transparent returns, flexible
						buy-and-sell options, and potential for capital growth.
					</p>
				</div>
			</div>
			<Separator />
		</AppContainer>
	);
}
