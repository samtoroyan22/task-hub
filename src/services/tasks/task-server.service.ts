"use server";

import { createClientFromServer } from "@/utils/supabase/server";

export async function getServerTasks() {
  return (await createClientFromServer())
    .from("task")
    .select(`*, sub_task(*), task_participants(profile(*))`)
    .order("due_date", {
      ascending: true,
    });
}

export async function getServerTodayTasks() {
  const client = await createClientFromServer();
  return client
    .from("task")
    .select(`*, sub_task(*), task_participants(profile(*))`)
    .eq("due_date", new Date().toISOString().split("T")[0]);
}
