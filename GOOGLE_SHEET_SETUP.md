# การรับข้อมูลผ่าน Google Form

ฟอร์มบนเว็บไซต์ส่งผ่าน `/api/register` ไปที่ Google Form:
https://forms.gle/LNXFcBajELP8WPKB8

ไม่ต้องตั้งค่า `GOOGLE_SCRIPT_URL` หรือ `NEXT_PUBLIC_GOOGLE_SCRIPT_URL` สำหรับฟอร์มนัดหมายนี้ และต้องรันเว็บบนโฮสต์ที่รองรับ Next.js server routes

- ข้อมูลจะอยู่ในแท็บคำตอบของ Google Form หากต้องการ Google Sheets ให้เชื่อมชีตจากแท็บคำตอบของฟอร์ม
- ชื่อและนามสกุลจะรวมเป็นช่องเดียว ตัวเลือกและรหัสคำถามอ้างอิงจากฟอร์มจริง
- วันที่บังคับกรอก เริ่ม 23 พฤศจิกายน 2569 และไม่รับวันที่ผ่านมา
- หากลบ/สร้างคำถามใหม่หรือเปลี่ยนตัวเลือกใน Google Form ต้องอัปเดต `src/lib/appointment.ts` และ `src/app/api/register/route.ts`
- เว็บแสดงผลสำเร็จเมื่อพบหน้าการยืนยันจาก Google หากขาดการยืนยันจะเก็บข้อมูลในหน้าฟอร์มไว้ และไม่ส่งซ้ำอัตโนมัติ
- ทดสอบการจับคู่ข้อมูลและข้อผิดพลาดแบบจำลองด้วย `node scripts/test-register.cjs` โดยไม่สร้างคำตอบจริง

## การเชื่อมต่อ Google Apps Script แบบเดิม (ไม่ได้ใช้กับฟอร์มปัจจุบัน)

Sheet ที่ใช้รับข้อมูล:

https://docs.google.com/spreadsheets/d/1DSuVspf6GQ0-a3ODwF2c4TpETJHhEnmR1UP-v56sjNI/edit?gid=0#gid=0

## วิธีเปิดให้เว็บส่งข้อมูลเข้า Sheet

1. เปิด Google Sheet ด้านบน
2. ไปที่ `Extensions` > `Apps Script`
3. ลบโค้ดเดิมใน Apps Script แล้ววางโค้ดทั้งหมดจากไฟล์ `GOOGLE_APPS_SCRIPT.js`
4. กด Save
5. กด `Deploy` > `New deployment`
6. เลือก type เป็น `Web app`
7. ตั้งค่า:
   - `Execute as`: `Me`
   - `Who has access`: `Anyone`
8. กด `Deploy` แล้วอนุญาตสิทธิ์
9. Copy `Web app URL`
10. นำ URL ที่ได้มาใส่ในไฟล์ `.env.local`:

```env
GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/...../exec
```

11. Restart เว็บ แล้วลองส่งฟอร์มนัดหมายอีกครั้ง

เมื่อเชื่อมสำเร็จ ข้อมูลจะถูกเพิ่มในชีตชื่อ `นัดหมาย` อัตโนมัติ
