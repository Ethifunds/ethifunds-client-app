import { assets } from "@/constants";

export default function EmptyTransactions() {
	return (
		<div className="flex flex-col items-center justify-center">
			<img src={assets.empty_01} alt="empty transactions" className="size-32" />
			<div className="space-y-5 text-center text-neutral-1000">
				<h1 className="feature-accent">No transaction</h1>

				<p className="content-standard">
					You do not have recent transaction. Please check back later.
				</p>
			</div>
		</div>
	);
}
