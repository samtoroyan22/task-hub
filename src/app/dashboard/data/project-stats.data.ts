import type { IProjectStat } from "../project-stats/project-stats.type";

export const PROJECT_STATS_DATA: IProjectStat[] = [
  {
    id: 1,
    number: 92,
    bgColor: "bg-violet-300",
    label: "Active Projects",
    icon: "/images/project-stats/active-projects.svg",
  },
  {
    id: 2,
    number: 35,
    bgColor: "bg-yellow-300",
    label: "On Going Projects",
    icon: "/images/project-stats/ongoing-projects.svg",
  },
  {
    id: 3,
    // minutes
    number: 1149,
    bgColor: "bg-pink-200",
    label: "Working Hours",
    icon: "/images/project-stats/working-hours.svg",
  },
];
