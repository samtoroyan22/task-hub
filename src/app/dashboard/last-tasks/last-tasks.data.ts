import type { ITask } from "@/types/task.types";
import { Plane, ShoppingBasket, TabletSmartphone } from "lucide-react";
import { USERS } from "../data/users.data";

export const TASKS: ITask[] = [
  {
    id: "1",
    title: "Travel App User Flow",
    icon: Plane,
    dueDate: new Date(new Date().getTime() + 5 * 24 * 60 * 60 * 1000),
    comments: ["Cool!", "Awesome", "Well done!"],
    resources: ["", "", "", "", "", ""],
    links: ["https://example.com", "https://example.com"],
    users: [USERS[0], USERS[1], USERS[2]],
    subTasks: [
      { id: "1", title: "Create wireframes", isCompleted: true },
      { id: "2", title: "Design UI components", isCompleted: true },
      { id: "3", title: "Implement user flow", isCompleted: false },
      { id: "4", title: "Test user flow", isCompleted: false },
    ],
  },
  {
    id: "2",
    title: "E-commerce Site Redesign",
    icon: ShoppingBasket,
    dueDate: new Date(new Date().getTime() + 3 * 24 * 60 * 60 * 1000),
    comments: ["Let's improve SEO", "Love the color palette"],
    resources: ["", "", "", ""],
    links: ["https://redesign.example.com"],
    users: [USERS[1], USERS[3], USERS[4]],
    subTasks: [
      { id: "1", title: "Research competitors", isCompleted: true },
      { id: "2", title: "Create mockups", isCompleted: true },
      { id: "3", title: "Feedback from marketing team", isCompleted: true },
    ],
  },
  {
    id: "3",
    title: "Mobile App Onboarding",
    icon: TabletSmartphone,
    dueDate: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
    comments: ["Needs animations", "Add progress bar"],
    resources: ["", "", ""],
    links: ["https://onboarding.example.com"],
    users: [USERS[0], USERS[2], USERS[3]],
    subTasks: [
      { id: "1", title: "Define onboarding goals", isCompleted: true },
      { id: "2", title: "Design onboarding screens", isCompleted: true },
      { id: "3", title: "Integrate with backend", isCompleted: true },
      { id: "4", title: "A/B test onboarding flow", isCompleted: true },
      { id: "5", title: "C/D test onboarding flow", isCompleted: false },
    ],
  },
];
