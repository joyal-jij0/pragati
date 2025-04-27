'use client'

import { ChevronRight, type LucideIcon } from 'lucide-react'

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar'
import { Button } from './ui/button'
import Link from 'next/link'
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
                  `flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-300 relative overflow-hidden`,
                  item.isActive
                    ? 'bg-gradient-to-r from-green-500/10 to-green-600/5 text-green-700 font-medium'
                    : 'text-gray-700 hover:bg-green-50'
                )}
                title={item.title}
              >
                {item.isActive && (
                  <span className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-transparent opacity-80 rounded-xl"></span>
                )}
                <span className="relative z-10 font-['Poppins',_sans-serif] text-base transition-all duration-300 hover:translate-x-1">
                  {item.title}
                </span>
                {item.isActive && (
                  <span className="absolute left-0 top-0 bottom-0 w-1.5 bg-green-500 rounded-r-full"></span>
                )}
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>

          // <Link
          //   key={item.title}
          //   href={item.url}
          //   className={cn(
          //     `flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-300 group relative overflow-hidden`,
          //     item.isActive
          //       ? 'bg-gradient-to-r from-green-500/10 to-green-600/5 text-green-700 font-medium'
          //       : 'text-gray-700 hover:bg-green-50'
          //   )}
          //   title={item.title}
          // >
          //   {item.isActive && (
          //     <span className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-transparent opacity-80 rounded-xl"></span>
          //   )}
          //   {/* <span className="relative z-10 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
          //     {item.icon(item.isActive)}
          //   </span> */}
          //   <span className="relative z-10 font-['Poppins',_sans-serif] text-base transition-all duration-300 group-hover:translate-x-1">
          //     {item.title}
          //   </span>
          //   {item.isActive && (
          //     <span className="absolute left-0 top-0 bottom-0 w-1.5 bg-green-500 rounded-r-full"></span>
          //   )}
          // </Link>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
