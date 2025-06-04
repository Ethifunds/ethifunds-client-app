import AppButton from "@/components/app-button";
import { Input } from "@/components/ui/form-input";
import { TabsContent } from "@/components/ui/tabs";
import { assets } from "@/constants";
import ensureError from "@/lib/ensure-error";
import verifyBvn from "@/services/settings/verify-bvn";
import useActions from "@/store/actions";
import { useAppSelector } from "@/store/hooks";
import * as React from "react";
import { toast } from "sonner"; 
import { z } from "zod";
import { formFields } from "./data";
import whoami from "@/services/account/whoami";

const validation = z.object({
  bvn: z
    .string()
    .length(11, "Enter a valid BVN")
    .regex(/^\d+$/, "BVN must contain only numbers"),
  firstname: z.string().min(3, "First name is required"),
  lastname: z.string().min(3, "Last name is required"),
});

type FormData = z.infer<typeof validation>;

export default function VerifyBvn() {
  const { account } = useAppSelector((state) => state.account);
  const [isLoading, setIsLoading] = React.useState(false);
  const init: FormData = {
    bvn: account.user_verifications.has_verified_bvn?"***************": "",
    firstname: account?.user_profile?.first_name ?? "",
    lastname: account?.user_profile?.last_name ?? "",
  };
  const [formData, setFormData] = React.useState(init);
  const { account: accountActions } = useActions();
  const [errorMsg, setErrorMsg] = React.useState("");
  const { ui } = useActions();

  const hasVerifiedBvn = React.useMemo(
    () => account.user_verifications.has_verified_bvn,
    [account.user_verifications.has_verified_bvn],
  );

  const reset = () => {
    setFormData(init);
    setErrorMsg("");
  };

  const updateForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (errorMsg) {
      setErrorMsg("");
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submit = async () => {
    if (!formData.bvn || hasVerifiedBvn) return;
    setErrorMsg("");
    setIsLoading(true);
    try {
      const formValues = validation.parse(formData);

      await verifyBvn({ ...formValues, bvn: Number(formValues.bvn) });
      const account = await whoami();
      accountActions.updateAccount(account);

      ui.changeDialog({
        show: true,
        type: "verify_bvn_success",
      });
      accountActions.updateAccount({
        ...account,
        user_verifications: {
          ...account.user_verifications,
          has_verified_bvn: true,
        },
      });
      reset();
    } catch (e) {
      const errMsg = ensureError(e).message;
      setErrorMsg(errMsg);
      toast.error(errMsg);
      ui.changeDialog({
        show: true,
        type: "verify_bvn_failed",
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <TabsContent
      value="verify_bvn"
      className="px-3 py-5 space-y-8 border rounded-lg lg:mt-8 lg:w-1/2 lg:p-8"
    >
      <h1 className="content-standard text-neutral-1000">
        Kindly Verify your BVN Details
      </h1>
      <div className="space-y-5">
        {formFields.map((field) => (
          <Input
            key={field.name}
            name={field.name}
            label={field.label}
            placeholder={field.placeholder}
            value={formData[field.name as keyof FormData]}
            onChange={updateForm}
            invalid={errorMsg.length > 0}
            required
            disabled={isLoading || hasVerifiedBvn}
          />
        ))}

        <div className="flex items-start gap-3 px-3">
          <img src={assets.info_icon_02} alt="info-icon" />
          <p className="content-standard text-neutral-500">
            We require your BVN to verify your identity securely and ensure
            compliance with CBN financial regulations. This helps us keep your
            account safe and provide you with seamless access to all Ethifund
            services.
          </p>
        </div>
        <div className="rounded-md bg-[#F1F3FF] p-3">
          <small className="caption-standard text-neutral-1000">
            Your BVN does not give us access to your bank account, transactions
            or any other information.
          </small>
        </div>
      </div>
      <AppButton
        isLoading={isLoading}
        onClick={submit}
        variant={hasVerifiedBvn ? "mute" : "primary"}
        className="w-full text-white"
        disabled={hasVerifiedBvn}
      >
        {hasVerifiedBvn ? "Verified" : "Verify"}
      </AppButton>
    </TabsContent>
  );
}
