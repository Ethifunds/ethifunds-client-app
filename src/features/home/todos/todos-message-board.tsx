import "./index.css";
import * as React from "react";
import { Link } from "react-router-dom";
export default React.memo(function TodosMessageBoard() {
    const value = 100
	return (
		<div className="flex justify-center todo-bg p-6 lg:py-8 bg-primary rounded-lg lg:min-h-44">
			<div className="flex gap-5 lg:gap-10 flex-wrap lg:flex-nowrap">
				<div className="flex items-start gap-5">
					<div className="flex items-center justify-center size-[91px] rounded-full bg-transparent lg:bg-primary-200">
						<div className="flex items-center justify-center highlight-bold text-primary size-14 rounded-full bg-neutral-base_white">
							{value}%
						</div>
					</div>
					<div className="text-neutral-base_white space-y-2 lg:space-y-5">
						<h1 className="feature-bold">
							Verify your account to begin your investment and savings
						</h1>
						<p className="content-standard lg:max-w-[75%]">
							You are almost there, just follow the steps through and you will be ready to join the
							smart investors
						</p>
					</div>
				</div>
				<div className="flex justify-end  lg:self-end w-full lg:w-auto w-1/">
					<Link to={""} className="button-ghost w-1/2 lg:w-full text-primary bg-white">
						Continue
					</Link>
				</div>
			</div>
		</div>
	);
});
