import { PROJECT_STATS_DATA } from "../data/project-stats.data";
import { ProjectStatCard } from "./ProjectStatCard";

export function ProjectStats() {
  return (
    <div className="space-y-4">
      {PROJECT_STATS_DATA.map((projectStat) => (
        <ProjectStatCard key={projectStat.id} projectStat={projectStat} />
      ))}
    </div>
  );
}
