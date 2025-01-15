import AuthContainer from "@/components/container/auth-container";
import Form from "./form";
import { Link } from "react-router-dom";

export default function SignUp() {
	return (
		<AuthContainer slideIdx={0}>
			<div className="flex flex-col gap-10 lg:gap-5 py-10 lg:py-0">
				<div className="lg:text-center space-y-3">
					<h1 className="hero-accent  text-neutral-base_black">
						{" "}
						Create an account with Ethifunds Today{" "}
					</h1>
					<p className="content-standard text-neutral-700">
						Sign up now to experience a Shariah-compliant, interest-free approach to managing your
						finances.
					</p>
				</div>
				<Form />
				<div className="text-center">
					<span className="highlight-standard text-neutral-500">
						Already have an account ?
					</span>{" "}
					<Link to={"/"} className="text-secondary content-accent">
						Login
					</Link>
				</div>
			</div>
		</AuthContainer>
	);
}
