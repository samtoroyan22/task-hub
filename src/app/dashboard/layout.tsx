import { Sidebar } from "@/components/layout/sidebar/Sidebar";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function DashboardLayout({ children }: Props) {
  return (
    <div className="grid grid-cols-[250px_1fr] h-screen">
      <Sidebar />
      <main className="p-5">{children}</main>
    </div>
  );
}
