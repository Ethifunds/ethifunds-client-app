import AuthContainer from "@/components/container/auth-container";
import Form from "./form";

export default function TwoFactoryAuth() {
	return (
		<AuthContainer slideIdx={1}>
			<div className="flex flex-col gap-10 lg:gap-5 py-10 lg:pt-28">
				<div className="text-center lg:px-10 space-y-3">
					<h1 className="hero-accent  text-neutral-base_black"> Two-Factor Authentication </h1>
					<p className="content-standard text-neutral-700">
						Open your two-factor authenticator (TOTP) app or browser extension to view your
						authentication code.
					</p>
				</div>
				<Form />
			</div>
		</AuthContainer>
	);
}
