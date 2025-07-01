import { Task } from "@/components/ui/tasks/Task";
import { TASKS } from "./last-tasks.data";

export function LastTasks() {
  return (
    <div>
      <h2 className="text-xl font-medium mb-5">
        Last Tasks{" "}
        <span className="text-lg opacity-50 font-normal">({TASKS.length})</span>
      </h2>
      <div>
        {TASKS.length ? (
          <div className="grid grid-cols-3 gap-4">
            {TASKS.map((task) => (
              <Task key={task.id} task={task} />
            ))}
          </div>
        ) : (
          <div className="opacity-50">No tasks available</div>
        )}
      </div>
    </div>
  );
}
