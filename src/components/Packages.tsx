"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Check, ChevronLeft, ChevronRight, Clock3, X } from "lucide-react";

const sharedItems = ["ฟรีตรวจฟัน สแกนฟัน 3D และ X-ray 2 ฟิล์ม", "ฟรีติดเครื่องมือหลุด 3 ตัว และรีเทนเนอร์"];
const promotions = [
  {
    name: "จัดฟันสบายกระเป๋า", tag: "โปรโมชั่นเปิดคลินิก", image: "opening-offer.png", width: 1254, height: 1254,
    price: "789", unit: "บาท / จองโปรโมชั่น",
    description: "สิทธิ์สำหรับ 100 ท่านแรก ถึง 31 ธันวาคม 2569",
    items: ["ฟรีปรึกษาและวางแผนการรักษา", "ฟรี X-ray 2 ฟิล์ม สแกนฟัน และรีเทนเนอร์", "ลด 10% สำหรับเคลียร์ช่องปาก ตามเงื่อนไขคลินิก"],
  },
  {
    name: "รวม 4 แพ็กเกจจัดฟัน", tag: "เปรียบเทียบแพ็กเกจ", image: "all-packages.png", width: 1024, height: 1536,
    price: "789", unit: "บาท / จองโปรโมชั่น",
    description: "เลือกแพ็กเกจ Pro S, M, L หรือ XL ที่เหมาะกับคุณ",
    items: ["Pro S และ M ผ่อนเดือนละ 1,500 บาท", "Pro L และ XL ผ่อนเดือนละ 1,200 บาท", "รีเทนเนอร์ฟรีสำหรับ Pro M, L และ XL"],
  },
  {
    name: "Pro S · จัดฟันรอบ 2", tag: "สำหรับผู้ที่เคยจัดฟันแล้ว", image: "pro-s.png", width: 1024, height: 1536,
    price: "1,500", unit: "บาท / เดือน",
    description: "ปรับเครื่องมือ 18 เดือน · จองโปรโมชั่น 789 บาท",
    items: ["ติดเครื่องมือบน / ล่าง ครั้งละ 1,500 บาท", sharedItems[0], "ฟรีติดเครื่องมือหลุด 3 ตัว · ไม่รวมรีเทนเนอร์"],
    condition: "สำหรับผู้ที่เคยจัดฟันแล้ว แผนไม่ถอนฟันเพิ่ม และไม่ใช่เคสยากหรือซับซ้อน",
  },
  {
    name: "Pro M · จัดฟันครบ จบคุ้มค่า", tag: "ผ่อน 26 เดือน", image: "pro-m.png", width: 1024, height: 1536,
    price: "1,500", unit: "บาท / เดือน",
    description: "ปรับเครื่องมือ 24 เดือน · จองโปรโมชั่น 789 บาท",
    items: ["ติดเครื่องมือบน / ล่าง ครั้งละ 1,500 บาท", ...sharedItems],
    condition: "ไม่รวมค่าสกรูจัดฟัน เป็นไปตามเงื่อนไขที่คลินิกกำหนด",
  },
  {
    name: "Pro L · ผ่อนสบาย", tag: "ปรับเครื่องมือ 38 เดือน", image: "pro-l.png", width: 1024, height: 1536,
    price: "1,200", unit: "บาท / เดือน",
    description: "ปรับเครื่องมือ 38 เดือน · จองโปรโมชั่น 789 บาท",
    items: ["ติดเครื่องมือบน / ล่าง ครั้งละ 1,500 บาท", ...sharedItems],
    condition: "ไม่รวมค่าสกรูจัดฟัน เป็นไปตามเงื่อนไขที่คลินิกกำหนด",
  },
  {
    name: "Pro XL · ดูแลตลอดการรักษา", tag: "ปรับเครื่องมือตลอดการรักษา", image: "pro-xl.png", width: 1024, height: 1536,
    price: "1,200", unit: "บาท / เดือน",
    description: "ปรับเครื่องมือตลอดการรักษา · จองโปรโมชั่น 789 บาท",
    items: ["ติดเครื่องมือบน / ล่าง ครั้งละ 1,500 บาท", ...sharedItems],
    condition: "ไม่รวมค่าสกรูจัดฟัน เป็นไปตามเงื่อนไขที่คลินิกกำหนด",
  },
];

