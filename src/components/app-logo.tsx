import { assets } from "@/constants";
import classNames from "classnames";

type AppLogoProps = {
	scope?: "1" | "2";
	className?: string;
};

export default function AppLogo({ scope = "1", className = "size-20" }: AppLogoProps) {
	const cn = classNames("", className);
	if (scope === "1") return <img src={assets.logo_01} alt="logo" className={cn} />;
}
