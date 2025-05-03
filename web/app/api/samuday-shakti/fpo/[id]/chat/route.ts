import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { getToken } from 'next-auth/jwt'

const prisma = new PrismaClient()

// GET: Get chat info and unread count
export async function GET(
  request: NextRequest,
  { params }: { params: { fpoId: string } }
) {
  try {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    })

    if (!token?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const fpoId = params.fpoId

    // Get user by email
    const user = await prisma.user.findUnique({
      where: { email: token.email as string },
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Get FPO with members
    const fpo = await prisma.fPO.findUnique({
      where: { id: fpoId },
      include: {
        members: {
          include: {
            user: {
              select: {
                id: true,
                email: true,
              },
            },
          },
        },
        messages: {
          orderBy: {
            createdAt: 'desc',
          },
          take: 1,
          include: {
            sender: {
              select: {
                id: true,
                email: true,
              },
            },
          },
        },
      },
    })

    if (!fpo) {
      return NextResponse.json({ error: 'FPO not found' }, { status: 404 })
    }

    // Check if user is a member of the FPO
    const isMember = fpo.members.some((member) => member.user.id === user.id)

    if (!isMember) {
      return NextResponse.json(
        { error: 'You do not have access to this FPO chat' },
        { status: 403 }
      )
    }

    // Get unread messages count for this user
    const unreadCount = await prisma.message.count({
      where: {
        fpoId,
        NOT: {
          readBy: {
            has: user.id,
          },
        },
      },
    })

    // Format response
    const response = {
      id: fpo.id,
      name: fpo.name,
      location: fpo.location,
      description: fpo.description,
      memberCount: fpo.members.length,
      members: fpo.members.map((member) => ({
        id: member.user.id,
        email: member.user.email,
        role: member.role,
        joinedAt: member.joinedAt,
      })),
      lastMessage: fpo.messages[0] || null,
      unreadCount,
      createdAt: fpo.createdAt,
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Error fetching FPO chat details:', error)
    return NextResponse.json(
      { error: 'Failed to fetch FPO chat details' },
      { status: 500 }
    )
  }
}

// POST: Mark all messages as read
export async function POST(
  request: NextRequest,
  { params }: { params: { fpoId: string } }
) {
  try {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    })

    if (!token?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const fpoId = params.fpoId
    const { action } = await request.json()

    if (action !== 'mark_read') {
      return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
    }

    // Get user by email
    const user = await prisma.user.findUnique({
      where: { email: token.email as string },
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Check if FPO exists and user is a member
    const membership = await prisma.member.findFirst({
      where: {
        userId: user.id,
        fpoId: fpoId,
      },
    })

    if (!membership) {
      return NextResponse.json(
        { error: 'You do not have access to this FPO chat' },
        { status: 403 }
      )
    }

    // Get all unread messages in this FPO
    const unreadMessages = await prisma.message.findMany({
      where: {
        fpoId,
        NOT: {
          readBy: {
            has: user.id,
          },
        },
      },
    })

    // Mark each message as read by this user
    await Promise.all(
      unreadMessages.map(async (message) => {
        await prisma.message.update({
          where: { id: message.id },
          data: {
            readBy: {
              set: [...message.readBy, user.id],
            },
          },
        })
      })
    )

    return NextResponse.json({
      success: true,
      markedCount: unreadMessages.length,
    })
  } catch (error) {
    console.error('Error marking messages as read:', error)
    return NextResponse.json(
      { error: 'Failed to mark messages as read' },
      { status: 500 }
    )
  }
}
