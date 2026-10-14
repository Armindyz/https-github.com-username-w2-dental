export default function ClinicVideo() {
  return (
    <section id="clinic-video" aria-labelledby="clinic-video-heading" className="mx-auto w-full max-w-[360px] scroll-mt-24 rounded-3xl border border-w2-gray-200 bg-white/95 p-2 shadow-xl shadow-w2-gray-700/10 backdrop-blur-sm">
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
      <div className="px-3 pb-3 pt-4 text-center">
        <h2 id="clinic-video-heading" className="text-base font-bold text-w2-gray-900">ทำความรู้จัก W2 Dental Clinic</h2>
        <div className="gold-title-underline mx-auto mt-3" />
        <p className="mt-3 text-xs leading-5 text-w2-gray-500">กดเล่นเพื่อรับชม · ประมาณ 40 วินาที</p>
      </div>
    </section>
  );
}