import AuthContainer from "@/components/container/auth-container";
import { assets } from "@/constants";
import { Link } from "react-router-dom";

export default function ResetPasswordSuccess() {
	return (
		<AuthContainer slideIdx={2}>
			<div className="flex flex-col gap-10 lg:gap-5 py-10 lg:py-20">
				<div className="text-center lg:px-10 space-y-3">
					<h1 className="hero-accent  text-neutral-base_black">Password reset Successfully </h1>
				</div>

				<div className="flex flex-col items-center gap-3 rounded-xl lg:rounded-3xl bg-white shadow-lg border px-4 py-8">
					<img src={assets.success_badge_01} alt="success-badge" className="size-28" />
					<p className="text-center content-standard text-neutral-700">
						Congratulations!!! <br /> Your password reset was successful; <br /> Click on the button
						below to Login to your <span className="content-accent"> Ethifunds</span> account
					</p>
					<div className=" flex w-full text-center pt-5 px-2">
						<Link
							to={"/"}
							className="button-primary text-white highlight-accent rounded-lg !w-full text-center"
						>
							Login to your account
						</Link>
					</div>
				</div>
				
			</div>
		</AuthContainer>
	);
}
