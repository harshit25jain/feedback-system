"use client"

import { Bell, Search, Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { useTheme } from "next-themes"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

export function Header() {
  const { setTheme, theme } = useTheme()

  return (
    <header className="flex h-16 items-center gap-4 border-b bg-background px-6">
      <SidebarTrigger />

      <div className="flex-1 flex items-center gap-4">
        <div className="relative max-w-md flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search feedback, forms, users..." className="pl-10" />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
          <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-4 w-4" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">3</Badge>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <div className="p-2">
              <h4 className="font-semibold mb-2">Notifications</h4>
              <div className="space-y-2">
                <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950">
                  <p className="text-sm font-medium">New feedback received</p>
                  <p className="text-xs text-muted-foreground">Customer satisfaction survey - 2 min ago</p>
                </div>
                <div className="p-2 rounded-lg bg-green-50 dark:bg-green-950">
                  <p className="text-sm font-medium">Form published</p>
                  <p className="text-xs text-muted-foreground">Product feedback form is now live - 1 hour ago</p>
                </div>
                <div className="p-2 rounded-lg bg-orange-50 dark:bg-orange-950">
                  <p className="text-sm font-medium">User registered</p>
                  <p className="text-xs text-muted-foreground">New user Sarah Johnson joined - 3 hours ago</p>
                </div>
              </div>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
