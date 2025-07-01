"use client";

import { Heading } from "@/components/ui/Heading";
import { SearchField } from "@/components/ui/search-field/SearchField";
import dynamic from "next/dynamic";
import { ProjectStats } from "./project-stats/ProjectStats";
import { ProjectStatisticChart } from "./project-chart/ProjectStatisticChart";
import { LastTasks } from "./last-tasks/LastTasks";

const DynamicThemeToggle = dynamic(
  () =>
    import("../../components/layout/sidebar/ThemeToggle").then(
      (mod) => mod.ThemeToggle
    ),
  { ssr: false }
);

export function Dashboard() {
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
      </div>

      <div className="p-5 bg-violet-300 h-screen flex items-center justify-center">
        CHAT
      </div>
    </div>
  );
}
