import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { createClient } from '@/utils/supabase/server'

// Create a single PrismaClient instance and export it
// This prevents multiple instances during hot reloading
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }
const prisma = globalForPrisma.prisma || new PrismaClient()
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

// GET: Fetch messages for an FPO
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = await createClient()
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session?.user.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Extract the FPO ID from the params object
    const fpoId = (await params).id

    const page = Number(request.nextUrl.searchParams.get('page')) || 1
    const limit = Number(request.nextUrl.searchParams.get('limit')) || 50

    // Get user - ensure email exists before querying
    if (!session.user.email) {
      return NextResponse.json(
        { error: 'User email not found' },
        { status: 400 }
      )
    }

    const profile = await prisma.profiles.findUnique({
      where: { email: session.user.email },
    })

    if (!profile) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Check if user is member of FPO
    const membership = await prisma.profiles.findFirst({
      where: {
        id: profile.id,
      },
      include: {
        fpos: {
          where: { id: fpoId },
        },
      },
    })

    if (!membership?.fpos || membership.fpos.length === 0) {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 })
    }

    // Get messages
    const messages = await prisma.message.findMany({
      where: { fpoId: fpoId },
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
      include: {
        author: true,
      },
    })

    // Get total count for pagination
    const total = await prisma.message.count({
      where: { fpoId },
    })

    return NextResponse.json({
      messages: messages.reverse(),
      currentPage: page,
      pages: Math.ceil(total / limit),
      total,
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
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = await createClient()
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session?.user.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Extract the FPO ID from the params object
    const fpoId = (await params).id

    const body = await request.json()
    const content = body.content

    // Validate content
    if (!content || typeof content !== 'string' || !content.trim()) {
      return NextResponse.json(
        { error: 'Message content is required' },
        { status: 400 }
      )
    }

    // Get user - ensure email exists before querying
    if (!session.user.email) {
      return NextResponse.json(
        { error: 'User email not found' },
        { status: 400 }
      )
    }

    const profile = await prisma.profiles.findUnique({
      where: { email: session.user.email },
    })

    if (!profile) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Check if user is member of FPO
    const membership = await prisma.profiles.findFirst({
      where: {
        id: profile.id,
      },
      include: {
        fpos: {
          where: { id: fpoId },
        },
      },
    })

    if (!membership?.fpos || membership.fpos.length === 0) {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 })
    }

    // Create message
    const message = await prisma.message.create({
      data: {
        content: content,
        author: {
          connect: {
            id: profile.id,
          },
        },
        fpo: {
          connect: {
            id: fpoId,
          },
        },
      },
      include: {
        author: {
          select: {
            id: true,
            email: true,
          },
        },
      },
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
