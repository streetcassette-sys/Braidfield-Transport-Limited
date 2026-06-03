/* ============================================================
   Braidfield Transport — shared.js
   Loaded by all 3 HTML pages. Contains: data, auth, helpers.
   ============================================================ */

const GOOGLE_CLIENT_ID = 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com';
const ALLOWED_DOMAIN   = 'braidfieldtransport.com';

/* ── THE 9-STEP CROSS-BORDER PROCESS ── */
const PROCESS_STEPS = [
  { n:1, title:'Documents Received',      icon:'fa-file-invoice',    color:'#3B8BEB', phase:'Prep',
    desc:'Client provides: invoice, delivery note, customs T1, movement sheet.',
    fields:['invoice','deliveryNote','customsT1','movementSheet'] },
  { n:2, title:'Cargo Loaded & Dispatched', icon:'fa-truck-loading', color:'#F0A500', phase:'Prep',
    desc:'Cargo loaded and released from depot to Exit border.' },
  { n:3, title:'Exit Border Clearance',   icon:'fa-passport',        color:'#F0A500', phase:'Border',
    desc:'Exit border agent acquits documents and releases cargo to Zambia.' },
  { n:4, title:'ZRA Ascuyda Entry',       icon:'fa-database',        color:'#CC1010', phase:'ZRA',
    desc:'Braidfield Transport creates entry in ZRA Ascuyda system.',
    fields:['zraEntry'] },
  { n:5, title:'Payment Made',            icon:'fa-money-bill-wave', color:'#0ECB7A', phase:'ZRA',
    desc:'Payment made for entry into ZRA Ascuyda system.',
    fields:['paymentRef','paymentAmount'] },
  { n:6, title:'T1 & Release Order',      icon:'fa-file-signature',  color:'#0ECB7A', phase:'ZRA',
    desc:'Release order generated → T1 issued. 5-day transit through Zambia begins.',
    alert:'⏱ 5-day T1 transit timer starts NOW', alertColor:'#F0A500',
    fields:['t1Number','releaseOrder'] },
  { n:7, title:'Crossed to Congo',        icon:'fa-border-all',      color:'#0ECB7A', phase:'Transit',
    desc:'At Sakania (Zambia side): cargo acquitted, trucks cross to Sakania Congo side.' },
  { n:8, title:'Congo Destination',       icon:'fa-flag',            color:'#F0A500', phase:'Congo',
    desc:'Buyer declares to Congolese customs → TR8 generated. Buyer must pay taxes for T1.',
    alert:'⚠ 48h parking limit — $25/day fine after', alertColor:'#E03030',
    fields:['tr8Number','congoArrival'] },
  { n:9, title:'Offloaded',               icon:'fa-box-open',        color:'#0ECB7A', phase:'Done',
    desc:'T1 generated → truck proceeds to offloading point. Trip complete.' },
];

/* ── STAFF ── */
const STAFF_ACCOUNTS = [
  { email:'admin@braidfieldtransport.com',  pass:'admin123',  name:'Admin User',      role:'admin',  initials:'AU' },
  { email:'ops@braidfieldtransport.com',    pass:'ops123',    name:'Ops Manager',     role:'ops',    initials:'OM' },
  { email:'congo@braidfieldtransport.com',  pass:'congo123',  name:'Congo Team Lead', role:'congo',  initials:'CT' },
  { email:'zambia@braidfieldtransport.com', pass:'zambia123', name:'Zambia Team Lead',role:'zambia', initials:'ZT' },
];
const ROLE_LABELS = { admin:'Administrator', ops:'Operations Manager', congo:'Congo Team', zambia:'Zambia Team' };

