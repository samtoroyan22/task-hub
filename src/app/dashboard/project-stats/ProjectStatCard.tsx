import Image from "next/image";
import cn from "clsx";
import { formatMinutes } from "@/utils/format-minutes";
import type { TGetProjectStatsResponse } from "@/types/statistic.types";

interface Props {
  projectStat: TGetProjectStatsResponse[0];
  isLast: boolean;
}

export function ProjectStatCard({ projectStat, isLast }: Props) {
  return (
    <div
      className={cn(
        projectStat.bg_color,
        "rounded-2xl p-5 relative overflow-hidden shadow"
      )}
    >
      <div className="flex items-center justify-between relative z-10">
        <div className="flex flex-col">
          <span className="text-4xl font-semibold mb-1">
            {isLast ? formatMinutes(projectStat.number) : projectStat.number}
          </span>
          <span className="text-sm">{projectStat.label}</span>
        </div>

        <div className="flex-shrink-0 ml-4">
          <Image
            src={projectStat.icon || ""}
            alt={projectStat.label}
            width={80}
            height={80}
          />
        </div>
      </div>
    </div>
  );
}
