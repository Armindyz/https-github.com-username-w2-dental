import { ArrowUpRight, CalendarCheck } from "lucide-react";

export default function ClinicVideo() {
  return (
    <section id="clinic-video" aria-labelledby="clinic-video-heading" className="silver-surface scroll-mt-24 px-5 py-16 lg:px-8 lg:py-20">
      <div className="mx-auto grid max-w-5xl items-center gap-9 md:grid-cols-[minmax(0,360px)_1fr] md:gap-16">
        <div className="mx-auto w-full max-w-[360px] rounded-3xl border border-w2-gray-200 bg-white p-2 shadow-xl shadow-w2-gray-700/10">
          <video
            controls
            playsInline
            preload="none"
            poster="/videos/w2-clinic-poster.jpg"
            width={720}
            height={1280}
            aria-label="วิดีโอแนะนำ W2 Dental Clinic พร้อมคำบรรยายภาษาไทยในภาพ"
            className="aspect-[9/16] w-full rounded-2xl bg-w2-gray-900 object-contain"
          >
            <source src="/videos/w2-clinic.mp4" type="video/mp4" />
            เบราว์เซอร์ของคุณไม่รองรับวิดีโอ <a href="/videos/w2-clinic.mp4">เปิดคลิปแนะนำคลินิก</a>
          </video>
        </div>
        <div className="max-w-lg">
          <p className="section-kicker">Get to know W2</p>
          <h2 id="clinic-video-heading" className="mt-3 text-3xl font-bold leading-snug text-w2-gray-900 sm:text-4xl">
            ทำความรู้จัก<br />W2 Dental Clinic
          </h2>
          <div className="gold-title-underline mt-5" />
          <p className="mt-7 text-base leading-8 text-w2-gray-700">
            พบกับเรื่องราวจาก W2 Dental Clinic และความตั้งใจในการดูแลสุขภาพช่องปากและรอยยิ้มของคุณ ผ่านคลิปสั้น ๆ จากเรา
          </p>
          <p className="mt-4 text-sm leading-6 text-w2-gray-500">กดเล่นเพื่อรับชม · ประมาณ 40 วินาที · มีคำบรรยายภาษาไทย</p>
          <div className="mt-8 flex flex-col gap-3 sm:items-start">
            <a href="#register" className="champagne-cta inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-7 py-3 font-bold">
              <CalendarCheck size={20} aria-hidden="true" />นัดหมายล่วงหน้า
            </a>
            <a href="https://lin.ee/qniu2YG" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-[#8a6828] hover:underline focus-visible:outline-2 focus-visible:outline-offset-2">
              พูดคุยกับเราผ่าน LINE<ArrowUpRight size={18} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