/* ── DRIVERS ── */
const DRIVER_ACCOUNTS = [
  { username:'john.banda',   phone:'0971234567', plate:'ABZ 1234 ZM', pass:'jb1234', name:'John Banda',   truckId:1 },
  { username:'peter.mwale',  phone:'0972345678', plate:'GRZ 5678 ZM', pass:'pm5678', name:'Peter Mwale',  truckId:2 },
  { username:'mary.zulu',    phone:'0973456789', plate:'ABB 9012 ZM', pass:'mz9012', name:'Mary Zulu',    truckId:3 },
  { username:'david.phiri',  phone:'0974567890', plate:'GRZ 3456 ZM', pass:'dp3456', name:'David Phiri',  truckId:4 },
  { username:'grace.mwansa', phone:'0975678901', plate:'ALZ 7890 ZM', pass:'gm7890', name:'Grace Mwansa', truckId:5 },
  { username:'samuel.tembo', phone:'0976789012', plate:'BNZ 2345 ZM', pass:'st2345', name:'Samuel Tembo', truckId:6 },
  { username:'faith.chanda', phone:'0977890123', plate:'GRZ 6789 ZM', pass:'fc6789', name:'Faith Chanda', truckId:7 },
  { username:'moses.banda',  phone:'0978901234', plate:'ABZ 0123 ZM', pass:'mb0123', name:'Moses Banda',  truckId:8 },
];

/* ── CLIENTS ── */
const DEFAULT_CLIENTS = [
  { id:1, name:'Copperbelt Mining Ltd',      contact:'Mulenga Chanda', phone:'+260971000001', email:'ops@copperbeltmining.co.zm', border:'Kasumbalesa', country:'Zambia' },
  { id:2, name:'DRC Minerals Corp',          contact:'Jean-Pierre K.', phone:'+243991000002', email:'jk@drcminerals.cd',          border:'Kasumbalesa', country:'DR Congo' },
  { id:3, name:'Tanzania Freight Co',        contact:'Amina Msangi',   phone:'+255711000003', email:'amina@tzfreight.co.tz',       border:'Nakonde',     country:'Tanzania' },
  { id:4, name:'Lusaka Traders Association', contact:'Chanda Mutale',  phone:'+260961000004', email:'info@lusakatraders.co.zm',    border:'Sakania',     country:'Zambia' },
  { id:5, name:'Kolwezi Resources Ltd',      contact:'Claude Mukeba',  phone:'+243997000005', email:'claude@kolweziresources.cd',  border:'Mokambo',     country:'DR Congo' },
  { id:6, name:"Mwila & Sons Trading",       contact:'Felix Mwila',    phone:'+260977000006', email:'felix@mwilasons.co.zm',       border:'Tunduma',     country:'Zambia' },
];

