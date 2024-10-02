import path from 'node:path';
import AdmZip from 'adm-zip';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const headers = new Headers();
    headers.append('Content-Disposition', 'attachment; filename=archive.zip');
    headers.append('Content-Type', 'application/zip');

    const RAILWAY_PATH = process.env.RAILWAY_VOLUME_MOUNT_PATH;
    if (!RAILWAY_PATH || RAILWAY_PATH === '') {
      console.warn('RAILWAY_VOLUME_MOUNT_PATH undefined.');
    }
    const dbpath = path.join(RAILWAY_PATH || './', 'db');

    const zip = new AdmZip();
    zip.addLocalFolder(dbpath);

    const zipBuffer = zip.toBuffer();

    return new Response(zipBuffer, {
      headers,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: err.cause });
  }
}
