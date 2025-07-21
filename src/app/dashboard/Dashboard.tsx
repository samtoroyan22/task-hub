"use client";

import { Heading } from "@/components/ui/Heading";
import { SearchField } from "@/components/ui/search-field/SearchField";
import dynamic from "next/dynamic";
import { ProjectStats } from "./project-stats/ProjectStats";
import { ProjectStatisticChart } from "./project-chart/ProjectStatisticChart";
import { LastTasks } from "./last-tasks/LastTasks";
import { TasksTimeline } from "@/components/tasks-timeline/TasksTimeline";
import { taskStore } from "@/stores/task.store";
import type { TTask } from "@/types/task.types";
import { useEffect } from "react";

const DynamicThemeToggle = dynamic(
  () =>
    import("../../components/layout/sidebar/ThemeToggle").then(
      (mod) => mod.ThemeToggle
    ),
  { ssr: false }
);

export function Dashboard({ tasks }: { tasks: TTask[] }) {
  useEffect(() => {
    taskStore.loadStoreFromServer(tasks);
  }, []);

  return (
    <div className="grid grid-cols-[2.7fr_1fr]">
      <div>
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

        <LastTasks />

        <TasksTimeline />
      </div>

      <div className="p-5  h-screen flex items-center justify-center">CHAT</div>
    </div>
  );
}
