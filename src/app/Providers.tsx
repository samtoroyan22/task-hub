"use client";
import { ThemeProvider } from "next-themes";
import type { PropsWithChildren } from "react";

export function Providers({ children }: PropsWithChildren<unknown>) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </ThemeProvider>
  );
}
