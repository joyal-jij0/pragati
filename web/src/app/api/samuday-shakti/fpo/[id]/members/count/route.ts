// app/api/samuday-shakti/fpo/[id]/members/count/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const fpoId = params.id

    // Verify if FPO exists
    const fpo = await prisma.fPO.findUnique({
      where: { id: fpoId },
      select: { id: true, name: true },
    })

    if (!fpo) {
      return NextResponse.json({ error: 'FPO not found' }, { status: 404 })
    }

    // Count members
    const membersCount = await prisma.member.count({
      where: { fpoId: fpoId },
    })

    // Count by roles (assuming roles are stored directly in the member records)
    // For a more sophisticated categorization, you might need custom logic
    const roleBreakdown = await prisma.member.groupBy({
      by: ['role'],
      where: { fpoId: fpoId },
      _count: true,
    })

    // Format the response
    const formattedRoles = roleBreakdown.reduce((acc, item) => {
      acc[item.role] = item._count
      return acc
    }, {})

    return NextResponse.json({
      total: membersCount,
      byRole: formattedRoles,
    })
  } catch (error) {
    console.error('Error counting FPO members:', error)
    return NextResponse.json(
      { error: 'Failed to count FPO members' },
      { status: 500 }
    )
  }
}
