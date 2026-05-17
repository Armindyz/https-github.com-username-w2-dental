"use client";

import { useEffect, useState } from "react";
import { ChevronUp, Phone } from "lucide-react";

export default function FloatingButtons() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowTop(window.scrollY > 420);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div className="fixed bottom-5 left-5 z-[100] hidden flex-col gap-3 sm:flex">
        <a
          href="tel:0628292228"
          className="grid h-12 w-12 place-items-center rounded-lg bg-w2-charcoal text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-w2-gray-700"
          aria-label="โทรหาเรา"
        >
          <Phone size={19} />
        </a>
        <a
          href="https://lin.ee/qniu2YG"
          target="_blank"
          rel="noopener noreferrer"
          className="grid h-12 w-12 place-items-center rounded-lg border border-[#06C755]/20 bg-[#E8FFF1] text-[10px] font-extrabold tracking-wide text-[#079544] shadow-lg shadow-[#06C755]/10 transition hover:-translate-y-0.5 hover:bg-[#D8FBE6]"
          aria-label="LINE"
        >
          LINE
        </a>
        <a
          href="https://www.facebook.com/profile.php?id=61589777105351"
          target="_blank"
          rel="noopener noreferrer"
          className="grid h-12 w-12 place-items-center rounded-lg border border-[#1877F2]/18 bg-[#EAF3FF] text-[10px] font-extrabold tracking-wide text-[#2265C7] shadow-lg shadow-[#1877F2]/10 transition hover:-translate-y-0.5 hover:bg-[#DDEBFF]"
          aria-label="Facebook"
        >
          FB
        </a>
        <a
          href="https://www.instagram.com/w2dentalclinic/"
          target="_blank"
          rel="noopener noreferrer"
          className="grid h-12 w-12 place-items-center rounded-lg border border-[#DD2A7B]/16 bg-[linear-gradient(135deg,#FFF2E8_0%,#FFE8F1_42%,#F1E8FF_72%,#E9ECFF_100%)] text-[10px] font-extrabold tracking-wide text-[#B22B74] shadow-lg shadow-[#DD2A7B]/10 transition hover:-translate-y-0.5"
          aria-label="Instagram"
        >
          IG
        </a>
      </div>

      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`fixed bottom-5 right-5 z-[100] grid h-12 w-12 place-items-center rounded-lg border border-w2-gray-100 bg-white text-w2-gray-500 shadow-lg transition duration-300 hover:text-w2-gray-900 ${
          showTop ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
        }`}
        aria-label="กลับด้านบน"
      >
        <ChevronUp size={19} />
      </button>

      <div className="fixed inset-x-0 bottom-0 z-[100] grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)_2.5rem_2.5rem_2.5rem] gap-1.5 border-t border-w2-gray-100 bg-white p-2 shadow-[0_-12px_32px_rgba(16,35,35,0.12)] sm:hidden">
        <a
          href="tel:0628292228"
          className="rounded-lg bg-w2-charcoal px-2 py-2.5 text-center text-xs font-bold text-white"
        >
          โทรเลย
        </a>
        <a
          href="#register"
          className="champagne-cta rounded-lg px-2 py-2.5 text-center text-xs font-bold"
        >
          นัดหมาย
        </a>
        <a
          href="https://lin.ee/qniu2YG"
          target="_blank"
          rel="noopener noreferrer"
          className="grid h-10 w-10 place-items-center rounded-lg border border-[#06C755]/20 bg-[#E8FFF1] text-[10px] font-extrabold tracking-wide text-[#079544]"
          aria-label="LINE"
        >
          LINE
        </a>
        <a
          href="https://www.facebook.com/profile.php?id=61589777105351"
          target="_blank"
          rel="noopener noreferrer"
          className="grid h-10 w-10 place-items-center rounded-lg border border-[#1877F2]/18 bg-[#EAF3FF] text-[10px] font-extrabold tracking-wide text-[#2265C7]"
          aria-label="Facebook"
        >
          FB
        </a>
        <a
          href="https://www.instagram.com/w2dentalclinic/"
          target="_blank"
          rel="noopener noreferrer"
          className="grid h-10 w-10 place-items-center rounded-lg border border-[#DD2A7B]/16 bg-[linear-gradient(135deg,#FFF2E8_0%,#FFE8F1_42%,#F1E8FF_72%,#E9ECFF_100%)] text-[10px] font-extrabold tracking-wide text-[#B22B74]"
          aria-label="Instagram"
        >
          IG
        </a>
      </div>
    </>
  );
}
