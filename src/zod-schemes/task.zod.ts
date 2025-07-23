import { ICON_NAMES } from "@/utils/icon-map";
import { z } from "zod";

export const TaskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  due_date: z.date().min(new Date(), "Due date must be in the future"),
  icon: z.enum(ICON_NAMES, {
    errorMap: () => ({
      message: "Icon is required",
    }),
  }),
});
