import { useState } from "react";
import { ProjectChartHeader } from "./ProjectChartHeader";
import { ProjectChart } from "./ProjectChart";
import { monthlyData, yearlyData } from "./project-chart.data";

export function ProjectStatisticChart() {
  const [selectedRange, setSelectedRange] = useState<ITimeRange>({
    label: "Yearly",
    value: "yearly",
  });

  const chartData = selectedRange.value === "yearly" ? yearlyData : monthlyData;

  return (
    <div className=" h-full bg-white p-5 rounded-2xl">
      <ProjectChartHeader
        onRangeChange={setSelectedRange}
        selectedRange={selectedRange}
      />
      <ProjectChart data={chartData} />
    </div>
  );
}
