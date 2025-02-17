import { variables } from "@/constants";
import { investmentMarketplaceList } from "@/constants/data/investments/investment-marketplace";
import axios from "@/lib/axios";
import { investmentMarketplaceProduct } from "@/types/investments.types";

type Parameters = {
  listingId: number;
};

type Response = investmentMarketplaceProduct;

export async function production(data: Parameters): Promise<Response> {
  const response = await axios.get(
    `/investment/marketplace/listing/${data.listingId}`,
  );
  return response.data.data;
}

export async function development(): Promise<Response> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(investmentMarketplaceList[0]), 2000);
  });
}

export default async function getMarketplaceProductDetails(
  data: Parameters,
): Promise<Response> {
  if (variables.NODE_ENV === "development") return development();

  return production(data);
}
