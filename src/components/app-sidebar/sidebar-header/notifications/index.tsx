import { Badge } from "@/components/ui/badge";
import { assets } from "@/constants";

import * as React from "react";

export default React.memo(function Notifications() {
	return (
		<button className="button-ghost relative flex items-center justify-center size-10 p-2.5 rounded-full bg-primary-100">
			<Badge className="absolute top-0 right-0 !size-2.5 p-0 rounded-full bg-error-200" />
			<img src={assets.notification_icon_01} alt="notification-icon" />
		</button>
	);
});
