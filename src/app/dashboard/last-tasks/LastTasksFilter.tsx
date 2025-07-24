import type { TTaskStatus } from "@/types/task.types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/utils";
import { Button } from "@/components/ui/button";
import { taskStore } from "@/stores/task.store";

const statuses: Array<TTaskStatus | "all"> = [
  "all",
  "not-started",
  "in-progress",
  "completed",
];

interface Props {
  status: TTaskStatus | undefined;
  setStatus: (status: TTaskStatus | undefined) => void;
}

export const LastTasksFilter = ({ status, setStatus }: Props) => {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="capitalize bg-white hover:bg-white/70"
          >
            {status?.replace("-", " ") || "All"}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {statuses.map((taksStatus) => (
            <DropdownMenuItem
              key={taksStatus}
              onClick={() =>
                setStatus(taksStatus === "all" ? undefined : taksStatus)
              }
              className={cn(
                status === taksStatus ? "font-bold" : "",
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
};
