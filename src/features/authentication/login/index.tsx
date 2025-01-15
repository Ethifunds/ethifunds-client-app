import AuthContainer from "@/components/container/auth-container";
import Form from "./form";
import { Link } from "react-router-dom";

export default function Login() {
	return (
		<AuthContainer slideIdx={2}>
			<div className="flex flex-col gap-10 lg:gap-5 py-10 lg:py-10">
				<div className="lg:text-center lg:px-10 space-y-3">
					<h1 className="hero-accent  text-neutral-base_black"> Login to your account </h1>
					<p className="content-standard text-neutral-700">
						Access your personalized dashboard to manage your Ethifunds wallet and track your
						investments
					</p>
				</div>
				<Form />
				<div className="text-center">
					<span className="highlight-standard text-neutral-500">Don't have an account ?</span> <Link to={"/sign-up"} className="text-secondary content-accent">
					Sign up
					</Link>
				</div>
			</div>
		</AuthContainer>
	);
}
