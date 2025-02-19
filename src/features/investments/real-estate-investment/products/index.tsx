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
      <div className="flex flex-col gap-5">
        {props.data.length < 1 ? (
          <EmptyData text="No listing available at the moment" />
        ) : (
          props.data.map((item) => <ProductCard {...item} />)
        )}
      </div>
    </ErrorBoundary>
  );
}
