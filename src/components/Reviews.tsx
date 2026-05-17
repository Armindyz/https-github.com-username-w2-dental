"use client";

import { useRef, useState, useCallback } from "react";
import { useInView } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

const reviews = [
  {
    name: "คุณสมหญิง ใจดี",
    role: "คนไข้จัดฟัน",
    text: "บรรยากาศคลินิกสะอาด อบอุ่น คุณหมอและทีมงานใส่ใจมาก อธิบายขั้นตอนชัดเจน ไม่รู้สึกกังวลเลยค่ะ",
    rating: 5,
  },
  {
    name: "คุณวิชัย มานะ",
    role: "คนไข้ฟอกสีฟัน",
    text: "ผลลัพธ์เกินคาด สีฟันขาวขึ้นชัดเจนมาก ราคาสมเหตุสมผล และทีมงานบริการดีมาก จะแนะนำเพื่อนแน่นอนครับ",
    rating: 5,
  },
  {
    name: "คุณพรทิพย์ สุขใจ",
    role: "คนไข้รากฟันเทียม",
    text: "มาทำรากฟันเทียม คุณหมอมืออาชีพมาก เจ็บน้อยกว่าที่คิด หายเร็ว และผลลัพธ์สวยงามมากเลยค่ะ",
    rating: 5,
  },
  {
    name: "คุณอนุชา ลือชา",
    role: "คนไข้ขูดหินปูน",
    text: "มาขูดหินปูนเป็นประจำ ทีมงานทำงานละเอียด ไม่เจ็บ และคลินิกสะอาดมากครับ ประทับใจทุกครั้ง",
    rating: 5,
  },
  {
    name: "คุณนภา รุ่งเรือง",
    role: "คนไข้วีเนียร์",
    text: "ทำวีเนียร์ที่นี่ค่ะ คุณหมอออกแบบฟันให้สวยมาก เข้ากับใบหน้าดี ยิ้มได้อย่างมั่นใจขึ้นมากเลย",
    rating: 5,
  },
  {
    name: "คุณธนากร ศรีสุข",
    role: "คนไข้ครอบฟัน",
    text: "บริการดีเยี่ยม คุณหมออธิบายทุกขั้นตอนอย่างละเอียด ทำให้ไม่กังวล และผลงานออกมาสวยมากครับ",
    rating: 5,
  },
  {
    name: "คุณมาลี สวัสดี",
    role: "คนไข้ทำฟันปลอม",
    text: "ทำฟันปลอมที่นี่ค่ะ คุณหมอเลือกสีและขนาดให้เข้ากับฟันธรรมชาติได้สวยมาก ใส่สบาย ไม่รู้สึกอึดอัดเลย",
    rating: 5,
  },
  {
    name: "คุณประสิทธิ์ ดีงาม",
    role: "คนไข้อุดฟัน",
    text: "มาอุดฟันฉุกเฉิน คลินิกรับนัดได้เร็วมาก คุณหมอทำงานรวดเร็วและเบามือ แทบไม่รู้สึกเจ็บเลยครับ",
    rating: 5,
  },
  {
    name: "คุณรัตนา ใสสะอาด",
    role: "คนไข้ถอนฟัน",
    text: "กลัวหมอฟันมาตลอด แต่ที่นี่ทำให้รู้สึกสบายใจมากค่ะ คุณหมอพูดคุยดี อธิบายทุกขั้นตอน ไม่เจ็บเลย",
    rating: 5,
  },
  {
    name: "คุณสุภาพร มีสุข",
    role: "คนไข้ Smile Design",
    text: "ทำ Smile Design ที่นี่ค่ะ คุณหมอออกแบบรอยยิ้มได้สวยมาก ดูเป็นธรรมชาติ เพื่อนๆ ทักกันทุกคนเลย",
    rating: 5,
  },
  {
    name: "คุณกิตติ พงษ์ดี",
    role: "คนไข้จัดฟันใส",
    text: "จัดฟันใสที่นี่ครับ คุณหมอติดตามผลสม่ำเสมอ ฟันเปลี่ยนไปมากในระยะเวลาไม่นาน ประทับใจมาก",
    rating: 5,
  },
  {
    name: "คุณอรุณี แสงทอง",
    role: "คนไข้รักษารากฟัน",
    text: "ต้องรักษารากฟัน กังวลมากตอนแรกค่ะ แต่คุณหมออธิบายทุกอย่างชัดเจน ไม่เจ็บอย่างที่กลัว ขอบคุณมากเลย",
    rating: 5,
  },
  {
    name: "คุณเพชร วงษ์สวาท",
    role: "คนไข้เคลือบฟลูออไรด์",
    text: "พาลูกมาเคลือบฟลูออไรด์ครับ คลินิกบรรยากาศดีมาก ลูกไม่กลัวเลย คุณหมอใจเย็น พูดคุยกับเด็กเก่งมาก",
    rating: 5,
  },
  {
    name: "คุณลดาวัลย์ สุขสม",
    role: "คนไข้ Botox ริ้วรอย",
    text: "มาทำ Botox ลดริ้วรอยค่ะ คุณหมอมือเบามาก ผลลัพธ์เป็นธรรมชาติ ดูอ่อนเยาว์ขึ้นแต่ไม่ดูแปลก ปลอดภัยมาก",
    rating: 5,
  },
  {
    name: "คุณนิรันดร์ ชัยชนะ",
    role: "คนไข้ตรวจฟันประจำปี",
    text: "มาตรวจฟันทุกปีที่นี่ครับ คุณหมอละเอียด แนะนำการดูแลฟันได้ดีมาก ทำให้รู้ว่าควรปรับพฤติกรรมตรงไหน",
    rating: 5,
  },
];

