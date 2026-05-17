"use client";

import { useRef } from "react";
import Image from "next/image";
import { useInView } from "framer-motion";

const reasons = [
  {
    number: "01",
    title: "อธิบายแผนรักษาชัดเจน",
    desc: "ให้ข้อมูลขั้นตอน ค่าใช้จ่าย และทางเลือกก่อนเริ่มรักษา เพื่อให้ตัดสินใจได้อย่างสบายใจ",
  },
  {
    number: "02",
    title: "พื้นที่สะอาดและเป็นส่วนตัว",
    desc: "จัดบรรยากาศให้สว่าง สบายตา พร้อมมาตรฐานการดูแลความสะอาดในทุกจุดสัมผัส",
  },
  {
    number: "03",
    title: "ระบบนัดหมายที่ติดตามง่าย",
    desc: "กรอกข้อมูลออนไลน์ได้ทันที ทีมงานติดต่อกลับเพื่อยืนยันวันและเวลาที่เหมาะสม",
  },
  {
    number: "04",
    title: "บริการครอบคลุมทั้งครอบครัว",
    desc: "ดูแลตั้งแต่เด็ก ผู้ใหญ่ ไปจนถึงงานบูรณะและความสวยงามของรอยยิ้ม",
  },
];

export default function WhyUs() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="silver-surface relative overflow-hidden px-5 py-20 text-w2-gray-700 lg:px-8">
      <div className="absolute inset-0 diamond-bg opacity-80" />
      <div className="relative z-10 mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div
          ref={ref}
          className="relative"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateX(0)" : "translateX(-28px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-white soft-shadow">
            <Image
              src="/clinic/reception4.jpg"
              alt="บรรยากาศภายใน W2 Dental Clinic"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 45vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-w2-gray-500/28 to-transparent" />
          </div>
          <div className="absolute bottom-6 left-6 rounded-lg border border-w2-gray-200 bg-white/82 px-5 py-4 text-w2-gray-700 backdrop-blur">
            <p className="text-3xl font-bold">W2</p>
            <p className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-w2-gray-500">
              Dental Clinic
            </p>
          </div>
        </div>

        <div
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateX(0)" : "translateX(28px)",
            transition: "opacity 0.7s ease 0.15s, transform 0.7s ease 0.15s",
          }}
        >
          <span className="text-xs font-bold uppercase tracking-[0.18em] text-w2-gray-500">
            Why Choose Us
          </span>
          <h2 className="mt-3 text-4xl font-bold">
            ดูแลให้สมดุลทั้งความสบายใจและผลลัพธ์
          </h2>

          <div className="mt-10 grid gap-6">
            {reasons.map((reason, index) => (
              <div
                key={reason.number}
                className="silver-card flex gap-5 rounded-lg p-5"
                style={{
                  opacity: inView ? 1 : 0,
                  transition: `opacity 0.5s ease ${0.25 + index * 0.08}s`,
                }}
              >
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-w2-mist text-sm font-bold text-w2-gray-700">
                  {reason.number}
                </span>
                <div>
                  <h3 className="text-lg font-bold">{reason.title}</h3>
                  <p className="mt-2 leading-7 text-w2-gray-500">{reason.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
