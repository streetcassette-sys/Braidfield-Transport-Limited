/* ============================================================
   Braidfield Transport — shared.js
   All data, roles, auth, helpers — loaded by every page
   ============================================================ */

var GOOGLE_CLIENT_ID = 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com';
var ALLOWED_DOMAIN   = 'braidfieldtransport.com';

/* ── STAFF ROLES ── */
var ROLES = {
  senior_customs:  { label:'Senior Customs Officer', color:'#3B8BEB', icon:'fa-stamp' },
  territory_mgr:   { label:'Territory Manager',      color:'#F0A500', icon:'fa-map-location-dot' },
  executive:       { label:'Executive',              color:'#CC1010', icon:'fa-crown' },
  supplier:        { label:'Supplier',               color:'#0ECB7A', icon:'fa-industry' },
  border_agent:    { label:'Border Agent / Runner',  color:'#A855F7', icon:'fa-person-walking-luggage' },
  accountant:      { label:'Accountant',             color:'#14B8A6', icon:'fa-calculator' },
  support:         { label:'Support',                color:'#6B7280', icon:'fa-headset' },
  operations:      { label:'Operations Officer',     color:'#E86A17', icon:'fa-route' },
};

/* ── STAFF ACCOUNTS ── */
var STAFF_ACCOUNTS = [
  { staffId:'BT-STAFF-001', email:'admin@braidfieldtransport.com',    pass:'admin123',   name:'Admin User',        role:'executive',       initials:'AU' },
  { staffId:'BT-STAFF-002', email:'customs@braidfieldtransport.com',  pass:'customs123', name:'Chanda Mwila',      role:'senior_customs',  initials:'CM' },
  { staffId:'BT-STAFF-003', email:'territory@braidfieldtransport.com',pass:'terr123',    name:'Simon Banda',       role:'territory_mgr',   initials:'SB' },
  { staffId:'BT-STAFF-004', email:'executive@braidfieldtransport.com',pass:'exec123',    name:'Daniel Phiri',      role:'executive',       initials:'DP' },
  { staffId:'BT-STAFF-005', email:'supplier@braidfieldtransport.com', pass:'supp123',    name:'Felix Mwansa',      role:'supplier',        initials:'FM' },
  { staffId:'BT-STAFF-006', email:'agent@braidfieldtransport.com',    pass:'agent123',   name:'Grace Tembo',       role:'border_agent',    initials:'GT' },
  { staffId:'BT-STAFF-007', email:'accounts@braidfieldtransport.com', pass:'acc123',     name:'Mary Zulu',         role:'accountant',      initials:'MZ' },
  { staffId:'BT-STAFF-008', email:'support@braidfieldtransport.com',  pass:'sup123',     name:'Peter Mutale',      role:'support',         initials:'PM' },
  { staffId:'BT-STAFF-009', email:'ops@braidfieldtransport.com',      pass:'ops123',     name:'Brian Sichone',     role:'operations',      initials:'BS' },
];
var ROLE_LABELS = {};
Object.keys(ROLES).forEach(function(k){ ROLE_LABELS[k] = ROLES[k].label; });

/* ── SUPPLIERS ── */
var DEFAULT_SUPPLIERS = []; /* Production: add via Staff Portal → Suppliers → Add Supplier */

