import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id: fpoId } = params // Extract fpoId from route params
    const body = await request.json()
    const { userId, role } = body

    // Validate required fields
    if (!userId) {
      return NextResponse.json({ error: 'userId is required' }, { status: 400 })
    }

    // Check if the FPO exists
    const fpo = await prisma.fPO.findUnique({
      where: { id: fpoId },
    })

    if (!fpo) {
      return NextResponse.json({ error: 'FPO not found' }, { status: 404 })
    }

    // Check if the User exists
    const user = await prisma.user.findUnique({
      where: { id: userId },
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Check if the user is already a member of this FPO
    const existingMembership = await prisma.member.findFirst({
      where: {
        userId,
        fpoId: fpoId,
      },
    })

    if (existingMembership) {
      return NextResponse.json(
        { error: 'User is already a member of this FPO' },
        { status: 400 }
      )
    }

    // Create new membership
    const newMember = await prisma.member.create({
      data: {
        userId,
        fpoId: fpoId,
        role: role || 'Member', // Default role if not provided
      },
    })

    return NextResponse.json(newMember, { status: 201 })
  } catch (error) {
    console.error('Error adding user to FPO:', error)
    return NextResponse.json({ error: 'Failed to join FPO' }, { status: 500 })
  }
}
