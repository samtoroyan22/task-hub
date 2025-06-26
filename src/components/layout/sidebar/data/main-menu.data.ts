import {
  CalendarDays,
  ChartNoAxesColumn,
  Grid2X2,
  LayoutGrid,
  MessageCircleMore,
  NotebookText,
  Settings,
  UsersRound,
} from "lucide-react";
import type { IMenuItem } from "../menu/menu.types";
import { Pages } from "@/config/pages";

export const MAIN_MENU: IMenuItem[] = [
  {
    icon: LayoutGrid,
    label: "Dashboard",
    href: Pages.DASHBOARD,
  },
  {
    icon: MessageCircleMore,
    label: "Messages",
    href: Pages.MESSAGES,
  },
  {
    icon: ChartNoAxesColumn,
    label: "Insight",
    href: Pages.INSIGHT,
  },
  {
    icon: UsersRound,
    label: "Team",
    href: Pages.TEAM,
  },
  {
    icon: CalendarDays,
    label: "Schedule",
    href: Pages.SCHEDULE,
  },
  {
    icon: NotebookText,
    label: "Report",
    href: Pages.REPORT,
  },
  {
    icon: Settings,
    label: "Settings",
    href: Pages.SETTINGS,
  },
];
