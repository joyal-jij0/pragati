import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validate required fields
    const { name, location, description } = body

    if (!name || !location || !description) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Create new FPO
    const newFPO = await prisma.fpo.create({
      data: {
        name,
        location,
        description: description || 'fpo', // Optional field
      },
    })

    return NextResponse.json(newFPO, { status: 201 })
  } catch (error) {
    console.error('Error creating FPO:', error)
    return NextResponse.json({ error: 'Failed to create FPO' }, { status: 500 })
  }
}
