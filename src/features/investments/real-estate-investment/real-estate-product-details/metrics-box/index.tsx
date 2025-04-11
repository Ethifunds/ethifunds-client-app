import SelectBox from "@/components/select-box";
import Chart from "./chart";
import Render from "@/components/render";
import useMetrics from "./use-metrics";
import * as React from "react";
import EmptyData from "@/components/empty-data";

export default function MetricsBox() {
  const { isFetching, isError, error, chartData, range, options, onChange } =
    useMetrics();

  return (
    <div className="w-full space-y-5 rounded-xl border border-neutral-100 p-4">
      {chartData.length > 0 ? (
        <React.Fragment>
          <div className="flex justify-end">
            <SelectBox value={range} onchange={onChange} options={options} />
          </div>
          <Render isLoading={isFetching} isError={isError} error={error}>
            <Chart chartData={chartData} />
          </Render>
        </React.Fragment>
      ) : (
        <EmptyData title="No Historical Data Yet" text="No historical data available, the investment historical data would be shown here"  /> 
      )}
    </div>
  );
}
