import type { Metadata } from "next";

import { NO_INDEX_PAGE } from "@/constants/seo.constants";
import { AuthForm } from "../AuthForm";
import getServerAuth from "@/utils/supabase/get-server-auth";
import { redirect } from "next/navigation";
import { DashboardPages } from "@/config/dashboard-pages";

export const metadata: Metadata = {
  title: "Login",
  ...NO_INDEX_PAGE,
};

export default async function Page() {
  const user = await getServerAuth();
  if (user) {
    redirect(DashboardPages.BASE);
  }
  return <AuthForm />;
}
