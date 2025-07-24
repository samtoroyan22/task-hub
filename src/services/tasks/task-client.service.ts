"use client";

import type { Database } from "@/types/db.types";
import type { TTask, TTaskSortBy, TTaskStatus } from "@/types/task.types";
import { createClient } from "@/utils/supabase/client";

function filterTasks(tasks: TTask[], status: TTaskStatus) {
  return tasks.filter((task) => {
    switch (status) {
      case "not-started":
        return task?.sub_task?.every((subTask) => !subTask.completed);
      case "in-progress":
        return task?.sub_task?.some((subTask) => !subTask.completed);
      case "completed":
        return task?.sub_task?.every((subTask) => subTask.completed);
      default:
        return true;
    }
  });
}

export async function getClientTasks({
  status,
  sortByDueDate,
}: {
  status?: TTaskStatus;
  sortByDueDate?: TTaskSortBy;
}) {
  const client = createClient();

  let query = client
    .from("task")
    .select(`*, sub_task(*), task_participants(profile(*))`);

  if (sortByDueDate) {
    query = query.order("due_date", {
      ascending: sortByDueDate === "asc",
    });
  }

  const { data, error } = await query;

  if (error || !data) throw new Error(error.message || "Failed to fetch tasks");

  if (status) {
    return filterTasks(data, status);
  }

  return data;
}

export async function taskClientGetById(id: string) {
  const client = createClient();
  const { data, error } = await client
    .from("task")
    .select(`*, sub_task(*)`)
    .eq("id", id)
    .single();

  if (error || !data) throw new Error(error.message || "Task not found");
  return data;
}

export async function taskClientUpdate(
  id: string,
  task: Database["public"]["Tables"]["task"]["Update"]
) {
  const client = createClient();
  const { data, error } = await client
    .from("task")
    .update(task)
    .eq("id", id)
    .select(`*, sub_task(*)`)
    .single();
  if (error || !data) throw new Error(error.message || "Task not found");
  return data;
}

export async function taskClientCreate(
  task: Database["public"]["Tables"]["task"]["Insert"]
) {
  const client = createClient();
  const { data, error } = await client
    .from("task")
    .insert(task)
    .select(`*, sub_task(*)`)
    .single();
  if (error || !data) throw new Error(error.message || "Task not found");
  return data;
}

export async function taskClientDelete(id: string) {
  const client = createClient();
  const { data, error } = await client
    .from("task")
    .delete()
    .eq("id", id)
    .select(`*, sub_task(*)`)
    .single();
  if (error || !data) throw new Error(error.message || "Task not found");
  return data;
}

export async function createClientSubTask(
  taskId: string,
  subTask: Database["public"]["Tables"]["sub_task"]["Insert"]
) {
  const client = createClient();
  const { data, error } = await client
    .from("sub_task")
    .insert({ ...subTask, task_id: taskId })
    .select(`*`)
    .single();
  if (error || !data) throw new Error(error.message || "Task not found");
  return data;
}
