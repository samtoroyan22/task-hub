"use server";

import { createClientFromServer } from "@/utils/supabase/server";

export async function taskServerGetAll() {
  console.log(
    (await (await createClientFromServer()).auth.getUser()).data.user
  );

  return (await createClientFromServer()).from("task").select(`*, sub_task(*)`);
}
