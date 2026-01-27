import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Save to database
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

    // Send to CRM (HubSpot/Salesforce)
    if (process.env.HUBSPOT_API_KEY) {
      await fetch('https://api.hubapi.com/contacts/v1/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.HUBSPOT_API_KEY}`
        },
        body: JSON.stringify({
          properties: [
            { property: 'email', value: data.email },
            { property: 'firstname', value: data.name?.split(' ')[0] },
            { property: 'lastname', value: data.name?.split(' ')[1] },
            { property: 'company', value: data.company },
            { property: 'phone', value: data.phone }
          ]
        })
      });
    }

    return NextResponse.json({ success: true, lead });
  } catch (error) {
    console.error('Lead capture error:', error);
    return NextResponse.json({ error: 'Failed to capture lead' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const leads = await prisma.lead.findMany({
      orderBy: { createdAt: 'desc' },
      take: 100
    });
    return NextResponse.json(leads);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch leads' }, { status: 500 });
  }
}
