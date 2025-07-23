import type { Metadata } from "next";
import { Dashboard } from "./Dashboard";
import {
  getServerTodayTasks,
  getServerTasks,
} from "@/services/tasks/task-server.service";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function Page() {
  const [tasks, todayTasks] = await Promise.all([
    getServerTasks(),
    getServerTodayTasks(),
  ]);

  return (
    <Dashboard tasks={tasks.data || []} todayTasks={todayTasks.data || []} />
  );
}
