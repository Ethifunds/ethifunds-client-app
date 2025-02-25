import { TabsContent } from "@/components/ui/tabs";
import classNames from "classnames";
import { TabsValues } from "./data";
import ErrorBoundary from "@/components/error-boundary";

type ContainerProps = {
  title?: string;
  subTitle?: string;
  value: TabsValues;
  children: React.ReactNode;
  utilityComponent?: React.ReactNode;
  className?: string;
};
export default function TabContainer(props: ContainerProps) {
  const cn = classNames(
    "pt-8 !outline-none focus-visible:ring-0",
    props.className,
  );
  return (
    <TabsContent value={props.value} className={cn}>
      {props.title && props.subTitle && (
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div className="lg:w-3/5">
            <h1 className="highlight-accent text-neutral-1000">
              {props.title}
            </h1>
            <span className="caption-standard text-neutral-500">
              {props.subTitle}
            </span>
          </div>

          {props.utilityComponent}
        </div>
      )}
      <ErrorBoundary>{props.children}</ErrorBoundary>
    </TabsContent>
  );
}
