import { variables } from "@/constants";
import axios from "@/lib/axios";
import { UserDocument } from "@/types/user-document.types";

type Response = UserDocument[];

export async function production(): Promise<Response> {
  const response = await axios.get(`/settings/user-documents`);
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
            document_type: "id",
            document_url:
              "https://res.cloudinary.com/dtfbkxzmc/image/upload/v1741649234/user-documents/uZYD8qHh359934.png.png",
            file_name: "uZYD8qHh359934.png",
            id_type: "drivers_license",
            status: "pending",
            remark: null,
            created_at: "2025-03-10T23:26:46.000000Z",
            updated_at: "2025-03-10T23:27:14.000000Z",
          },
          {
            id: 2,
            user_id: 1,
            document_type: "proof_of_address",
            document_url:
              "https://res.cloudinary.com/dtfbkxzmc/image/upload/v1741649275/user-documents/sF1cr9kR308762.png.png",
            file_name: "sF1cr9kR308762.png",
            id_type: "utility_bill",
            status: "pending",
            remark: null,
            created_at: "2025-03-10T23:27:55.000000Z",
            updated_at: "2025-03-10T23:27:55.000000Z",
          },
        ]),
      2000,
    );
  });
}

export default async function getUserDocuments(): Promise<Response> {
  if (variables.NODE_ENV === "development") return development();

  return production();
}
