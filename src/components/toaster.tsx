import { assets } from "@/constants";
import { Toaster } from "sonner";

export default function AppToaster() {
	return (
		<Toaster
			richColors={true}
			position={"top-right"}
			toastOptions={{
				classNames: {
					error: "!bg-error-200 !text-white",
				},
			}}
			icons={{
				error: <img src={assets.alert_icon_01}/>,
			}}
		/>
	);
}
