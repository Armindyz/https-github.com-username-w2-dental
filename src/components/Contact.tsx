"use client";

import { useRef } from "react";
import Image from "next/image";
import { useInView } from "framer-motion";
import { Mail, MapPin, Phone, Timer } from "lucide-react";

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const items = [
    {
      icon: MapPin,
      title: "ที่อยู่",
      lines: ["กรุณาใส่ที่อยู่คลินิกจริง", "เพิ่มลิงก์ Google Maps ได้ในส่วนนี้"],
    },
    {
      icon: Phone,
      title: "โทรศัพท์",
      lines: ["062-829-2228"],
      href: "tel:0628292228",
    },
    {
      icon: Timer,
      title: "เวลาทำการ",
      lines: ["จันทร์ - เสาร์: 09:00 - 18:00", "อาทิตย์: 10:00 - 16:00"],
    },
    {
      icon: Mail,
      title: "อีเมล",
      lines: ["W2dentalclinic@gmail.com"],
      href: "mailto:W2dentalclinic@gmail.com",
    },
  ];

  return (
    <section id="contact" className="bg-white px-5 py-20 lg:px-8">
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
          <span className="section-kicker">Contact</span>
          <h2 className="mt-3 text-4xl font-bold text-w2-gray-900">ติดต่อเรา</h2>
          <p className="mt-4 leading-8 text-w2-gray-500">
            รวมข้อมูลติดต่อให้สแกนง่าย พร้อมภาพหน้าคลินิกเพื่อช่วยให้ผู้ป่วยจำสถานที่ได้
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-5">
          <div className="grid gap-4 lg:col-span-2">
            {items.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="silver-card flex items-start gap-4 rounded-lg p-5"
                  style={{
                    opacity: inView ? 1 : 0,
                    transform: inView ? "translateX(0)" : "translateX(-18px)",
                    transition: `opacity 0.5s ease ${index * 70}ms, transform 0.5s ease ${index * 70}ms`,
                  }}
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-white text-w2-gray-700 soft-shadow">
                    <Icon size={20} />
                  </span>
                  <div>
                    <p className="text-sm font-bold text-w2-gray-900">{item.title}</p>
                    {item.lines.map((line, lineIndex) =>
                      item.href && lineIndex === 0 ? (
                        <a key={line} href={item.href} className="mt-1 block text-w2-gray-500 hover:text-w2-gray-900">
                          {line}
                        </a>
                      ) : (
                        <p key={line} className="mt-1 text-w2-gray-500">{line}</p>
                      )
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div
            className="grid gap-4 lg:col-span-3"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "translateX(0)" : "translateX(24px)",
              transition: "opacity 0.7s ease 0.15s, transform 0.7s ease 0.15s",
            }}
          >
            <div className="relative aspect-[16/9] overflow-hidden rounded-lg bg-w2-gray-100 soft-shadow">
              <Image
                src="/clinic/exterior-day.jpg"
                alt="หน้าคลินิก W2 Dental Clinic"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-w2-gray-700/35 to-transparent" />
              <div className="absolute bottom-5 left-5 rounded-lg bg-white/16 px-4 py-2 font-bold text-white backdrop-blur">
                W2 Dental Clinic
              </div>
            </div>
            <div className="silver-card grid min-h-48 place-items-center rounded-lg p-8 text-center">
              <div>
                <p className="font-bold text-w2-gray-900">Google Maps</p>
                <p className="mt-2 text-sm leading-6 text-w2-gray-500">
                  ใส่ iframe Google Maps จริงในกล่องนี้เมื่อมีพิกัดคลินิกพร้อมใช้งาน
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
