import { variables } from "@/constants";
import { myActiveInvestments } from "@/constants/data/my-investments/my-active-investments";
import axios from "@/lib/axios";
import { MyActiveInvestment } from "@/types/my-investments.types";

type Parameters = {
  categoryId: string;
};

type Response = MyActiveInvestment;

export async function production(data: Parameters): Promise<Response> {
  const response = await axios.get(
    `/my-investment/by-category/${data.categoryId}`,
  );
  return response.data.data;
}

export async function development(data: Parameters): Promise<Response> {
  return new Promise((resolve) => {
    setTimeout(
      () =>
        resolve(
          myActiveInvestments.find(
            (item) => item.category.id === Number(data.categoryId),
          ) ?? myActiveInvestments[0],
        ),
      2000,
    );
  });
}

export default async function getMyInvestmentCategoryDetails(
  data: Parameters,
): Promise<Response> {
  if (variables.NODE_ENV === "development") return development(data);

  return production(data);
}
