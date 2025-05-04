// app/api/samuday-shakti/fpo/[id]/members/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export type FPOMemberType = {
  id: string // Updated to string/UUID
  email: string
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
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const fpoId = (await params).id

    // Verify if FPO exists
    const fpo = await prisma.fpo.findUnique({
      where: { id: fpoId },
      select: { id: true, name: true },
    })

    if (!fpo) {
      return NextResponse.json({ error: 'FPO not found' }, { status: 404 })
    }

    // Get members with user details
    // Using the many-to-many relationship between profiles and fpos
    const fpoWithMembers = await prisma.fpo.findUnique({
      where: { id: fpoId },
      include: {
        farmers: true, // This brings all profiles connected to this FPO
      },
    })

    if (!fpoWithMembers) {
      return NextResponse.json({ error: 'FPO not found' }, { status: 404 })
    }

    // Get the members from the relationship
    const members = fpoWithMembers.farmers

    // In a real application, you might fetch additional user details from another table
    // For now, we'll enhance the data with some mock details
    const enhancedMembers = members.map((member) => {
      // Generate consistent mock data based on user ID
      const mockDetails = generateMockMemberDetails(member.id)

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
function generateMockMemberDetails(userId: string) {
  // Create a numeric value from the UUID for deterministic mocking
  const numericValue = parseInt(userId.replace(/[^0-9]/g, '').substring(0, 6))

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
  const nameIndex = numericValue % 10
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
    phone: `+91 9${numericValue}${(numericValue * 7) % 10000}${
      numericValue % 10000
    }`.substring(0, 14),
    avatar: `https://randomuser.me/api/portraits/${
      numericValue % 2 === 0 ? 'men' : 'women'
    }/${numericValue % 70}.jpg`,
    location: `${locations[numericValue % locations.length]}, Haryana`,
    landHolding: `${(numericValue % 10) + 1}.${numericValue % 10} Acres`,
    crops: [
      crops[numericValue % crops.length],
      crops[(numericValue + 3) % crops.length],
    ],
    active: numericValue % 5 !== 0, // 80% of members are active
    contributions: numericValue % 30,
    rating: 3 + (numericValue % 20) / 10, // Rating between 3.0 and 5.0
  }
}
