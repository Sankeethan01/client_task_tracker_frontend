'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import {
  HomeIcon,
  UserGroupIcon,
  FolderIcon,
  ClipboardDocumentListIcon,
  Cog6ToothIcon,
  ArrowLeftOnRectangleIcon,
  SunIcon,
  MoonIcon,
  Bars3Icon,
  XMarkIcon,
  ComputerDesktopIcon,
} from '@heroicons/react/24/outline';
import clsx from 'clsx';

const navigation = [
  { name: 'Dashboard', href: '/', icon: HomeIcon },
  { name: 'Clients', href: '/clients', icon: UserGroupIcon },
  { name: 'Projects', href: '/projects', icon: FolderIcon },
  { name: 'Tasks', href: '/tasks', icon: ClipboardDocumentListIcon },
];

const bottomNavigation = [
  { name: 'Settings', href: '/settings', icon: Cog6ToothIcon },
  { name: 'Logout', href: '/logout', icon: ArrowLeftOnRectangleIcon },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { theme, setTheme, systemTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const renderThemeIcon = () => {
    if (!mounted) return null;

    if (theme === 'system') {
      return <ComputerDesktopIcon className="mr-3 h-6 w-6 text-gray-400 dark:text-gray-600 group-hover:text-gray-900 dark:group-hover:text-white" />;
    }

    if (theme === 'dark') {
      return <MoonIcon className="mr-3 h-6 w-6 text-gray-400 dark:text-gray-600 group-hover:text-gray-900 dark:group-hover:text-white" />;
    }

    return <SunIcon className="mr-3 h-6 w-6 text-gray-400 dark:text-gray-600 group-hover:text-gray-900 dark:group-hover:text-white" />;
  };

  const getThemeText = () => {
    if (!mounted) return 'Theme';

    if (theme === 'system') {
      return `System (${systemTheme === 'dark' ? 'Dark' : 'Light'})`;
    }

    return theme === 'dark' ? 'Dark Mode' : 'Light Mode';
  };

  const cycleTheme = () => {
    if (theme === 'system') {
      setTheme('light');
    } else if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('system');
    }
  };

  return (
    <>
      {/* Mobile menu button */}
      <button
        type="button"
        className="lg:hidden fixed top-4 left-4 z-50 rounded-md p-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? (
          <XMarkIcon className="h-6 w-6" />
        ) : (
          <Bars3Icon className="h-6 w-6" />
        )}
      </button>

      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-gray-600 bg-opacity-75 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={clsx(
        "flex h-full flex-col bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 w-64 fixed left-0 top-0 bottom-0 z-50 transition-transform duration-300 ease-in-out",
        isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        <div className="flex h-16 items-center px-4 border-b border-gray-200 dark:border-gray-800">
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Task Tracker</h1>
        </div>
        <nav className="flex-1 space-y-1 px-2 py-4">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={clsx(
                  'flex items-center px-2 py-2 text-sm font-medium rounded-md group',
                  isActive
                    ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                )}
              >
                <item.icon
                  className={clsx(
                    'mr-3 h-6 w-6',
                    isActive
                      ? 'text-gray-900 dark:text-white'
                      : 'text-gray-400 dark:text-gray-600 group-hover:text-gray-900 dark:group-hover:text-white'
                  )}
                />
                {item.name}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-gray-200 dark:border-gray-800 p-4 space-y-2">
          {bottomNavigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center px-2 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white group"
            >
              <item.icon className="mr-3 h-6 w-6 text-gray-400 dark:text-gray-600 group-hover:text-gray-900 dark:group-hover:text-white" />
              {item.name}
            </Link>
          ))}
          <button
            onClick={cycleTheme}
            className="flex w-full items-center px-2 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white group"
            aria-label="Toggle theme"
          >
            {renderThemeIcon()}
            {getThemeText()}
          </button>
        </div>
      </div>
    </>
  );
} 