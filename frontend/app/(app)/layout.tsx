import { ReactNode } from "react";
import { AppHeader } from "@/components/layout/AppHeader";

type AppLayoutProps = {
  children: ReactNode;
};

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-obsidian">
      <AppHeader />
      <main className="px-6 py-10 md:px-12">{children}</main>
    </div>
  );
}
