import { TabsContent } from "@/components/ui/tabs";
import classNames from "classnames";

import ErrorBoundary from "@/components/error-boundary";
import { TabsValues } from "./data";

type ContainerProps = {
  value: TabsValues;
  children: React.ReactNode;
  className?: string;
};
export default function EthivestTabContainer(props: ContainerProps) {
  const cn = classNames(
    "pt-5 !outline-none focus-visible:ring-0",
    props.className,
  );
  return (
    <TabsContent value={props.value} className={cn}>
      <ErrorBoundary>{props.children}</ErrorBoundary>
    </TabsContent>
  );
}
