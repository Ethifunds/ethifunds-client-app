import { variables } from "@/constants";
import { exploreMarketplaceList } from "@/constants/data/my-investments/explore-market-place";
import axios from "@/lib/axios";
import { MyInvestmentMarketplace } from "@/types/my-investments.types";

type Response = MyInvestmentMarketplace[];

export async function production(): Promise<Response> {
  const response = await axios.get(`/my-investment/listed-investments`);
  return response.data.data;
}

export async function development(): Promise<Response> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(exploreMarketplaceList), 2000);
  });
}

export default async function getMyListedInvestments(): Promise<Response> {
  if (variables.NODE_ENV === "development") return development();

  return production();
}
