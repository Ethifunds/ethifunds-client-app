import { assets } from "@/constants";
import * as React from "react";

export default React.memo(function Searchbar() {
	return (
		<div className="hidden lg:block">
			<div className="flex items-center gap-3 py-2 px-3 border border-primary rounded-md">
				<img src={assets.search_icon_01} alt="search icon" />
				<input
					type="text"
					name="search"
					placeholder="search"
					className="placeholder:text-primary outline-none"
				/>
			</div>
		</div>
	);
});
