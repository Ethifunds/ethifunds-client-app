import { variables } from "@/constants";
import { myActiveInvestments } from "@/constants/data/my-investments/my-active-investments";
import axios from "@/lib/axios";
import { MyActiveInvestment } from "@/types/my-investments.types";

type Parameters = {
  currency: string;
};

type Response = MyActiveInvestment[];

export async function production(data: Parameters): Promise<Response> {
  const response = await axios.get(
    `/my-investment/active-investments?currency=${data.currency}`,
  );
  return response.data.data;
}

export async function development(): Promise<Response> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(myActiveInvestments), 2000);
  });
}

export default async function getMyActiveInvestments(
  data: Parameters,
): Promise<Response> {
  if (variables.NODE_ENV === "development") return development();

  return production(data);
}
