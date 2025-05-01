import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id

    const fpo = await prisma.fPO.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        name: true,
        location: true,
        description: true,
        // members: true,
        _count: {
          select: {
            members: true, // Only select the count of members
          },
        },
        createdAt: true,
      },
    })

    if (!fpo) {
      return NextResponse.json({ error: 'FPO not found' }, { status: 404 })
    }

    return NextResponse.json(fpo)
  } catch (error) {
    console.error('Error fetching FPO:', error)
    return NextResponse.json({ error: 'Failed to fetch FPO' }, { status: 500 })
  }
}
