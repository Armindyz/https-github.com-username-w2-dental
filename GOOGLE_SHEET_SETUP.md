# Google Sheet connection

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
