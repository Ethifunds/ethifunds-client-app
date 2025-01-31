import * as React from "react";
import classnames from "classnames";

type AppImageProps = {
	src?: React.ReactNode;
	alt?: string;
	className?: string;
};

export default React.memo(function AppImage(props: AppImageProps) {
	const container = classnames("size-7 overflow-hidden", props.className);

	return (
		<div className={container}>
			{props.src && typeof props.src !== "string" && props.src}
			{typeof props.src === "string" && (
				<img src={props.src} alt={props.alt ?? "alt-img"} className="w-full h-full object-cover" />
			)}
		</div>
	);
});