/* ── TRANSIT COST TABLE ── */
/* ── TRANSIT COST TABLE ── */
/* Nakonde → Ndola: 6 toll gates at K300 each = K1,800 total tolls (per NOTES V1) */
var TRANSIT_COSTS = [
  /* Nakonde Corridor (ZM/TZ) — 6 toll gates x K300 = K1,800 */
  { id:1,  route:'Nakonde Corridor', town:'Nakonde Toll Gate',               toll:300, council:0,   misc:0,   total:300  },
  { id:2,  route:'Nakonde Corridor', town:'Nakonde → Esoka Toll Gate',        toll:300, council:80,  misc:40,  total:420  },
  { id:3,  route:'Nakonde Corridor', town:'Esoka → Chinsali Toll Gate',       toll:300, council:70,  misc:35,  total:405  },
  { id:4,  route:'Nakonde Corridor', town:'Mpika Toll Gate',                  toll:300, council:90,  misc:45,  total:435  },
  { id:5,  route:'Nakonde Corridor', town:'Selenge (Council)',                 toll:0,   council:120, misc:30,  total:150  },
  { id:6,  route:'Nakonde Corridor', town:'Mukushi (Council)',                 toll:0,   council:100, misc:25,  total:125  },
  { id:7,  route:'Nakonde Corridor', town:'Kapiri Mposhi Toll Gate',          toll:300, council:80,  misc:40,  total:420  },
  { id:8,  route:'Nakonde Corridor', town:'Ndola Toll Gate',                  toll:300, council:70,  misc:35,  total:405  },
  /* Kasumbalesa / DRC Corridor */
  { id:9,  route:'Kasumbalesa Corridor', town:'Lusaka → Kabwe',              toll:200, council:80,  misc:50,  total:330  },
  { id:10, route:'Kasumbalesa Corridor', town:'Kabwe → Kapiri Mposhi',       toll:160, council:65,  misc:40,  total:265  },
  { id:11, route:'Kasumbalesa Corridor', town:'Kapiri Mposhi → Ndola',       toll:280, council:90,  misc:60,  total:430  },
  { id:12, route:'Kasumbalesa Corridor', town:'Ndola → Kitwe',               toll:180, council:70,  misc:40,  total:290  },
  { id:13, route:'Kasumbalesa Corridor', town:'Kitwe → Chingola',            toll:150, council:60,  misc:30,  total:240  },
  { id:14, route:'Kasumbalesa Corridor', town:'Chingola → Kasumbalesa',      toll:120, council:50,  misc:25,  total:195  },
  /* Mokambo / DRC Corridor */
  { id:15, route:'Mokambo Corridor', town:'Ndola → Mokambo',                 toll:200, council:75,  misc:45,  total:320  },
  /* Sakania / DRC Corridor */
  { id:16, route:'Sakania Corridor', town:'Kitwe → Sakania',                 toll:160, council:65,  misc:35,  total:260  },
  /* Tunduma / TZ Corridor */
  { id:17, route:'Tunduma Corridor', town:'Lusaka → Tunduma (full)',         toll:950, council:240, misc:160, total:1350 },
];

/* ── BORDER POSTS ── */
var BORDER_POSTS = {
  Sakania:    {corridor:'ZM/DRC',agent:'Agent Mwamba Chisanga',hours:'24/7',    crossing:'Sakania Town, Copperbelt'},
  Nakonde:    {corridor:'ZM/TZ', agent:'Agent Bwalya Mutale',  hours:'06:00–22:00',crossing:'Nakonde, Northern Province'},
  Mokambo:    {corridor:'ZM/DRC',agent:'Agent Peter Phiri',    hours:'06:00–20:00',crossing:'Mokambo, Copperbelt'},
  Kasumbalesa:{corridor:'ZM/DRC',agent:'Agent Grace Tembo',    hours:'24/7',    crossing:'Chingola–Kasumbalesa Road'},
  Tunduma:    {corridor:'ZM/TZ', agent:'Agent Samuel Mwansa',  hours:'24/7',    crossing:'Tunduma, Muchinga Province'},
};

