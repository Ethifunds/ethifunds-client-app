import * as React from "react";
import { FeatureList } from "./data";
import classNames from "classnames";
import { Badge } from "@/components/ui/badge";
import { FileSearch } from "lucide-react";
import ErrorBoundary from "@/components/error-boundary";

type ResultProps = {
  data: FeatureList[];
  action: (path: string) => void;
};
export default React.memo(function SearchedResults(props: ResultProps) {
  const cn = classNames(
    "absolute flex w-full h-0 flex-col gap-3 overflow-auto z-50 bg-neutral-50 rounded transition-all",
    {
      "!h-auto mt-3 shadow-md border py-3 px-1  min-h-20 max-h-60":
        props.data.length > 0,
    },
  );
  return (
    <ErrorBoundary>
      <div className={cn}>
        {props.data.map((item) => (
          <button
            key={item.id}
            className="flex items-center gap-2 rounded-lg border bg-white p-1.5 transition-all hover:bg-primary-100/40"
            onClick={() => props.action(item.path)}
          >
            <Badge className="flex size-8 items-center justify-center rounded-full bg-primary-100 p-1.5 text-primary">
              <FileSearch strokeWidth={1.5} />
            </Badge>
            <div className="flex flex-col gap-1 text-start">
              <h1 className="caption-accent capitalize">{item.name}</h1>
              <span className="caption-standard line-clamp-1 text-neutral-500">
                {item.tags?.join(" | ")}
              </span>
            </div>
          </button>
        ))}
      </div>
    </ErrorBoundary>
  );
});
