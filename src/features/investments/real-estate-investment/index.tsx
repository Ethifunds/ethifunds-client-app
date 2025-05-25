import AppContainer from "@/components/container/container";
import { Separator } from "@/components/ui/separator";

import useUi from "@/hooks/use-ui";
import useRealEstateInvestment from "./use-real-estate-investment";
import Render from "@/components/render";
import ErrorBoundary from "@/components/error-boundary";
import Products from "./products";
import useSeo from "@/hooks/use-seo";

export default function RealEstateInvestment() {
	useSeo({ pageTitle: "REITs" });
	useUi({ title: "REIT" });
	const { isFetching, isError, error, data } = useRealEstateInvestment();
	

	return (
		<AppContainer className="h-full space-y-5">
			<ErrorBoundary>
				<Render isLoading={isFetching} isError={isError} error={error} loadingPosition="center">
					<div className="flex flex-wrap lg:gap-16">
						<div className="w-1/4 lg:w-[15%]">
							<img
								src={data?.category.display_image}
								alt={data?.category.display_title.slice(0, 5)}
								className="w-full"
							/>
						</div>
						<div className="flex flex-col gap-5 lg:w-[70%] pt-5 [&_p]:highlight-standard">
							<h1 className="feature-standard text-neutral-1000">{data?.category.display_title}</h1>

							<p className="text-neutral-500">{data?.category.description}</p>
						</div>
					</div>
					<Separator />

					<Products data={data?.products ?? []} />
				</Render>
			</ErrorBoundary>
		</AppContainer>
	);
}
