import type { TTask } from "@/types/task.types";
import { memo, useMemo } from "react";
import { getTaskCardPercent } from "./task-card-percent";
import { Task } from "../ui/tasks/Task";

interface Props {
  task: TTask;
}

function TimelineCard({ task }: Props) {
  const percent = useMemo(() => getTaskCardPercent(task), [task]);

  return (
    <div
      className="absolute top-8"
      style={{
        left: `${percent?.startPercent}%`,
        width: `${percent?.widthPercent}%`,
      }}
    >
      <Task task={task} isColor isMinimal />
    </div>
  );
}

export default memo(TimelineCard);
