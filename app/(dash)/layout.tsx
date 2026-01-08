"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Moon02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";
import React, { useState } from "react";

const DashLayout = ({ children }: { children: React.ReactNode }) => {
  const tabs = [{ label: "mixer", href: "/dashboard" }];
  const [selectedTab, setSelectedTab] = useState(tabs[0].href);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    // Add logic to actually toggle dark mode (e.g., toggle class on document)
  };

  return (
    <div className="relative flex flex-col min-h-screen bg-gradient-to-br from-violet-100 via-purple-100 to-fuchsia-100 dark:from-violet-950/50 dark:via-purple-950/40 dark:to-fuchsia-950/40">
      {/* Subtle grain texture overlay */}
      <div
        className="fixed inset-0 opacity-[0.12] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage:
            "url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22300%22 height=%22300%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22300%22 height=%22300%22 filter=%22url(%23n)%22 opacity=%220.7%22/%3E%3C/svg%3E')",
        }}
      />

      <header className="sticky top-0 z-10 w-full p-4 flex flex-row items-baseline gap-6 justify-between">
        {/* Name + Navigation */}
        <div className="flex flex-row flex-1 items-baseline gap-8">
          <h1 className="text-2xl font-bold">cinescore</h1>
          {/* Navigation Tabs */}
          <nav className="flex flex-row items-baseline">
            <ul className="flex flex-row gap-4">
              {tabs.map((tab) => (
                <li key={tab.href}>
                  <Link
                    href={tab.href}
                    className={`transition-colors text-lg ${
                      selectedTab === tab.href
                        ? "font-bold text-primary"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                    onClick={() => setSelectedTab(tab.href)}
                  >
                    <Label className="cursor-pointer">{tab.label}</Label>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Avatar menu */}
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={toggleDarkMode}
              className="flex items-center gap-2 cursor-pointer"
            >
              <HugeiconsIcon
                icon={Moon02Icon}
                strokeWidth={2}
                className={cn(
                  "h-4 w-4 transition-colors",
                  isDarkMode && "fill-blue-500 stroke-blue-500"
                )}
              />
              <span>Dark Mode</span>
              {isDarkMode && (
                <span className="ml-auto text-xs text-blue-500">✓</span>
              )}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default DashLayout;
