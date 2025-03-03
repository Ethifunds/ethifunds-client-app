import { variables } from "@/constants";
import { twoFaQrCode } from "@/constants/data/2fa-qr-code";
import axios from "@/lib/axios";

type Response = {
  qr_code_url: {
    headers: object;
    original: string;
    exception: null;
  };
  secret: string;
};

export async function production(): Promise<Response> {
  const response = await axios.post(`/2fa/enable`);
  return response.data.data;
}

export async function development(): Promise<Response> {
  return new Promise((resolve) => {
    setTimeout(
      () =>
        resolve({
          qr_code_url: {
            headers: {},
            original: twoFaQrCode,
            exception: null,
          },
          secret: "FIFRBZX2MI25MPKD",
        }),
      2000,
    );
  });
}

export default async function get2faActivationCode(): Promise<Response> {
  if (variables.NODE_ENV === "development") return development();

  return production();
}
