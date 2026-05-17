"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useInView } from "framer-motion";
import { AlertCircle, CheckCircle, Loader2 } from "lucide-react";

type FormState = "idle" | "loading" | "success" | "error";

const services = [
  "ทันตกรรมทั่วไป",
  "ตรวจฟัน + ขูดหินปูน",
  "จัดฟัน",
  "ฟอกสีฟัน",
  "รากฟันเทียม",
  "วีเนียร์ / ครอบฟัน",
  "ทำฟันปลอม",
  "Smile Design",
  "อื่น ๆ",
];

const googleScriptUrl = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL ?? "";

export default function AppointmentForm() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [formState, setFormState] = useState<FormState>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (form: HTMLFormElement) => {
    const errs: Record<string, string> = {};
    const required = ["fname", "lname", "phone", "service", "consent"];
    required.forEach((name) => {
      const el = form.elements.namedItem(name) as HTMLInputElement | null;
      if (!el) return;
      if (el.type === "checkbox" && !el.checked) errs[name] = "กรุณายืนยัน";
      else if (el.type !== "checkbox" && !el.value.trim()) errs[name] = "กรุณากรอก";
    });
    const phone = (form.elements.namedItem("phone") as HTMLInputElement)?.value;
    if (phone && !/^[0-9+\-\s()]{9,15}$/.test(phone)) errs.phone = "เบอร์โทรไม่ถูกต้อง";
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const errs = validate(form);
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setFormState("loading");

    const data = {
      timestamp: new Date().toLocaleString("th-TH"),
      fname: (form.elements.namedItem("fname") as HTMLInputElement).value.trim(),
      lname: (form.elements.namedItem("lname") as HTMLInputElement).value.trim(),
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value.trim(),
      line_id: (form.elements.namedItem("line_id") as HTMLInputElement).value.trim(),
      service: (form.elements.namedItem("service") as HTMLSelectElement).value,
      source: (form.elements.namedItem("source") as HTMLSelectElement).value,
      note: (form.elements.namedItem("note") as HTMLTextAreaElement).value.trim(),
    };

    try {
      if (googleScriptUrl) {
        await fetch(googleScriptUrl, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "text/plain;charset=utf-8" },
          body: JSON.stringify(data),
        });
      } else {
        const res = await fetch("/api/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error();
      }
      setFormState("success");
      form.reset();
    } catch {
      setFormState("error");
    }
  };

  const inputClass = (name: string) =>
    `w-full rounded-lg border bg-white px-4 py-3 text-sm outline-none transition ${
      errors[name]
        ? "border-red-300 focus:border-red-400 focus:ring-4 focus:ring-red-50"
        : "border-w2-gray-100 focus:border-w2-gray-400 focus:ring-4 focus:ring-w2-gray-50"
    }`;

  return (
    <section id="register" className="silver-surface px-5 py-14 lg:py-20 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[10rem_minmax(0,56rem)_10rem] lg:items-start">
        <div
          ref={ref}
          className="mx-auto w-full max-w-md lg:max-w-none"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateX(0)" : "translateX(-24px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          <span className="section-kicker">Appointment</span>
          <div className="gold-title-underline mt-3" />
          <h2 className="mt-5 text-[34px] font-bold leading-[1.2] text-w2-gray-900 lg:text-[38px]">
            นัดหมาย<br />ออนไลน์
          </h2>
          <p className="mt-4 text-[15px] leading-[1.85] text-w2-gray-500 max-w-[260px]">
            กรอกข้อมูลเบื้องต้น ทีมงานจะติดต่อกลับเพื่อยืนยันวันและเวลา โดยระบบส่งข้อมูลผ่าน API เดิมของโปรเจกต์
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="silver-card rounded-lg p-6 sm:p-8 lg:col-start-2"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateX(0)" : "translateX(24px)",
            transition: "opacity 0.7s ease 0.15s, transform 0.7s ease 0.15s",
          }}
        >
          <div className="mb-6 flex items-center gap-4 rounded-lg bg-w2-off p-4">
            <Image
              src="/brand/w2-logo-icon.png"
              alt="W2 Dental Clinic logo icon"
              width={300}
              height={245}
              className="logo-on-silver h-auto w-20 shrink-0 object-contain"
            />
            <div>
              <p className="font-bold text-w2-gray-900">W2 Dental Clinic</p>
              <p className="text-sm text-w2-gray-500">แบบฟอร์มนัดหมายออนไลน์</p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-bold text-w2-gray-700">ชื่อ <span className="text-red-500">*</span></label>
              <input name="fname" type="text" placeholder="ชื่อจริง" className={inputClass("fname")} />
              {errors.fname && <p className="mt-1 text-xs text-red-500">{errors.fname}</p>}
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold text-w2-gray-700">นามสกุล <span className="text-red-500">*</span></label>
              <input name="lname" type="text" placeholder="นามสกุล" className={inputClass("lname")} />
              {errors.lname && <p className="mt-1 text-xs text-red-500">{errors.lname}</p>}
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold text-w2-gray-700">เบอร์โทร <span className="text-red-500">*</span></label>
              <input name="phone" type="tel" placeholder="0XX-XXX-XXXX" className={inputClass("phone")} />
              {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold text-w2-gray-700">LINE ID</label>
              <input name="line_id" type="text" placeholder="LINE ID ของคุณ" className={inputClass("line_id")} />
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold text-w2-gray-700">บริการที่ต้องการ <span className="text-red-500">*</span></label>
              <select name="service" className={inputClass("service")}>
                <option value="">เลือกบริการ</option>
                {services.map((service) => <option key={service}>{service}</option>)}
              </select>
              {errors.service && <p className="mt-1 text-xs text-red-500">{errors.service}</p>}
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold text-w2-gray-700">รู้จักเราจาก</label>
              <select name="source" className={inputClass("source")}>
                <option value="">เลือกช่องทาง</option>
                {["Facebook", "Instagram", "LINE", "Google", "เพื่อน / ครอบครัว", "อื่น ๆ"].map((source) => (
                  <option key={source}>{source}</option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="mb-2 block text-sm font-bold text-w2-gray-700">รายละเอียดเพิ่มเติม</label>
              <textarea
                name="note"
                rows={4}
                placeholder="ระบุอาการหรือช่วงเวลาที่สะดวกให้ติดต่อกลับ"
                className={`${inputClass("note")} resize-none`}
              />
            </div>

            <div className="sm:col-span-2">
              <label className="flex cursor-pointer items-start gap-3">
                <input type="checkbox" name="consent" className="mt-1 h-4 w-4 accent-w2-gray-900" />
                <span className="text-sm leading-6 text-w2-gray-500">
                  ข้าพเจ้ายินยอมให้ W2 Dental Clinic เก็บข้อมูลส่วนบุคคลเพื่อการนัดหมาย <span className="text-red-500">*</span>
                </span>
              </label>
              {errors.consent && <p className="ml-7 mt-1 text-xs text-red-500">{errors.consent}</p>}
            </div>
          </div>

          <button
            type="submit"
            disabled={formState === "loading"}
            className="champagne-cta mt-6 flex w-full items-center justify-center gap-2 rounded-lg px-6 py-4 font-bold transition disabled:cursor-not-allowed disabled:opacity-65"
          >
            {formState === "loading" ? (
              <>
                <Loader2 size={18} className="animate-spin" /> กำลังส่งข้อมูล...
              </>
            ) : (
              "ส่งคำขอนัดหมาย"
            )}
          </button>

          {formState === "success" && (
            <div className="mt-4 flex items-start gap-3 rounded-lg border border-w2-gray-200 bg-w2-gray-50 p-4 text-w2-gray-700">
              <CheckCircle size={20} className="mt-0.5 shrink-0" />
              <div>
                <p className="font-bold">ส่งคำขอนัดหมายสำเร็จ</p>
                <p className="mt-1 text-sm text-w2-gray-500">ทีมงานจะติดต่อกลับเพื่อยืนยันภายใน 24 ชั่วโมง</p>
              </div>
            </div>
          )}
          {formState === "error" && (
            <div className="mt-4 flex items-start gap-3 rounded-lg border border-red-100 bg-red-50 p-4 text-red-700">
              <AlertCircle size={20} className="mt-0.5 shrink-0" />
              <div>
                <p className="font-bold">ส่งข้อมูลไม่สำเร็จ</p>
                <p className="mt-1 text-sm">กรุณาลองใหม่ หรือติดต่อทางโทรศัพท์/LINE</p>
              </div>
            </div>
          )}
        </form>
        <div className="hidden lg:block" aria-hidden="true" />
      </div>
    </section>
  );
}
