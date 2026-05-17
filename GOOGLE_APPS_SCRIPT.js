/**
 * W2 DENTAL CLINIC — Google Apps Script
 * =====================================================
 * วิธีติดตั้ง:
 *
 * 1. ไปที่ https://sheets.google.com → สร้าง Spreadsheet ใหม่
 *    ตั้งชื่อ: "W2 Dental - นัดหมาย"
 *
 * 2. คัดลอก Spreadsheet ID จาก URL:
 *    https://docs.google.com/spreadsheets/d/[SPREADSHEET_ID]/edit
 *
 * 3. คลิก Extensions → Apps Script
 *    ลบโค้ดเดิม → วางโค้ดนี้ทั้งหมด → แก้ SPREADSHEET_ID
 *
 * 4. Deploy → New deployment
 *    - Type: Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 *    → Copy Web app URL
 *
 * 5. วาง URL ใน .env.local:
 *    GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/...
 *
 * 6. Restart Next.js dev server: npm run dev
 */

const SPREADSHEET_ID = '1DSuVspf6GQ0-a3ODwF2c4TpETJHhEnmR1UP-v56sjNI';
const SHEET_NAME     = 'นัดหมาย';

const HEADERS = [
  'วันที่ส่งข้อมูล',
  'ชื่อ',
  'นามสกุล',
  'เบอร์โทร',
  'อีเมล',
  'บริการ',
  'วันที่นัด',
  'ช่วงเวลา',
  'รู้จักจาก',
  'รายละเอียด',
  'สถานะ',
];

function doPost(e) {
  try {
    const data   = JSON.parse(e.postData.contents);
    const sheet  = getOrCreateSheet();

    sheet.appendRow([
      data.timestamp     || new Date().toLocaleString('th-TH'),
      data.fname         || '',
      data.lname         || '',
      data.phone         || '',
      data.email         || '',
      data.service       || '',
      data.appoint_date  || '',
      data.appoint_time  || '',
      data.source        || '',
      data.note          || '',
      'รอยืนยัน',
    ]);

    formatSheet(sheet);

    return ContentService
      .createTextOutput(JSON.stringify({ result: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'error', message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'W2 Dental Script is running ✓' }))
    .setMimeType(ContentService.MimeType.JSON);
}

function getOrCreateSheet() {
  const ss   = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet  = ss.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    const hdr = sheet.getRange(1, 1, 1, HEADERS.length);
    sheet.appendRow(HEADERS);
    hdr.setBackground('#1A1A1A');
    hdr.setFontColor('#FFFFFF');
    hdr.setFontWeight('bold');
    hdr.setHorizontalAlignment('center');
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function formatSheet(sheet) {
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return;
  for (let r = 2; r <= lastRow; r++) {
    sheet.getRange(r, 1, 1, HEADERS.length)
      .setBackground(r % 2 === 0 ? '#F5F5F5' : '#FFFFFF');
  }
  for (let c = 1; c <= HEADERS.length; c++) sheet.autoResizeColumn(c);
}