/* ── FLEET (with 9-step process tracking) ── */
const DEFAULT_FLEET = [
  { id:1, plate:'ABZ 1234 ZM', client:'Copperbelt Mining Ltd',      driver:'John Banda',
    phone:'+260971234567', origin:'Lusaka', dest:'Lubumbashi, DRC', border:'Kasumbalesa',
    processStep:4, status:'ZRA Entry Created',
    zraEntry:'ZRA-2026-001247', paymentRef:null, paymentAmount:null,
    t1Number:null, releaseOrder:null, t1Generated:null, t1Expires:null,
    tr8Number:null, congoArrival:null, parkingDays:0,
    docs:{ invoice:true, deliveryNote:true, customsT1:true, movementSheet:true },
    location:'Lusaka — ZRA Office', eta:'TBD', lastUpdate:'10:30 AM',
    pdCompleted:false, pdRef:null, closed:false, startDate:'17 May 2026' },
  { id:2, plate:'GRZ 5678 ZM', client:'DRC Minerals Corp',          driver:'Peter Mwale',
    phone:'+260972345678', origin:'Kitwe', dest:'Kolwezi, DRC', border:'Mokambo',
    processStep:6, status:'T1 Generated',
    zraEntry:'ZRA-2026-001189', paymentRef:'PAY-2026-0042', paymentAmount:2850,
    t1Number:'T1-2026-00892', releaseOrder:'RO-2026-00412', t1Generated:'2026-05-20', t1Expires:'2026-05-25',
    tr8Number:null, congoArrival:null, parkingDays:0,
    docs:{ invoice:true, deliveryNote:true, customsT1:true, movementSheet:true },
    location:'En route to Mokambo', eta:'19 May · 18:00', lastUpdate:'09:15 AM',
    pdCompleted:true, pdRef:'PD-2026-0002', closed:false, startDate:'17 May 2026' },
  { id:3, plate:'ABB 9012 ZM', client:'Tanzania Freight Co',        driver:'Mary Zulu',
    phone:'+260973456789', origin:'Chipata', dest:'Dar es Salaam', border:'Nakonde',
    processStep:7, status:'Crossed to Tanzania',
    zraEntry:'ZRA-2026-001156', paymentRef:'PAY-2026-0039', paymentAmount:3100,
    t1Number:'T1-2026-00871', releaseOrder:'RO-2026-00398', t1Generated:'2026-05-18', t1Expires:'2026-05-23',
    tr8Number:null, congoArrival:null, parkingDays:0,
    docs:{ invoice:true, deliveryNote:true, customsT1:true, movementSheet:true },
    location:'Mbeya, Tanzania', eta:'20 May · 08:00', lastUpdate:'11:00 AM',
    pdCompleted:true, pdRef:'PD-2026-0001', closed:false, startDate:'16 May 2026' },
  { id:4, plate:'GRZ 3456 ZM', client:'Copperbelt Mining Ltd',      driver:'David Phiri',
    phone:'+260974567890', origin:'Lusaka', dest:'Lubumbashi, DRC', border:'Kasumbalesa',
    processStep:3, status:'At Exit Border',
    zraEntry:null, paymentRef:null, paymentAmount:null,
    t1Number:null, releaseOrder:null, t1Generated:null, t1Expires:null,
    tr8Number:null, congoArrival:null, parkingDays:0,
    docs:{ invoice:true, deliveryNote:true, customsT1:false, movementSheet:true },
    location:'Kasumbalesa Border — Zambia Side', eta:'19 May · 20:00', lastUpdate:'08:45 AM',
    pdCompleted:false, pdRef:null, closed:false, startDate:'18 May 2026' },
  { id:5, plate:'ALZ 7890 ZM', client:'Kolwezi Resources Ltd',      driver:'Grace Mwansa',
    phone:'+260975678901', origin:'Lusaka', dest:'Kolwezi, DRC', border:'Sakania',
    processStep:8, status:'Congo Destination — Awaiting TR8',
    zraEntry:'ZRA-2026-001098', paymentRef:'PAY-2026-0031', paymentAmount:2600,
    t1Number:'T1-2026-00814', releaseOrder:'RO-2026-00361', t1Generated:'2026-05-17', t1Expires:'2026-05-22',
    tr8Number:'TR8-2026-00174', congoArrival:'2026-05-20T10:00', parkingDays:0,
    docs:{ invoice:true, deliveryNote:true, customsT1:true, movementSheet:true },
    location:'Kolwezi, DRC — Customs Yard', eta:'Complete (Congo side)', lastUpdate:'07:00 AM',
    pdCompleted:true, pdRef:'PD-2026-0003', closed:false, startDate:'15 May 2026' },
  { id:6, plate:'BNZ 2345 ZM', client:'Tanzania Freight Co',        driver:'Samuel Tembo',
    phone:'+260976789012', origin:'Ndola', dest:'Dar es Salaam', border:'Tunduma',
    processStep:2, status:'Cargo Loaded & Dispatched',
    zraEntry:null, paymentRef:null, paymentAmount:null,
    t1Number:null, releaseOrder:null, t1Generated:null, t1Expires:null,
    tr8Number:null, congoArrival:null, parkingDays:0,
    docs:{ invoice:true, deliveryNote:false, customsT1:false, movementSheet:false },
    location:'Ndola — Depot', eta:'20 May · 16:00', lastUpdate:'11:30 AM',
    pdCompleted:false, pdRef:null, closed:false, startDate:'18 May 2026' },
  { id:7, plate:'GRZ 6789 ZM', client:'Lusaka Traders Association', driver:'Faith Chanda',
    phone:'+260977890123', origin:'Lusaka', dest:'Lubumbashi, DRC', border:'Kasumbalesa',
    processStep:5, status:'Payment Made',
    zraEntry:'ZRA-2026-001231', paymentRef:'PAY-2026-0044', paymentAmount:2950,
    t1Number:null, releaseOrder:null, t1Generated:null, t1Expires:null,
    tr8Number:null, congoArrival:null, parkingDays:0,
    docs:{ invoice:true, deliveryNote:true, customsT1:true, movementSheet:true },
    location:'Lusaka — Awaiting Release Order', eta:'TBD', lastUpdate:'09:00 AM',
    pdCompleted:false, pdRef:null, closed:false, startDate:'18 May 2026' },
  { id:8, plate:'ABZ 0123 ZM', client:'DRC Minerals Corp',          driver:'Moses Banda',
    phone:'+260978901234', origin:'Kitwe', dest:'Kolwezi, DRC', border:'Mokambo',
    processStep:9, status:'Offloaded',
    zraEntry:'ZRA-2026-001177', paymentRef:'PAY-2026-0040', paymentAmount:2750,
    t1Number:'T1-2026-00881', releaseOrder:'RO-2026-00405', t1Generated:'2026-05-19', t1Expires:'2026-05-24',
    tr8Number:'TR8-2026-00181', congoArrival:'2026-05-20T14:00', parkingDays:0,
    docs:{ invoice:true, deliveryNote:true, customsT1:true, movementSheet:true },
    location:'Kolwezi — Offloading Complete', eta:'Complete', lastUpdate:'10:00 AM',
    pdCompleted:true, pdRef:'PD-2026-0004', closed:false, startDate:'17 May 2026' },
];

