import { useState } from "react";
import { ProjectChartHeader } from "./ProjectChartHeader";
import { ProjectChart } from "./ProjectChart";

import { useQuery } from "@tanstack/react-query";
import { getClientProjectChartData } from "@/services/statistics/chart/project-chart-clietn.service";
import type { TClientProjectChartDataResponse } from "@/types/statistic.types";

interface Props {
  projectChartData: TClientProjectChartDataResponse;
}

export function ProjectStatisticChart({ projectChartData }: Props) {
  const [selectedRange, setSelectedRange] = useState<ITimeRange>({
    label: "Yearly",
    value: "yearly",
  });

  const { data, isPending } = useQuery({
    queryKey: ["project-statistics-chart-data", selectedRange.value],
    queryFn: () => getClientProjectChartData(selectedRange.value),
    initialData: projectChartData,
  });

  return (
    <div className="h-full mr-6 bg-white dark:bg-card p-5 rounded-2xl">
      <ProjectChartHeader
        onRangeChange={setSelectedRange}
        selectedRange={selectedRange}
      />
      <ProjectChart data={data || []} />
    </div>
  );
}
