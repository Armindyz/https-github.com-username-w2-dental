import { NextRequest, NextResponse } from "next/server";
import { minimumAppointmentDate, services, sources, timeSlots } from "@/lib/appointment";

const FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSccn4MKy056e5VgzD44uBvitoGyPzfbXC_1EhAlZxZPFVbESg/formResponse";

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>;
  try {
    const input: unknown = await request.json();
    if (!input || typeof input !== "object" || Array.isArray(input)) throw new Error();
    body = input as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  const fields = ["fname", "lname", "phone", "line_id", "service", "source", "note", "appoint_date", "appoint_time"] as const;
  const data: Record<string, string> = {};
  for (const field of fields) {
    const value = body[field];
    if (value !== undefined && (typeof value !== "string" || value.length > 5000)) {
      return NextResponse.json({ error: `Invalid field: ${field}` }, { status: 400 });
    }
    data[field] = typeof value === "string" ? value.trim() : "";
  }
  const date = data.appoint_date;
  const parsedDate = new Date(`${date}T00:00:00Z`);
  if (!data.fname || !data.lname || !/^[0-9+\-\s()]{9,15}$/.test(data.phone)
    || !services.includes(data.service) || body.consent !== true
    || (data.source && !sources.includes(data.source))
    || (data.appoint_time && !timeSlots.some((slot) => slot.value === data.appoint_time))
    || !/^\d{4}-\d{2}-\d{2}$/.test(date) || Number.isNaN(parsedDate.getTime())
    || parsedDate.toISOString().slice(0, 10) !== date || date < minimumAppointmentDate()) {
    return NextResponse.json({ error: "กรุณาตรวจสอบข้อมูลและวันที่นัดหมายให้ถูกต้อง" }, { status: 400 });
  }
  const [year, month, day] = date.split("-");
  const payload = new URLSearchParams({
    "entry.496790890": `${data.fname} ${data.lname}`,
    "entry.765612988": data.phone,
    "entry.1940050088": data.line_id,
    "entry.899800354": data.service,
    "entry.1107564578": data.note,
    "entry.1931408668_year": year,
    "entry.1931408668_month": month,
    "entry.1931408668_day": day,
    "entry.1955981945": data.appoint_time,
    "entry.1640438865": data.source,
    "entry.622878355": "ยินยอม",
  });
  try {
    const response = await fetch(FORM_URL, {
      method: "POST", body: payload,
      signal: AbortSignal.timeout(15000), cache: "no-store",
    });
    const html = await response.text();
    // Google now uses an obfuscated class, not its legacy confirmation class.
    // The confirmation link is emitted only after recording a response.
    const confirmationUrl = FORM_URL.replace("/formResponse", "/viewform?usp=form_confirm");
    const confirmed = html.includes(`href="${confirmationUrl}`)
      && /class="[^"]*\bvHW8K\b[^"]*"/.test(html);
    if (!response.ok || !confirmed) {
      return NextResponse.json({ error: "Google Form did not confirm submission" }, { status: 502 });
    }
    return NextResponse.json({ success: true });
  } catch {
    // Do not log patient details or retry automatically: the response may already be recorded.
    return NextResponse.json({ error: "Unable to confirm submission" }, { status: 502 });
  }
}
