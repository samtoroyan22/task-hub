import { Sidebar } from "@/components/layout/sidebar/Sidebar";
import { PublicPages } from "@/config/public-pages";
import getServerAuth from "@/utils/supabase/get-server-auth";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default async function DashboardLayout({ children }: Props) {
  const user = await getServerAuth();

  if (!user) {
    redirect(PublicPages.LOGIN);
  }

  return (
    <div className="grid grid-cols-[250px_1fr] h-screen">
      <Sidebar />
      <main>{children}</main>
    </div>
  );
}
