import AuthContainer from "@/components/container/auth-container";
import Form from "./form";
import { Link } from "react-router-dom";

export default function Recovery() {
	return (
		<AuthContainer slideIdx={2}>
			<div className="flex flex-col gap-10 lg:gap-10 py-10 lg:py-20">
				<div className="lg:text-center lg:px-10 space-y-3">
					<h1 className="hero-accent  text-neutral-base_black">Forgot Password </h1>
					<p className="content-standard text-neutral-700">
						Enter your email address to change your password
					</p>
				</div>
				<Form />
				<div className="text-center">
					<span className="highlight-standard text-neutral-500">Already have an account ?</span>{" "}
					<Link to={"/"} className="text-secondary content-accent">
						Login
					</Link>
				</div>
			</div>
		</AuthContainer>
	);
}
