import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react'
import { Collapsible, CollapsibleTrigger } from '@/components/ui/collapsible'

export function UserNav({ name, info }: { name: string; info: string }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="py-1 px-2 group/collapsible">
        {/* <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-9 w-9">
            <AvatarImage src="/avatars/03.png" alt="@shadcn" />
            <AvatarFallback>SC</AvatarFallback>
          </Avatar>
        </Button> */}
        <div className="focus:outline-none bg-neutral-200 dark:bg-light rounded-full h-auto py-1 pl-1 pr-2 space-x-2 w-auto flex items-center">
          <div className="w-8 h-8 rounded-full bg-gray-300 border-1 border-black/10 flex items-center justify-center text-gray-500">
            <span className="text-sm">👤</span>
          </div>
          <div className="flex flex-col text-left">
            <p className="text-sm font-medium leading-none">{name}</p>
            <span className="text-xs leading-none text-muted-foreground">
              {info}
            </span>
          </div>
          <ChevronDownIcon className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-180" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{name}</p>
            <p className="text-xs leading-none text-muted-foreground">{info}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>Your Profile</DropdownMenuItem>
          <DropdownMenuItem>Settings</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
