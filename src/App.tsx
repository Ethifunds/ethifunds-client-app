import * as React from "react";
import { Route, Routes } from "react-router-dom";
import { appRoutes } from "./routes";

export default function App() {
	return (
		<React.Fragment>
			
			{/* auth routes */}
			<Routes>
				{appRoutes.authRoutes.map((item, idx) => (
					<Route key={idx} {...item} />
				))}
			</Routes>
		</React.Fragment>
	);
}
