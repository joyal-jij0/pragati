'use client'

import HeroSection from '@/components/HeroSection'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  BarChart2Icon,
  MessageSquareIcon,
  TractorIcon,
  UsersIcon,
} from 'lucide-react'

export default function SamudayShaktiPage() {
  return (
    <div className="container mx-auto px-2 py-2">
      <HeroSection
        title="Samuday Shakti"
        secondaryTitle="FPO"
        info="Efficient FPO management for organizing resources, improving market access, and building networks for mutual growth and success"
        badges={['Resource Management', 'Market Access', 'Community Growth']}
      />

      <Tabs defaultValue="account" className="w-[400px]">
        <TabsList>
          <TabsTrigger value="fpoDashboard">
            <BarChart2Icon size={16} />
            <span>FPO Dashboard</span>
          </TabsTrigger>
          <TabsTrigger value="fpoGroupChat">
            <MessageSquareIcon size={16} />
            <span>Group Chat & Announcements</span>
          </TabsTrigger>
          <TabsTrigger value="fpoEquipment">
            <TractorIcon size={16} />
            <span>Equipment Rental</span>
          </TabsTrigger>
          <TabsTrigger value="fpoMembers">
            <UsersIcon size={16} />
            <span>FPO Members</span>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          Make changes to your account here.
        </TabsContent>
        <TabsContent value="password">Change your password here.</TabsContent>
      </Tabs>
    </div>
  )
}
