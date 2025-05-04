import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const fpo = await prisma.fpo.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        name: true,
        description: true,
        location: true,
        createdAt: true,
        farmers: true,
        messages: true,
        _count: {
          select: {
            farmers: true,
          },
        },
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
