'use client'

import HeroSection from '@/components/HeroSection'
import FPODashboard from '@/components/samudayShakti/FPODashboard'
import GroupChatAnnouncements from '@/components/samudayShakti/GroupChatAnnouncements'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/animated-tabs'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar'
import { cn } from '@/lib/utils'
import {
  AwardIcon,
  BarChart2Icon,
  DollarSignIcon,
  Globe2Icon,
  ImageIcon,
  MessageSquareIcon,
  PaperclipIcon,
  PlusIcon,
  SendIcon,
  StarIcon,
  TractorIcon,
  TrendingUpIcon,
  UserIcon,
  Users2Icon,
  UsersIcon,
} from 'lucide-react'
import EquipmentRental from '../../../components/samudayShakti/EquipmentRental'
import ProductRentCard from '@/components/ProductRentCard'

const rentProducts = [
  {
    name: 'John Deere 5055E',
    location: 'Jaipur, Rajasthan',
    price: '₹1200/day',
    image:
      'https://assets.khetigaadi.com/new-tractor/John-Deere-53101735727642_OpIDdN3Zb.png',
    sellerName: 'Mahesh Agri Tools',
  },
  {
    name: 'Mahindra 275 DI XP Plus',
    location: 'Ludhiana, Punjab',
    price: '₹1000/day',
    image:
      'https://d2ki7eiqd260sq.cloudfront.net/MAHINDRA-GYROVATOR44271477-28d3-4da2-b7c8-764ee7d830d3.webp',
    sellerName: 'Singh Machinery',
  },
  {
    name: 'Kartar Combine Harvester',
    location: 'Karnal, Haryana',
    price: '₹2500/day',
    image:
      'https://media.istockphoto.com/id/1339336243/photo/john-deere-s670-soybean-sunset.jpg?s=612x612&w=0&k=20&c=pH59jG3UG73i2B_hxXH3UEGvOFHuGAxQh1feJ2IuJTM=',
    sellerName: 'Haryana Agro Tools',
  },
  {
    name: 'Power Tiller VST Shakti',
    location: 'Bikaner, Rajasthan',
    price: '₹800/day',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJkR99f0wCsl_ee1p0fPG1n48fzU2r51InLw&s',
    sellerName: 'Thar Farm Rentals',
  },
  {
    name: 'Rotavator Shaktiman',
    location: 'Amritsar, Punjab',
    price: '₹500/day',
    image:
      'https://assets.khetigaadi.com/new-tractor/John-Deere-53101735727642_OpIDdN3Zb.png',
    sellerName: 'Punjab Farm Implements',
  },
]

