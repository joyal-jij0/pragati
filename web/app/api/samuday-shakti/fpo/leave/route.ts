import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { getToken } from 'next-auth/jwt'

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
  try {
    const token = await getToken({ 
      req: request, 
      secret: process.env.NEXTAUTH_SECRET 
    })
    
    if (!token?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { fpoId } = body

    if (!fpoId) {
      return NextResponse.json({ error: 'FPO ID is required' }, { status: 400 })
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

    // Delete the membership
    await prisma.member.deleteMany({
      where: {
        AND: [
          { userId: user.id },
          { fpoId: fpoId }
        ]
      }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error leaving FPO:', error)
    return NextResponse.json(
      { error: 'Failed to leave FPO' },
      { status: 500 }
    )
  }
}