const DEFAULT_COMPLETED = [
  { tripId:'BT-TRIP-0041', plate:'ZNZ 4455 ZM', client:'Mwila & Sons Trading',  driver:'Chanda Mwila',
    origin:'Lusaka', dest:'Lubumbashi, DRC', border:'Kasumbalesa',
    startDate:'10 May 2026', completedDate:'14 May 2026', duration:'4 days',
    t1Number:'T1-2026-00756', zraEntry:'ZRA-2026-000989', tr8Number:'TR8-2026-00148',
    paymentAmount:2600, pdCompleted:true, allStepsDone:true },
  { tripId:'BT-TRIP-0042', plate:'GRZ 9900 ZM', client:'Tanzania Freight Co',   driver:'Pita Phiri',
    origin:'Ndola', dest:'Mbeya, Tanzania', border:'Nakonde',
    startDate:'12 May 2026', completedDate:'16 May 2026', duration:'4 days',
    t1Number:'T1-2026-00771', zraEntry:'ZRA-2026-001011', tr8Number:null,
    paymentAmount:3200, pdCompleted:true, allStepsDone:true },
];

const BORDER_POSTS = {
  Sakania:     { corridor:'Zambia / DR Congo', code:'ZM/DRC', agent:'Agent Mwamba Chisanga', status:'Operational', crossing:'Sakania Town, Copperbelt', hours:'24/7' },
  Nakonde:     { corridor:'Zambia / Tanzania', code:'ZM/TZ',  agent:'Agent Bwalya Mutale',   status:'Operational', crossing:'Nakonde Town, Northern Province', hours:'06:00–22:00 CAT' },
  Mokambo:     { corridor:'Zambia / DR Congo', code:'ZM/DRC', agent:'Agent Peter Phiri',     status:'Operational', crossing:'Mokambo, Copperbelt Province', hours:'06:00–20:00 CAT' },
  Kasumbalesa: { corridor:'Zambia / DR Congo', code:'ZM/DRC', agent:'Agent Grace Tembo',     status:'Operational', crossing:'Chingola–Kasumbalesa Road', hours:'24/7' },
  Tunduma:     { corridor:'Zambia / Tanzania', code:'ZM/TZ',  agent:'Agent Samuel Mwansa',   status:'Operational', crossing:'Tunduma, Muchinga Province', hours:'24/7' },
};

