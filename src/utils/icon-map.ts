import {
  BookOpen,
  File,
  Hammer,
  Notebook,
  Plane,
  ShoppingBasket,
  TabletSmartphone,
  type LucideIcon,
} from "lucide-react";

export const ICON_NAMES = [
  "Plane",
  "ShoppingBasket",
  "TabletSmartphone",
  "BookOpen",
  "Hammer",
  "File",
  "Notebook",
] as const;

export type IconName = (typeof ICON_NAMES)[number];

export const ICON_MAP: Record<IconName, LucideIcon> = {
  BookOpen,
  File,
  Hammer,
  Notebook,
  Plane,
  ShoppingBasket,
  TabletSmartphone,
};
