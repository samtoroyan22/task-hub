"use client";

import type { ITask } from "@/types/task.types";
import {
  Edit2,
  Link,
  Image as LucideImage,
  MessageSquareMore,
} from "lucide-react";
import Image from "next/image";
import { ProgressBar } from "../ProgressBar";
import { TaskEditModal } from "./TaskEditModal";
import { useState } from "react";
import { ICON_MAP } from "@/utils/icon-map";
import { SubTaskCreateModal } from "@/app/dashboard/last-tasks/create-sub-task/SubTaskCreateModal";
import { observer } from "mobx-react-lite";

interface Props {
  task: ITask;
}

export const Task = observer(({ task }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const progress = Math.round(
    (task.subTasks.filter((sub) => sub.isCompleted).length /
      task.subTasks.length) *
      100
  );

  const Icon = ICON_MAP[task.icon];

  return (
    <div className="bg-card p-3.5 rounded-xl">
      <div className="mb-3 flex items-start justify-between">
        <div className="flex items-start gap-3">
          <div className="bg-primary/10 p-2 rounded-full flex items-center justify-center">
            {task.icon && <Icon className="text-purple-600" />}
          </div>
          <div className="w-32">
            <span className="font-medium leading-snug wrap-normal opacity-90">
              {task.title}
            </span>
            <div>
              <span className="text-sm opacity-50">
                Due: {task.dueDate.toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center -space-x-3">
          {task.users.map((user) => (
            <div key={user.id} className="">
              <Image
                src={user.avatarPath || ""}
                alt={user.name}
                width={36}
                height={36}
                className="rounded-full border-2 border-white dark:border-neutral-800"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <ProgressBar progress={progress} />
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1 text-sm">
            <MessageSquareMore className="opacity-40" size={20} />
            {task.comments.length}
          </span>
          <span className="flex items-center gap-1 text-sm">
            <LucideImage className="opacity-40" size={20} />
            {task.subTasks.length}
          </span>
          <span className="flex items-center gap-1 text-sm">
            <Link className="opacity-40" size={20} />
            {task.links.length}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <SubTaskCreateModal
            taskId={task.id}
            onClose={() => setIsModalOpen(false)}
          />

          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-white dark:bg-primary/10 border-1 border-primary text-primary p-2 rounded-full hover:bg-primary/20 dark:hover:bg-primary/25 transition-colors"
          >
            <Edit2 size={15} />
          </button>
        </div>
      </div>

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
