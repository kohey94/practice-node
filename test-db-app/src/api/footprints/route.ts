import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
    const data = await prisma.footprint.findMany({ orderBy: { createAt: 'desc' } })
    return NextResponse.json(data);
}

export async function POST(req: Request) {
    const body = await req.json()
    const { name, message } = body
    const newFp = await prisma.footprint.create({
        data: { name, message },
    })

    return NextResponse.json(newFp, {status: 201 })
}