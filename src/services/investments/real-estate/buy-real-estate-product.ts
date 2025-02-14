import { variables } from "@/constants";
import axios from "@/lib/axios";

type Parameters = {
  productId: number;
  units: number;
  pin: string;
};

type Response = {
  user_id: number;
  product_id: number;
  investment_type: string;
  status: string;
  units_purchased: number;
  total_invested: string;
  start_at: string;
  updated_at: string;
  created_at: string;
  id: number;
};

export async function production(data: Parameters): Promise<Response> {
  const response = await axios.post(`/investment/buy-units`, data);
  return response.data.data;
}

export async function development(): Promise<Response> {
  return new Promise((resolve) => {
    setTimeout(
      () =>
        resolve({
          user_id: 1,
          product_id: 1,
          investment_type: "unitized",
          status: "active",
          units_purchased: 10,
          total_invested: "1000.00",
          start_at: "2025-02-07T23:28:22.000000Z",
          updated_at: "2025-02-07T23:28:22.000000Z",
          created_at: "2025-02-07T23:28:22.000000Z",
          id: 1,
        }),
      2000,
    );
  });
}

export default async function buyRealEstateProduct(
  data: Parameters,
): Promise<Response> {
  if (variables.NODE_ENV === "development") return development();

  return production(data);
}