/* ── PROCESS STEPS ── */
var PROCESS_STEPS = [
  {n:1,title:'Documents Received',       color:'#3B8BEB',phase:'Prep'},
  {n:2,title:'Cargo Loaded & Dispatched',color:'#F0A500',phase:'Prep'},
  {n:3,title:'Exit Border Clearance',    color:'#F0A500',phase:'Border'},
  {n:4,title:'ZRA Ascuyda Entry',        color:'#CC1010',phase:'ZRA'},
  {n:5,title:'Payment Made',             color:'#0ECB7A',phase:'ZRA'},
  {n:6,title:'T1 & Release Order',       color:'#F0A500',phase:'ZRA'},
  {n:7,title:'Crossed to Congo',         color:'#0ECB7A',phase:'Transit'},
  {n:8,title:'Congo Final Destination',  color:'#E03030',phase:'Congo'},
  {n:9,title:'Offloaded at Destination', color:'#0ECB7A',phase:'Done'},
];
var STEP_LABELS = ['','Docs','Loaded','Exit Border','ZRA Entry','Payment','T1 Issued','Crossed','Congo','Offloaded'];
var STEP_COLORS = ['','#3B8BEB','#F0A500','#F0A500','#CC1010','#0ECB7A','#F0A500','#0ECB7A','#E03030','#0ECB7A'];

/* ── DEFAULT FLEET ── */
var DEFAULT_FLEET = []; /* Production: no demo trucks. Add via Staff Portal → Add Truck */

/* ── DEFAULT CLIENTS (portal accounts) ── */
var DEFAULT_CLIENTS = []; /* Production: clients register via portal → staff approve in Client Approvals */

/* ── SLA HELPER ── */
function slaHours(startISO) {
  if (!startISO) return null;
  return Math.floor((new Date() - new Date(startISO)) / 3600000);
}
function slaStatus(hours) {
  if (hours === null) return null;
  if (hours >= 36) return { level:'critical', label:'36h SLA BREACHED', color:'#E03030' };
  if (hours >= 24) return { level:'danger',   label:'24h — Demand Email Sent', color:'#E03030' };
  if (hours >= 12) return { level:'warning',  label:'12h — Reminder Sent', color:'#F0A500' };
  return { level:'ok', label: hours+'h elapsed', color:'#0ECB7A' };
}

/* ── T1 + FINE HELPERS ── */
function t1DaysLeft(exp) { if (!exp) return null; return Math.ceil((new Date(exp) - new Date()) / 86400000); }
function parkingFine(arr) {
  if (!arr) return { hours:0, overHours:0, fine:0 };
  var hrs = Math.floor((new Date() - new Date(arr)) / 3600000);
  var over = Math.max(0, hrs - 48);
  return { hours:hrs, overHours:over, fine:Math.ceil(over/24)*25 };
}

/* ── COMPLIANCE HELPER ── */
function complianceDays(dateStr) {
  if (!dateStr) return null;
  return Math.ceil((new Date(dateStr) - new Date()) / 86400000);
}
function complianceStatus(days) {
  if (days === null) return null;
  if (days < 0)  return { level:'expired', color:'#E03030', label:'EXPIRED' };
  if (days <= 7) return { level:'critical', color:'#E03030', label:days+'d left' };
  if (days <= 30) return { level:'warning', color:'#F0A500', label:days+'d left' };
  return { level:'ok', color:'#0ECB7A', label:days+'d left' };
}


/* ── DOCUMENT MISMATCH CHECKER ── */
function checkDocMismatch(fleet) {
  /* Checks for missing or mismatched documents across invoice, delivery note, T1, movement sheet */
  var flags = [];
  if (!fleet.docs) return flags;
  var required = ['invoice','deliveryNote','customsT1','movementSheet'];
  required.forEach(function(d){
    if(!fleet.docs[d]) flags.push({ type:'missing', doc:d, msg:'Missing: '+d.replace(/([A-Z])/g,' $1').trim() });
  });
  return flags;
}

