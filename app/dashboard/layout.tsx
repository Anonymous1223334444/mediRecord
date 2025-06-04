"use client"

import type React from "react"
import { useState } from "react"
import DashboardHeader from "@/components/dashboard/dashboard-header"
import DashboardNav from "@/components/dashboard/dashboard-nav"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <DashboardHeader />
      <div className="flex">
        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden" onClick={() => setSidebarOpen(false)} />
        )}

        {/* Sidebar */}
        <div
          className={`
          fixed lg:static inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out lg:transform-none
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
        >
          <DashboardNav />
          {/* Mobile close button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Main content */}
        <main className="flex-1 min-w-0 lg:ml-0">
          {/* Mobile menu button */}
          <div className="lg:hidden p-4">
            <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(true)}>
              <Menu className="h-4 w-4" />
            </Button>
          </div>
          {children}
        </main>
      </div>
    </div>
  )
}
