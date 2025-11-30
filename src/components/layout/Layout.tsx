import type { ReactNode } from 'react';
import { TopBar } from '@/components/layout/TopBar';
import { BottomNavigation } from '@/components/layout/BottomNavigation';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <TopBar />
      <main className="flex-1 pb-24 md:pb-0 w-full max-w-7xl mx-auto px-4 py-6">
        <div className="w-full">{children}</div>
      </main>
      <BottomNavigation />
    </div>
  );
}
