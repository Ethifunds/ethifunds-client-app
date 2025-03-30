import { variables } from "@/constants";
import useCountdown from "@/hooks/use-countdown";
import useStorage from "@/hooks/use-storage";
import ensureError from "@/lib/ensure-error";
import sendOtp from "@/services/account/send-otp";
import * as React from "react";
import { toast } from "sonner";

export default React.memo(function ResendOtp() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [counter, reset] = useCountdown(60);
  const { data: email } = useStorage(
    variables.STORAGE.email,
    "",
    "sessionStorage",
  );

  const resendOtp = async () => {
    setIsLoading(true);
    try {
      if (!email) throw new Error("No email found");
      await sendOtp({ email });
      toast.success("OTP sent successfully");
      reset();
    } catch (err) {
      const errMsg = ensureError(err).message;
      toast.error(errMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <React.Fragment>
      {" "}
      <button
        className="content-bold text-secondary active:text-opacity-30 disabled:cursor-not-allowed"
        onClick={resendOtp}
        disabled={counter > 0}
      >
        {" "}
        {isLoading ? "Resending" : "Resend"} Code
      </button>{" "}
      {counter > 0 && (
        <span>
          {" "}
          in <span className="content-bold text-primary"> {counter}</span>{" "}
        </span>
      )}
    </React.Fragment>
  );
});
