"use client";

import { useState } from "react";
import { ChevronRight, X } from "lucide-react";

const services = [
  { title: "ทันตกรรมทั่วไป", desc: "ตรวจสุขภาพฟัน ขูดหินปูน อุดฟัน ถอนฟัน และดูแลปัญหาช่องปากพื้นฐาน" },
  { title: "จัดฟัน", desc: "ประเมินฟันซ้อน ฟันห่าง และการสบฟัน พร้อมวางแผนรักษาเป็นขั้นตอน" },
  { title: "ฟอกสีฟัน", desc: "เพิ่มความสว่างให้รอยยิ้มอย่างเหมาะสมกับสีฟันและไลฟ์สไตล์ของคุณ" },
  { title: "รากฟันเทียม", desc: "ประเมินและวางแผนทดแทนฟันที่สูญเสีย เพื่อการใช้งานที่มั่นคงขึ้น" },
  { title: "วีเนียร์และครอบฟัน", desc: "ปรับรูปฟัน สีฟัน และบูรณะฟันให้ดูสวยเป็นธรรมชาติ" },
  { title: "ทำฟันปลอม", desc: "ฟันปลอมทั้งชนิดถอดได้และติดแน่น คืนรอยยิ้มและการบดเคี้ยวที่สมบูรณ์" },
];

function DentalIcon({ variant }: { variant: number }) {
  const tooth = "M32 14c-7-5-18-5-19 6-1 7 4 11 5 18 1 6 1 13 5 13 5 0 3-16 9-16s4 16 9 16c4 0 4-7 5-13 1-7 6-11 5-18-1-11-12-11-19-6Z";
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-14 w-14 transition-transform duration-200 group-hover:-translate-y-1 motion-reduce:transform-none">
      {variant === 0 && <><path d={tooth} /><path d="M21 18c3-2 6-1 9 1M41 6v10M36 11h10" /></>}
      {variant === 1 && <><path d="M9 17c10-8 36-8 46 0v27c-10 8-36 8-46 0Z" /><path d="M19 14v34M32 12v39M45 14v34M7 31c13 4 37 4 50 0" /><rect x="15" y="27" width="8" height="9" rx="1.5" /><rect x="28" y="28" width="8" height="9" rx="1.5" /><rect x="41" y="27" width="8" height="9" rx="1.5" /></>}
      {variant === 2 && <><path d={tooth} /><path d="m46 5 2.5 6.5L55 14l-6.5 2.5L46 23l-2.5-6.5L37 14l6.5-2.5ZM10 40v10M5 45h10M23 20l3-1" /></>}
      {variant === 3 && <><path d="M19 26V16c0-8 8-10 13-6 5-4 13-2 13 6v10ZM16 26h32M25 30h14l-3 23-4 5-4-5ZM24 35l16-3M25 42l14-3M27 49l10-3" /><path d="M10 30v13M54 30v13" /></>}
      {variant === 4 && <><path d={tooth} /><path d="M20 31V21c0-6 7-5 12-2 5-3 12-4 12 2v10c-7-3-17-3-24 0ZM24 22l-1 4M51 43l3 3 6-7" /></>}
      {variant === 5 && <><path d="M8 24c2-10 13-15 24-15s22 5 24 15v13c-2 12-13 18-24 18S10 49 8 37Z" /><path d="M8 25c12 8 36 8 48 0M8 36c12 9 36 9 48 0M16 29v12M24 31v13M32 32v13M40 31v13M48 29v12M14 21c10-7 26-7 36 0" /></>}
    </svg>
  );
}

export default function Services() {
  const [active, setActive] = useState<number | "all" | null>(null);
  const visibleServices = services.filter((_, index) => active === "all" || active === index);

  return (
    <section id="services" aria-labelledby="services-heading" className="scroll-mt-24 silver-surface px-5 py-14 lg:px-8 lg:py-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[280px_1fr] lg:gap-16">
          <div>
            <h2 id="services-heading" className="text-3xl font-bold text-w2-gray-900">บริการของเรา</h2>
            <button type="button" onClick={() => setActive(active === "all" ? null : "all")} aria-expanded={active === "all"} aria-controls="service-details" className="mt-3 inline-flex min-h-11 items-center gap-1 rounded text-base text-[#8a6828] hover:text-w2-gray-900 focus-visible:outline-2 focus-visible:outline-offset-4">
              {active === "all" ? "ย่อรายละเอียด" : "ดูทั้งหมด"}<ChevronRight size={19} aria-hidden="true" />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-x-3 gap-y-6 sm:grid-cols-3 sm:gap-x-6 sm:gap-y-8">
            {services.map((service, index) => (
              <button key={service.title} type="button" aria-expanded={active === index || active === "all"} aria-controls="service-details" onClick={() => setActive(active === index ? null : index)} className={`group flex min-h-28 flex-col items-center justify-center gap-3 rounded-xl px-2 py-3 text-center text-w2-gray-500 hover:text-w2-gold-dark transition hover:bg-[#f1ece1] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-w2-gold-dark ${active === index ? "bg-[#f1ece1]" : ""}`}>
                <DentalIcon variant={index} />
                <span className="text-sm font-semibold leading-6 text-w2-gray-900 sm:text-base">{service.title}</span>
              </button>
            ))}
          </div>
        </div>
        <div id="service-details" hidden={active === null} className="mt-8 border-t border-w2-gray-200 pt-6">
          {active !== null && <>
            <div className="mb-4 flex items-center justify-between gap-3">
              <h3 className="font-semibold text-w2-gray-900">{active === "all" ? "บริการทันตกรรมทั้งหมด" : services[active].title}</h3>
              <button type="button" onClick={() => setActive(null)} aria-label="ปิดรายละเอียดบริการ" className="rounded-lg p-2 text-w2-gray-500 hover:bg-w2-mist focus-visible:outline-2"><X size={20} /></button>
            </div>
            <div className={`grid gap-5 ${active === "all" ? "sm:grid-cols-2 lg:grid-cols-3" : ""}`}>
              {visibleServices.map((service) => <article key={service.title} className="rounded-xl bg-white p-5">
                {active === "all" && <h4 className="mb-2 font-semibold text-w2-gray-900">{service.title}</h4>}
                <p className="text-sm leading-7 text-w2-gray-500">{service.desc}</p>
                <a href="#register" className="mt-3 inline-flex min-h-10 items-center gap-1 text-sm font-semibold text-[#8a6828] hover:underline">นัดหมายบริการนี้<ChevronRight size={16} aria-hidden="true" /></a>
              </article>)}
            </div>
          </>}
        </div>
      </div>
    </section>
  );
}

