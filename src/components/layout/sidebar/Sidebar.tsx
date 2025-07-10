"use client";

import { observer } from "mobx-react-lite";
import { SidebarHeading } from "./SidebarHeading";
import { SidebarMenu } from "./SidebarMenu";
import { SidebarProfile } from "./SidebarProfile";
import { SidebarProjects } from "./SidebarProjects";
import { authStore } from "@/stores/auth.store";
import { useEffect, useState } from "react";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { PublicPages } from "@/config/public-pages";

export const Sidebar = observer(() => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsLoggedIn(authStore.isLoggedIn);
  }, []);

  return (
    <aside className="p-5 bg-white dark:bg-neutral-800">
      {isLoggedIn && (
        <>
          <div className="flex items-center justify-between">
            <SidebarHeading title="Account" />
            <Button
              variant="ghost"
              className="opacity-50 hover:opacity-100 transition-opacity rounded-4xl"
              onClick={() => {
                authStore.logout;
                router.push(PublicPages.LOGIN);
              }}
            >
              <LogOut />
            </Button>
          </div>
          <SidebarProfile />
        </>
      )}
      <SidebarHeading title="Main Menu" />
      <SidebarMenu />
      <SidebarHeading title="Projects" />
      <SidebarProjects />
    </aside>
  );
});
