import type { TTaskStatus } from "@/types/task.types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/utils";
import { Button } from "@/components/ui/button";
import { observer } from "mobx-react-lite";
import { taskStore } from "@/stores/task.store";

const statuses: Array<TTaskStatus | "all"> = [
  "all",
  "not-started",
  "in-progress",
  "completed",
];

export const LastTasksFilter = observer(() => {
  const currentStatus = taskStore.status;
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="capitalize bg-white hover:bg-white/70"
          >
            {currentStatus?.replace("-", " ") || "All"}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {statuses.map((taksStatus) => (
            <DropdownMenuItem
              key={taksStatus}
              onClick={() =>
                taskStore.setStatus(taksStatus === "all" ? null : taksStatus)
              }
              className={cn(
                currentStatus === taksStatus ? "font-bold" : "",
                "cursor-pointer capitalize transition-colors dark:hover:bg-neutral-700/70"
              )}
            >
              {taksStatus.replace("-", " ")}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
});
