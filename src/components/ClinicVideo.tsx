"use client";

import { useRef, useState } from "react";
import { Play } from "lucide-react";

export default function ClinicVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const playVideo = async () => {
    try {
      await videoRef.current?.play();
    } catch {
      setIsPlaying(false);
    }
  };

  return (
    <section id="clinic-video" aria-labelledby="clinic-video-heading" className="mx-auto w-full max-w-[360px] scroll-mt-24 rounded-3xl border border-w2-gray-200 bg-white/95 p-2 shadow-xl shadow-w2-gray-700/10 backdrop-blur-sm">
      <div className="relative">
          <video
            ref={videoRef}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onEnded={() => setIsPlaying(false)}
            controls
            playsInline
            preload="none"
            poster="/videos/w2-clinic-poster.jpg"
            width={720}
            height={1280}
            aria-label="วิดีโอแนะนำ W2 Dental Clinic พร้อมคำบรรยายภาษาไทยในภาพ"
            className="block aspect-[9/16] w-full rounded-2xl bg-w2-gray-900 object-contain"
          >
            <source src="/videos/w2-clinic.mp4" type="video/mp4" />
            เบราว์เซอร์ของคุณไม่รองรับวิดีโอ <a href="/videos/w2-clinic.mp4">เปิดคลิปแนะนำคลินิก</a>
          </video>
          {!isPlaying && (
            <button
              type="button"
              onClick={playVideo}
              aria-label="เล่นวิดีโอแนะนำคลินิก"
              className="absolute left-1/2 top-1/2 grid h-20 w-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 border-white/90 bg-black/45 text-white shadow-xl backdrop-blur-sm transition-colors hover:bg-w2-gold-dark focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-w2-gold"
            >
              <Play size={36} fill="currentColor" className="ml-1" aria-hidden="true" />
            </button>
          )}
      </div>
      <div className="px-3 pb-3 pt-4 text-center">
        <h2 id="clinic-video-heading" className="text-base font-bold text-w2-gray-900">ทำความรู้จัก W2 Dental Clinic</h2>
        <div className="gold-title-underline mx-auto mt-3" />
        <p className="mt-3 text-xs leading-5 text-w2-gray-500">กดเล่นเพื่อรับชม · ประมาณ 40 วินาที</p>
      </div>
    </section>
  );
}