/* ── COMPLIANCE EXPIRY NOTIFICATIONS ── */
function getComplianceAlerts(clients) {
  var alerts = [];
  (clients||[]).forEach(function(c){
    (c.drivers||[]).forEach(function(d){
      var checks = [
        { field:'fitness',  label:'Fitness Certificate', value:d.fitness  },
        { field:'roadTax',  label:'Road Tax',             value:d.roadTax  },
        { field:'identity', label:'Identity Document',    value:d.identity },
      ];
      checks.forEach(function(chk){
        var days = complianceDays(chk.value);
        var s    = complianceStatus(days);
        if(s && (s.level==='expired'||s.level==='critical'||s.level==='warning')){
          alerts.push({ client:c.name, driver:d.name, plate:d.plate_horse, field:chk.label, days:days, level:s.level, label:s.label, color:s.color });
        }
      });
    });
  });
  return alerts;
}

/* ── REPORT SORT BY TIME ── */
function sortByTime(items) {
  return items.slice().sort(function(a,b){
    var da = new Date(a.startDate||a.slaStart||a.joinDate||0);
    var db = new Date(b.startDate||b.slaStart||b.joinDate||0);
    return db - da; /* newest first */
  });
}


/* ── DRIVER ACCOUNTS ── */
var DEFAULT_DRIVERS = []; /* Production: created when a client onboards a driver in the Client Portal */
function getDrivers() {
  try { return JSON.parse(sessionStorage.getItem('bt_drivers')||'null') || DEFAULT_DRIVERS.map(function(d){return Object.assign({},d);}); } catch(e){ return DEFAULT_DRIVERS.map(function(d){return Object.assign({},d);}); }
}
function setDrivers(d) { sessionStorage.setItem('bt_drivers', JSON.stringify(d)); }

/* ── DRIVER AUTH ── */
function doDriverLogin() {
  var id    = ((document.getElementById('d-id')  ||{}).value||'').trim();
  var pass  = ((document.getElementById('d-pass')||{}).value||'').trim();
  if (!id||!pass) { toast('Fill all fields','Phone/plate and password required.','er'); return; }
  var drivers = getDrivers();
  // Match by phone, name, or plate (case-insensitive)
  var drv = drivers.filter(function(d){
    return d.phone===id || d.plate.toUpperCase()===id.toUpperCase() || d.name.toLowerCase()===id.toLowerCase() || d.id===id;
  })[0];
  if (!drv || drv.pass !== pass) { toast('Login Failed','Incorrect credentials. Try your phone number and password.','er'); return; }
  if(!sessionStorage.getItem('bt_fleet'))   setFleet(DEFAULT_FLEET.map(function(f){return Object.assign({},f);}));
  if(!sessionStorage.getItem('bt_clients')) setClients(DEFAULT_CLIENTS.map(function(c){return Object.assign({},c);}));
  sessionStorage.setItem('bt_session', JSON.stringify({ type:'driver', driverId:drv.id, name:drv.name, phone:drv.phone, truckId:drv.truckId, plate:drv.plate }));
  toast('Welcome, '+drv.name.split(' ')[0]+'!','Loading your portal…','ok');
  setTimeout(function(){ window.location.href='driver.html'; }, 700);
}


/* ── DYNAMIC STAFF REGISTRY (role assignment) ── */
function getStaff() { try { return JSON.parse(sessionStorage.getItem('bt_staff')||'null') || STAFF_ACCOUNTS.map(function(a){return Object.assign({},a);}); } catch(e){ return STAFF_ACCOUNTS.map(function(a){return Object.assign({},a);}); } }
function setStaff(list) { sessionStorage.setItem('bt_staff', JSON.stringify(list)); }

/* ── EMAIL NOTIFICATION (simulated — production: connect EmailJS / backend SMTP) ── */
function sendEmailNotification(to, subject, body) {
  /* Frontend simulation: records the email and confirms to the user.
     Production: replace with EmailJS (emailjs.com) or a backend endpoint. */
  var log = JSON.parse(sessionStorage.getItem('bt_emails')||'[]');
  log.unshift({ to:to, subject:subject, body:body||'', sent:new Date().toLocaleString() });
  sessionStorage.setItem('bt_emails', JSON.stringify(log.slice(0,50)));
  if (typeof toast === 'function') toast('📧 Email Sent', subject + ' → ' + to, 'ok');
  return true;
}

