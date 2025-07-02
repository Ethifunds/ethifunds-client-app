import { variables } from "@/constants";
import { investmentProducts } from "@/constants/data/investments/investment-category-products";
import axios from "@/lib/axios";
import { InvestmentProduct } from "@/types/investments.types";

type Parameters = {
  listing_id: number;
  units: number;
  pin: string;
  offer_price: string;
};

type Response = InvestmentProduct;

export async function production(data: Parameters): Promise<Response> {
  const response = await axios.post(
    `/investment/marketplace/listing/buy`,
    data,
  );
  return response.data.data;
}

export async function development(): Promise<Response> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(investmentProducts[0]), 2000);
  });
}

export default async function counterOffer(
  data: Parameters,
): Promise<Response> {
  if (variables.NODE_ENV === "development") return development();

  return production(data);
}
