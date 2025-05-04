import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export type FPOMemberType = {
  id: string
  email: string
  name: string // Added name field
  // Optional fields that are generated synthetically
  details?: {
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

export async function GET({ params }: { params: Promise<{ id: string }> }) {
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
    const fpoWithMembers = await prisma.fpo.findUnique({
      where: { id: fpoId },
      include: {
        farmers: {
          select: {
            id: true,
            email: true,
            display_name: true,
          },
        },
      },
    })

    if (!fpoWithMembers) {
      return NextResponse.json({ error: 'FPO not found' }, { status: 404 })
    }

    // Get the members from the relationship
    const members = fpoWithMembers.farmers

    // Enhance the data with synthetic details
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

  return {
    // No name field since it doesn't exist in the schema
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
