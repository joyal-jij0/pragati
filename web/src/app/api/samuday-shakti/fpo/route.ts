import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  const fpo = await prisma.fPO.findMany({
    orderBy: {
      createdAt: 'desc', // Get newest first
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
  return NextResponse.json(fpo)
}
