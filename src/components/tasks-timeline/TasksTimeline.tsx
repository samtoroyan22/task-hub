import { taskStore } from "@/stores/task.store";
import { observer } from "mobx-react-lite";
import Image from "next/image";
import { Task } from "../ui/tasks/Task";
import { getHours, getMinutes } from "date-fns";

const HOURS = Array.from({ length: 9 }, (_, i) => i + 9);

export const TasksTimeline = observer(() => {
  const todayTasks = taskStore.todayTasks;
  const users = [...new Set(todayTasks.map((task) => task.users).flat())];

  return (
    <div className="bg-card rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-medium">Today Tasks</h2>
        <div className="flex items-center -space-x-3">
          {users.map((user) => (
            <div key={user.id} className="">
              <Image
                src={user.avatarPath || ""}
                alt={user.name}
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
              className="text-center text-sm font-medium opacity-50"
            >
              {hour > 12 ? `${hour - 12}:00 pm` : `${hour}:00 am`}
            </div>
          ))}
        </div>
      </div>

      <div className="h-72 relative">
        {todayTasks.map((task) => {
          const start = getHours(task.dueDate.startTime);
          const end = getHours(task.dueDate.endTime);

          const startMinutes = getMinutes(task.dueDate.startTime);
          const endMinutes = getMinutes(task.dueDate.endTime);

          const totalMinutes = (17 - 9) * 60;

          const startTotalMinutes = (start - 9) * 60 + startMinutes;
          const endTotalMinutes = (end - 9) * 60 + endMinutes;

          const startPercent = (startTotalMinutes / totalMinutes) * 100;
          const widthPercent =
            ((endTotalMinutes - startTotalMinutes) / totalMinutes) * 100;

          return (
            <div
              key={task.id}
              className="absolute top-8"
              style={{
                left: `${startPercent}%`,
                width: `${widthPercent}%`,
              }}
            >
              <Task task={task} isColor isMinimal />
            </div>
          );
        })}
      </div>
    </div>
  );
});
