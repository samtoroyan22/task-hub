"use client";

import { Heading } from "@/components/ui/Heading";
import { SearchField } from "@/components/ui/search-field/SearchField";
import dynamic from "next/dynamic";
import { ProjectStats } from "./project-stats/ProjectStats";
import { ProjectStatisticChart } from "./project-chart/ProjectStatisticChart";
import { LastTasks } from "./last-tasks/LastTasks";
import { TasksTimeline } from "@/components/tasks-timeline/TasksTimeline";
import type {
  TGetTasksResponse,
  TGetTodayTasksResponse,
} from "@/types/task.types";
import { Chat } from "./chat/Chat";
import type {
  TGetProjectChartDataResponse,
  TGetProjectStatsResponse,
} from "@/types/statistic.types";
import { cn } from "@/utils";

const DynamicThemeToggle = dynamic(
  () =>
    import("../../components/layout/sidebar/ThemeToggle").then(
      (mod) => mod.ThemeToggle
    ),
  { ssr: false }
);

interface Props {
  tasks: TGetTasksResponse;
  todayTasks: TGetTodayTasksResponse;
  userId: string;
  projectStats: TGetProjectStatsResponse;
  projectChartData: TGetProjectChartDataResponse;
}

export function Dashboard({
  tasks,
  todayTasks,
  userId,
  projectStats,
  projectChartData,
}: Props) {
  return (
    <div className="grid h-screen grid-cols-[3.5fr_1fr] overflow-hidden">
      <div className="p-5 overflow-y-auto h-screen">
        <div className="flex items-center justify-between mb-6">
          <Heading>Dashboard</Heading>
          <div className="flex items-baseline justify-between gap-3">
            <DynamicThemeToggle />
            <SearchField value="" onChange={() => {}} />
          </div>
        </div>

        <div
          className={cn(
            "grid  gap-6 mb-8",
            projectChartData.length && !projectStats.length
              ? "grid-cols-[102%]"
              : "grid-cols-[25%_75%]"
          )}
        >
          <ProjectStats projectStats={projectStats} />
          <ProjectStatisticChart projectChartData={projectChartData} />
        </div>

        <LastTasks tasks={tasks} />

        <TasksTimeline tasks={todayTasks} />
      </div>
      <div className="h-screen sticky top-0 border-l border-white/10">
        <Chat userId={userId} />
      </div>
    </div>
  );
}
