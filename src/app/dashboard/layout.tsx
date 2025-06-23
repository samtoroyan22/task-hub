import { Sidebar } from "@/components/layout/sidebar/Sidebar";
import type { PropsWithChildren, ReactNode } from "react";

export default function DashboardLayout({ children }: PropsWithChildren) {
  return (
    <div>
      <Sidebar />
      <main>{children}</main>
    </div>
  );
}
