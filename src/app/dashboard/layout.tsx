import { Sidebar } from "@/components/layout/sidebar/Sidebar";
import type { PropsWithChildren, ReactNode } from "react";

export default function DashboardLayout({ children }: PropsWithChildren) {
  return (
    <div className="grid grid-cols-[250px_1fr] h-screen">
      <Sidebar />
      <main className="p-5">{children}</main>
    </div>
  );
}
