'use client'

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { cn } from '@/lib/utils'

import * as React from 'react'
import {
  BookOpen,
  Bot,
  SearchIcon,
  SquareTerminal,
  TreePalmIcon,
} from 'lucide-react'
import { NavUser } from '@/components/nav-user'
import { TeamSwitcher } from '@/components/team-switcher'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar'
import { usePathname } from 'next/navigation'

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
      logo: TreePalmIcon,
      plan: 'Empowering Indian Farmers',
    },
  ],
  navMain: [
    {
      title: '🏡 Dashboard',
      url: '/dashboard',
      icon: SquareTerminal,
      isActive: true,
    },
    {
      title: '🌧️ Gyan Dhara',
      url: '/gyan-dhara',
      icon: Bot,
    },
    {
      title: '🌱 Fasal Doctor',
      url: '/fasal-doctor',
      icon: BookOpen,
    },
  ],
  navServices: [
    {
      title: '🛒 Bazaar Bridge',
      url: '/bazaar-bridge',
      icon: SquareTerminal,
      isActive: true,
    },
    {
      title: '💰 Arthik Sahara',
      url: '/arthik-sahar',
      icon: Bot,
    },
    {
      title: '👨‍👩‍👧‍👦 Samuday Shakti',
      url: '/samuday-shakti',
      icon: BookOpen,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <div className="px-4 pt-4 space-y-2">
          <div className="relative group/input">
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/70 backdrop-blur-sm border border-green-100 focus:outline-none focus:ring-2 focus:ring-green-500/30 text-sm text-gray-700 placeholder-gray-400 transition-all duration-300 group-hover/input:shadow-md"
            />
            <SearchIcon className="w-5 h-5 absolute left-3 top-3 text-gray-400 transition-all duration-300 group-hover/input:text-green-500" />
          </div>

          {/* Decorative farm element */}
          <div className="px-0.5">
            <div className="h-2.5 bg-gradient-to-r from-green-200 via-yellow-200 to-green-200 rounded-full opacity-70 relative overflow-hidden">
              <div className="absolute top-0 left-0 h-full w-12 bg-white/40 animate-pulse-slow"></div>
            </div>
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel>
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2" /> Main
            Menu
          </SidebarGroupLabel>
          <SidebarMenu>
            {data.navMain.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <a
                    href={item.url}
                    className={cn(
                      `flex items-center gap-3 px-4 py-5 rounded-xl transition-all duration-300 group/menu-item relative overflow-hidden`,
                      pathname?.startsWith(item.url)
                        ? 'bg-gradient-to-r from-green-500/10 to-green-600/5 text-green-700 font-medium'
                        : 'text-gray-700 group-hover/menu-item:bg-green-50'
                    )}
                    title={item.title}
                  >
                    {pathname?.startsWith(item.url) && (
                      <span className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-transparent opacity-80 rounded-xl"></span>
                    )}
                    <span className="relative z-10 font-['Poppins',_sans-serif] text-base transition-all duration-300 group-hover/menu-item:translate-x-1">
                      {item.title}
                    </span>
                    {pathname?.startsWith(item.url) && (
                      <span className="absolute left-0 top-0 bottom-0 w-1.5 bg-green-500 rounded-r-full"></span>
                    )}
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>
            <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2" />{' '}
            Services
          </SidebarGroupLabel>
          <SidebarMenu>
            {data.navServices.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <a
                    href={item.url}
                    className={cn(
                      `flex items-center gap-3 px-4 py-5 rounded-xl transition-all duration-300 group/menu-item relative overflow-hidden`,
                      pathname?.startsWith(item.url)
                        ? 'bg-gradient-to-r from-green-500/10 to-green-600/5 text-green-700 font-medium'
                        : 'text-gray-700 group-hover/menu-item:bg-green-50'
                    )}
                    title={item.title}
                  >
                    {pathname?.startsWith(item.url) && (
                      <span className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-transparent opacity-80 rounded-xl"></span>
                    )}
                    <span className="relative z-10 font-['Poppins',_sans-serif] text-base transition-all duration-300 group-hover/menu-item:translate-x-1">
                      {item.title}
                    </span>
                    {pathname?.startsWith(item.url) && (
                      <span className="absolute left-0 top-0 bottom-0 w-1.5 bg-green-500 rounded-r-full"></span>
                    )}
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
