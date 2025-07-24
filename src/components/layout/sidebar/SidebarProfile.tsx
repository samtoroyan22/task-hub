"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "@/services/profile/profile-client.service";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Image from "next/image";

export function SidebarProfile() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { data, isPending } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });

  if (!mounted) return null;

  const isDark = theme === "dark";
  const baseColor = isDark ? "#202020" : "#ebebeb";
  const highlightColor = isDark ? "#444" : "#fff";

  return (
    <div className="mb-10 flex items-center gap-2.5">
      {isPending ? (
        <SkeletonTheme
          baseColor={baseColor}
          highlightColor={highlightColor}
          borderRadius={12}
        >
          <div className="flex items-center gap-2.5">
            <Skeleton circle width={32} height={32} />
            <div>
              <Skeleton width={100} height={14} className="mb-1" />
              <Skeleton width={140} height={12} />
            </div>
          </div>
        </SkeletonTheme>
      ) : (
        !!data && (
          <div className="flex items-center gap-2">
            {data.avatar_path ? (
              <Image
                src={data.avatar_path || ""}
                alt={data.name || ""}
                width={36}
                height={36}
                className="rounded-full shrink-0"
              />
            ) : (
              <div className="w-8 h-8 bg-[var(--color-primary)] rounded-full" />
            )}

            <div className="flex flex-col max-w-[160px] leading-snug overflow-hidden">
              <div className="font-medium text-sm truncate">{data.name}</div>
              <div className="opacity-60 text-xs font-medium break-words">
                {data.email}
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
}
