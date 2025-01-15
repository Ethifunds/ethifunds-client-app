import AuthContainer from "@/components/container/auth-container";
import Form from "./form";

export default function ResetPassword() {
	return (
		<AuthContainer slideIdx={2}>
			<div className="flex flex-col gap-10 lg:gap-5 py-10 lg:py-12">
				<div className="lg:text-center lg:px-10 space-y-3">
					<h1 className="hero-accent  text-neutral-base_black">Reset Password </h1>
					<p className="content-standard text-neutral-700">
						Set a new password and note; your new password must be different from the old password.
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
