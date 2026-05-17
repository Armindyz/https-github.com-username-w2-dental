"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { CalendarCheck, Menu, Phone, X } from "lucide-react";

const navLinks = [
  { label: "หน้าแรก", href: "#home" },
  { label: "บริการ", href: "#services" },
  { label: "แกลเลอรี่", href: "#gallery" },
  { label: "ทีมแพทย์", href: "#doctors" },
  { label: "แพ็คเกจ", href: "#packages" },
  { label: "ติดต่อ", href: "#contact" },
];

const phone = "062-829-2228";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 48);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sections = ["home", "services", "gallery", "doctors", "packages", "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -50% 0px" }
    );
    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const id = href.replace("#", "");
    const element = document.getElementById(id);
    if (!element) return;
    const top = element.getBoundingClientRect().top + window.scrollY - 76;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "border-b border-w2-gray-100 bg-white/95 shadow-sm backdrop-blur-xl"
            : "bg-white/86 backdrop-blur-md"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-2 overflow-hidden px-3 sm:h-[72px] sm:px-5 lg:h-20 lg:gap-3 lg:px-6 xl:px-8">
          <button
            onClick={() => handleNavClick("#home")}
            className="flex min-w-0 max-w-[58vw] shrink items-center gap-2 lg:max-w-none lg:gap-2.5"
            aria-label="W2 Dental Clinic"
          >
            <span className="grid h-11 w-11 shrink-0 place-items-center sm:h-12 sm:w-12 lg:h-14 lg:w-14">
              <Image
                src="/brand/w2-logo-circle-v2.png"
                alt="W2 Dental Clinic logo"
                width={96}
                height={96}
                className="h-full w-full object-contain"
                priority
              />
            </span>
            <span className="hidden min-w-0 flex-col gap-0.5 md:flex">
              <span className="truncate text-[14px] font-bold tracking-[0.14em] text-w2-gray-900 lg:text-[16px] xl:text-[18px]">
                W2 DENTAL CLINIC
              </span>
              <span className="h-px w-full bg-gradient-to-r from-w2-gray-300 via-w2-gray-200 to-transparent" />
              <span className="hidden whitespace-nowrap text-[11px] font-semibold tracking-[0.12em] text-w2-gray-400 xl:block xl:text-[12px] xl:tracking-[0.18em]">
                คลินิกทันตกรรม ดับเบิ้ลยูทู
              </span>
            </span>
          </button>

          <nav className="hidden items-center gap-0.5 2xl:flex 2xl:gap-1">
            {navLinks.map((link) => {
              const id = link.href.replace("#", "");
              const isActive = activeSection === id;
              return (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className={`rounded-lg px-2.5 py-2 text-sm font-semibold transition 2xl:px-4 2xl:text-base ${
                    isActive
                      ? "bg-w2-mist text-w2-gray-900"
                      : "text-w2-gray-500 hover:bg-w2-gray-50 hover:text-w2-gray-900"
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          <div className="flex shrink-0 items-center gap-1.5 lg:gap-2">
            <a
              href="tel:0628292228"
              className="hidden items-center gap-1.5 whitespace-nowrap rounded-lg border border-[rgba(184,192,202,0.6)] bg-[linear-gradient(135deg,#f3f5f7_0%,#dfe4ea_100%)] px-2.5 py-1.5 text-xs font-semibold text-w2-gray-700 shadow-sm shadow-w2-gray-200 transition hover:-translate-y-0.5 hover:border-[rgba(184,192,202,0.9)] hover:shadow-md md:flex lg:px-3 lg:text-sm"
            >
              <Phone size={14} />
              {phone}
            </a>
            <a
              href="https://lin.ee/qniu2YG"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden h-9 w-9 place-items-center rounded-lg border border-[#06C755]/20 bg-[#E8FFF1] text-xs font-extrabold tracking-wide text-[#079544] transition hover:-translate-y-0.5 xl:grid"
              aria-label="LINE"
            >
              LINE
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=61589777105351"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden h-9 w-9 place-items-center rounded-lg border border-[#1877F2]/18 bg-[#EAF3FF] text-xs font-extrabold tracking-wide text-[#2265C7] transition hover:-translate-y-0.5 xl:grid"
              aria-label="Facebook"
            >
              FB
            </a>
            <a
              href="https://www.instagram.com/w2dentalclinic/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden h-9 w-9 place-items-center rounded-lg border border-[#DD2A7B]/16 bg-[linear-gradient(135deg,#FFF2E8_0%,#FFE8F1_42%,#F1E8FF_72%,#E9ECFF_100%)] text-xs font-extrabold tracking-wide text-[#B22B74] transition hover:-translate-y-0.5 xl:grid"
              aria-label="Instagram"
            >
              IG
            </a>
            <button
              onClick={() => handleNavClick("#register")}
              className="champagne-cta hidden items-center gap-2 whitespace-nowrap rounded-lg px-3 py-2 text-sm font-bold transition md:flex lg:px-4 lg:text-base"
            >
              <CalendarCheck size={16} />
              นัดหมาย
            </button>
            <button
              onClick={() => setMenuOpen((value) => !value)}
              className="rounded-lg border border-w2-gray-100 p-2 text-w2-gray-700 transition hover:bg-w2-gray-50 2xl:hidden"
              aria-label="เปิดเมนู"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-40 bg-white transition 2xl:hidden ${
          menuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <nav className="flex flex-col gap-2 px-5 pb-8 pt-24 sm:px-6 sm:pt-28">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className="border-b border-w2-gray-100 py-4 text-left text-2xl font-semibold text-w2-gray-900"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => handleNavClick("#register")}
            className="champagne-cta mt-6 rounded-lg px-5 py-4 text-base font-bold"
          >
            นัดหมายออนไลน์
          </button>
          <a
            href="tel:0628292228"
            className="flex justify-center gap-2 rounded-lg border border-w2-gray-100 px-5 py-4 font-semibold text-w2-gray-700"
          >
            <Phone size={18} />
            {phone}
          </a>
        </nav>
      </div>
    </>
  );
}
