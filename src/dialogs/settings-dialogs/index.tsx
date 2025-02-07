import * as React from "react";
import BvnSuccessDialog from "./profile-dialogs/bvn-success-dialog";
import BvnErrorDialog from "./profile-dialogs/bvn-error-dialog";
export default function SettingsDialogs() {
	return (
		<React.Fragment>
			<BvnSuccessDialog />
			<BvnErrorDialog />
		</React.Fragment>
	);
}
