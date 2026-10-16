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
export function minimumAppointmentDate() {
  const today = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Bangkok", year: "numeric", month: "2-digit", day: "2-digit",
  }).format(new Date());
  return today > "2026-11-23" ? today : "2026-11-23";
}
