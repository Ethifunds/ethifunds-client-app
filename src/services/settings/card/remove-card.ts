import { variables } from "@/constants";
import axios from "@/lib/axios";
import { SavedCard } from "@/types/saved-card.types";

type Parameters = {
  user_saved_card_id: SavedCard["id"];
};

type Response = void;

export async function production(payload: Parameters): Promise<Response> {
  const response = await axios.post(`/settings/remove-card`, payload);
  return response.data.data;
}

export async function development(): Promise<Response> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), 2000);
  });
}

export default async function removeCard(data: Parameters): Promise<Response> {
  if (variables.NODE_ENV === "development") return development();

  return production(data);
}
