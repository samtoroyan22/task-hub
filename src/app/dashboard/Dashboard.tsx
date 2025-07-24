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
}

export function Dashboard({ tasks, todayTasks }: Props) {
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

        <div className="grid grid-cols-[25%_75%] gap-6 mb-8">
          <ProjectStats />
          <ProjectStatisticChart />
        </div>

        <LastTasks tasks={tasks} />

        <TasksTimeline tasks={todayTasks} />
      </div>
      <div className="h-screen sticky top-0 border-l border-white/10">
        <Chat />
      </div>
    </div>
  );
}
