import { variables } from "@/constants";
import { PaginatedResponse, PaginationQuery } from "@/types/global.types";
import axios from "@/lib/axios";
import buildQueryString from "@/lib/build-query-string";
import paginate from "@/lib/paginate";
import { investmentMarketplaceProduct } from "@/types/investments.types";
import { investmentMarketplaceList } from "@/constants/data/investments/investment-marketplace";

type Parameters = Partial<PaginationQuery> & {
  productId: number;
};

type Response = PaginatedResponse<investmentMarketplaceProduct>;

export async function production({
  productId,
  ...data
}: Parameters): Promise<Response> {
  const query_string = buildQueryString(data);

  const response = await axios.get(
    `/investment/marketplace/product/${productId}?${query_string}`,
  );
  return paginate(response.data.data);
}

export async function development(): Promise<Response> {
  return new Promise((resolve) => {
    setTimeout(
      () =>
        resolve(
          paginate({
            current_page: 1,
            data: investmentMarketplaceList,
            first_page_url:
              "http://127.0.0.1:8000/api/account/transactions?page=1",
            from: 1,
            last_page: 1,
            last_page_url:
              "http://127.0.0.1:8000/api/account/transactions?page=1",
            next_page_url: null,
            path: "http://127.0.0.1:8000/api/account/transactions",
            per_page: 20,
            prev_page_url: null,
            to: 2,
            total: 2,
          }),
        ),
      2000,
    );
  });
}

export default async function getProductMarketplace(
  data: Parameters,
): Promise<Response> {
  if (variables.NODE_ENV === "development") return development();

  return production(data);
}
