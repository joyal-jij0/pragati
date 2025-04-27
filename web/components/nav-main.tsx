'use client'

import { type LucideIcon } from 'lucide-react'
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { cn } from '@/lib/utils'

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: LucideIcon
    isActive?: boolean
    items?: {
      title: string
      url: string
    }[]
  }[]
}) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>
        <span className="w-2 h-2 bg-green-500 rounded-full mr-2" /> Main Menu
      </SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton asChild>
              <a
                href={item.url}
                className={cn(
                  `flex items-center gap-3 px-4 py-5 rounded-xl transition-all duration-300 group/menu-item relative overflow-hidden`,
                  item.isActive
                    ? 'bg-gradient-to-r from-green-500/10 to-green-600/5 text-green-700 font-medium'
                    : 'text-gray-700 group-hover/menu-item:bg-green-50'
                )}
                title={item.title}
              >
                {item.isActive && (
                  <span className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-transparent opacity-80 rounded-xl"></span>
                )}
                <span className="relative z-10 font-['Poppins',_sans-serif] text-base transition-all duration-300 group-hover/menu-item:translate-x-1">
                  {item.title}
                </span>
                {item.isActive && (
                  <span className="absolute left-0 top-0 bottom-0 w-1.5 bg-green-500 rounded-r-full"></span>
                )}
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
