import type { TTaskSortBy } from "@/types/task.types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/utils";

interface Props {
  sortByDueDate: TTaskSortBy;
  setSortByDueDate: (value: TTaskSortBy) => void;
}

const sortTypes: Array<TTaskSortBy> = ["asc", "desc"];

export function LastTasksSort({ sortByDueDate, setSortByDueDate }: Props) {
  return (
    <div className="">
      <Select defaultValue={sortByDueDate} onValueChange={setSortByDueDate}>
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
}
