import { variables } from "@/constants";
import axios from "@/lib/axios";
import { generateDigits } from "@/lib/generate-digits";

type Parameters = {
  product_id: number;
  units: number;
  sale_option: "marketplace" | "ethifunds";
  asking_price: number;
  pin: string;
};

type Response = {
  product_id: number;
  seller_product_id: number;
  units: number;
  asking_price_per_unit: number;
  total_price: number;
  sale_option: Parameters["sale_option"];
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
          sale_option: data.sale_option,
          asking_price_per_unit: data.asking_price,
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

export default async function sellInvestmentUnits(
  data: Parameters,
): Promise<Response> {
  if (variables.NODE_ENV === "development") return development(data);

  return production(data);
}
