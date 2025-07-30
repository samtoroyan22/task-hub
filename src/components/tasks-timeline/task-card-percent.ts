import type { TTask } from "@/types/task.types";
import { parseTime } from "@/utils/parse-time";
import { getHours, getMinutes } from "date-fns";

export function getTaskCardPercent(task: TTask) {
  if (!task.start_time || !task.end_time) {
    return null;
  }

  const correctStartTime = parseTime(task.due_date, task.start_time);
  const correctEndTime = parseTime(task.due_date, task.end_time);

  const start = getHours(correctStartTime);
  const end = getHours(correctEndTime);

  const startMinutes = getMinutes(correctStartTime);
  const endMinutes = getMinutes(correctEndTime);

  const totalMinutes = (17 - 9) * 60;

  const startTotalMinutes = (start - 9) * 60 + startMinutes;
  const endTotalMinutes = (end - 9) * 60 + endMinutes;

  const startPercent = (startTotalMinutes / totalMinutes) * 100;
  const widthPercent =
    ((endTotalMinutes - startTotalMinutes) / totalMinutes) * 100;

  return { startPercent, widthPercent };
}
