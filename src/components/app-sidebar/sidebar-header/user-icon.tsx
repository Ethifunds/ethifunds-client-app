import AppImage from "@/components/app-image";
import { useAppSelector } from "@/store/hooks";
import { User } from "lucide-react";
import * as React from "react";

export default React.memo(function Notifications() {
	const { account } = useAppSelector((state) => state.account);
	
	return (
		<button className="">
			<AppImage
				className="button-ghost relative flex items-center justify-center !size-10 p-2.5 rounded-full bg-primary-100"
				src={account.profile_picture ?? <User />}
			/>
		</button>
	);
});