/* ── SESSION HELPERS ── */
function getSession()   { try { return JSON.parse(sessionStorage.getItem('bt_session')||'null'); }   catch(e){ return null; } }
function getFleet()     { try { return JSON.parse(sessionStorage.getItem('bt_fleet')||'null')   || DEFAULT_FLEET.map(f=>({...f})); }    catch(e){ return DEFAULT_FLEET.map(f=>({...f})); } }
function getClients()   { try { return JSON.parse(sessionStorage.getItem('bt_clients')||'null') || DEFAULT_CLIENTS.map(c=>({...c})); }  catch(e){ return DEFAULT_CLIENTS.map(c=>({...c})); } }
function getCompleted() { try { return JSON.parse(sessionStorage.getItem('bt_done')||'null')    || DEFAULT_COMPLETED.map(c=>({...c})); }catch(e){ return DEFAULT_COMPLETED.map(c=>({...c})); } }
function setFleet(d)    { sessionStorage.setItem('bt_fleet',   JSON.stringify(d)); }
function setClients(d)  { sessionStorage.setItem('bt_clients', JSON.stringify(d)); }
function setCompleted(d){ sessionStorage.setItem('bt_done',    JSON.stringify(d)); }

/* ── TOAST ── */
function showToast(ttl, sub, type='ok') {
  const wrap = document.getElementById('toast-wrap'); if (!wrap) return;
  const t = document.createElement('div');
  const ic = { ok:'fa-check', wa:'fa-triangle-exclamation', er:'fa-xmark' };
  t.className = `toast t-${type}`;
  t.innerHTML = `<div class="t-ic"><i class="fa-solid ${ic[type]||'fa-check'}"></i></div><div><div class="t-ttl">${ttl}</div><div class="t-sub">${sub}</div></div>`;
  wrap.appendChild(t); setTimeout(()=>t.remove(), 4500);
}

/* ── T1 HELPERS ── */
function t1DaysLeft(t1Expires) {
  if (!t1Expires) return null;
  const diff = Math.ceil((new Date(t1Expires) - new Date()) / 86400000);
  return diff;
}
function parkingFine(congoArrival) {
  if (!congoArrival) return { hours:0, fine:0 };
  const hrs = Math.floor((new Date() - new Date(congoArrival)) / 3600000);
  const overHrs = Math.max(0, hrs - 48);
  const days = Math.ceil(overHrs / 24);
  return { hours: hrs, overHours: overHrs, fine: days * 25 };
}

