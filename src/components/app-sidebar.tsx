"use client"

import * as React from "react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import {
  GalleryVerticalEndIcon,
  AudioLinesIcon,
  TerminalIcon,
  TerminalSquareIcon,
} from "lucide-react"
// import { useAuthStore } from "@/store/auth-store"

const data = {
  user: {
    name: "test",
    email: "test@example.com",
    avatar: "#",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: <GalleryVerticalEndIcon />,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: <AudioLinesIcon />,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: <TerminalIcon />,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/",
      icon: <TerminalSquareIcon />,
    },
    {
      title: "Wallets",
      url: "/wallets",
      icon: <TerminalSquareIcon />,
    },
    {
      title: "Transactions",
      url: "/transactions",
      icon: <TerminalSquareIcon />,
    },
    {
      title: "Categories",
      url: "/category",
      icon: <TerminalSquareIcon />,
      items: [
        { title: "Category Types", url: "/category/types" },
        { title: "Category", url: "/category" },
      ],
    },
    {
      title: "Posts",
      url: "/post",
      icon: <TerminalSquareIcon />,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  // const { user } = useAuthStore()
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
