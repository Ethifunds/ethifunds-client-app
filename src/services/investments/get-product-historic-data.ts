import { variables } from "@/constants";
import { investmentProductHistoricData } from "@/constants/data/investments/investment-product-historic-data";
import axios from "@/lib/axios";
import { InvestmentProductHistoricData } from "@/types/investments.types";

type Parameters = {
  productId: number;
  range?: string;
};

type Response = InvestmentProductHistoricData[];

export async function production(data: Parameters): Promise<Response> {
  const response = await axios.get(
    `/investment/product/historic-data/${data.productId}?range=${data.range}`,
  );
  return response.data.data;
}

export async function development(): Promise<Response> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(investmentProductHistoricData), 2000);
  });
}

export default async function getHistoricData(
  data: Parameters,
): Promise<Response> {
  if (variables.NODE_ENV === "development") return development();

  return production(data);
}
