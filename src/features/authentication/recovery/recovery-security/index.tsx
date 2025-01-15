import AuthContainer from "@/components/container/auth-container";
import Form from "./form";

export default function RecoverSecurity() {
	return (
		<AuthContainer slideIdx={0}>
			<div className="flex flex-col gap-10 lg:gap-5 py-10 lg:py-20">
				<div className="lg:text-center space-y-3">
					<h1 className="hero-accent  text-neutral-base_black">Security Questions</h1>
					<p className="content-standard text-neutral-700">
						Select your questions and give answers to reset your password.
					</p>
				</div>
				<Form />
				{/* <div className="text-center">
					<span className="highlight-standard text-neutral-500">Already have an account ?</span>{" "}
					<Link to={"/"} className="text-secondary content-accent">
						Login
					</Link>
				</div> */}
			</div>
		</AuthContainer>
	);
}
