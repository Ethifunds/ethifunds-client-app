import { variables } from "@/constants";
import useCountdown from "@/hooks/use-countdown";
import useStorage from "@/hooks/use-storage";
import sendOtp from "@/services/account/send-otp";
import * as React from "react";
import { toast } from "sonner";

export default React.memo(function ResendOtp() {
	const [counter, reset] = useCountdown(60);
	const { data: email } = useStorage(variables.STORAGE.email, "", "sessionStorage");

	const resendOtp = async () => {
		try {
			await sendOtp({ email });
			toast.success("OTP sent successfully");
		} catch {
			toast.error("error sending OTP");
		}

		reset();
	};
	return (
		<React.Fragment>
			{" "}
			<button
				className="content-bold text-secondary disabled:cursor-not-allowed active:text-opacity-30"
				onClick={resendOtp}
				disabled={counter > 0}
			>
				{" "}
				Resend Code
			</button>{" "}
			in <span className="content-bold text-primary"> {counter}</span>
		</React.Fragment>
	);
});
