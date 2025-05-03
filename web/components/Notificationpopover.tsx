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
    title: '🌱 Watering Reminder',
    description: 'Time to water the wheat crop in Field A.',
    time: '5 minutes ago',
    unread: true,
    emoji: '💧',
  },
  {
    id: 2,
    title: '🌽 Fertilization Schedule',
    description: 'Apply nitrogen fertilizer to the cornfield tomorrow morning.',
    time: '2 hours ago',
    unread: true,
    emoji: '🧪',
  },
  {
    id: 3,
    title: '🐛 Pest Control Alert',
    description: 'Inspect the apple orchard for signs of aphids.',
    time: '1 day ago',
    unread: false,
    emoji: '🍎',
  },
  {
    id: 4,
    title: '🥔 Harvest Reminder',
    description: 'Start harvesting potatoes in Field B this weekend.',
    time: '2 days ago',
    unread: false,
    emoji: '🚜',
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
          className="relative w-9 px-0 bg-green-100 text-green-800 rounded-full border border-green-300 hover:bg-green-200"
        >
          <BellIcon className="h-4 w-4" />
          {unreadCount > 0 && (
            <span className="absolute bg-green-500 animate-bounce h-2.5 w-2.5 top-0 right-0 rounded-full" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0 -translate-x-1/2 bg-green-50 border border-green-200 shadow-lg">
        <div className="flex items-center justify-between p-4 pb-2 border-b border-green-200">
          <h4 className="font-semibold text-green-800 flex items-center">
            <span className="mr-2">🌿</span> Farm Notifications
          </h4>
        </div>
        <ScrollArea className="h-[320px]">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={cn(
                'flex items-start gap-3 p-4 hover:bg-green-100 transition-colors',
                notification.unread ? 'bg-green-100/50' : ''
              )}
            >
              <div className="mt-1 flex-shrink-0">
                <div
                  className={cn(
                    'h-6 w-6 rounded-full flex items-center justify-center',
                    notification.unread
                      ? 'bg-green-200 text-green-700'
                      : 'bg-gray-100 text-gray-500'
                  )}
                >
                  <span>{notification.emoji}</span>
                </div>
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-green-800">
                    {notification.title}
                  </p>
                  <div className="flex items-center text-xs text-green-600">
                    <Clock8Icon className="mr-1 h-3 w-3" />
                    {notification.time}
                  </div>
                </div>
                <p className="text-sm text-green-700">
                  {notification.description}
                </p>
              </div>
              {notification.unread && (
                <div className="mt-1 h-2 w-2 rounded-full bg-green-500" />
              )}
            </div>
          ))}
        </ScrollArea>
        <div className="p-3 border-t border-green-200 bg-green-100/50">
          <Button
            variant="ghost"
            className="w-full text-green-700 hover:bg-green-200 hover:text-green-800"
          >
            🌱 View All Notifications
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default NotificationPopover
