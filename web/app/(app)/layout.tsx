import { AppSidebar } from '@/components/app-sidebar'
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Separator } from '@/components/ui/separator'
import { UserNav } from '@/components/user-nav'

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">Dashboard</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Overview</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          {/* Weather widget - now visible on both mobile and desktop */}
          <div className="flex items-center gap-2 ml-2 bg-white/70 backdrop-blur-sm pl-1.5 pr-3 py-1 rounded-full border border-green-100 shadow-sm">
            <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-500">
              <span className="text-sm">☁️</span>
            </div>
            <div className="text-xs">
              <span className="font-medium text-gray-700">28°C</span>
              <span className="text-gray-500 ml-1">Sunny</span>
            </div>
            <div className="w-1 h-1 bg-gray-300 rounded-full mx-1 hidden md:block"></div>
            <div className="hidden md:flex items-center gap-1">
              <span className="text-sm text-blue-500">💧</span>
              <span className="text-xs text-gray-600">68%</span>
            </div>
          </div>
          <div className="ml-auto px-2">
            <UserNav name="Raghav" info="Farmer" />
          </div>
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  )
}
