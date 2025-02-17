import ErrorBoundary from "@/components/error-boundary";
import { InvestmentProduct } from "@/types/investments.types";
import ProductCard from "./product-card";

type ProductsProps = {
  data: InvestmentProduct[];
};
export default function Products(props: ProductsProps) {
	return (
		<ErrorBoundary>
			<div  className="flex flex-col gap-5">
				{props.data.map((item) => (
					<ProductCard {...item} />
				))}
			</div>
		</ErrorBoundary>
	);
}
