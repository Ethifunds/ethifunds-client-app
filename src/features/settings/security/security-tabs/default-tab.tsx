import TabContainer from "../../tab-container";
import { securityTabs } from "../data";
import useCustomNavigation from "@/hooks/use-navigation";

export default function DefaultTab() {
  const { queryParams } = useCustomNavigation();
  const click = (path: string) => {
    queryParams.set("sub_tab", path);
  };
  return (
    <TabContainer
      title="Security"
      subTitle="At Ethifunds, we take your security seriously. Manage and strengthen your account protection with the following tools:"
      value="default"
      className="space-y-8"
    >
      <div className="grid h-full grid-cols-1 gap-5 bg-transparent md:grid-cols-2 lg:grid-cols-3 lg:gap-10">
        {securityTabs.map((item) => {
          return (
            <button
              key={item.value}
              onClick={() => click(item.value)}
              value={item.value}
              className="relative inline-flex h-40 w-full items-start rounded-sm border border-neutral-100 p-3 px-3 py-1.5 shadow transition hover:bg-neutral-100/50 hover:shadow-md hover:lg:scale-105"
            >
              <div className={`absolute right-0 top-0`}>
                <img src={item.bg} alt={item.value.replace("_", " ")} />
              </div>
              <div className="flex w-full flex-col items-start gap-5 bg-transparent pt-10 text-left">
                <h1 className="highlight-accent !m-0 capitalize text-neutral-1000">
                  {" "}
                  {item.title}
                </h1>
                <p className="caption-standard !m-0 text-wrap text-neutral-500">
                  {item.text}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </TabContainer>
  );
}
