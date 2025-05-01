import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ChevronDownIcon, User2Icon } from 'lucide-react'
import { createClient } from '@/utils/supabase/server'
import { logout } from '@/app/(auth)/auth/logout/actions'
import { Button, buttonVariants } from './ui/button'
import Link from 'next/link'
import { cn } from '@/lib/utils'

export async function UserNav({ name, info }: { name: string; info: string }) {
  const supabase = await createClient()
  const { data } = await supabase.auth.getUser()

  if (data.user === null) {
    return (
      <Link
        href="/auth"
        className={cn(
          buttonVariants({ variant: 'default' }),
          'flex items-center gap-2 cursor-pointer h-8'
        )}
      >
        <User2Icon className="h-4 w-4" />
        <span className="hidden md:inline">Sign In</span>
      </Link>
    )
  }

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
            <p className="text-sm font-medium leading-none">
              {data.user?.user_metadata.full_name}
            </p>
            <span className="text-xs leading-none text-muted-foreground">
              <span className="text-green-500">🌿</span>
              Farmer
            </span>
          </div>
          <ChevronDownIcon className="size-5 ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-180" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {data.user?.user_metadata.full_name}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {data.user?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>Your Profile</DropdownMenuItem>
          <DropdownMenuItem>Settings</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <form action={logout}>
          <DropdownMenuItem className="cursor-pointer" asChild>
            <button type="submit" className="w-full cursor-pointer">
              Log Out
            </button>
          </DropdownMenuItem>
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
