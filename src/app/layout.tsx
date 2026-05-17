import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "W2 Dental Clinic | Smile Better",
  description:
    "W2 Dental Clinic คลินิกทันตกรรมพร้อมระบบนัดหมายออนไลน์ บริการทันตกรรมครบวงจร และบรรยากาศคลินิกที่อบอุ่น",
  keywords:
    "W2 Dental Clinic, คลินิกทันตกรรม, ทำฟัน, จัดฟัน, ฟอกสีฟัน, นัดหมายทันตแพทย์",
  openGraph: {
    title: "W2 Dental Clinic | Smile Better",
    description:
      "คลินิกทันตกรรมพร้อมระบบนัดหมายออนไลน์และบริการดูแลรอยยิ้มครบวงจร",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="th" className="h-full">
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  );
}
