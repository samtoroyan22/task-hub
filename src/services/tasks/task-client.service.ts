"use client";

import type { Database } from "@/types/db.types";
import { createClient } from "@/utils/supabase/client";

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
