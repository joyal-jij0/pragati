import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { createClient } from '@/utils/supabase/server'

const prisma = new PrismaClient()

export async function GET() {
  try {
    // Create Supabase server client
    const supabase = await createClient()
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session?.user.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Find the profile using the email from Supabase session
    const profile = await prisma.profiles.findFirst({
      where: {
        email: {
          equals: session.user.email,
          mode: 'insensitive',
        },
      },
    })

    if (!profile) {
      return NextResponse.json(
        { error: 'User profile not found' },
        { status: 404 }
      )
    }

    // Get FPOs the user has joined using the many-to-many relationship
    const joinedFpos = await prisma.fpo.findMany({
      where: {
        farmers: {
          some: {
            id: profile.id,
          },
        },
      },
      select: {
        id: true,
        name: true,
        location: true,
        description: true,
        createdAt: true,
        _count: {
          select: {
            farmers: true, // Count farmers instead of members
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json(joinedFpos)
  } catch (error) {
    console.error('Error fetching joined FPOs:', error)
    return NextResponse.json(
      { error: 'Failed to fetch joined FPOs' },
      { status: 500 }
    )
  }
}