/* ── SESSION HELPERS ── */
function getSession()   { try { return JSON.parse(sessionStorage.getItem('bt_session')||'null'); } catch(e){ return null; } }
function getFleet()     { try { return JSON.parse(sessionStorage.getItem('bt_fleet')  ||'null') || DEFAULT_FLEET.map(function(f){return Object.assign({},f);}); } catch(e){ return DEFAULT_FLEET.map(function(f){return Object.assign({},f);}); } }
function getClients()   { try { return JSON.parse(sessionStorage.getItem('bt_clients')||'null') || DEFAULT_CLIENTS.map(function(c){return Object.assign({},c);}); } catch(e){ return DEFAULT_CLIENTS.map(function(c){return Object.assign({},c);}); } }
function getCompleted() { try { return JSON.parse(sessionStorage.getItem('bt_done')   ||'null') || []; } catch(e){ return []; } }
function getSuppliers() { try { return JSON.parse(sessionStorage.getItem('bt_suppliers')||'null') || DEFAULT_SUPPLIERS.map(function(s){return Object.assign({},s);}); } catch(e){ return DEFAULT_SUPPLIERS.map(function(s){return Object.assign({},s);}); } }
function getCosts()     { try { return JSON.parse(sessionStorage.getItem('bt_costs')  ||'null') || TRANSIT_COSTS.map(function(c){return Object.assign({},c);}); } catch(e){ return TRANSIT_COSTS.map(function(c){return Object.assign({},c);}); } }
function setFleet(d)     { sessionStorage.setItem('bt_fleet',     JSON.stringify(d)); }
function setClients(d)   { sessionStorage.setItem('bt_clients',   JSON.stringify(d)); }
function setCompleted(d) { sessionStorage.setItem('bt_done',      JSON.stringify(d)); }
function setSuppliers(d) { sessionStorage.setItem('bt_suppliers', JSON.stringify(d)); }
function setCosts(d)     { sessionStorage.setItem('bt_costs',     JSON.stringify(d)); }

/* ── TOAST ── */
function toast(ttl, sub, type) {
  type = type || 'ok';
  var wrap = document.getElementById('toast-wrap'); if (!wrap) return;
  var t = document.createElement('div');
  var ic = { ok:'fa-check', wa:'fa-triangle-exclamation', er:'fa-xmark' };
  t.className = 'toast t-' + type;
  t.innerHTML = '<div class="t-ic"><i class="fa-solid ' + (ic[type]||'fa-check') + '"></i></div><div><div class="t-ttl">' + ttl + '</div><div class="t-sub">' + sub + '</div></div>';
  wrap.appendChild(t);
  setTimeout(function(){ t.remove(); }, 4500);
}

/* ── GENERIC MODAL HELPERS ── */
function openM(id)  { var o=document.getElementById(id); if(o){o.classList.add('open');document.body.style.overflow='hidden';} }
function closeM(id) { var o=document.getElementById(id); if(o){o.classList.remove('open');document.body.style.overflow='';} }

