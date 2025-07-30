import Image from "next/image";
import { Task } from "../ui/tasks/Task";
import { getHours, getMinutes } from "date-fns";
import type { TTask } from "@/types/task.types";
import { parseTime } from "@/utils/parse-time";
import { currentHour, currentTimeLinePercent } from "./currnet-time-line";
import { cn } from "@/utils";
import TimelineCard from "./TimelineCard";

const HOURS = Array.from({ length: 9 }, (_, i) => i + 9);

interface Props {
  tasks: TTask[];
}

export const TasksTimeline = ({ tasks }: Props) => {
  const users = [
    ...new Map(
      tasks
        .flatMap((task) => task.task_participants)
        .filter((u) => Boolean(u?.profile))
        .map((user) => [user?.profile.id, user])
    ).values(),
  ];

  return (
    <div className="bg-card rounded-xl p-5">
      <div className="flex items-center justify-between mb-4 ">
        <h2 className="text-xl font-medium">Today Tasks</h2>
        <div className="flex items-center -space-x-3">
          {users.map((user) => (
            <div key={user.profile.id}>
              <Image
                src={user.profile.avatar_path || ""}
                alt={user.profile.avatar_path || ""}
                width={45}
                height={45}
                className="rounded-full border-2 border-white dark:border-neutral-800"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="w-full overflow-x-auto p-3">
        <div className="grid grid-cols-9">
          {HOURS.map((hour) => (
            <div
              key={hour}
              className={cn(
                "text-center text-sm font-medium opacity-50",
                hour === currentHour ? "text-primary" : ""
              )}
            >
              {hour > 12 ? `${hour - 12}:00 pm` : `${hour}:00 am`}
            </div>
          ))}
        </div>
      </div>

      <div className="h-72 relative">
        <div
          className="bg-primary/50 absolute top-2 bottom-0 w-0.5"
          style={{ left: currentTimeLinePercent + "%" }}
        />

        {tasks.map((task) => {
          return <TimelineCard key={task.id} task={task} />;
        })}
      </div>
    </div>
  );
};
