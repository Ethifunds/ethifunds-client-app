import AppLogo from "@/components/app-logo";
import { authContainerData } from "./data";
import Dots from "./dots";

type ContainerProps = {
	slideIdx: number;
	children: React.ReactNode;
};
export default function AuthContainer({ children, slideIdx }: ContainerProps) {
	const data = authContainerData;
	const current = data[slideIdx];

	return (
		<div className="2xl:max-w-[90rem] mx-auto">
			<div className="lg:flex justify-between lg:h-screen gap-40 p-5 lg:px-16 lg:pt-10">
				<div className="hidden lg:flex flex-col space-y-2 lg:w-full 2xl:h-screen">
					<div className="space-y-4">
						<p className="highlight-standard text-neutral-base_black">
							{current.text}

							{current.highlight && <span className="highlight-bold"> {current.highlight}</span>}
						</p>
						<Dots current={slideIdx} />
					</div>
					<div className="bg-[#d9d9d93f] lg:h-[27rem] 2xl:h-[35rem] w-full">
						<img
							src={current.img}
							alt={`image - ${slideIdx}`}
							className="object-contain size-[100%]"
						/>
					</div>

					<AppLogo className="size-16 grow" />
				</div>

				<div className="flex flex-col lg:block h-screen lg:h-auto lg:w-full ">
					{children}
					<div className=" flex justify-start items-end lg:hidden grow mb-10 pb-2">
						<AppLogo className="size-16" />
					</div>
				</div>
			</div>
		</div>
	);
}
