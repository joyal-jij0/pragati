'use client'

import * as React from 'react'
import {
  BookOpen,
  Bot,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  SearchIcon,
  Settings2,
  SquareTerminal,
} from 'lucide-react'

import { NavMain } from '@/components/nav-main'
import { NavServices } from '@/components/nav-projects'
import { NavUser } from '@/components/nav-user'
import { TeamSwitcher } from '@/components/team-switcher'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar'

// This is sample data.
const data = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
  teams: [
    {
      name: 'Krishi Sahayak',
      logo: GalleryVerticalEnd,
      plan: 'Empowering Indian Farmers',
    },
  ],
  navMain: [
    {
      title: '🏡 Dashboard',
      url: '#',
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: 'History',
          url: '#',
        },
        {
          title: 'Starred',
          url: '#',
        },
        {
          title: 'Settings',
          url: '#',
        },
      ],
    },
    {
      title: '🌧️ Gyan Dhara',
      url: '#',
      icon: Bot,
      items: [
        {
          title: 'Genesis',
          url: '#',
        },
        {
          title: 'Explorer',
          url: '#',
        },
        {
          title: 'Quantum',
          url: '#',
        },
      ],
    },
    {
      title: '🌱 Fasal Doctor',
      url: '#',
      icon: BookOpen,
      items: [
        {
          title: 'Introduction',
          url: '#',
        },
        {
          title: 'Get Started',
          url: '#',
        },
        {
          title: 'Tutorials',
          url: '#',
        },
        {
          title: 'Changelog',
          url: '#',
        },
      ],
    },
  ],
  projects: [
    {
      name: '🛒 Bazaar Bridge',
      url: '#',
      icon: Frame,
    },
    {
      name: '💰 Arthik Sahara',
      url: '#',
      icon: PieChart,
    },
    {
      name: '👨‍👩‍👧‍👦 Samuday Shakti',
      url: '#',
      icon: Map,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <div className="px-4 pt-4 space-y-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/70 backdrop-blur-sm border border-green-100 focus:outline-none focus:ring-2 focus:ring-green-500/30 text-sm text-gray-700 placeholder-gray-400 transition-all duration-300 group-hover:shadow-md"
            />
            <SearchIcon className="w-5 h-5 absolute left-3 top-3 text-gray-400 transition-all duration-300 hover:text-green-500" />
          </div>

          {/* Decorative farm element */}
          <div className="px-0.5">
            <div className="h-2.5 bg-gradient-to-r from-green-200 via-yellow-200 to-green-200 rounded-full opacity-70 relative overflow-hidden">
              <div className="absolute top-0 left-0 h-full w-12 bg-white/40 animate-pulse-slow"></div>
            </div>
          </div>
        </div>

        <NavMain items={data.navMain} />
        <NavServices projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
