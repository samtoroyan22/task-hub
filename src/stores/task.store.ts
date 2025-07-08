import { TASKS } from "@/app/dashboard/last-tasks/last-tasks.data";
import type {
  ITask,
  TTaskFormData,
  TSubTaskFormData,
  TTaskStatus,
  TTaskSortBy,
} from "@/types/task.types";
import { makeAutoObservable } from "mobx";

class TaskStore {
  tasks: ITask[] = TASKS;
  status: TTaskStatus | null = null;
  sortByDueDate: TTaskSortBy = "asc";

  constructor() {
    makeAutoObservable(this);
  }

  getTaskById(id: string): ITask | undefined {
    return this.tasks.find((task) => task.id === id);
  }

  updateTask(id: string, updateTask: TTaskFormData): void {
    const taskIndex = this.tasks.findIndex((task) => task.id === id);
    if (taskIndex === -1) return;
    this.tasks[taskIndex] = { ...this.tasks[taskIndex], ...updateTask };
  }

  addSubTask(taskId: string, subTask: TSubTaskFormData): void {
    const task = this.getTaskById(taskId);
    if (!task) return;
    if (!task.subTasks) {
      task.subTasks = [];
    }
    task.subTasks.push({
      id: crypto.randomUUID(),
      title: subTask.title,
      isCompleted: false,
    });
  }

  setStatus(status: TTaskStatus | null): void {
    this.status = status;
  }

  setSortByDueDate(sortBy: TTaskSortBy): void {
    this.sortByDueDate = sortBy;
  }

  get filteredTasks(): ITask[] {
    let filtered = this.tasks;
    if (this.status) {
      filtered = filtered.filter((task) => {
        switch (this.status) {
          case "not-started":
            return task.subTasks.every((subTask) => !subTask.isCompleted);
          case "in-progress":
            return task.subTasks.some((subTask) => !subTask.isCompleted);
          case "completed":
            return task.subTasks.every((subTask) => subTask.isCompleted);
          default:
            return true;
        }
      });
    }

    return filtered.slice().sort((a, b) => {
      const dateA = new Date(a.dueDate).getTime();
      const dateB = new Date(b.dueDate).getTime();

      if (this.sortByDueDate === "asc") {
        return dateA - dateB;
      } else {
        return dateB - dateA;
      }
    });
  }
}

export const taskStore = new TaskStore();
