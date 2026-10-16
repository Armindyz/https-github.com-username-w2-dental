// Values must match the choices in the clinic's Google Form exactly.
export const services = [
  "ตรวจสุขภาพฟัน / ขูดหินปูน", "อุดฟัน", "ถอนฟัน", "รักษารากฟัน",
  "จัดฟัน", "ฟอกสีฟัน", "รากฟันเทียม", "ครอบฟัน / วีเนียร์",
  "ปวดฟัน / เหงือกบวม / มีอาการเร่งด่วน", "ปรึกษาทันตแพทย์", "อื่น ๆ",
];
export const sources = [
  "LINE OA", "Facebook", "Instagram", "TikTok",
  "Google search/Google Maps", "เพื่อนหรือคนรู้จักแนะนำ", "อื่นๆ",
];
export const timeSlots = [
  { value: "ช่วงเช้า  (10.00-12.00)", label: "ช่วงเช้า (10.00–12.00)" },
  { value: "ช่วงบ่าย (12.00-16.00)", label: "ช่วงบ่าย (12.00–16.00)" },
  { value: "ช่วยเย็น (16.00-20.00)", label: "ช่วงเย็น (16.00–20.00)" },
  { value: "ยังไม่แน่ใจ ให้เจ้าหน้าที่ติดต่อกลับ", label: "ยังไม่แน่ใจ ให้เจ้าหน้าที่ติดต่อกลับ" },
];
export function minimumAppointmentDate() {
  const today = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Bangkok", year: "numeric", month: "2-digit", day: "2-digit",
  }).format(new Date());
  return today > "2026-11-23" ? today : "2026-11-23";
}