/* ── AUTH ── */
function doLogout() {
  if (typeof google !== 'undefined' && google.accounts) try { google.accounts.id.disableAutoSelect(); } catch(e) {}
  sessionStorage.removeItem('bt_session');
  window.location.href = 'index.html';
}
function openLogin()  { document.getElementById('login-overlay')?.classList.add('open'); document.body.style.overflow='hidden'; }
function closeLogin() { document.getElementById('login-overlay')?.classList.remove('open'); document.body.style.overflow=''; }
function switchLTab(t) {
  ['staff','driver'].forEach(x => {
    document.getElementById('lt-'+x)?.classList.toggle('active', x===t);
    document.getElementById('pane-'+x)?.classList.toggle('active', x===t);
  });
}
function setDid(type, btn) {
  document.querySelectorAll('.did-btn').forEach(b=>b.classList.remove('active')); btn.classList.add('active');
  const ph={phone:'Enter your phone number…',user:'Enter your username…',plate:'Enter your plate number…'};
  const el=document.getElementById('d-id'); if(el) el.placeholder=ph[type];
}
function doStaffLogin() {
  const email=(document.getElementById('s-email')?.value||'').trim().toLowerCase();
  const pass =(document.getElementById('s-pass')?.value||'').trim();
  if(!email||!pass){showToast('Fill all fields','Email and password required.','er');return;}
  if(!email.endsWith('@'+ALLOWED_DOMAIN)){showToast('Access Denied','Only @'+ALLOWED_DOMAIN+' accounts.','er');return;}
  const user=STAFF_ACCOUNTS.find(u=>u.email===email&&u.pass===pass);
  if(!user){showToast('Login Failed','Incorrect email or password.','er');return;}
  loginStaff({...user,type:'staff',picture:null,via:'email'});
}
function loginStaff(user) {
  if(!sessionStorage.getItem('bt_fleet'))   setFleet(DEFAULT_FLEET.map(f=>({...f})));
  if(!sessionStorage.getItem('bt_clients')) setClients(DEFAULT_CLIENTS.map(c=>({...c})));
  if(!sessionStorage.getItem('bt_done'))    setCompleted(DEFAULT_COMPLETED.map(c=>({...c})));
  sessionStorage.setItem('bt_session',JSON.stringify(user));
  showToast('Welcome, '+user.name.split(' ')[0]+'!','Redirecting to dashboard…','ok');
  setTimeout(()=>window.location.href='admin.html', 800);
}
function doDriverLogin() {
  const raw =(document.getElementById('d-id')?.value||'').trim().toLowerCase().replace(/\s+/g,'');
  const pass=(document.getElementById('d-pass')?.value||'').trim();
  if(!raw||!pass){showToast('Fill all fields','Identifier and password required.','er');return;}
  const dr=DRIVER_ACCOUNTS.find(d=>d.phone.replace(/\s+/g,'')===raw||d.username===raw||d.plate.toLowerCase().replace(/\s+/g,'')===raw);
  if(!dr||dr.pass!==pass){showToast('Login Failed','Incorrect credentials.','er');return;}
  if(!sessionStorage.getItem('bt_fleet')) setFleet(DEFAULT_FLEET.map(f=>({...f})));
  sessionStorage.setItem('bt_session',JSON.stringify({...dr,type:'driver'}));
  showToast('Welcome, '+dr.name.split(' ')[0]+'!','Redirecting to driver portal…','ok');
  setTimeout(()=>window.location.href='driver.html', 800);
}
function initGoogle() {
  if(GOOGLE_CLIENT_ID.includes('YOUR_GOOGLE')){const n=document.getElementById('g-note');if(n)n.style.display='block';return;}
  if(typeof google==='undefined'||!google.accounts)return;
  try{google.accounts.id.initialize({client_id:GOOGLE_CLIENT_ID,callback:handleGoogleCB,hd:ALLOWED_DOMAIN,auto_select:false});}catch(e){}
}
function triggerGoogleLogin() {
  if(GOOGLE_CLIENT_ID.includes('YOUR_GOOGLE')){showToast('Setup Required','Replace GOOGLE_CLIENT_ID in shared.js.','wa');return;}
  if(typeof google!=='undefined'&&google.accounts)google.accounts.id.prompt();
  else showToast('Not Available','Google Sign-In unavailable. Use email.','wa');
}
function handleGoogleCB(resp) {
  try{
    const p=JSON.parse(atob(resp.credential.split('.')[1].replace(/-/g,'+').replace(/_/g,'/')));
    if(!(p.email||'').endsWith('@'+ALLOWED_DOMAIN)){showToast('Access Denied','Only @'+ALLOWED_DOMAIN+' accounts.','er');return;}
    const known=STAFF_ACCOUNTS.find(u=>u.email===p.email);
    loginStaff({email:p.email,name:p.name||p.email,picture:p.picture||null,role:known?known.role:'ops',
      initials:(p.name||p.email).split(' ').map(n=>n[0]).join('').substring(0,2).toUpperCase(),type:'staff',via:'google'});
  }catch(e){showToast('Sign-In Error','Could not verify. Try email.','er');}
}
document.addEventListener('DOMContentLoaded',()=>{
  initGoogle();
  document.getElementById('login-overlay')?.addEventListener('click',function(e){if(e.target===this)closeLogin();});
  document.querySelectorAll('.modal-ov').forEach(el=>el.addEventListener('click',function(e){if(e.target===this)this.classList.remove('open');}));
});