export default function Packages() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<(typeof promotions)[number] | null>(null);
  const [showAll, setShowAll] = useState(false);
  const [page, setPage] = useState(0);
  const [pageCount, setPageCount] = useState(2);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || showAll) return;
    const measure = () => {
      const card = track.firstElementChild;
      if (!card) return;
      const perPage = Math.max(1, Math.round((track.clientWidth + 24) / (card.getBoundingClientRect().width + 24)));
      setPageCount(Math.ceil(promotions.length / perPage));
      setPage(Math.round(track.scrollLeft / (track.clientWidth + 24)));
    };
    const observer = new ResizeObserver(measure);
    observer.observe(track);
    measure();
    return () => observer.disconnect();
  }, [showAll]);

  useEffect(() => {
    if (!selected) return;
    const dialog = dialogRef.current;
    const previousOverflow = document.body.style.overflow;
    dialog?.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      dialog?.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [selected]);

  const goToPage = (nextPage: number) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollTo({ left: nextPage * (track.clientWidth + 24), behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  };

  return (
    <section id="packages" aria-labelledby="promotions-heading" className="package-section scroll-mt-24 px-4 py-16 sm:px-6 lg:px-8">
      <div className="package-panel mx-auto max-w-7xl rounded-3xl bg-white p-5 sm:p-8 lg:p-10">
        <div className="mb-7 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 id="promotions-heading" className="text-2xl font-bold text-[#063674] sm:text-3xl">แพ็กเกจและโปรโมชั่น</h2>
            <p className="mt-2 text-sm text-w2-gray-500">โปรโมชั่นจัดฟัน W2 Dental Clinic</p>
          </div>
          <div className="flex items-center gap-4 text-sm text-[#1670cc]">
            <span>สกุลเงิน: THB</span>
            <span aria-hidden="true" className="h-5 w-px bg-slate-200" />
            <button type="button" aria-expanded={showAll} aria-controls="promotion-cards" onClick={() => { setShowAll(!showAll); setPage(0); }} className="inline-flex items-center gap-1 rounded px-1 py-2 font-semibold hover:text-[#063674] focus-visible:outline-2 focus-visible:outline-offset-4">
              {showAll ? "แสดงแบบเลื่อน" : "ดูทั้งหมด"}<ChevronRight size={18} aria-hidden="true" />
            </button>
          </div>
        </div>
        <div id="promotion-cards" ref={trackRef} onScroll={(event) => { const track = event.currentTarget; setPage(Math.round(track.scrollLeft / (track.clientWidth + 24))); }} className={`package-track ${showAll ? "package-track-all" : ""}`} aria-label="แพ็กเกจจัดฟันทั้งหมด">
          {promotions.map((promo) => (
            <article key={promo.image} className="package-card flex min-w-0 flex-col rounded-2xl bg-white p-3">
              <button type="button" onClick={() => setSelected(promo)} aria-label={`ดูรายละเอียด ${promo.name}`} className="block w-full overflow-hidden rounded-lg bg-[#f5f6f8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
                <Image src={`/promotions/${promo.image}`} alt={`โปรโมชั่น ${promo.name}`} width={promo.width} height={promo.height} sizes="(max-width: 639px) 90vw, (max-width: 1023px) 45vw, 400px" className="aspect-square w-full object-contain transition duration-300 hover:scale-[1.02]" />
              </button>
              <div className="flex flex-1 flex-col px-1 pb-1 pt-4">
                <h3 className="min-h-14 text-base font-semibold leading-7 text-[#343b43]">{promo.name}</h3>
                <p className="mt-3 font-bold text-[#cf202f]"><span className="text-xl">{promo.price}</span> <span className="text-base">{promo.unit}</span></p>
                <p className="mt-2 flex items-center gap-2 text-xs leading-5 text-w2-gray-700"><Clock3 size={15} aria-hidden="true" className="shrink-0 text-[#607b91]" />{promo.image === "opening-offer.png" ? "สิ้นสุด 31 ธ.ค. 2569" : "สำหรับ 100 ท่านแรกเท่านั้น"}</p>
                <button type="button" onClick={() => setSelected(promo)} aria-label={`รายละเอียด ${promo.name}`} className="mt-5 w-full rounded-full border border-[#edf0f4] px-4 py-2 text-sm font-semibold text-[#587086] transition hover:border-[#99b8db] hover:bg-[#f0f6ff] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">รายละเอียด</button>
              </div>
            </article>
          ))}
        </div>
        {!showAll && <div className="mt-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-1" aria-label="เลือกหน้าแพ็กเกจ">
            {Array.from({ length: pageCount }, (_, index) => <button key={index} type="button" onClick={() => goToPage(index)} aria-label={`แสดงแพ็กเกจหน้า ${index + 1}`} aria-current={page === index ? "true" : undefined} className="flex min-h-10 min-w-8 items-center justify-center rounded focus-visible:outline-2 focus-visible:outline-blue-600"><span className={`h-2.5 rounded-full transition-all ${page === index ? "w-8 bg-[#6894cd]" : "w-2.5 bg-[#dfe8f5]"}`} /></button>)}
          </div>
          <div className="flex gap-2">
            <button type="button" onClick={() => goToPage(page - 1)} disabled={page === 0} aria-label="แพ็กเกจหน้าก่อนหน้า" className="grid h-9 w-9 place-items-center rounded-full border border-slate-200 text-[#587086] hover:bg-blue-50 disabled:cursor-default disabled:opacity-30"><ChevronLeft size={18} /></button>
            <button type="button" onClick={() => goToPage(page + 1)} disabled={page >= pageCount - 1} aria-label="แพ็กเกจหน้าถัดไป" className="grid h-9 w-9 place-items-center rounded-full border border-slate-200 text-[#587086] hover:bg-blue-50 disabled:cursor-default disabled:opacity-30"><ChevronRight size={18} /></button>
          </div>
        </div>}
      </div>
      <dialog ref={dialogRef} aria-labelledby="promotion-dialog-title" onClose={() => setSelected(null)} onClick={(event) => { if (event.target === event.currentTarget) dialogRef.current?.close(); }} className="fixed inset-0 m-auto max-h-[92dvh] w-[min(94vw,960px)] max-w-none overflow-y-auto rounded-2xl border-0 bg-white p-0 text-w2-gray-900 shadow-2xl backdrop:bg-black/75">
        {selected && <>
          <div className="sticky top-0 z-10 flex items-center justify-between gap-3 border-b border-w2-gray-100 bg-white/95 px-5 py-3 backdrop-blur">
            <h3 id="promotion-dialog-title" className="font-bold">{selected.name}</h3>
            <button type="button" autoFocus onClick={() => dialogRef.current?.close()} aria-label="ปิดรายละเอียดโปรโมชั่น" className="rounded-lg p-3 hover:bg-w2-gray-100 focus-visible:outline-2"><X size={22} /></button>
          </div>
          <div className="grid items-start gap-6 p-5 sm:p-7 md:grid-cols-2">
            <div>
              <Image src={`/promotions/${selected.image}`} alt={`รายละเอียดโปรโมชั่น ${selected.name}`} width={selected.width} height={selected.height} sizes="(max-width: 767px) 90vw, 460px" className="h-auto w-full rounded-lg" />
              <a href={`/promotions/${selected.image}`} target="_blank" rel="noopener noreferrer" className="block p-3 text-center text-sm text-[#1670cc] underline underline-offset-4">เปิดภาพต้นฉบับเพื่อซูมอ่าน (แท็บใหม่)</a>
            </div>
            <div>
              <p className="text-sm font-semibold text-[#587086]">{selected.tag}</p>
              <p className="mt-3 text-2xl font-bold text-[#cf202f]">{selected.price} <span className="text-base">{selected.unit}</span></p>
              <p className="mt-4 text-sm leading-7">{selected.description}</p>
              <ul className="mt-5 space-y-3">{selected.items.map((item) => <li key={item} className="flex gap-2 text-sm leading-6"><Check size={17} className="mt-1 shrink-0 text-[#1670cc]" aria-hidden="true" /><span>{item}</span></li>)}</ul>
              {selected.condition && <p className="mt-5 rounded-lg bg-slate-50 p-4 text-sm leading-6">{selected.condition}</p>}
              <p className="mt-5 text-xs leading-6 text-w2-gray-500">ราคา 789 บาทเป็นค่าจองโปรโมชั่น สิทธิพิเศษแตกต่างกันในแต่ละแพ็กเกจ กรุณาสอบถามคลินิกเพื่อยืนยันสิทธิ์และแผนการรักษาก่อนรับบริการ</p>
              <a href="https://lin.ee/qniu2YG" target="_blank" rel="noopener noreferrer" className="champagne-cta mt-6 flex items-center justify-center gap-2 rounded-full px-5 py-3 font-bold">สอบถามโปรโมชั่นผ่าน LINE<ArrowUpRight size={18} aria-hidden="true" /></a>
            </div>
          </div>
        </>}
      </dialog>
    </section>
  );
}
