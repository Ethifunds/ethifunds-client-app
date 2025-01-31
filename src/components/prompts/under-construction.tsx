import { underConstruction } from "@/constants/assets";
import useCustomNavigation from "@/hooks/use-navigation";

const UnderConstruction = () => {
	const { location } = useCustomNavigation();
	const links = location.pathname.split("/");
	const name = links[links.length > 0 ? links.length - 1 : links.length];
	return (
		<div className="flex flex-col items-center justify-center lg:gap-3 grow h-full">
			<h1 className="heading-4 text-primary capitalize">{name.split("-").join(" ")} page</h1>
			<img src={underConstruction} alt="underConstruction" className="lg:w-1/3 h-96 lg:h-60 object-cover" />
			<div className="flex flex-col items-center justify-center">
				<span className="body-3 text-neutral-700">Under construction</span>
				<span className="body-3 text-neutral-700">coming soon</span>
			</div>
		</div>
	);
};

export default UnderConstruction;
