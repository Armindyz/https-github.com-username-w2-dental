"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useInView } from "framer-motion";
import { X, ZoomIn } from "lucide-react";

const photos = [
  { src: "/clinic/reception1.jpg", alt: "ห้องต้อนรับ Smile Better", span: "lg:col-span-2" },
  { src: "/clinic/exterior-night.jpg", alt: "หน้าคลินิกยามค่ำคืน", span: "" },
  { src: "/clinic/treatment1.jpg", alt: "ห้องทำฟัน Unit 1", span: "" },
  { src: "/clinic/treatment2.jpg", alt: "ห้องทำฟัน Unit 2", span: "" },
  { src: "/clinic/reception2.jpg", alt: "พื้นที่รับรองคนไข้", span: "" },
  { src: "/clinic/exterior-day.jpg", alt: "หน้าคลินิกช่วงกลางวัน", span: "lg:col-span-2" },
];

export default function Gallery() {
  const [lightbox, setLightbox] = useState<string | null>(null);
  const titleRef = useRef(null);
  const inView = useInView(titleRef, { once: true, margin: "-60px" });

  return (
    <>
      <section id="gallery" className="bg-white px-5 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div
            ref={titleRef}
            className="mb-12 grid gap-6 lg:grid-cols-[0.8fr_1fr] lg:items-end"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.6s ease, transform 0.6s ease",
            }}
          >
            <div>
              <span className="section-kicker">Our Clinic</span>
              <h2 className="mt-3 text-4xl font-bold text-w2-gray-900">
                แกลเลอรี่บรรยากาศคลินิก
              </h2>
            </div>
            <p className="max-w-2xl leading-8 text-w2-gray-500">
              ใช้รูปจริงเป็นจุดเด่นของหน้าเว็บ ช่วยให้ผู้ป่วยเห็นความสะอาด ความสว่าง และความเป็นมืออาชีพก่อนเข้ารับบริการ
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {photos.map((photo, index) => (
              <button
                key={photo.src}
                className={`group relative aspect-[4/3] overflow-hidden rounded-lg bg-w2-gray-100 text-left ${photo.span}`}
                style={{
                  opacity: inView ? 1 : 0,
                  transform: inView ? "scale(1)" : "scale(0.97)",
                  transition: `opacity 0.5s ease ${index * 70}ms, transform 0.5s ease ${index * 70}ms`,
                }}
                onClick={() => setLightbox(photo.src)}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-w2-gray-700/45 via-transparent to-transparent opacity-90" />
                <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between gap-3 p-5">
                  <p className="font-semibold text-white">{photo.alt}</p>
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-white/14 text-white backdrop-blur transition group-hover:bg-white/24">
                    <ZoomIn size={19} />
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {lightbox && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-w2-gray-700/92 p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute right-6 top-6 rounded-lg bg-white/10 p-3 text-white/70 transition hover:text-white"
            onClick={() => setLightbox(null)}
            aria-label="ปิดรูป"
          >
            <X size={26} />
          </button>
          <div className="relative aspect-[16/10] w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <Image src={lightbox} alt="ภาพคลินิก W2 Dental Clinic" fill className="object-contain" sizes="100vw" />
          </div>
        </div>
      )}
    </>
  );
}
