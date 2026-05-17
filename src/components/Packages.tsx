"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import { Check } from "lucide-react";

const packages = [
  {
    name: "ตรวจฟัน + ขูดหินปูน",
    tag: "ยอดนิยม",
    price: "สอบถามราคา",
    featured: false,
    items: ["ตรวจสุขภาพช่องปาก", "ขูดหินปูน", "ขัดฟัน", "คำแนะนำหลังรับบริการ"],
  },
  {
    name: "ฟอกสีฟัน",
    tag: "แนะนำ",
    price: "สอบถามราคา",
    featured: true,
    items: ["ประเมินสีฟัน", "ฟอกสีฟัน", "ดูแลเหงือกก่อนบริการ", "ติดตามผลหลังบริการ"],
  },
  {
    name: "Smile Design",
    tag: "ครบวงจร",
    price: "ประเมินรายเคส",
    featured: false,
    items: ["ออกแบบรอยยิ้ม", "วีเนียร์/ครอบฟัน", "ฟอกสีฟัน", "วางแผนรายบุคคล"],
  },
];

export default function Packages() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="packages" className="bg-white px-5 py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div
          ref={ref}
          className="mx-auto mb-12 max-w-3xl text-center"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          <span className="section-kicker">Packages</span>
          <h2 className="mt-3 text-4xl font-bold text-w2-gray-900">แพ็คเกจแนะนำ</h2>
          <p className="mt-4 leading-8 text-w2-gray-500">
            จัดแพ็คเกจให้เปรียบเทียบง่ายขึ้น พร้อมปุ่มนัดหมายตรงถึงฟอร์ม
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {packages.map((pkg, index) => (
            <article
              key={pkg.name}
              className={`relative rounded-lg p-7 transition duration-300 ${
                pkg.featured
                  ? "silver-card text-w2-gray-900 md:-translate-y-3"
                  : "silver-card text-w2-gray-900 hover:-translate-y-1"
              }`}
              style={{
                opacity: inView ? 1 : 0,
                transform: inView
                  ? pkg.featured
                    ? "translateY(-12px)"
                    : "translateY(0)"
                  : "translateY(24px)",
                transition: `opacity 0.5s ease ${index * 90}ms, transform 0.5s ease ${index * 90}ms`,
              }}
            >
              <span
                className={`rounded-lg px-3 py-1 text-xs font-bold ${
                  pkg.featured ? "bg-white text-w2-gray-700" : "bg-white text-w2-gray-700"
                }`}
              >
                {pkg.tag}
              </span>
              <h3 className="mt-6 text-2xl font-bold">{pkg.name}</h3>
              <p className={`mt-3 text-3xl font-bold ${pkg.featured ? "text-w2-gray-100" : "text-w2-gray-700"}`}>
                {pkg.price}
              </p>

              <ul className="mt-6 flex flex-col gap-3">
                {pkg.items.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm leading-6">
                    <Check
                      size={16}
                      className={pkg.featured ? "mt-1 shrink-0 text-w2-gray-100" : "mt-1 shrink-0 text-w2-gray-500"}
                    />
                    <span className="text-w2-gray-500">{item}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => document.getElementById("register")?.scrollIntoView({ behavior: "smooth" })}
                className={`mt-8 w-full rounded-lg px-5 py-3 font-bold transition ${
                  pkg.featured
                    ? "champagne-cta"
                    : "champagne-cta"
                }`}
              >
                จองแพ็คเกจนี้
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
