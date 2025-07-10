import { Task } from "@/components/ui/tasks/Task";
import { LastTasksSort } from "./LastTasksSort";
import { AnimatePresence, motion } from "framer-motion";
import { LastTasksFilter } from "./LastTasksFilter";
import { observer } from "mobx-react-lite";
import { taskStore } from "@/stores/task.store";

export const LastTasks = observer(() => {
  const filteredTasks = taskStore.filteredTasks;
  return (
    <div className="mb-6">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-xl font-medium">
          Last Tasks{" "}
          <span className="text-lg opacity-50 font-normal">
            ({filteredTasks.length})
          </span>
        </h2>

        <div className="flex items-center gap-2">
          <LastTasksFilter />
          <LastTasksSort />
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
});
