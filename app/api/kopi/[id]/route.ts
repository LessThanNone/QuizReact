import { NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';

export async function GET(_request: Request, { params }: { params: { id: string } }) {
  const id = Number(params.id);
  if (Number.isNaN(id)) return new NextResponse('Invalid id', { status: 400 });

  try {
    const item = await prisma.kopi.findUnique({ where: { id } });
    if (!item) return new NextResponse('Not Found', { status: 404 });
    return NextResponse.json(item);
  } catch (err) {
    console.error('GET /api/kopi/[id] error', err);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const id = Number(params.id);
  if (Number.isNaN(id)) return new NextResponse('Invalid id', { status: 400 });

  try {
    const body = await request.json();
    const updated = await prisma.kopi.update({
      where: { id },
      data: {
        nama: body.nama ? String(body.nama) : undefined,
        notes: Object.prototype.hasOwnProperty.call(body, 'notes') ? (body.notes ? String(body.notes) : null) : undefined,
        aroma: Object.prototype.hasOwnProperty.call(body, 'aroma') ? (body.aroma ? String(body.aroma) : null) : undefined,
        acidity: Object.prototype.hasOwnProperty.call(body, 'acidity') ? (body.acidity ? String(body.acidity) : null) : undefined,
        seduh: Object.prototype.hasOwnProperty.call(body, 'seduh') ? (body.seduh ? String(body.seduh) : null) : undefined,
      },
    });
    return NextResponse.json(updated);
  } catch (err) {
    console.error('PUT /api/kopi/[id] error', err);
    return new NextResponse('Bad Request', { status: 400 });
  }
}

export async function DELETE(_request: Request, { params }: { params: { id: string } }) {
  const id = Number(params.id);
  if (Number.isNaN(id)) return new NextResponse('Invalid id', { status: 400 });

  try {
    await prisma.kopi.delete({ where: { id } });
    return new NextResponse(null, { status: 204 });
  } catch (err) {
    console.error('DELETE /api/kopi/[id] error', err);
    return new NextResponse('Not Found', { status: 404 });
  }
}
