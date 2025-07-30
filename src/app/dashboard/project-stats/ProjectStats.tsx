import type { TGetProjectStatsResponse } from "@/types/statistic.types";
import { ProjectStatCard } from "./ProjectStatCard";

interface Props {
  projectStats: TGetProjectStatsResponse;
}

export function ProjectStats({ projectStats }: Props) {
  return (
    <div className="space-y-4">
      {projectStats.map((projectStat, index) => (
        <ProjectStatCard
          key={projectStat.id}
          projectStat={projectStat}
          isLast={index === projectStats.length - 1}
        />
      ))}
    </div>
  );
}