function StarRating({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={size} className={i < rating ? "fill-[#D4A843] text-[#D4A843]" : "text-w2-gray-200"} />
      ))}
    </div>
  );
}

function ReviewCard({ review }: { review: typeof reviews[0] }) {
  return (
    <div className="silver-card flex h-full flex-col gap-4 rounded-xl p-6">
      <StarRating rating={review.rating} />
      <p className="flex-1 text-sm leading-7 text-w2-gray-500">"{review.text}"</p>
      <div className="flex items-center gap-3 border-t border-w2-gray-100 pt-4">
        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-to-br from-w2-gray-100 to-w2-gray-200 text-sm font-bold text-w2-gray-500">
          {review.name.charAt(2)}
        </div>
        <div>
          <p className="text-sm font-bold text-w2-gray-900">{review.name}</p>
          <p className="text-xs text-w2-gray-400">{review.role}</p>
        </div>
      </div>
    </div>
  );
}

function useCarousel(total: number, perPage: number) {
  const [current, setCurrent] = useState(0);
  const pages = Math.ceil(total / perPage);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + pages) % pages), [pages]);
  const next = useCallback(() => setCurrent((c) => (c + 1) % pages), [pages]);
  return { current, setCurrent, pages, prev, next };
}

export default function Reviews() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const mobile = useCarousel(reviews.length, 1);
  const desktop = useCarousel(reviews.length, 3);

  const touchStartX = useRef<number | null>(null);
  const makeTouchHandlers = (prev: () => void, next: () => void) => ({
    onTouchStart: (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; },
    onTouchEnd: (e: React.TouchEvent) => {
      if (touchStartX.current === null) return;
      const diff = touchStartX.current - e.changedTouches[0].clientX;
      if (diff > 40) next();
      else if (diff < -40) prev();
      touchStartX.current = null;
    },
  });

  return (
    <section id="reviews" className="bg-w2-off px-5 py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div
          ref={ref}
          className="mx-auto mb-12 max-w-2xl text-center"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          <span className="section-kicker">Reviews</span>
          <h2 className="mt-3 text-4xl font-bold text-w2-gray-900">เสียงจากคนไข้ของเรา</h2>
          <p className="mt-4 leading-8 text-w2-gray-500">
            ความประทับใจจากคนไข้ที่ไว้วางใจให้เราดูแลรอยยิ้ม
          </p>
          <div className="mt-4 flex items-center justify-center gap-2">
            <StarRating rating={5} size={18} />
            <span className="text-sm font-bold text-w2-gray-700">5.0</span>
            <span className="text-sm text-w2-gray-400">· รีวิวจากคนไข้จริง</span>
          </div>
        </div>

        {/* Desktop carousel — 3 การ์ดต่อหน้า */}
        <div className="hidden sm:block">
          <div className="relative">
            <div className="overflow-hidden" {...makeTouchHandlers(desktop.prev, desktop.next)}>
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${desktop.current * 100}%)` }}
              >
                {Array.from({ length: desktop.pages }).map((_, pageIdx) => (
                  <div key={pageIdx} className="grid w-full shrink-0 grid-cols-3 gap-5 px-1">
                    {reviews.slice(pageIdx * 3, pageIdx * 3 + 3).map((review) => (
                      <ReviewCard key={review.name} review={review} />
                    ))}
                  </div>
                ))}
              </div>
            </div>
            <button
              onClick={desktop.prev}
              className="absolute -left-5 top-1/2 -translate-y-1/2 grid h-9 w-9 place-items-center rounded-full border border-w2-gray-200 bg-white shadow-md transition hover:bg-w2-gray-50"
            >
              <ChevronLeft size={18} className="text-w2-gray-500" />
            </button>
            <button
              onClick={desktop.next}
              className="absolute -right-5 top-1/2 -translate-y-1/2 grid h-9 w-9 place-items-center rounded-full border border-w2-gray-200 bg-white shadow-md transition hover:bg-w2-gray-50"
            >
              <ChevronRight size={18} className="text-w2-gray-500" />
            </button>
            <div className="mt-6 flex justify-center gap-2">
              {Array.from({ length: desktop.pages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => desktop.setCurrent(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${i === desktop.current ? "w-6 bg-[#D4A843]" : "w-2 bg-w2-gray-300"}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Mobile carousel — 1 การ์ดต่อหน้า */}
        <div className="px-4 sm:hidden">
          <div className="relative">
            <div className="overflow-hidden" {...makeTouchHandlers(mobile.prev, mobile.next)}>
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${mobile.current * 100}%)` }}
              >
                {reviews.map((review) => (
                  <div key={review.name} className="w-full shrink-0 px-1">
                    <ReviewCard review={review} />
                  </div>
                ))}
              </div>
            </div>
            <button onClick={mobile.prev} className="absolute -left-4 top-1/2 -translate-y-1/2 grid h-9 w-9 place-items-center rounded-full border border-w2-gray-200 bg-white shadow-md transition hover:bg-w2-gray-50">
              <ChevronLeft size={18} className="text-w2-gray-500" />
            </button>
            <button onClick={mobile.next} className="absolute -right-4 top-1/2 -translate-y-1/2 grid h-9 w-9 place-items-center rounded-full border border-w2-gray-200 bg-white shadow-md transition hover:bg-w2-gray-50">
              <ChevronRight size={18} className="text-w2-gray-500" />
            </button>
            <div className="mt-6 flex justify-center gap-2">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => mobile.setCurrent(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${i === mobile.current ? "w-6 bg-[#D4A843]" : "w-2 bg-w2-gray-300"}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
