import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
} from "@/components/ui/chart";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useAppSelector } from "@/store/hooks";

type ChartData = {
  month: string;
  units_sold: number;
  unit_price: number;
};

type ChartProps = {
  chartData: ChartData[];
};

const chartConfig = {
  units_sold: {
    label: "Units Sold",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export default function Chart(props: ChartProps) {
  const showAll = props.chartData[0].month.includes("-");

  return (
    <div className="hide-scrollbar relative w-full overflow-auto lg:p-2">
      <span className="caption-accent absolute top-[45%] -rotate-90 text-neutral-500">
        {" "}
        Units
      </span>

      <span className="caption-accent absolute -bottom-1 left-0 block translate-x-[50%] text-neutral-500 lg:left-1/2">
        {" "}
        Time
      </span>

      <ChartContainer config={chartConfig} className="w-[550px] lg:w-full">
        <LineChart accessibilityLayer data={props.chartData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => (showAll ? value : value.slice(0, 3))}
          />
          <YAxis
            dataKey={"units_sold"}
            tickLine={false}
            axisLine={false}
            tickMargin={8}
          />
          <ChartTooltip cursor={true} content={<CustomTooltip />} />
          <Line
            dataKey="units_sold"
            type="natural"
            stroke="#D1811B"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ChartContainer>
    </div>
  );
}

const CustomTooltip = ({ active, payload, label }: any) => {
  const { currency } = useAppSelector((state) => state.account);
  if (active && payload && payload.length) {
    const data = payload[0].payload; // Access the data for the hovered point
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="rounded-md bg-white p-3 shadow-lg">
            <p className="text-sm font-medium text-gray-900">{label}</p>
            <p className="text-sm text-gray-500">
              Unit Price: {data.unit_price}
            </p>
            <p className="text-sm text-gray-500">
              Units Sold: {data.units_sold}
            </p>
            <p className="text-sm text-gray-500">
              Total Price: {currency.sign}
              {(data.units_sold * data.unit_price).toFixed(2)}
            </p>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>Hover for details</p>
        </TooltipContent>
      </Tooltip>
    );
  }

  return null;
};
