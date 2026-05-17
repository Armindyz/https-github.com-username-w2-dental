"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { CalendarCheck, ChevronLeft, ChevronRight, ShieldCheck } from "lucide-react";

const slides = [
  {
    src: "/clinic/reception1.jpg",
    alt: "ห้องต้อนรับ W2 Dental Clinic",
  },
  {
    src: "/clinic/reception3.jpg",
    alt: "บรรยากาศภายในคลินิก",
  },
  {
    src: "/clinic/reception4.jpg",
    alt: "โซนต้อนรับของ W2 Dental Clinic",
  },
  {
    src: "/clinic/exterior-night.jpg",
    alt: "หน้าคลินิกยามค่ำคืน",
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  const goTo = useCallback((index: number) => {
    setCurrent((index + slides.length) % slides.length);
  }, []);

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = () => goTo(current - 1);

  useEffect(() => {
    const timer = window.setInterval(next, 5200);
    return () => window.clearInterval(timer);
  }, [next]);

  const scrollToRegister = () => {
    document.getElementById("register")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section id="home" className="silver-surface relative min-h-[92vh] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.src}
          className={`absolute inset-0 transition-opacity duration-700 ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            priority={index === 0}
            className="object-cover"
            sizes="100vw"
          />
        </div>
      ))}

      <div className="absolute inset-0 hero-vignette" />

      <div className="relative z-10 mx-auto flex min-h-[92vh] max-w-7xl items-center px-5 pb-14 pt-28 lg:px-8">
        <div className="grid w-full gap-10 lg:grid-cols-[1fr_0.72fr] lg:items-end">
          <div className="max-w-3xl">
            <div
              className="hero-logo-panel mb-6 w-full max-w-md overflow-hidden rounded-2xl backdrop-blur-sm"
            >
              <Image
                src="/brand/w2-logo-horizontal.png"
                alt="W2 Dental Clinic logo"
                width={760}
                height={245}
                className="hero-logo-image h-auto w-full object-contain"
                priority
              />
            </div>
            <p className="mb-6 inline-flex rounded-lg border border-w2-gray-200 bg-white/80 px-4 py-2 text-sm font-semibold text-w2-gray-700 backdrop-blur">
              W2 Dental Clinic กำลังเตรียมเปิดให้บริการเร็ว ๆ นี้
            </p>
            <h1 className="max-w-2xl text-4xl font-bold leading-[1.15] text-[#374151] [text-shadow:0_2px_12px_rgba(255,255,255,0.6)] sm:text-5xl lg:text-6xl">
              <span className="block">เตรียมให้บริการ</span>
              <span className="block">เร็วๆนี้</span>
            </h1>
            <div className="gold-title-underline mt-5" />
            <p className="mt-6 max-w-2xl text-base leading-8 text-w2-gray-700 sm:text-lg">
              เตรียมพบกับคลินิกทันตกรรมบรรยากาศอบอุ่น พื้นที่สะอาด เครื่องมือมาตรฐาน และทีมงานที่พร้อมดูแลรอยยิ้มของคุณอย่างใส่ใจ
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={scrollToRegister}
                className="champagne-cta inline-flex items-center justify-center gap-2 rounded-lg px-7 py-4 text-base font-bold transition hover:-translate-y-0.5"
              >
                <CalendarCheck size={20} />
                นัดหมายล่วงหน้า
              </button>
              <button
                onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}
                className="rounded-lg border border-w2-gray-200 bg-white/75 px-7 py-4 text-base font-bold text-w2-gray-700 backdrop-blur transition hover:border-w2-gray-300 hover:bg-white"
              >
                ดูบรรยากาศคลินิก
              </button>
            </div>
          </div>

          <div className="silver-card hidden rounded-lg p-5 text-w2-gray-700 backdrop-blur-md lg:block">
            <div className="logo-silver-panel mb-5 rounded-lg p-5">
              <Image
                src="/brand/w2-logo-icon.png"
                alt="W2 Dental Clinic logo mark"
                width={300}
                height={245}
                className="logo-on-silver mx-auto h-auto w-44 max-w-full object-contain"
              />
            </div>
            <div className="flex items-start gap-3">
              <ShieldCheck className="mt-1 text-w2-gray-500" size={22} />
              <div>
                <p className="font-bold">มาตรฐานที่ไว้ใจได้</p>
                <p className="mt-2 text-sm leading-6 text-w2-gray-500">
                  แจ้งขั้นตอนและค่าใช้จ่ายก่อนเริ่มรักษา พร้อมระบบฆ่าเชื้อและพื้นที่รับรองที่ดูสะอาดสบายตา
                </p>
              </div>
            </div>
            <div className="mt-5 grid grid-cols-3 gap-3 border-t border-w2-gray-200 pt-5 text-center">
              <div>
                <p className="text-2xl font-bold">6+</p>
                <p className="mt-1 text-xs text-white/60">กลุ่มบริการ</p>
              </div>
              <div>
                <p className="text-2xl font-bold">24 ชม.</p>
                <p className="mt-1 text-xs text-white/60">ติดต่อกลับ</p>
              </div>
              <div>
                <p className="text-2xl font-bold">W2</p>
                <p className="mt-1 text-xs text-white/60">Smile Better</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={prev}
        className="absolute left-4 top-1/2 z-20 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-lg border border-w2-gray-200 bg-white/75 text-w2-gray-700 backdrop-blur transition hover:bg-white sm:left-8"
        aria-label="รูปก่อนหน้า"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 z-20 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-lg border border-w2-gray-200 bg-white/75 text-w2-gray-700 backdrop-blur transition hover:bg-white sm:right-8"
        aria-label="รูปถัดไป"
      >
        <ChevronRight size={20} />
      </button>

      <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-2">
        {slides.map((slide, index) => (
          <button
            key={slide.src}
            onClick={() => goTo(index)}
            className={`h-1 rounded-full transition-all ${
              index === current ? "w-10 bg-w2-gray-700" : "w-4 bg-white/70"
            }`}
            aria-label={`ไปยังรูปที่ ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
