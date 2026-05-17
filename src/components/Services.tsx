"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import { Gem, Smile, Sparkles, Stethoscope, Syringe } from "lucide-react";

const services = [
  {
    icon: Stethoscope,
    title: "ทันตกรรมทั่วไป",
    desc: "ตรวจสุขภาพฟัน ขูดหินปูน อุดฟัน ถอนฟัน และดูแลปัญหาช่องปากพื้นฐาน",
  },
  {
    icon: Sparkles,
    title: "จัดฟัน",
    desc: "ประเมินฟันซ้อน ฟันห่าง และการสบฟัน พร้อมวางแผนรักษาเป็นขั้นตอน",
  },
  {
    icon: Sparkles,
    title: "ฟอกสีฟัน",
    desc: "เพิ่มความสว่างให้รอยยิ้มอย่างเหมาะสมกับสีฟันและไลฟ์สไตล์ของคุณ",
  },
  {
    icon: Syringe,
    title: "รากฟันเทียม",
    desc: "ประเมินและวางแผนทดแทนฟันที่สูญเสีย เพื่อการใช้งานที่มั่นคงขึ้น",
  },
  {
    icon: Gem,
    title: "วีเนียร์และครอบฟัน",
    desc: "ปรับรูปฟัน สีฟัน และบูรณะฟันให้ดูสวยเป็นธรรมชาติ",
  },
  {
    icon: Smile,
    title: "ทำฟันปลอม",
    desc: "ฟันปลอมทั้งชนิดถอดได้และติดแน่น คืนรอยยิ้มและการบดเคี้ยวที่สมบูรณ์",
  },
];

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const Icon = service.icon;

  return (
    <article
      ref={ref}
      className="silver-card group rounded-lg p-7 transition duration-300 hover:-translate-y-1 hover:border-w2-gray-300"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.5s ease ${index * 70}ms, transform 0.5s ease ${index * 70}ms, border-color 0.3s ease`,
      }}
    >
      <div className="grid h-12 w-12 place-items-center rounded-lg bg-w2-mist text-w2-teal transition group-hover:bg-w2-teal group-hover:text-white">
        <Icon size={23} />
      </div>
      <h3 className="mt-6 text-xl font-bold text-w2-gray-900">{service.title}</h3>
      <p className="mt-3 leading-7 text-w2-gray-500">{service.desc}</p>
      <button
        onClick={() => document.getElementById("register")?.scrollIntoView({ behavior: "smooth" })}
        className="mt-6 text-sm font-bold text-w2-teal-dark transition hover:text-w2-gray-900"
      >
        นัดหมายบริการนี้ →
      </button>
    </article>
  );
}

export default function Services() {
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-60px" });

  return (
    <section id="services" className="silver-surface px-5 py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div
          ref={titleRef}
          className="mx-auto mb-12 max-w-3xl text-center"
          style={{
            opacity: titleInView ? 1 : 0,
            transform: titleInView ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          <span className="section-kicker">Our Services</span>
          <h2 className="mt-3 text-4xl font-bold text-w2-gray-900">
            บริการทันตกรรมครบวงจร
          </h2>
          <p className="mt-4 leading-8 text-w2-gray-500">
            จัดหมวดบริการให้คนไข้เลือกง่าย อ่านเร็ว และเห็นเส้นทางการนัดหมายชัดเจน
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
