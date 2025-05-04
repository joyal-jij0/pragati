import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
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
}
