import { variables } from "@/constants";
import { AccountWallets } from "@/constants/data/account-wallets";
import axios from "@/lib/axios";
import buildQueryString from "@/lib/build-query-string";
import { VirtualAccount } from "@/types/wallet.types";

type Parameters = {
  currency: string;
};

type Response = VirtualAccount[];

export async function production(data: Parameters): Promise<Response> {
  const query_string = buildQueryString(data);
  const response = await axios.get(`/account/virtual-accounts?${query_string}`);
  return response.data.data;
}

export async function development(): Promise<Response> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(AccountWallets), 2000);
  });
}

export default async function getVirtualAccount(
  data: Parameters,
): Promise<Response> {
  if (variables.NODE_ENV === "development") return development();

  return production(data);
}
