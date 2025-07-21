"use client";

import type { TTask } from "@/types/task.types";
import {
  Edit2,
  Link,
  Image as LucideImage,
  MessageSquareMore,
} from "lucide-react";
import { ProgressBar } from "../ProgressBar";
import { TaskEditModal } from "./TaskEditModal";
import { useMemo, useState } from "react";
import { ICON_MAP } from "@/utils/icon-map";
import { SubTaskCreateModal } from "@/app/dashboard/last-tasks/create-sub-task/SubTaskCreateModal";
import { observer } from "mobx-react-lite";
import { format, isToday } from "date-fns";
import { cn } from "@/utils";

interface Props {
  task: TTask;
  isColor?: boolean;
  isMinimal?: boolean;
}

export const Task = observer(({ task, isColor, isMinimal }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const progress = Math.round(
    ((task?.sub_task?.filter((sub) => sub.completed).length || 0) /
      (task?.sub_task?.length || 0)) *
      100
  );

  const Icon = ICON_MAP[task.icon as keyof typeof ICON_MAP];

  const dueDate = useMemo(
    () =>
      isToday(task.due_date)
        ? "Today"
        : Math.ceil((+task.due_date - Date.now()) / (1000 * 60 * 60 * 24)) +
          " days",
    [task.due_date]
  );

  return (
    <div
      className={cn(
        "bg-card p-3.5 rounded-xl",
        isColor && task.color,
        isColor && "text-foreground"
      )}
    >
      <div
        className={cn(
          "mb-3 flex items-start justify-between",
          isMinimal && "flex-col gap-3 mb-0"
        )}
      >
        <div className="flex items-start gap-3">
          <div
            className={cn(
              "bg-primary/10 p-2 rounded-full flex items-center justify-center",
              isColor && "text-primary bg-card"
            )}
          >
            {task.icon && <Icon className="text-purple-600" />}
          </div>
          <div className={cn(!isMinimal && "w-32")}>
            <span className="font-medium leading-snug wrap-normal opacity-90">
              {task.title}
            </span>
            <div>
              <span
                className={cn("text-sm opacity-50", isColor && "opacity-75")}
              >
                {isMinimal ? (
                  <>
                    {format(task.start_time!, "h:m a")} -{" "}
                    {format(task.end_time!, "h:m a")}
                  </>
                ) : (
                  <>Due: {dueDate}</>
                )}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center -space-x-3">
          {/* {task.users.map((user) => (
            <div key={user.id} className="">
              <Image
                src={user.avatarPath || ""}
                alt={user.name}
                width={36}
                height={36}
                className="rounded-full border-2 border-white dark:border-neutral-800"
              />
            </div>
          ))} */}
        </div>
      </div>

      {!isMinimal && (
        <div className="mb-4">
          <ProgressBar progress={progress} />
        </div>
      )}

      {!isMinimal && (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-sm">
              <MessageSquareMore
                className={isColor ? "opacity-80" : "opacity-40"}
                size={20}
              />
              {/* {task.comments.length} */}
            </span>
            <span className="flex items-center gap-1 text-sm">
              <LucideImage
                className={isColor ? "opacity-80" : "opacity-40"}
                size={20}
              />
              {task?.sub_task?.length}
            </span>
            <span className="flex items-center gap-1 text-sm">
              <Link
                className={isColor ? "opacity-80" : "opacity-40"}
                size={20}
              />
              {/* {task.links.length} */}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <SubTaskCreateModal
              taskId={task.id}
              onClose={() => setIsModalOpen(false)}
            />

            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-card dark:bg-primary/10 border-1 border-primary text-primary p-2 rounded-full hover:bg-primary/20 dark:hover:bg-primary/25 transition-colors"
            >
              <Edit2 size={15} />
            </button>
          </div>
        </div>
      )}

      {isModalOpen && (
        <TaskEditModal
          id={task.id}
          title={task.title}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
});
