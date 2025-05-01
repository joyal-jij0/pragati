import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { getToken } from 'next-auth/jwt'

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  try {
    const token = await getToken({ 
      req: request, 
      secret: process.env.NEXTAUTH_SECRET 
    })
    
    if (!token?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await prisma.user.findFirst({
      where: {
        email: {
          mode: 'insensitive',
          equals: token.email
        }
      }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const joinedFpos = await prisma.fPO.findMany({
      where: {
        members: {
          some: {
            userId: user.id
          }
        }
      },
      select: {
        id: true,
        name: true,
        location: true,
        description: true,
        _count: {
          select: {
            members: true,
          },
        },
        createdAt: true,
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