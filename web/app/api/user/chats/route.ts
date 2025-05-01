import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { getToken } from 'next-auth/jwt'

const prisma = new PrismaClient()

// GET: Fetch all FPO chats the user is a member of
export async function GET(request: NextRequest) {
  try {
    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET })
    
    if (!token?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { email: token.email as string }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const memberships = await prisma.member.findMany({
      where: { userId: user.id },
      include: {
        fpo: {
          include: {
            messages: {
              orderBy: { createdAt: 'desc' },
              take: 1,
              include: {
                sender: {
                  select: {
                    id: true,
                    email: true
                  }
                }
              }
            }
          }
        }
      }
    })

    const chats = await Promise.all(
      memberships.map(async (membership) => {
        const unreadCount = await prisma.message.count({
          where: {
            fpoId: membership.fpoId,
            NOT: {
              readBy: {
                has: user.id
              }
            }
          }
        })

        return {
          id: membership.fpo.id,
          name: membership.fpo.name,
          description: membership.fpo.description,
          location: membership.fpo.location,
          memberRole: membership.role,
          joinedAt: membership.joinedAt,
          lastMessage: membership.fpo.messages[0] || null,
          unreadCount,
          createdAt: membership.fpo.createdAt
        }
      })
    )

    return NextResponse.json(chats.sort((a, b) => 
      (b.lastMessage?.createdAt || b.createdAt).localeCompare(
        (a.lastMessage?.createdAt || a.createdAt)
      )
    ))
    
  } catch (error) {
    console.error('Error fetching user chats:', error)
    return NextResponse.json(
      { error: 'Failed to fetch user chats' },
      { status: 500 }
    )
  }
}