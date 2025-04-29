import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { getToken } from 'next-auth/jwt'

const prisma = new PrismaClient()

// GET: Fetch messages for an FPO
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET })
    if (!token?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const fpoId = params.id
    const page = Number(request.nextUrl.searchParams.get('page')) || 1
    const limit = Number(request.nextUrl.searchParams.get('limit')) || 50

    // Get user
    const user = await prisma.user.findUnique({
      where: { email: token.email }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Check if user is member of FPO
    const membership = await prisma.member.findFirst({
      where: {
        userId: user.id,
        fpoId: fpoId
      }
    })

    if (!membership) {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 })
    }

    // Get messages
    const messages = await prisma.message.findMany({
      where: { fpoId },
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
      include: {
        sender: {
          select: {
            id: true,
            email: true
          }
        }
      }
    })

    // Get total count for pagination
    const total = await prisma.message.count({
      where: { fpoId }
    })

    // Mark messages as read
    await Promise.all(
      messages.map(msg =>
        prisma.message.update({
          where: { id: msg.id },
          data: {
            readBy: {
              set: [...new Set([...msg.readBy, user.id])]
            }
          }
        })
      )
    )

    return NextResponse.json({
      messages: messages.reverse(),
      currentPage: page,
      pages: Math.ceil(total / limit),
      total
    })

  } catch (error) {
    console.error('Error fetching messages:', error)
    return NextResponse.json(
      { error: 'Failed to fetch messages' },
      { status: 500 }
    )
  }
}

// POST: Send a new message
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET })
    if (!token?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const fpoId = params.id
    const { content } = await request.json()

    // Validate content
    if (!content?.trim()) {
      return NextResponse.json({ error: 'Message content is required' }, { status: 400 })
    }

    // Get user
    const user = await prisma.user.findUnique({
      where: { email: token.email }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Check if user is member of FPO
    const membership = await prisma.member.findFirst({
      where: {
        userId: user.id,
        fpoId: fpoId
      }
    })

    if (!membership) {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 })
    }

    // Create message
    const message = await prisma.message.create({
      data: {
        content,
        fpoId,
        senderId: user.id,
        readBy: [user.id]
      },
      include: {
        sender: {
          select: {
            id: true,
            email: true
          }
        }
      }
    })

    return NextResponse.json({ message })

  } catch (error) {
    console.error('Error creating message:', error)
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    )
  }
}