/* ── PASSWORD RESET ── */
function openResetModal() {
  var emailField = document.getElementById('c-email');
  var resetEmail = document.getElementById('reset-email');
  if (emailField && resetEmail && emailField.value) resetEmail.value = emailField.value;
  openM('reset-modal');
}
function sendResetLink() {
  var email = ((document.getElementById('reset-email')||{}).value||'').trim().toLowerCase();
  if (!email) { toast('Email Required','Please enter your email address.','er'); return; }
  var clients = getClients();
  var match = clients.filter(function(c){ return c.email===email; })[0];
  var body = document.getElementById('reset-modal-body');
  var footer = document.getElementById('reset-modal-footer');
  if (match) {
    body.innerHTML = '<div style="text-align:center;padding:10px 0">'
      + '<div style="width:52px;height:52px;border-radius:50%;background:rgba(14,203,122,.12);display:flex;align-items:center;justify-content:center;margin:0 auto 14px"><i class="fa-solid fa-envelope-circle-check" style="font-size:22px;color:var(--ok)"></i></div>'
      + '<h4 style="font-size:14px;color:#fff;margin-bottom:6px">Reset Link Sent</h4>'
      + '<p style="font-size:12.5px;color:var(--muted);line-height:1.6">If an account exists for <strong style="color:#fff">'+email+'</strong>, a password reset link has been sent. Check your inbox (and spam folder) for further instructions.</p>'
      + '</div>';
  } else {
    body.innerHTML = '<div style="text-align:center;padding:10px 0">'
      + '<div style="width:52px;height:52px;border-radius:50%;background:rgba(14,203,122,.12);display:flex;align-items:center;justify-content:center;margin:0 auto 14px"><i class="fa-solid fa-envelope-circle-check" style="font-size:22px;color:var(--ok)"></i></div>'
      + '<h4 style="font-size:14px;color:#fff;margin-bottom:6px">Reset Link Sent</h4>'
      + '<p style="font-size:12.5px;color:var(--muted);line-height:1.6">If an account exists for <strong style="color:#fff">'+email+'</strong>, a password reset link has been sent. Check your inbox (and spam folder) for further instructions.</p>'
      + '</div>';
  }
  footer.innerHTML = '<button class="btn btn-r btn-sm" onclick="closeM(\'reset-modal\')">Done</button>';
  toast('Reset Email Sent','Check your inbox for the password reset link.','ok');
}

/* ── LOGIN MODAL ── */
function openLogin()  { var o=document.getElementById('login-ov'); if(o){o.style.display='flex';document.body.style.overflow='hidden';} }
function closeLogin() { var o=document.getElementById('login-ov'); if(o){o.style.display='none';document.body.style.overflow='';} }
function switchLTab(t) {
  ['staff','client'].forEach(function(x) {
    var tab=document.getElementById('lt-'+x), pane=document.getElementById('pane-'+x);
    if(tab)  tab.classList.toggle('active', x===t);
    if(pane) pane.classList.toggle('active', x===t);
  });
}
function setDid(type, btn) {
  document.querySelectorAll('.did-btn').forEach(function(b){ b.classList.remove('active'); });
  btn.classList.add('active');
  var ph = { phone:'Enter your phone number…', email:'Enter your email address…' };
  var el = document.getElementById('d-id'); if(el) el.placeholder = ph[type] || '';
}

/* ── STAFF AUTH ── */
function doStaffLogin() {
  var email = ((document.getElementById('s-email')||{}).value||'').trim().toLowerCase();
  var pass  = ((document.getElementById('s-pass') ||{}).value||'').trim();
  if (!email||!pass) { toast('Fill all fields','Email and password required.','er'); return; }
  if (!email.endsWith('@'+ALLOWED_DOMAIN)) { toast('Access Denied','Only @'+ALLOWED_DOMAIN+' accounts.','er'); return; }
  var user = getStaff().filter(function(u){ return u.email===email && u.pass===pass; })[0];
  if (!user) { toast('Login Failed','Incorrect email or password.','er'); return; }
  if(!sessionStorage.getItem('bt_fleet'))     setFleet(DEFAULT_FLEET.map(function(f){return Object.assign({},f);}));
  if(!sessionStorage.getItem('bt_clients'))   setClients(DEFAULT_CLIENTS.map(function(c){return Object.assign({},c);}));
  if(!sessionStorage.getItem('bt_suppliers')) setSuppliers(DEFAULT_SUPPLIERS.map(function(s){return Object.assign({},s);}));
  if(!sessionStorage.getItem('bt_costs'))     setCosts(TRANSIT_COSTS.map(function(c){return Object.assign({},c);}));
  sessionStorage.setItem('bt_session', JSON.stringify(Object.assign({},user,{type:'staff'})));
  toast('Welcome, '+user.name.split(' ')[0]+'!','Redirecting…','ok');
  setTimeout(function(){ window.location.href='admin.html'; }, 700);
}

