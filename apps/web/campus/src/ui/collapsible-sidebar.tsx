import React, { useState } from "react";
import {
  Home,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
  BarChart3,
  UserPlus,
} from "lucide-react";
import { cn } from "@/utils/cn";
import { Button } from "./button";
import { Card } from "./shadcn/card";

// Types
interface SidebarItem {
  label: string;
  icon: React.ReactNode;
}

interface User {
  isNew: boolean;
}

// Sidebar items based on user type
const existingUserItems: SidebarItem[] = [
  { label: "Dashboard", icon: <Home size={20} /> },
  { label: "Analytics", icon: <BarChart3 size={20} /> },
  { label: "Users", icon: <Users size={20} /> },
];

const newUserItems: SidebarItem[] = [
  { label: "Get Started", icon: <UserPlus size={20} /> },
  { label: "Dashboard", icon: <Home size={20} /> },
];

export default function AdminLayout() {
  const [collapsed, setCollapsed] = useState(false);

  // Change this to simulate user type
  const user: User = {
    isNew: true, // toggle true/false
  };

  const sidebarItems = user.isNew ? newUserItems : existingUserItems;

  return (
    <div className="flex min-h-screen w-full">
      {/* Sidebar */}
      <aside
        className={cn(
          "border-primary-200 bg-primary-50 dark:bg-primary-950 flex flex-col justify-between border-r transition-all duration-300",
          collapsed ? "w-17.5" : "w-62.5",
        )}
      >
        {/* Top Section */}
        <div>
          {/* Toggle Button */}
          <div className="flex items-center justify-between p-4">
            {!collapsed && (
              <h1 className="text-primary-700 text-lg font-semibold">Admin</h1>
            )}
            <Button
              variant="ghost"
              className="text-primary-600 hover:bg-primary-100"
              onClick={() => setCollapsed((prev) => !prev)}
            >
              {collapsed ? <Menu size={18} /> : <X size={18} />}
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex flex-col gap-2 px-2">
            {sidebarItems.map((item, index) => (
              <button
                key={index}
                className={cn(
                  "text-primary-700 hover:bg-primary-100 flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition",
                  collapsed && "justify-center",
                )}
              >
                {item.icon}
                {!collapsed && <span>{item.label}</span>}
              </button>
            ))}
          </nav>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col gap-2 p-2">
          <button
            className={cn(
              "text-accent-700 hover:bg-accent-100 flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition",
              collapsed && "justify-center",
            )}
          >
            <Settings size={20} />
            {!collapsed && <span>Settings</span>}
          </button>

          <button
            className={cn(
              "text-secondary-700 hover:bg-secondary-100 flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition",
              collapsed && "justify-center",
            )}
          >
            <LogOut size={20} />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="bg-background flex-1 p-4">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card
              key={i}
              className="dark:bg-primary-900 border-primary-200 border bg-white p-4"
            >
              <h2 className="text-primary-700 text-lg font-semibold">
                Card {i + 1}
              </h2>
              <p className="text-primary-500 mt-2 text-sm">
                Sample dashboard content
              </p>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
