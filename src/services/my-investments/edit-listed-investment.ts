import { variables } from "@/constants";
import axios from "@/lib/axios";
import { generateDigits } from "@/lib/generate-digits";

type Parameters = {
  listingId: number;
  product_id: number;
  units: number;
  asking_price_per_unit: number;
  pin: string;
};

type Response = {
  product_id: number;
  seller_product_id: number;
  units: number;
  asking_price_per_unit: number;
  total_price: number;
  updated_at: string;
  created_at: string;
  id: number;
};

export async function production(data: Parameters): Promise<Response> {
  const response = await axios.post(`/investment/sell-units`, data);
  return response.data.data;
}

export async function development(data: Parameters): Promise<Response> {
  return new Promise((resolve) => {
    setTimeout(
      () =>
        resolve({
          product_id: data.product_id,
          units: data.units,
          asking_price_per_unit: data.asking_price_per_unit,
          total_price: generateDigits(9999),
          seller_product_id: 1,
          updated_at: "2025-02-08T00:41:09.000000Z",
          created_at: "2025-02-08T00:41:09.000000Z",
          id: 1,
        }),
      2000,
    );
  });
}

export default async function editListedInvestment(
  data: Parameters,
): Promise<Response> {
  if (variables.NODE_ENV === "development") return development(data);

  return production(data);
}
