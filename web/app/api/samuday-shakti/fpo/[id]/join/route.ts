import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { createClient } from '@/utils/supabase/server'

const prisma = new PrismaClient()

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = await createClient()
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session?.user.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id: fpoId } = params // Extract fpoId from route params
    const userId = session.user.id // Get userId from session

    // Validate required fields
    if (!userId) {
      return NextResponse.json({ error: 'userId is required' }, { status: 400 })
    }

    // Check if the FPO exists
    const fpo = await prisma.fpo.findUnique({
      where: { id: fpoId },
    })

    if (!fpo) {
      return NextResponse.json({ error: 'FPO not found' }, { status: 404 })
    }

    // Check if the User exists
    const user = await prisma.profiles.findUnique({
      where: { id: userId },
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Check if the user is already a member of this FPO
    const existingMembership = await prisma.profiles.findFirst({
      where: {
        id: userId,
        fpos: {
          some: {
            id: fpoId,
          },
        },
      },
      include: {
        fpos: true,
      },
    })

    if (existingMembership) {
      return NextResponse.json(
        { error: 'User is already a member of this FPO' },
        { status: 400 }
      )
    }

    // Add the user to FPO by connecting the many-to-many relationship
    const updatedUser = await prisma.profiles.update({
      where: {
        id: userId,
      },
      data: {
        fpos: {
          connect: {
            id: fpoId,
          },
        },
      },
      include: {
        fpos: true,
      },
    })

    return NextResponse.json(updatedUser, { status: 200 })
  } catch (error) {
    console.error('Error adding user to FPO:', error)
    return NextResponse.json({ error: 'Failed to join FPO' }, { status: 500 })
  }
}
