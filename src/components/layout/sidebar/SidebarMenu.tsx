import Link from "next/link";
import { MAIN_MENU } from "./data/main-menu.data";

export function SidebarMenu() {
  return (
    <nav className="mb-10 mt-3">
      <ul className="space-y-5">
        {MAIN_MENU.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="text-neutral-500 dark:text-white pl-2 flex items-center justify-between gap-2 hover:text-neutral-900 hover:dark:text-primary transition-colors"
            >
              <span className="flex items-center gap-2">
                <item.icon size={20} />
                <span>{item.label}</span>
              </span>
              {item.label === "Messages" && (
                <span className="text-primary bg-[#DCDEF6] rounded-lg px-2 py-0.5 text-xs font-medium">
                  4
                </span>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
