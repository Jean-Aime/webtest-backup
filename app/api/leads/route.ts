import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendLeadNotification } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    const lead = await prisma.lead.create({
      data: {
        name: data.name,
        email: data.email,
        company: data.company,
        phone: data.phone,
        message: data.message,
        source: data.source || 'website',
        metadata: data.metadata || {}
      }
    });

    await sendLeadNotification({
      name: data.name,
      email: data.email,
      company: data.company,
      message: data.message,
      source: data.source
    });

    return NextResponse.json({ success: true, lead });
  } catch (error) {
    console.error('Lead capture error:', error);
    return NextResponse.json({ error: 'Failed to capture lead' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const leads = await prisma.lead.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        company: true,
        phone: true,
        message: true,
        source: true,
        createdAt: true
      },
      orderBy: { createdAt: 'desc' },
      take: 500
    });
    return NextResponse.json(leads);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch leads' }, { status: 500 });
  }
}
