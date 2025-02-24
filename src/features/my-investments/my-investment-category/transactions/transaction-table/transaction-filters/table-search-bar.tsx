import { assets } from "@/constants";
import * as React from "react";
import { FilterProps } from ".";
export default React.memo(function TableSearchBar(props: FilterProps) {
	return (
		<div className="flex items-center gap-3 p-2 border  rounded">
			{/* <div className="w-full"> */}
			<img src={assets.search_icon_02} alt="search icon" className="" />
			{/* </div> */}
			<input
				type="text"
				name="search-bar"
				id="search-bar"
				placeholder="Search by name, type..."
				className="outline-none"
				disabled={props.disabled}
			/>
		</div>
	);
});
