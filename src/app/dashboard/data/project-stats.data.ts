import type { IProjectStat } from "../project-stats/project-stats.type";

export const PROJECT_STATS_DATA: IProjectStat[] = [
  {
    id: 1,
    number: 92,
    bgColor: "bg-primary/30 dark:bg-primary/70",
    label: "Active Projects",
    icon: "/images/project-stats/active-projects.svg",
  },
  {
    id: 2,
    number: 35,
    bgColor: "bg-yellow-300 dark:bg-yellow-400/70",
    label: "On Going Projects",
    icon: "/images/project-stats/ongoing-projects.svg",
  },
  {
    id: 3,
    // minutes
    number: 1149,
    bgColor: "bg-pink-200 dark:bg-pink-400/70",
    label: "Working Hours",
    icon: "/images/project-stats/working-hours.svg",
  },
];
