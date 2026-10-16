const assert = require('node:assert/strict');
const fs = require('node:fs');
const ts = require('typescript');
const vm = require('node:vm');
function load(file, dependencies = {}) {
  const exports = {};
  const source = ts.transpileModule(fs.readFileSync(file, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  }).outputText;
  vm.runInNewContext(source, {
    exports, require: (name) => dependencies[name] ?? require(name),
    URLSearchParams, AbortSignal, Date, Intl, fetch: (...args) => global.fetch(...args),
  }, { filename: file });
  return exports;
}
const settings = load('src/lib/appointment.ts');
const { POST } = load('src/app/api/register/route.ts', { '@/lib/appointment': settings });
const valid = {
  full_name: 'Test Patient', phone: '0800000000',
  services: [settings.services[0], settings.services[1]], source: settings.sources[0],
  appoint_date: '2099-12-01', consent: true,
};
const request = (body) => new Request('http://localhost/api/register', {
  method: 'POST', body: JSON.stringify(body), headers: { 'Content-Type': 'application/json' },
});
(async () => {
  let calls = 0;
  global.fetch = async (url, options) => {
    calls++;
    assert.match(url, /1FAIpQLSccn4MKy056e5VgzD44uBvitoGyPzfbXC_1EhAlZxZPFVbESg\/formResponse$/);
    assert.equal(options.body.get('entry.496790890'), 'Test Patient');
    assert.equal(options.body.get('entry.1931408668_year'), '2099');
    assert.equal(options.body.get('entry.1931408668_month'), '12');
    assert.equal(options.body.get('entry.1931408668_day'), '01');
    assert.equal(options.body.has('entry.1940050088'), false);
    assert.deepEqual(options.body.getAll('entry.899800354'), valid.services);
    assert.equal(options.body.get('entry.622878355'), 'ยินยอม');
    assert.equal(options.body.has('entry.1955981945'), false);
    return new Response('<div class="vHW8K">ขอบคุณสำหรับการลงทะเบียนค่ะ/ครับ</div><a href="https://docs.google.com/forms/d/e/1FAIpQLSccn4MKy056e5VgzD44uBvitoGyPzfbXC_1EhAlZxZPFVbESg/viewform?usp=form_confirm">ส่งคำตอบเพิ่มอีก</a>');
  };
  assert.equal((await POST(request(valid))).status, 200);
  for (const change of [{consent: false}, {appoint_date: '2099-02-31'}, {appoint_date: '2026-11-22'}, {services: ['invalid']}, {services: []}, {services: 'จัดฟัน'}, {source: 'invalid'}, {phone: 123}, {full_name: {}}, {full_name: ""}]) {
    assert.equal((await POST(request({...valid, ...change}))).status, 400);
  }
  assert.equal((await POST(request(null))).status, 400);
  assert.equal((await POST(new Request('http://localhost', {method: 'POST', body: '{'}))).status, 400);
  assert.equal(calls, 1, 'Invalid submissions must never reach Google');
  global.fetch = async (_url, options) => {
    assert.equal(options.body.has('entry.1931408668_year'), false);
    assert.equal(options.body.has('entry.1640438865'), false);
    return new Response('<div class="vHW8K">Recorded</div><a href="https://docs.google.com/forms/d/e/1FAIpQLSccn4MKy056e5VgzD44uBvitoGyPzfbXC_1EhAlZxZPFVbESg/viewform?usp=form_confirm">Again</a>');
  };
  assert.equal((await POST(request({...valid, appoint_date: '', source: ''}))).status, 200);
  global.fetch = async () => new Response('<form>Validation error</form>');
  assert.equal((await POST(request(valid))).status, 502);
  global.fetch = async () => new Response('<div class="vHW8K">Form closed</div>');
  assert.equal((await POST(request(valid))).status, 502);
  global.fetch = async () => new Response('Unavailable', {status: 503});
  assert.equal((await POST(request(valid))).status, 502);
  global.fetch = async () => { throw new Error('Timeout'); };
  assert.equal((await POST(request(valid))).status, 502);
  console.log('Passed: mapping, required fields, consent, dates, invalid types, Google errors and timeout. No live submissions.');
})().catch((error) => { console.error(error); process.exitCode = 1; });
