import getHistoricData from "@/services/investments/get-product-historic-data";
import { useQuery } from "react-query";
import * as React from "react";
import useCustomNavigation from "@/hooks/use-navigation";
import { InvestmentProductHistoricData } from "@/types/investments.types";

export default function useMetrics() {
  const [range, setRange] = React.useState("all");
  const { params } = useCustomNavigation();
  const productId = Number(params.productId);

  const query = useQuery(
    ["real-estate-product-historic-data", productId, range],
    () => getHistoricData({ productId }),
  );

  const getFilteredData = (
    data: InvestmentProductHistoricData[],
    range: string,
  ) => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();

    const filteredData = data.filter((entry) => {
      const entryDate = new Date(entry.date);
      const entryYear = entryDate.getFullYear();
      const entryMonth = entryDate.getMonth();

      if (range === "all") {
        return true; // Include all data
      }

      const diffInMonths =
        (currentYear - entryYear) * 12 + (currentMonth - entryMonth);

      if (range === "1") {
        // Filter for the current month only
        return entryYear === currentYear && entryMonth === currentMonth;
      }

      return diffInMonths < parseInt(range);
    });

    // Find the latest month with data
    const latestDate = new Date(
      Math.max(...filteredData.map((entry) => new Date(entry.date).getTime())),
    );
    const latestMonth = latestDate.toLocaleString("default", { month: "long" });
    const latestYear = latestDate.getFullYear();

    // Accumulate data by month for ranges >= 6 or "all"
    if (parseInt(range) >= 6 || range === "all") {
      const accumulatedData = filteredData.reduce(
        (acc, entry) => {
          const entryDate = new Date(entry.date);
          const month = entryDate.toLocaleString("default", {
            month: "long",
          });
          const year = entryDate.getFullYear();
          const key = `${year}-${month}`;
          if (!acc[key]) {
            acc[key] = { month, year, units_sold: 0, unit_price: 0 };
          }
          acc[key].units_sold += entry.units_sold;
          acc[key].unit_price = Number(entry.unit_price);
          return acc;
        },
        {} as Record<
          string,
          {
            month: string;
            year: number;
            units_sold: number;
            unit_price: number;
          }
        >,
      );

      // Convert accumulated data to an array and sort by date
      const accumulatedValues = Object.values(accumulatedData);
      const sortedData = accumulatedValues.sort((a, b) => {
        const dateA = new Date(`${a.month} 1, ${a.year}`).getTime();
        const dateB = new Date(`${b.month} 1, ${b.year}`).getTime();
        return dateA - dateB;
      });

      // Filter out months beyond the latest month with data
      return sortedData.filter((entry) => {
        const entryDate = new Date(`${entry.month} 1, ${entry.year}`).getTime();
        const latestDate = new Date(
          `${latestMonth} 1, ${latestYear}`,
        ).getTime();
        return entryDate <= latestDate;
      });
    }

    // For ranges less than 6, format the date as "DD-MM-YY"
    const results = filteredData
      .map((entry) => {
        const entryDate = new Date(entry.date);
        const day = String(entryDate.getDate()).padStart(2, "0");
        const month = String(entryDate.getMonth() + 1).padStart(2, "0");
        const year = String(entryDate.getFullYear()).slice(-2);
        return {
          month: `${day}-${month}-${year}`, // Format as "DD-MM-YY"
          units_sold: entry.units_sold,
          timestamp: entryDate.getTime(),
          unit_price: Number(entry.unit_price),
        };
      })
      .sort((a, b) => a.timestamp - b.timestamp);

    return results;
  };

  const chartData = React.useMemo(() => {
    if (!query.data) return [];
    return getFilteredData(query.data, range);
  }, [query.data, range]);

  const onChange = (value: string) => {
    setRange(value);
  };

  const options = [
    {
      title: "All Time",
      value: "all",
    },
    {
      title: "This Month",
      value: "1",
    },
    {
      title: "6 Months",
      value: "6",
    },
    {
      title: "Year",
      value: "12",
    },
  ];

  return {
    ...query,
    onChange,
    range,
    options,
    chartData,
  };
}
