'use client';

import { useEffect, useState } from 'react';
import { ThemeProvider } from 'next-themes';
import Sidebar from './Sidebar';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch and flash of wrong theme
  useEffect(() => {
    setMounted(true);
    // Add class to prevent transitions on initial load
    document.documentElement.classList.add('no-transitions');
    setTimeout(() => {
      document.documentElement.classList.remove('no-transitions');
    }, 100);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <Sidebar />
        <main className="lg:pl-64 transition-padding duration-300">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </ThemeProvider>
  );
} 