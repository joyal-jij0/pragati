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
          // <Button tooltip={item.title} variant={'outline'}>
          //   {item.icon && <item.icon />}
          //   <span>{item.title}</span>
          //   <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
          // </Button>
          <SidebarMenuItem key={item.title} tooltip={item.title}>
            <SidebarMenuButton asChild>
              <a href={item.url}>
                {/* {item.icon && <item.icon />} */}
                <span>{item.title}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
