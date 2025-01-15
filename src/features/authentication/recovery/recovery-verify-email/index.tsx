import AuthContainer from "@/components/container/auth-container";
import Form from "./form";

export default function RecoveryVerifyEmail() {
	return (
		<AuthContainer slideIdx={2}>
			<div className="flex flex-col gap-10 lg:gap-5 py-10 lg:pt-28">
				<div className="text-center lg:px-10 space-y-3">
					<h1 className="hero-accent  text-neutral-base_black">Enter verification code</h1>
					<p className="content-standard text-neutral-700">
						We sent a verification code to your email. Kindly input the code to login
					</p>
				</div>
				<Form />
			</div>
		</AuthContainer>
	);
}
