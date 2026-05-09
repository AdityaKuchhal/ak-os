import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const body: unknown = await req.json();
  console.log('Contact form submission:', body);
  return NextResponse.json({ ok: true });
}
