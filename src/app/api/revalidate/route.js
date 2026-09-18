import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export const dynamic = 'force-dynamic';

export async function POST(request) {
  const secret = process.env.NEXT_API_KEY;
  const provided =
    request.headers.get('x-revalidate-secret') ||
    new URL(request.url).searchParams.get('secret');

  if (!secret || provided !== secret) {
    return NextResponse.json(
      { revalidated: false, message: 'Invalid secret' },
      { status: 401 }
    );
  }

  revalidatePath('/', 'layout');

  return NextResponse.json({ revalidated: true, now: Date.now() });
}
