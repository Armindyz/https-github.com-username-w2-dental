import { NextRequest, NextResponse } from 'next/server';

// วาง URL ของ Google Apps Script ที่นี่หลัง Deploy
const APPS_SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL ?? '';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields server-side
    const required = ['fname', 'lname', 'phone', 'service', 'appoint_date', 'appoint_time'];
    for (const field of required) {
      if (!body[field]?.toString().trim()) {
        return NextResponse.json({ error: `Missing field: ${field}` }, { status: 400 });
      }
    }

    // Sanitize
    const payload = {
      timestamp:    new Date().toLocaleString('th-TH', { timeZone: 'Asia/Bangkok' }),
      fname:        body.fname?.trim() ?? '',
      lname:        body.lname?.trim() ?? '',
      phone:        body.phone?.trim() ?? '',
      email:        body.email?.trim() ?? '',
      service:      body.service?.trim() ?? '',
      appoint_date: body.appoint_date ?? '',
      appoint_time: body.appoint_time ?? '',
      source:       body.source ?? '',
      note:         body.note?.trim() ?? '',
    };

    if (!APPS_SCRIPT_URL) {
      console.error('[W2 Dental] GOOGLE_SCRIPT_URL is not set:', payload);
      return NextResponse.json(
        { error: 'Google Apps Script URL is not configured' },
        { status: 503 }
      );
    }

    const res = await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const resultText = await res.text();

    if (!res.ok) {
      throw new Error(`Apps Script responded ${res.status}: ${resultText}`);
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[W2 Dental] register error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