export default function SamudayShaktiPage() {
  return (
    <div className="container mx-auto px-2 py-2 space-y-4">
      <HeroSection
        title="Samuday Shakti"
        secondaryTitle="FPO"
        info="Efficient FPO management for organizing resources, improving market access, and building networks for mutual growth and success"
        badges={['Resource Management', 'Market Access', 'Community Growth']}
      />

      <div className="grid grid-flow-col gap-4 pb-8">
        <div className="col-span-2 bg-black/10 rounded-xl p-2">
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel className="text-lg font-bold">
                FPO Hub
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {[
                    'Rajputana Agro Alliance',
                    'Kesar Krishi Samriddhi',
                    'Pind Krishi Samiti',
                    'Thar Bhoomi Sangh',
                    'Sarbat Da Bhala FPO',
                    'Haryana Haryali Sangh',
                  ].map((eachFpo) => (
                    <SidebarMenuItem key={eachFpo}>
                      <SidebarMenuButton>
                        <Users2Icon size={16} />
                        <span>{eachFpo}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            <SidebarGroup>
              <SidebarGroupLabel className="text-lg font-bold">
                My FPO Groups
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <Globe2Icon size={16} />
                      <span>Discover FPOs</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <PlusIcon size={16} />
                      <span>Create new FPO</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </div>
        <div className="col-span-6">
          <Tabs defaultValue="fpoDashboard" className="w-full">
            <TabsList className="bg-black/10 w-full justify-start gap-2">
              <TabsTrigger
                className="flex items-center gap-2"
                value="fpoDashboard"
              >
                <BarChart2Icon size={16} />
                <span>FPO Dashboard</span>
              </TabsTrigger>
              <TabsTrigger
                className="flex items-center gap-2"
                value="fpoGroupChat"
              >
                <MessageSquareIcon size={16} />
                <span>Group Chat & Announcements</span>
              </TabsTrigger>
              <TabsTrigger
                className="flex items-center gap-2"
                value="fpoEquipment"
              >
                <TractorIcon size={16} />
                <span>Equipment Rental</span>
              </TabsTrigger>
              <TabsTrigger
                className="flex items-center gap-2"
                value="fpoMembers"
              >
                <UsersIcon size={16} />
                <span>FPO Members</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="fpoDashboard" className="p-4">
              <FPODashboard />
            </TabsContent>

            <TabsContent value="fpoGroupChat">
              <Card>
                <CardHeader className="flex flex-row items-center">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-black flex items-center justify-center rounded-full text-white">
                      <UserIcon className="size-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium leading-none">
                        Rajputana Agro Alliance
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Group Chat
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        role: 'agent',
                        content: 'Hi, how can I help you today?',
                      },
                      {
                        role: 'user',
                        content: "Hey, I'm having trouble with my account.",
                      },
                      {
                        role: 'agent',
                        content: 'What seems to be the problem?',
                      },
                      {
                        role: 'user',
                        content: "I can't log in.",
                      },
                    ].map((message, index) => (
                      <div
                        key={index}
                        className={cn(
                          'flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm font-semibold',
                          message.role === 'user'
                            ? 'ml-auto bg-primary text-primary-foreground'
                            : 'bg-green-500 text-primary-foreground'
                        )}
                      >
                        {message.content}
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <form
                    // onSubmit={(event) => {
                    //   event.preventDefault()
                    //   if (inputLength === 0) return
                    //   setMessages([
                    //     ...messages,
                    //     {
                    //       role: 'user',
                    //       content: input,
                    //     },
                    //   ])
                    //   setInput('')
                    // }}
                    className="flex w-full items-center space-x-2"
                  >
                    <button className="p-2 rounded-full hover:bg-gray-100">
                      <PaperclipIcon size={18} className="text-gray-500" />
                    </button>
                    <button className="p-2 rounded-full hover:bg-gray-100">
                      <ImageIcon size={18} className="text-gray-500" />
                    </button>
                    <Input
                      id="message"
                      placeholder="Type your message..."
                      className="flex-1"
                      autoComplete="off"
                      // value={input}
                      // onChange={(event) => setInput(event.target.value)}
                    />
                    <Button
                      type="submit"
                      size="icon"
                      // disabled={inputLength === 0}
                    >
                      <SendIcon />
                      <span className="sr-only">Send</span>
                    </Button>
                  </form>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="fpoEquipment" className="p-4">
              <div className="grid gap-4 grid-cols-4">
                {rentProducts.map((product, index) => (
                  <Card key={index} className="overflow-hidden p-0">
                    <div className="relative">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-auto w-full aspect-video object-cover"
                      />
                    </div>
                    <CardContent>
                      <h3 className="text-lg font-bold">{product.name}</h3>
                      <div className="mt-2 space-y-1">
                        <p className="text-sm text-gray-600">
                          {product.location}
                        </p>
                        <p className="text-sm font-medium">{product.price}</p>
                        <p className="text-sm text-gray-600">
                          Seller: {product.sellerName}
                        </p>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between p-4 pt-0">
                      <Button variant="outline" size="sm">
                        Details
                      </Button>
                      <Button size="sm">Rent Now</Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="fpoMembers" className="p-4">
              <EquipmentRental />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
