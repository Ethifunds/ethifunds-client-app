import { assets } from "@/constants";

export default function NotFound() {
	return (
		<div className="flex flex-col items-center justify-center">
			<img src={assets.empty_01} alt="empty transactions" className="size-32" />
			<div className="space-y-5 text-center text-neutral-1000">
				<h1 className="feature-accent">Not Found</h1>

				<p className="content-standard">This path does not exist</p>
			</div>
		</div>
	);
}
