import ErrorBoundary from "@/components/error-boundary";
import { InvestmentProduct } from "@/types/investments.types";
import ProductCard from "./product-card";
import EmptyData from "@/components/empty-data";

type ProductsProps = {
  data: InvestmentProduct[];
};
export default function Products(props: ProductsProps) {
  return (
    <ErrorBoundary>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        {props.data.length < 1 ? (
          <EmptyData text="No listing available at the moment" />
        ) : (
          props.data.map((item) => <ProductCard {...item} />)
        )}
      </div>
    </ErrorBoundary>
  );
}
