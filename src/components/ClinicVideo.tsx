"use client";

import { useRef, useState } from "react";
import { Pause, Play } from "lucide-react";

export default function ClinicVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const playVideo = async () => {
    const video = videoRef.current;
    if (!video) return;
    if (!video.paused) {
      video.pause();
      return;
    }
    try {
      video.volume = 1;
      video.muted = false;
      await video.play();
    } catch {
      setIsPlaying(false);
    }
  };

  return (
    <section id="clinic-video" aria-labelledby="clinic-video-heading" className="mx-auto w-full max-w-[400px] scroll-mt-24 rounded-3xl border border-w2-gray-200 bg-white/95 p-2 shadow-xl shadow-w2-gray-700/10 backdrop-blur-sm">
      <div className="relative">
          <video
            ref={videoRef}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onEnded={() => setIsPlaying(false)}
            playsInline
            disablePictureInPicture
            preload="none"
            poster="/videos/w2-clinic-poster-09s.jpg"
            width={720}
            height={1280}
            aria-label="วิดีโอแนะนำ W2 Dental Clinic พร้อมคำบรรยายภาษาไทยในภาพ"
            className="block aspect-[9/16] w-full rounded-2xl bg-w2-gray-900 object-contain"
          >
            <source src="/videos/w2-clinic.mp4" type="video/mp4" />
            เบราว์เซอร์ของคุณไม่รองรับวิดีโอ <a href="/videos/w2-clinic.mp4">เปิดคลิปแนะนำคลินิก</a>
          </video>
            <button
              type="button"
              onClick={playVideo}
              aria-label={isPlaying ? "หยุดพักวิดีโอแนะนำคลินิก" : "เล่นวิดีโอแนะนำคลินิก"}
              className="group absolute inset-0 grid w-full cursor-pointer place-items-center rounded-2xl focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-w2-gold"
            >
              <span className={`grid h-20 w-20 place-items-center rounded-full border-2 border-white/90 bg-black/45 text-white shadow-xl backdrop-blur-sm transition-opacity ${isPlaying ? "opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100" : "opacity-100"}`}>
                {isPlaying ? <Pause size={36} fill="currentColor" aria-hidden="true" /> : <Play size={36} fill="currentColor" className="ml-1" aria-hidden="true" />}
              </span>
            </button>
      </div>
      <div className="px-3 pb-3 pt-4 text-center">
        <h2 id="clinic-video-heading" className="text-base font-bold text-w2-gray-900">ทำความรู้จัก W2 Dental Clinic</h2>
        <div className="gold-title-underline mx-auto mt-3" />
        <p className="mt-3 text-xs leading-5 text-w2-gray-500">กดเล่นเพื่อรับชม · ประมาณ 40 วินาที</p>
      </div>
    </section>
  );
}
