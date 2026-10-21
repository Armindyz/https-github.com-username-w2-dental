"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useInView } from "framer-motion";
import { AlertCircle, CheckCircle, ChevronDown, Loader2 } from "lucide-react";
import { minimumAppointmentDate, services, sources } from "@/lib/appointment";

type FormState = "idle" | "loading" | "success" | "error";

export default function AppointmentForm() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [formState, setFormState] = useState<FormState>("idle");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (form: HTMLFormElement) => {
    const errs: Record<string, string> = {};
    const required = ["full_name", "phone", "consent"];
    required.forEach((name) => {
      const el = form.elements.namedItem(name) as HTMLInputElement | null;
      if (!el) return;
      if (el.type === "checkbox" && !el.checked) errs[name] = "กรุณายืนยัน";
      else if (el.type !== "checkbox" && !el.value.trim()) errs[name] = "กรุณากรอก";
    });
    if (!new FormData(form).getAll("service").length) errs.service = "กรุณาเลือกบริการอย่างน้อย 1 รายการ";
    const phone = (form.elements.namedItem("phone") as HTMLInputElement)?.value;
    if (phone && !/^[0-9+\-\s()]{9,15}$/.test(phone)) errs.phone = "เบอร์โทรไม่ถูกต้อง";
    const date = (form.elements.namedItem("appoint_date") as HTMLInputElement).value;
    if (date && date < minimumAppointmentDate()) errs.appoint_date = "กรุณาเลือกวันที่ตั้งแต่วันเปิดให้บริการและไม่เป็นวันที่ผ่านมา";
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formState === "loading") return;
    const form = e.currentTarget;
    const errs = validate(form);
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setFormState("loading");

    const data = {
      full_name: (form.elements.namedItem("full_name") as HTMLInputElement).value.trim(),
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value.trim(),
      services: new FormData(form).getAll("service"),
      source: (form.elements.namedItem("source") as HTMLSelectElement).value,
      appoint_date: (form.elements.namedItem("appoint_date") as HTMLInputElement).value,
      consent: (form.elements.namedItem("consent") as HTMLInputElement).checked,
    };

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok || (await res.json()).success !== true) throw new Error();
      setFormState("success");
      form.reset();
      setSelectedServices([]);
    } catch {
      setFormState("error");
    }
  };

  const inputClass = (name: string) =>
    `w-full min-h-12 rounded-xl border bg-white px-4 py-3 text-sm text-w2-gray-700 shadow-sm outline-none transition duration-200 ${
      errors[name]
        ? "border-red-300 focus:border-red-400 focus:ring-4 focus:ring-red-50"
        : "border-w2-gray-200 hover:border-[#cbb98e] focus:border-[#bd943c] focus:ring-4 focus:ring-[#bd943c]/10"
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
            กรอกข้อมูลเบื้องต้นและเลือกบริการที่สนใจ ทีมงานจะติดต่อกลับเพื่อยืนยันวันและเวลานัดหมาย
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="silver-card rounded-2xl p-6 sm:p-8 lg:col-start-2"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateX(0)" : "translateX(24px)",
            transition: "opacity 0.7s ease 0.15s, transform 0.7s ease 0.15s",
          }}
        >
          <div className="mb-7 flex items-center gap-4 rounded-xl border border-[#e7dfce] bg-linear-to-br from-white to-[#f5f1e8] p-4">
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
          <div className="grid grid-cols-1 gap-x-4 gap-y-5 sm:grid-cols-2">
            <div>
              <label htmlFor="full_name" className="mb-2 block text-sm font-bold text-w2-gray-700">ชื่อ-นามสกุล <span className="text-red-500">*</span></label>
              <input id="full_name" name="full_name" type="text" autoComplete="name" placeholder="ชื่อ-นามสกุล" className={inputClass("full_name")} />
              {errors.full_name && <p className="mt-1 text-xs text-red-500">{errors.full_name}</p>}
            </div>
            <div>
              <label htmlFor="phone" className="mb-2 block text-sm font-bold text-w2-gray-700">เบอร์โทรศัพท์ <span className="text-red-500">*</span></label>
              <input id="phone" name="phone" type="tel" autoComplete="tel" placeholder="0XX-XXX-XXXX" className={inputClass("phone")} />
              {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
            </div>
            <fieldset className="sm:col-span-2">
              <legend className="mb-2 text-sm font-bold text-w2-gray-700">ต้องการรับบริการด้านใด <span className="text-red-500">*</span></legend>
              <p id="service-help" className="mb-2 text-xs leading-5 text-w2-gray-500">เลือกได้มากกว่า 1 บริการ</p>
              <details className={`group overflow-hidden rounded-xl border bg-white shadow-sm transition duration-200 hover:border-[#cbb98e] open:border-[#bd943c] open:shadow-[0_8px_24px_rgba(148,115,45,0.08)] ${errors.service ? "border-red-300" : "border-w2-gray-200"}`}>
                <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-3 rounded-xl px-4 py-3 text-sm text-w2-gray-700 outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#bd943c] [&::-webkit-details-marker]:hidden">
                  <span className="flex min-w-0 flex-wrap gap-1.5 leading-6">
                    {selectedServices.length ? selectedServices.map((service) => (
                      <span key={service} className="rounded-md border border-[#eadcbb] bg-[#faf5e9] px-2 py-0.5 text-xs font-medium text-[#806124]">{service}</span>
                    )) : "เลือกบริการ"}
                  </span>
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#f7f3e9] text-[#94732d]" aria-hidden="true"><ChevronDown size={16} className="transition-transform group-open:rotate-180" /></span>
                </summary>
                <div className="border-t border-w2-gray-100">
                  <div className="max-h-64 space-y-1 overflow-y-auto p-2">
                    {services.map((service) => (
                      <label key={service} className="flex cursor-pointer items-start gap-3 rounded-lg border border-transparent px-3 py-2.5 text-sm leading-6 text-w2-gray-700 transition-colors hover:bg-[#f7f8fa] has-checked:border-[#eadcbb] has-checked:bg-[#faf5e9] has-checked:text-[#765313] has-focus-visible:ring-2 has-focus-visible:ring-[#bd943c]">
                        <input
                          type="checkbox" name="service" value={service}
                          aria-describedby="service-help" className="mt-1 h-4 w-4 shrink-0 accent-[#bd943c]"
                          checked={selectedServices.includes(service)}
                          onChange={(event) => {
                            const checked = event.target.checked;
                            setSelectedServices((current) => checked ? [...current, service] : current.filter((item) => item !== service));
                          }}
                        />
                        <span>{service}</span>
                      </label>
                    ))}
                  </div>
                  <div className="flex items-center justify-between gap-3 border-t border-w2-gray-100 bg-[#fafbfc] px-4 py-3">
                    <span role="status" aria-live="polite" className="text-xs text-w2-gray-500">เลือกแล้ว {selectedServices.length} บริการ</span>
                    <button type="button" className="rounded-lg border border-[#dfc992] bg-[#f7edcf] px-4 py-1.5 text-sm font-medium text-[#765313] transition hover:bg-[#efdfb3] focus-visible:outline-2 focus-visible:outline-[#bd943c]" onClick={(event) => {
                      const details = event.currentTarget.closest("details");
                      if (details) { details.open = false; details.querySelector("summary")?.focus(); }
                    }}>เสร็จสิ้น</button>
                  </div>
                </div>
              </details>
              {errors.service && <p className="mt-1 text-xs text-red-500">{errors.service}</p>}
            </fieldset>
            <div>
              <label htmlFor="appoint_date" className="mb-2 block text-sm font-bold text-w2-gray-700">วันที่สะดวกเข้ารับบริการ</label>
              <input id="appoint_date" name="appoint_date" type="date" min={minimumAppointmentDate()} className={inputClass("appoint_date")} />
              <p className="mt-1 text-xs text-w2-gray-500">ไม่บังคับกรอก · เปิดให้บริการตั้งแต่ 23 พฤศจิกายน 2569 เจ้าหน้าที่จะติดต่อกลับเพื่อยืนยันวันและเวลาอีกครั้ง</p>
              {errors.appoint_date && <p className="mt-1 text-xs text-red-500">{errors.appoint_date}</p>}
            </div>
            <div>
              <label htmlFor="source" className="mb-2 block text-sm font-bold text-w2-gray-700">ช่องทางที่ทราบข่าวสารของคลินิก</label>
              <select id="source" name="source" className={inputClass("source")}>
                <option value="">เลือกช่องทาง</option>
                {sources.map((source) => <option key={source}>{source}</option>)}
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="flex cursor-pointer items-start gap-3">
                <input type="checkbox" name="consent" className="mt-1 h-4 w-4 accent-w2-gray-900" />
                <span className="text-sm leading-6 text-w2-gray-500">
                  ยินยอมให้ W2 Dental Clinic ติดต่อกลับเพื่อยืนยันนัดหมายและให้ข้อมูลบริการ <span className="text-red-500">*</span>
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
                <p className="mt-1 text-sm text-w2-gray-500">ทีมงานจะติดต่อกลับทางเบอร์โทรศัพท์เพื่อยืนยันนัดหมาย</p>
              </div>
            </div>
          )}
          {formState === "error" && (
            <div className="mt-4 flex items-start gap-3 rounded-lg border border-red-100 bg-red-50 p-4 text-red-700">
              <AlertCircle size={20} className="mt-0.5 shrink-0" />
              <div>
                <p className="font-bold">ยังยืนยันการส่งข้อมูลไม่ได้</p>
                <p className="mt-1 text-sm">ข้อมูลที่กรอกยังอยู่ กรุณาตรวจสอบข้อมูล หรือติดต่อทางโทรศัพท์/LINE เพื่อตรวจสอบก่อนส่งซ้ำ</p>
              </div>
            </div>
          )}
        </form>
        <div className="hidden lg:block" aria-hidden="true" />
      </div>
    </section>
  );
}
