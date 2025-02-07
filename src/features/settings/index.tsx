import AppContainer from "@/components/container/container";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useUi from "@/hooks/use-ui";
import { settingsTab } from "./data";
import Profile from "./profile";
import useCustomNavigation from "@/hooks/use-navigation";

export default function Settings() {
	useUi({ title: "Settings" });
	const { queryParams, navigate } = useCustomNavigation();
	const activeTab = queryParams.get("tab");
	return (
		<AppContainer>
			<Tabs defaultValue={activeTab ?? "security"} className="!p-0">
				<TabsList className="justify-start gap-2 lg:gap-5 !p-0 !pb-3 border-b-2 lg:border-b  rounded-none bg-transparent w-full overflow-y-hidden overflow-x-auto hide-scrollbar">
					{settingsTab.map((item, idx) => {
						return (
							<TabsTrigger
								key={idx}
								value={item.value}
								onClick={() => {
									navigate(`?tab=${item.path}`);
								}}
								className="justify-start first:pl-0 px-2 py-4 text-neutral-500 capitalize !bg-transparent  !shadow-none content-standard  border-b-2 border-transparent !rounded-none hover:border-primary hover:text-primary hover:content-bold data-[state=active]:content-bold data-[state=active]:!text-primary data-[state=active]:border-primary"
							>
								{item.title}
							</TabsTrigger>
						);
					})}
				</TabsList>

				<Profile />
			</Tabs>
		</AppContainer>
	);
}
