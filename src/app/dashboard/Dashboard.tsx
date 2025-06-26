"use client";

import { Heading } from "@/components/ui/Heading";
import { SearchField } from "@/components/ui/search-field/SearchField";
import dynamic from "next/dynamic";
const DynamicThemeToggle = dynamic(
  () =>
    import("../../components/layout/sidebar/ThemeToggle").then(
      (mod) => mod.ThemeToggle
    ),
  { ssr: false }
);

export function Dashboard() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <Heading>Dashboard</Heading>
        <div className="flex items-baseline justify-between gap-3">
          <DynamicThemeToggle />
          <SearchField value="" onChange={() => {}} />
        </div>
      </div>
    </div>
  );
}
