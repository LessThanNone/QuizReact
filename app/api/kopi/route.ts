import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';

export async function GET() {
  try {
    const items = await prisma.kopi.findMany({ orderBy: { createdAt: 'desc' } });
    return NextResponse.json(items);
  } catch (err) {
    console.error('GET /api/kopi error', err);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body?.nama) return new NextResponse('Field `nama` is required', { status: 400 });

    const created = await prisma.kopi.create({
      data: {
        nama: String(body.nama),
        notes: body.notes ? String(body.notes) : null,
        aroma: body.aroma ? String(body.aroma) : null,
        acidity: body.acidity ? String(body.acidity) : null,
        seduh: body.seduh ? String(body.seduh) : null,
      },
    });

    return NextResponse.json(created, { status: 201 });
  } catch (err) {
    console.error('POST /api/kopi error', err);
    return new NextResponse('Bad Request', { status: 400 });
  }
}
