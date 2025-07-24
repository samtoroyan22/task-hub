import type { TTaskSortBy } from "@/types/task.types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const sortTypes: Array<TTaskSortBy> = ["asc", "desc"];

interface Props {
  sort: TTaskSortBy;
  setSort: (sort: TTaskSortBy) => void;
}

export const LastTasksSort = ({ sort, setSort }: Props) => {
  return (
    <div className="">
      <Select
        defaultValue={sort}
        onValueChange={(value: TTaskSortBy) => setSort(value)}
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
};
