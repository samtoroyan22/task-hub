"use client";

import type { TTaskFormData } from "@/types/task.types";
import { TaskSchema } from "@/zod-schemes/task.zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../form";
import { Button } from "../button";
import { Input } from "../input";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@radix-ui/react-popover";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { ICON_MAP, ICON_NAMES } from "@/utils/icon-map";
import { taskStore } from "@/stores/task.store";
import { observer } from "mobx-react-lite";
import { toast } from "sonner";
import { z } from "zod";

interface Props {
  id: string;
  title: string;
  onClose: () => void;
}

export const TaskEditModal = observer(({ id, title, onClose }: Props) => {
  useEffect(() => {
    const task = taskStore.getTaskById(id);
    if (!task) return;
    form.reset({
      title: task.title,
      dueDate: new Date(task.dueDate),
      icon: task.icon,
    });
  }, [id]);

  const form = useForm<z.infer<typeof TaskSchema>>({
    resolver: zodResolver(TaskSchema),
    defaultValues: { title: title, dueDate: undefined, icon: undefined },
  });

  const onSubmit = (data: TTaskFormData) => {
    taskStore.updateTask(id, data);
    toast.success("Task updated successfully");
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className="mx-4 max-h-[90vh] w-full max-w-sm overflow-y-auto rounded-lg bg-white p-6 dark:bg-gray-800"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold">Edit Task {id}</h2>
          <button onClick={onClose} className="text-2xl">
            ×
          </button>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dueDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Due Date</FormLabel>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          data-empty={!field.value}
                          className="w-full justify-start text-left font-normal"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value
                            ? format(field.value, "PPP")
                            : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="icon"
              render={({ field: { onChange, value } }) => (
                <FormItem>
                  <FormLabel>Icon</FormLabel>
                  <FormControl>
                    <div className="flex justify-between">
                      {ICON_NAMES.map((name) => {
                        const Icon = ICON_MAP[name];
                        return (
                          <Button
                            type="button"
                            key={name}
                            variant={value === name ? "default" : "outline"}
                            onClick={() => onChange(name)}
                            className="h-10 w-10 p-0"
                          >
                            <Icon size={18} />
                          </Button>
                        );
                      })}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">Save</Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
});
