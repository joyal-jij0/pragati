import React from 'react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { BellIcon, Clock8Icon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ScrollArea } from '@/components/ui/scroll-area'

const notifications = [
  {
    id: 1,
    title: 'Watering Reminder',
    description: 'Time to water the wheat crop in Field A.',
    time: '5 minutes ago',
    unread: true,
  },
  {
    id: 2,
    title: 'Fertilization Schedule',
    description: 'Apply nitrogen fertilizer to the cornfield tomorrow morning.',
    time: '2 hours ago',
    unread: true,
  },
  {
    id: 3,
    title: 'Pest Control Alert',
    description: 'Inspect the apple orchard for signs of aphids.',
    time: '1 day ago',
    unread: false,
  },
  {
    id: 4,
    title: 'Harvest Reminder',
    description: 'Start harvesting potatoes in Field B this weekend.',
    time: '2 days ago',
    unread: false,
  },
]

const NotificationPopover = () => {
  const unreadCount = notifications.filter((n) => n.unread).length

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative w-9 px-0 bg-neutral-200 text-black rounded-full border"
        >
          <BellIcon className="h-4 w-4" />
          {unreadCount > 0 && (
            <span className="absolute bg-blue-500 animate-bounce h-2.5 w-2.5 top-0 right-0 rounded-full" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0 -translate-x-1/2 bg-neutral-200 backdrop-blur-md">
        <div className="flex items-center justify-between p-4 pb-1">
          <h4 className="font-semibold">Notifications</h4>
        </div>
        <ScrollArea className="h-[320px]">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={cn(
                'flex items-start gap-4 p-4 hover:bg-muted/50 transition-colors',
                notification.unread && 'bg-muted/20'
              )}
            >
              <div
                className={cn(
                  'mt-1 h-2 w-2 rounded-full',
                  notification.unread ? 'bg-blue-500' : 'bg-gray-200'
                )}
              />
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">{notification.title}</p>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Clock8Icon className="mr-1 h-3 w-3" />
                    {notification.time}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  {notification.description}
                </p>
              </div>
            </div>
          ))}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  )
}

export default NotificationPopover
