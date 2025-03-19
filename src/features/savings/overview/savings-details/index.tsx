import ErrorBoundary from "@/components/error-boundary";
import Render from "@/components/render";
import { Skeleton } from "@/components/ui/skeleton";
import classNames from "classnames";
import * as React from "react";
import { SavingDetailsProps } from "../use-overview";
import NoActiveSavings from "./no-active-savings";
import { Badge } from "@/components/ui/badge";

export default React.memo(function SavingsDetails(props: SavingDetailsProps) {
  const { isFetching, isError, error, savings, openSavingsDialog } = props;

  const container = classNames(
    "border rounded-lg shrink-0 lg:shrink w-full lg:w-[60%] min-h-48 lg:max-h-96 lg:min-h-52 overflow-auto",
    {
      "py-8 px-3 lg:px-6": !isFetching,
    },
  );

  const getDate = React.useCallback((date: string) => {
    return new Date(date).toLocaleDateString("en-us", {
      dateStyle: "medium",
    });
  }, []);

  return (
    <ErrorBoundary>
      <div className={container}>
        <Render
          isLoading={isFetching}
          isError={isError}
          error={error}
          loadingComponent={<Skeleton className="h-48 lg:h-52" />}
        >
          {!savings ? (
            <NoActiveSavings open={openSavingsDialog} />
          ) : (
            <div className="flex flex-col gap-6">
              <div className="flex items-start justify-between">
                <h1 className="content-accent text-neutral-1000">
                  {savings.ethicoop_cycle.title}
                </h1>

                <Badge className="bg-success-300 capitalize">
                  {savings.funding_preference}
                </Badge>
              </div>
              <p className="content-standard text-neutral-700">
                {savings.ethicoop_cycle.description}
              </p>
              <div className="[&_span]:caption-standard flex items-center justify-between capitalize text-neutral-500">
                <span>
                  started: {getDate(savings.ethicoop_cycle.start_date)}
                </span>
                <span>
                  end date: {getDate(savings.ethicoop_cycle.end_date)}
                </span>
              </div>
            </div>
          )}
        </Render>
      </div>
    </ErrorBoundary>
  );
});
