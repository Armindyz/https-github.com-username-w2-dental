"use client";

import Image from "next/image";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-w2-gray-200 bg-w2-gray-100 text-w2-gray-500">
      <div className="absolute inset-0 diamond-bg opacity-70" />
      <div className="relative z-10 mx-auto max-w-7xl px-5 py-14 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <div className="logo-silver-panel mb-5 w-full max-w-md rounded-lg px-5 py-4">
              <Image
                src="/brand/w2-logo-horizontal.png"
                alt="W2 Dental Clinic logo"
                width={760}
                height={245}
                className="logo-on-silver h-auto w-full object-contain"
              />
            </div>
            <p className="max-w-sm leading-7">
              คลินิกทันตกรรมที่ดูแลรอยยิ้มด้วยบรรยากาศอบอุ่น ระบบนัดหมายสะดวก และบริการที่อธิบายชัดเจน
            </p>
            <div className="mt-6 flex gap-3">
              {[
                { label: "FB", href: "https://www.facebook.com/profile.php?id=61589777105351" },
                { label: "IG", href: "https://www.instagram.com/w2dentalclinic/" },
                { label: "LINE", href: "https://lin.ee/qniu2YG" },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="grid h-10 min-w-10 place-items-center rounded-lg border border-w2-gray-200 bg-white px-3 text-xs font-bold text-w2-gray-500 transition hover:border-w2-gray-300 hover:text-w2-gray-900"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-4 text-sm font-bold text-w2-gray-900">บริการ</p>
            <ul className="grid gap-2">
              {["ทันตกรรมทั่วไป", "จัดฟัน", "ฟอกสีฟัน", "รากฟันเทียม", "วีเนียร์"].map((service) => (
                <li key={service}>
                  <button
                    onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}
                    className="text-sm transition hover:text-w2-gray-900"
                  >
                    {service}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-4 text-sm font-bold text-w2-gray-900">เวลาทำการ</p>
            <div className="grid gap-2 text-sm">
              <p>จันทร์ - เสาร์: 09:00 - 18:00</p>
              <p>อาทิตย์: 10:00 - 16:00</p>
              <div className="mt-4 border-t border-w2-gray-200 pt-4">
                <a href="tel:0628292228" className="block transition hover:text-w2-gray-900">
                  062-829-2228
                </a>
                <a href="mailto:W2dentalclinic@gmail.com" className="mt-1 block transition hover:text-w2-gray-900">
                  W2dentalclinic@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-w2-gray-200 pt-6 text-xs text-w2-gray-400 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {year} W2 Dental Clinic. สงวนลิขสิทธิ์ทุกประการ</p>
          <p>Smile Better · ทำฟัน · จัดฟัน · นัดหมายออนไลน์</p>
        </div>
      </div>
    </footer>
  );
}
