import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { getToken } from 'next-auth/jwt'

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
  try {
    // Get session directly with JWT token instead of using getServerSession
    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET })
    
    console.log('Auth token:', token) // Debug: Log the token
    
    if (!token?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { fpoId } = await request.json()

    if (!fpoId) {
      return NextResponse.json({ error: 'FPO ID is required' }, { status: 400 })
    }

    console.log('Looking for user with email:', token.email) // Debug: Log the email we're searching for
    
    // Get user ID from email - try both email formats
    let user = await prisma.user.findUnique({
      where: { email: token.email as string }
    })
    
    // If user not found with exact email, try case-insensitive search
    if (!user) {
      const users = await prisma.user.findMany({
        where: {
          email: {
            mode: 'insensitive',
            equals: token.email as string
          }
        }
      })
      
      if (users.length > 0) {
        user = users[0]
      }
    }

    if (!user) {
      // Return more details for debugging
      return NextResponse.json({ 
        error: 'User not found', 
        email: token.email,
        tokenData: token 
      }, { status: 404 })
    }

    // Check if already a member
    const existingMembership = await prisma.member.findFirst({
      where: {
        userId: user.id,
        fpoId: fpoId
      }
    })

    if (existingMembership) {
      return NextResponse.json(
        { error: 'Already a member of this FPO' },
        { status: 400 }
      )
    }

    // Create new membership
    const member = await prisma.member.create({
      data: {
        userId: user.id,
        fpoId: fpoId,
        role: 'Member', // Default role
        joinedAt: new Date()
      }
    })

    return NextResponse.json({ success: true, member })
  } catch (error) {
    console.error('Error joining FPO:', error)
    // Return more detailed error information for debugging
    return NextResponse.json(
      { 
        error: 'Failed to join FPO', 
        message: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined
      },
      { status: 500 }
    )
  }
}