import { variables } from "@/constants";
import axios from "@/lib/axios";
import { MyCompletedInvestments } from "@/types/my-investments.types";

type Response = MyCompletedInvestments[];

export async function production(): Promise<Response> {
  const response = await axios.get(`/my-investment/completed-investments`);
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
            product_id: 1,
            investment_type: "unitized",
            status: "completed",
            total_invested: "10000.00",
            units_purchased: 100,
            start_at: "2025-02-08T01:51:19.000000Z",
            end_at: "2025-02-20T17:45:10.000000Z",
            matured_at: null,
            canceled_at: null,
            interest_accrued: "0.00",
            total_roi: "0.00",
            next_payout_date: null,
            payout_frequency: null,
            last_payout_amount: null,
            profit_withdrawn: "0.00",
            withdrawable_balance: "0.00",
            investment_growth: 0,
            transaction_reference: null,
            investment_plan_details: null,
            created_at: "2025-02-08T01:51:19.000000Z",
            updated_at: "2025-02-20T16:24:24.000000Z",
            product: {
              id: 1,
              name: "REIT Product 1",
              product_custodian_id: null,
              product_category_id: 1,
              display_image:
                "https://res.cloudinary.com/dtfbkxzmc/image/upload/v1738885848/Rectangle_119_itia25.png",
              account_id: 1,
              type: "unitized",
              description: "Description for REIT Product 1",
              minimum_investment: "1000.00",
              maximum_investment: "100000.00",
              expected_roi: 8.5,
              tenor_unit: "months",
              tenor_value: 12,
              unit_price: "100.00",
              unit_start_price: null,
              total_units: 1000,
              units_sold: 0,
              contribution_frequency: "monthly",
              contribution_amount: "100.00",
              profit_sharing_ratio: 0.5,
              dividend_payout_frequency: "quarterly",
              funding_goal: "100000.00",
              amount_raised: "0.00",
              funding_deadline: "2025-08-08T01:47:36.000000Z",
              bond_issuer: null,
              bond_interest_rate: null,
              hybrid_components: [],
              status: "active",
              created_at: "2025-02-08T01:47:36.000000Z",
              updated_at: "2025-02-08T01:47:36.000000Z",
            },
          },
        ]),
      2000,
    );
  });
}

export default async function getMyCompletedInvestments(): Promise<Response> {
  if (variables.NODE_ENV === "development") return development();

  return production();
}
