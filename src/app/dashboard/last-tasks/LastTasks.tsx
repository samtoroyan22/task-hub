import { Task } from "@/components/ui/tasks/Task";
import { TASKS } from "./last-tasks.data";
import { useMemo, useState } from "react";
import type { TTaskSortBy, TTaskStatus } from "@/types/task.types";
import { LastTasksSort } from "./LastTasksSort";
import { AnimatePresence, motion } from "framer-motion";
import { LastTasksFilter } from "./LastTasksFilter";

export function LastTasks() {
  const [status, setStatus] = useState<TTaskStatus | null>(null);
  const [sortByDueDate, setSortByDueDate] = useState<TTaskSortBy>("asc");

  const filteredTasks = useMemo(() => {
    const filtered = !status
      ? TASKS
      : TASKS.filter((task) => {
          switch (status) {
            case "not-started":
              return task.subTasks.every((subTask) => !subTask.isCompleted);
            case "in-progress":
              return task.subTasks.some((subTask) => !subTask.isCompleted);
            case "completed":
              return task.subTasks.every((subTask) => subTask.isCompleted);
            default:
              return true;
          }
        });

    const sortedTasks = filtered.sort((a, b) => {
      const dateA = new Date(a.dueDate).getTime();
      const dateB = new Date(b.dueDate).getTime();
      if (sortByDueDate === "asc") {
        return dateA - dateB;
      } else {
        return dateB - dateA;
      }
    });

    return sortedTasks;
  }, [status, sortByDueDate]);

  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-xl font-medium">
          Last Tasks{" "}
          <span className="text-lg opacity-50 font-normal">
            ({filteredTasks.length})
          </span>
        </h2>

        <div className="flex items-center gap-2">
          <LastTasksFilter status={status} setStatus={setStatus} />
          <LastTasksSort
            sortByDueDate={sortByDueDate}
            setSortByDueDate={setSortByDueDate}
          />
        </div>
      </div>

      <div>
        {filteredTasks.length ? (
          <div className="grid grid-cols-3 gap-4">
            <AnimatePresence mode="popLayout">
              {filteredTasks.map((task) => (
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
}
