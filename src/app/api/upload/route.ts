
import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function POST(request: Request): Promise<NextResponse> {
    const { searchParams } = new URL(request.url);
    const filename = searchParams.get('filename');

    if (!filename || !request.body) {
        return NextResponse.json({ error: 'No filename or body' }, { status: 400 });
    }

    if (!process.env.BLOB_READ_WRITE_TOKEN) {
        return NextResponse.json(
            { error: 'BLOB_READ_WRITE_TOKEN is missing. Please add Vercel Blob storage integration.' },
            { status: 500 }
        );
    }

    const blob = await put(filename, request.body, {
        access: 'public',
    });

    return NextResponse.json(blob);
}
