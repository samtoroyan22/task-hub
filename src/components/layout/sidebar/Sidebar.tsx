"use client";

import { SidebarHeading } from "./SidebarHeading";
import { SidebarMenu } from "./SidebarMenu";
import { SidebarProfile } from "./SidebarProfile";
import { SidebarProjects } from "./SidebarProjects";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { PublicPages } from "@/config/public-pages";
import { createClient } from "@/utils/supabase/client";

export const Sidebar = () => {
  const router = useRouter();

  async function signOut() {
    const { error } = await createClient().auth.signOut();
    if (!error) {
      router.push(PublicPages.LOGIN);
    }
  }

  return (
    <aside className="p-4 bg-white dark:bg-neutral-800">
      <div className="flex items-center justify-between">
        <SidebarHeading title="Account" />
        <Button
          variant="ghost"
          className="opacity-50 hover:opacity-100 transition-opacity rounded-4xl"
          onClick={signOut}
        >
          <LogOut />
        </Button>
      </div>
      <SidebarProfile />

      <SidebarHeading title="Main Menu" />
      <SidebarMenu />
      <SidebarHeading title="Projects" />
      <SidebarProjects />
    </aside>
  );
};
