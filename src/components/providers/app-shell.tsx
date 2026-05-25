"use client";

import { PreorderProvider } from "@/components/preorder/preorder-context";
import { PreorderFlow } from "@/components/preorder/preorder-flow";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <PreorderProvider>
      {children}
      <PreorderFlow mode="overlay" />
    </PreorderProvider>
  );
}
