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

const validation = z.object({
	bvn: z.string().length(11, "Enter a valid BVN").regex(/^\d+$/, "BVN must contain only numbers"),
});

type FormData = z.infer<typeof validation>;

const init: FormData = {
	bvn: "",
};
export default function VerifyBvn() {
	const { account } = useAppSelector((state) => state.account);
	const [isLoading, setIsLoading] = React.useState(false);
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
    if (!formData.bvn) return; //  TODO: apply this check to this line || hasVerifiedBvn
    setErrorMsg("");
    setIsLoading(true);
    try {
      const formValues = validation.parse(formData);

      await verifyBvn({ ...formValues, bvn: Number(formValues.bvn) });

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
      className="space-y-8 rounded-lg border px-3 py-5 lg:mt-8 lg:w-1/2 lg:p-8"
    >
      <h1 className="content-standard text-neutral-1000">
        Kindly Verify your BVN Details
      </h1>
      <div className="space-y-5">
        <Input
          name="bvn"
          label="BVN"
          placeholder="enter BVN"
          value={formData.bvn}
          onChange={updateForm}
          invalid={errorMsg.length > 0}
          required
          disabled={isLoading}
        />

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
        // disabled={hasVerifiedBvn}
      >
        {hasVerifiedBvn ? "Verified" : "Verify"}
      </AppButton>
    </TabsContent>
  );
}
