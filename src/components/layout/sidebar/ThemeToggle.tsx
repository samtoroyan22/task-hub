"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();
  return (
    <div className="mt-3.5">
      <button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="p-2 rounded-full dark:text-white text-neutral-800 bg-white shadow-sm dark:bg-white/10 hover:bg-neutral-100 dark:hover:bg-neutral-600 transition-colors cursor-pointer"
      >
        {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
      </button>
    </div>
  );
}
