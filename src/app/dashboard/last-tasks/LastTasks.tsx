"use client";

import { Task } from "@/components/ui/tasks/Task";
import { LastTasksSort } from "./LastTasksSort";
import { AnimatePresence, motion } from "framer-motion";
import { LastTasksFilter } from "./LastTasksFilter";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import type { TTaskSortBy, TTaskStatus } from "@/types/task.types";
import { getClientTasks } from "@/services/tasks/task-client.service";

type TClientTasksResponse = Awaited<ReturnType<typeof getClientTasks>>;

export const LastTasks = ({ tasks }: { tasks: TClientTasksResponse }) => {
  const [status, setStatus] = useState<TTaskStatus | undefined>(undefined);
  const [sort, setSort] = useState<TTaskSortBy>("asc");

  const { data } = useQuery({
    queryKey: ["last-tasks", status, sort],
    queryFn: () => getClientTasks({ status, sortByDueDate: sort }),
    initialData: tasks,
  });

  return (
    <div className="mb-6">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-xl font-medium">
          Last Tasks{" "}
          <span className="text-lg opacity-50 font-normal">
            ({data.length})
          </span>
        </h2>

        <div className="flex items-center gap-2">
          <LastTasksFilter status={status} setStatus={setStatus} />
          <LastTasksSort sort={sort} setSort={setSort} />
        </div>
      </div>

      <div>
        {data.length ? (
          <div className="grid grid-cols-3 gap-4">
            <AnimatePresence mode="popLayout">
              {data.map((task) => (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  <Task task={task} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            className="text-center"
          >
            No tasks available
          </motion.div>
        )}
      </div>
    </div>
  );
};
