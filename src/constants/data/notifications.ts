import { Notification } from "@/types/notification.types";
import { exploreMarketplaceList } from "./my-investments/explore-market-place";
import { investmentProducts } from "./investments/investment-category-products";
import { savings } from "./savings/savings";
import { myActiveInvestments } from "./my-investments/my-active-investments";


export const notifications: Notification[] = [
  {
    id: 12,
    data: {
      type: "ACCOUNT",
      message:
        "your account has been successfully verified and you have full access to all the features in the application",
    },
    read_at: null,
    created_at: "2025-01-24T01:12:51.000000Z",
    updated_at: "2025-01-24T01:12:51. 000000Z",
  },
  {
    id: 11,
    data: {
      type: "SYSTEM",
      message:
        "system maintenance has been concluded and application is back at full capacity, thanks for your patience.",
    },
    read_at: "2025-01-24T01:12:51.000000Z",
    created_at: "2025-01-24T01:12:51.000000Z",
    updated_at: "2025-01-24T01:12:51. 000000Z",
  },

  {
    id: 30,
    data: {
      type: "PROMOTIONAL",
      message:
        "New investment opportunities available for grabs check out the investments for more details",
      product: investmentProducts[0],
    },
    read_at: "2025-01-24T01:12:51.000000Z",
    created_at: "2025-01-24T01:12:51.000000Z",
    updated_at: "2025-01-24T01:12:51.000000Z",
  },
  {
    id: 1,
    data: {
      type: "INVESTMENT_OFFERS",
      message:
        "Your counter offer of ₦5 per unit for 3 units of REIT Product 1 has been sent to the seller. You'll be notified once they respond!",
    },
    read_at: null,
    created_at: "2025-01-24T01:12:51.000000Z",
    updated_at: "2025-01-24T01:12:51.000000Z",
  },

  {
    id: 310,
    data: {
      type: "TRANSACTIONS",
      message:
        "NGN 5,000 was successfully transferred from your Vault to your wallet",
    },
    read_at: null,
    created_at: "2025-01-24T01:12:51.000000Z",
    updated_at: "2025-01-24T01:12:51.000000Z",
  },
  {
    id: 2,
    data: {
      type: "INVESTMENT_OFFERS",
      message:
        "Note that a counter offer has been made on your REIT investment",
      listing: exploreMarketplaceList[0],
    },
    read_at: null,
    created_at: "2025-01-24T01:12:51.000000Z",
    updated_at: "2025-01-24T01:12:51.000000Z",
  },

  {
    id: 3,
    data: {
      type: "PROMOTIONAL",
      message:
        "New REIT investment opportunity up for grabs check investments for details",
      product: investmentProducts[0],
    },
    read_at: "2025-01-24T01:12:51.000000Z",
    created_at: "2025-01-24T01:12:51.000000Z",
    updated_at: "2025-01-24T01:12:51.000000Z",
  },

  {
    id: 4,
    data: {
      type: "INVESTMENT_TRANSACTIONS",
      message: "you have successfully renewed your savings investment",
      user_savings: savings[0],
    },
    read_at: null,
    created_at: "2025-01-24T01:12:51.000000Z",
    updated_at: "2025-01-24T01:12:51.000000Z",
  },

  {
    id: 29,
    data: {
      type: "INVESTMENT_TRANSACTIONS",
      message: "you have successfully purchased your an investment",
      user_investment: myActiveInvestments[0].investments[0],
    },
    read_at: null,
    created_at: "2025-01-24T01:12:51.000000Z",
    updated_at: "2025-01-24T01:12:51.000000Z",
  },
];
