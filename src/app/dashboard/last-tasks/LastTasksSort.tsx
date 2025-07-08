import type { TTaskSortBy } from "@/types/task.types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { observer } from "mobx-react-lite";
import { taskStore } from "@/stores/task.store";

const sortTypes: Array<TTaskSortBy> = ["asc", "desc"];

export const LastTasksSort = observer(() => {
  return (
    <div className="">
      <Select
        defaultValue={taskStore.sortByDueDate}
        onValueChange={(value: TTaskSortBy) =>
          taskStore.setSortByDueDate(value)
        }
      >
        <SelectTrigger className="w-[180px] bg-white hover:bg-white/70">
          <SelectValue placeholder="Sort by due date" />
        </SelectTrigger>
        <SelectContent>
          {sortTypes.map((type) => (
            <SelectItem key={type} value={type} className="cursor-pointer">
              {type === "asc" ? "Ascending" : "Descending"}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
});
