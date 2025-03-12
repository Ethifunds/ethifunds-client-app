import { variables } from "@/constants";
import axios from "@/lib/axios";
import { SavedCard } from "@/types/saved-card.types";

type Response = SavedCard[];

export async function production(): Promise<Response> {
  const response = await axios.get(`/settings/saved-cards`);
  return response.data.data;
}

export async function development(): Promise<Response> {
  return new Promise((resolve) => {
    setTimeout(
      () =>
        resolve([
          {
            id: 1,
            user_id: 1,
            token_source: "Paystack",
            bin: "539999",
            last4: "8877",
            exp_month: 8,
            exp_year: 2020,
            card_type: "mastercard DEBIT",
            bank: "Guaranty Trust Bank",
            country_code: "NG",
            brand: "mastercard",
            account_name: "BoJack Horseman",
            is_default: false,
            created_at: "2025-02-27T22:36:32.000000Z",
            updated_at: "2025-02-27T22:36:32.000000Z",
          },
        ]),
      2000,
    );
  });
}

export default async function getSavedCards(): Promise<Response> {
  if (variables.NODE_ENV === "development") return development();

  return production();
}
