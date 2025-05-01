// app/api/samuday-shakti/fpo/[id]/members/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export type FPOMemberType = {
  id: number
  userId: number
  role: string
  joinedAt: Date
  user: {
    email: string
  }
  // Optional fields that could be fetched through additional queries
  details?: {
    name?: string
    phone?: string
    avatar?: string
    location?: string
    landHolding?: string
    crops?: string[]
    active?: boolean
    contributions?: number
    rating?: number
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const fpoId = params.id

    // Verify if FPO exists
    const fpo = await prisma.fPO.findUnique({
      where: { id: fpoId },
      select: { id: true, name: true },
    })

    if (!fpo) {
      return NextResponse.json({ error: 'FPO not found' }, { status: 404 })
    }

    // Get members with user details
    const members = await prisma.member.findMany({
      where: { fpoId: fpoId },
      include: {
        user: {
          select: {
            id: true,
            email: true,
          },
        },
      },
      orderBy: {
        joinedAt: 'desc',
      },
    })

    // In a real application, you might fetch additional user details from another table
    // For now, we'll enhance the data with some mock details
    const enhancedMembers = members.map((member) => {
      // Generate consistent mock data based on user ID
      const mockDetails = generateMockMemberDetails(member.userId)

      return {
        ...member,
        details: mockDetails,
      }
    })

    return NextResponse.json(enhancedMembers)
  } catch (error) {
    console.error('Error fetching FPO members:', error)
    return NextResponse.json(
      { error: 'Failed to fetch FPO members' },
      { status: 500 }
    )
  }
}

// Helper function to generate mock member details for demo purposes
// In a real application, this data would come from your database
function generateMockMemberDetails(userId: number) {
  const crops = [
    'Wheat',
    'Rice',
    'Mustard',
    'Vegetables',
    'Fruits',
    'Pulses',
    'Sugarcane',
  ]
  const locations = ['Sonipat', 'Panipat', 'Karnal', 'Rohtak', 'Jhajjar']

  // Use userId to create deterministic mock data
  const nameIndex = userId % 10
  const names = [
    'Ramvir Singh',
    'Sunita Devi',
    'Prakash Kumar',
    'Kavita Sharma',
    'Rajesh Verma',
    'Anita Yadav',
    'Surender Malik',
    'Pooja Devi',
    'Manoj Kumar',
    'Rekha Tomar',
  ]

  return {
    name: names[nameIndex],
    phone: `+91 9${userId}${(userId * 7) % 10000}${userId % 10000}`.substring(
      0,
      14
    ),
    avatar: `https://randomuser.me/api/portraits/${
      userId % 2 === 0 ? 'men' : 'women'
    }/${userId % 70}.jpg`,
    location: `${locations[userId % locations.length]}, Haryana`,
    landHolding: `${(userId % 10) + 1}.${userId % 10} Acres`,
    crops: [crops[userId % crops.length], crops[(userId + 3) % crops.length]],
    active: userId % 5 !== 0, // 80% of members are active
    contributions: userId % 30,
    rating: 3 + (userId % 20) / 10, // Rating between 3.0 and 5.0
  }
}
