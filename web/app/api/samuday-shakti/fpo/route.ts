import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  const fpo = await prisma.fpo.findMany({
    orderBy: {
      createdAt: 'desc', // Get newest first
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
    return NextResponse.json({ message: 'No FPOs found' }, { status: 404 })
  }
  return NextResponse.json(fpo)
}
