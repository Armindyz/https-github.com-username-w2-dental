"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import { GraduationCap } from "lucide-react";

const doctors = [
  {
    specialty: "ทันตกรรมทั่วไปและจัดฟัน",
    edu: "ทันตแพทยศาสตรบัณฑิต",
  },
  {
    specialty: "รากฟันเทียมและศัลยกรรมช่องปาก",
    edu: "ทันตแพทยศาสตรบัณฑิต",
  },
  {
    specialty: "ทันตกรรมความงาม วีเนียร์ และครอบฟัน",
    edu: "ทันตแพทยศาสตรบัณฑิต",
  },
];

export default function Doctors() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="doctors" className="silver-surface px-5 py-20 lg:px-8">
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
          <span className="section-kicker">Our Team</span>
          <h2 className="mt-3 text-4xl font-bold text-w2-gray-900">ทีมทันตแพทย์</h2>
          <p className="mt-4 leading-8 text-w2-gray-500">
            ส่วนนี้รองรับการใส่รายชื่อจริง ตารางออกตรวจ และความเชี่ยวชาญเฉพาะทางของแพทย์แต่ละท่าน
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {doctors.map((doctor, index) => (
            <article
              key={`${doctor.specialty}-${index}`}
              className="silver-card overflow-hidden rounded-lg transition duration-300 hover:-translate-y-1"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(24px)",
                transition: `opacity 0.5s ease ${index * 90}ms, transform 0.5s ease ${index * 90}ms`,
              }}
            >
              <div className="grid aspect-[4/3] place-items-center bg-gradient-to-br from-w2-mist to-white">
                <div className="text-center">
                  <div className="mx-auto grid h-20 w-20 place-items-center rounded-lg bg-white text-2xl font-bold text-w2-gray-700 soft-shadow">
                    DR
                  </div>
                  <p className="mt-3 text-xs font-bold uppercase tracking-[0.18em] text-w2-gray-300">
                    W2 Dental
                  </p>
                </div>
              </div>

              <div className="p-6">
                <p className="text-w2-gray-500">{doctor.specialty}</p>
                <div className="mt-4 flex items-center gap-2 text-sm text-w2-gray-400">
                  <GraduationCap size={16} />
                  <span>{doctor.edu}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