/* ── CLIENT AUTH ── */
function doClientLogin() {
  var email = ((document.getElementById('c-email')||{}).value||'').trim().toLowerCase();
  var pass  = ((document.getElementById('c-pass') ||{}).value||'').trim();
  if (!email||!pass) { toast('Fill all fields','Email and password required.','er'); return; }
  var clients = getClients();
  var cl = clients.filter(function(c){ return c.email===email && c.clientPass===pass; })[0];
  if (!cl) { toast('Login Failed','Incorrect email or password.','er'); return; }
  sessionStorage.setItem('bt_session', JSON.stringify({ type:'client', clientId:cl.id, name:cl.contact, email:cl.email, company:cl.name, status:cl.status }));
  toast('Welcome, '+cl.contact.split(' ')[0]+'!','Redirecting to your portal…','ok');
  setTimeout(function(){ window.location.href='client.html'; }, 700);
}

/* ── GOOGLE ── */
function initGoogle() {
  if(GOOGLE_CLIENT_ID.includes('YOUR_GOOGLE')){ var n=document.getElementById('g-note'); if(n)n.style.display='block'; return; }
  if(typeof google==='undefined'||!google.accounts) return;
  try { google.accounts.id.initialize({client_id:GOOGLE_CLIENT_ID,callback:handleGoogleCB,hd:ALLOWED_DOMAIN,auto_select:false}); } catch(e){}
}
function triggerGoogle() {
  if(GOOGLE_CLIENT_ID.includes('YOUR_GOOGLE')){ toast('Setup Required','Replace GOOGLE_CLIENT_ID in shared.js.','wa'); return; }
  if(typeof google!=='undefined'&&google.accounts) google.accounts.id.prompt();
  else toast('Not Available','Use email login.','wa');
}
function handleGoogleCB(resp) {
  try {
    var p = JSON.parse(atob(resp.credential.split('.')[1].replace(/-/g,'+').replace(/_/g,'/')));
    if(!(p.email||'').endsWith('@'+ALLOWED_DOMAIN)){ toast('Access Denied','Only @'+ALLOWED_DOMAIN+' accounts.','er'); return; }
    var known = STAFF_ACCOUNTS.filter(function(u){ return u.email===p.email; })[0];
    var user = { email:p.email, name:p.name||p.email, picture:p.picture||null,
      role:known?known.role:'support', initials:(p.name||p.email).split(' ').map(function(n){return n[0];}).join('').substring(0,2).toUpperCase(),
      type:'staff', via:'google' };
    if(!sessionStorage.getItem('bt_fleet'))   setFleet(DEFAULT_FLEET.map(function(f){return Object.assign({},f);}));
    if(!sessionStorage.getItem('bt_clients')) setClients(DEFAULT_CLIENTS.map(function(c){return Object.assign({},c);}));
    sessionStorage.setItem('bt_session', JSON.stringify(user));
    toast('Welcome, '+user.name.split(' ')[0]+'!','Redirecting…','ok');
    setTimeout(function(){ window.location.href='admin.html'; }, 700);
  } catch(e){ toast('Sign-In Error','Try email login.','er'); }
}
function doLogout() {
  try { if(typeof google!=='undefined') google.accounts.id.disableAutoSelect(); } catch(e){}
  sessionStorage.removeItem('bt_session');
  window.location.href='index.html';
}

document.addEventListener('DOMContentLoaded', function() {
  initGoogle();
  var lo = document.getElementById('login-ov');
  if(lo) lo.addEventListener('click', function(e){ if(e.target===this) closeLogin(); });
  document.querySelectorAll('.modal-ov').forEach(function(el){
    el.addEventListener('click', function(e){ if(e.target===this) this.classList.remove('open'); });
  });
});
