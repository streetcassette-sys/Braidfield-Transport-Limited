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
};

/* ── STAFF ACCOUNTS ── */
var STAFF_ACCOUNTS = [
  { email:'admin@braidfieldtransport.com',    pass:'admin123',   name:'Admin User',        role:'executive',       initials:'AU' },
  { email:'customs@braidfieldtransport.com',  pass:'customs123', name:'Chanda Mwila',      role:'senior_customs',  initials:'CM' },
  { email:'territory@braidfieldtransport.com',pass:'terr123',    name:'Simon Banda',       role:'territory_mgr',   initials:'SB' },
  { email:'executive@braidfieldtransport.com',pass:'exec123',    name:'Daniel Phiri',      role:'executive',       initials:'DP' },
  { email:'supplier@braidfieldtransport.com', pass:'supp123',    name:'Felix Mwansa',      role:'supplier',        initials:'FM' },
  { email:'agent@braidfieldtransport.com',    pass:'agent123',   name:'Grace Tembo',       role:'border_agent',    initials:'GT' },
  { email:'accounts@braidfieldtransport.com', pass:'acc123',     name:'Mary Zulu',         role:'accountant',      initials:'MZ' },
  { email:'support@braidfieldtransport.com',  pass:'sup123',     name:'Peter Mutale',      role:'support',         initials:'PM' },
];
var ROLE_LABELS = {};
Object.keys(ROLES).forEach(function(k){ ROLE_LABELS[k] = ROLES[k].label; });

/* ── SUPPLIERS ── */
var DEFAULT_SUPPLIERS = [
  { id:1, name:'Kasumbalesa Clearing Ltd',   contact:'Joseph Banda',  phone:'+260977001001', email:'joseph@kasclearing.co.zm',  border:'Kasumbalesa' },
  { id:2, name:'Nakonde Freight Services',   contact:'Agnes Mwale',   phone:'+260977002002', email:'agnes@nakondefreight.co.zm', border:'Nakonde' },
  { id:3, name:'Congo Link Logistics',       contact:'Patrice Kabila', phone:'+243997003003', email:'patrice@congolink.cd',      border:'Sakania' },
  { id:4, name:'Copperbelt Customs Agency',  contact:'John Chisanga',  phone:'+260977004004', email:'john@cbcustoms.co.zm',      border:'Mokambo' },
  { id:5, name:'Tunduma Border Solutions',   contact:'Amina Hassan',   phone:'+255711005005', email:'amina@tundumasol.co.tz',    border:'Tunduma' },
];

/* ── TRANSIT COST TABLE ── */
var TRANSIT_COSTS = [
  { id:1, town:'Lusaka → Kapiri Mposhi',   toll:350, council:120, misc:80,  total:550  },
  { id:2, town:'Kapiri Mposhi → Ndola',    toll:280, council:90,  misc:60,  total:430  },
  { id:3, town:'Ndola → Kitwe',            toll:180, council:70,  misc:40,  total:290  },
  { id:4, town:'Kitwe → Chingola',         toll:150, council:60,  misc:30,  total:240  },
  { id:5, town:'Chingola → Kasumbalesa',   toll:120, council:50,  misc:25,  total:195  },
  { id:6, town:'Lusaka → Kabwe',           toll:200, council:80,  misc:50,  total:330  },
  { id:7, town:'Kabwe → Kapiri Mposhi',    toll:160, council:65,  misc:40,  total:265  },
  { id:8, town:'Lusaka → Nakonde',         toll:890, council:220, misc:150, total:1260 },
  { id:9, town:'Lusaka → Tunduma',         toll:950, council:240, misc:160, total:1350 },
  { id:10,town:'Ndola → Mokambo',          toll:200, council:75,  misc:45,  total:320  },
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
var DEFAULT_FLEET = [
  {id:1,plate:'ABZ 1234 ZM',client:'Copperbelt Mining Ltd',driver:'John Banda',phone:'+260971234567',origin:'Lusaka',dest:'Lubumbashi, DRC',border:'Kasumbalesa',processStep:4,status:'Under Clearing',shipmentStatus:'under_clearing',zraEntry:'ZRA-2026-001247',paymentRef:null,paymentAmount:null,t1Number:null,t1Generated:null,t1Expires:null,tr8Number:null,congoArrival:null,docs:{invoice:true,deliveryNote:true,customsT1:true,movementSheet:true},location:'ZRA Office',eta:'TBD',lastUpdate:'10:30',pdCompleted:false,closed:false,startDate:'2026-05-17',slaStart:'2026-05-17T08:00',supplierId:1,supplierAssigned:true,agreementGenerated:true,executiveAuthorized:true},
  {id:2,plate:'GRZ 5678 ZM',client:'DRC Minerals Corp',driver:'Peter Mwale',phone:'+260972345678',origin:'Kitwe',dest:'Kolwezi, DRC',border:'Mokambo',processStep:6,status:'Transiting',shipmentStatus:'transiting',zraEntry:'ZRA-2026-001189',paymentRef:'PAY-2026-0042',paymentAmount:2850,t1Number:'T1-2026-00892',t1Generated:'2026-05-20',t1Expires:'2026-05-25',tr8Number:null,congoArrival:null,docs:{invoice:true,deliveryNote:true,customsT1:true,movementSheet:true},location:'En route to Mokambo',eta:'2026-05-25T18:00',lastUpdate:'09:15',pdCompleted:true,closed:false,startDate:'2026-05-17',slaStart:'2026-05-17T06:00',supplierId:4,supplierAssigned:true,agreementGenerated:true,executiveAuthorized:true},
  {id:3,plate:'ABB 9012 ZM',client:'Tanzania Freight Co',driver:'Mary Zulu',phone:'+260973456789',origin:'Chipata',dest:'Dar es Salaam',border:'Nakonde',processStep:7,status:'Transiting',shipmentStatus:'transiting',zraEntry:'ZRA-2026-001156',paymentRef:'PAY-2026-0039',paymentAmount:3100,t1Number:'T1-2026-00871',t1Generated:'2026-05-18',t1Expires:'2026-05-23',tr8Number:null,congoArrival:null,docs:{invoice:true,deliveryNote:true,customsT1:true,movementSheet:true},location:'Mbeya, Tanzania',eta:'2026-05-20T08:00',lastUpdate:'11:00',pdCompleted:true,closed:false,startDate:'2026-05-16',slaStart:'2026-05-16T07:00',supplierId:2,supplierAssigned:true,agreementGenerated:true,executiveAuthorized:true},
  {id:4,plate:'GRZ 3456 ZM',client:'Copperbelt Mining Ltd',driver:'David Phiri',phone:'+260974567890',origin:'Lusaka',dest:'Lubumbashi, DRC',border:'Kasumbalesa',processStep:3,status:'Under Clearing',shipmentStatus:'under_clearing',zraEntry:null,paymentRef:null,paymentAmount:null,t1Number:null,t1Generated:null,t1Expires:null,tr8Number:null,congoArrival:null,docs:{invoice:true,deliveryNote:true,customsT1:false,movementSheet:true},location:'Kasumbalesa Border',eta:'TBD',lastUpdate:'08:45',pdCompleted:false,closed:false,startDate:'2026-05-18',slaStart:'2026-05-18T09:00',supplierId:null,supplierAssigned:false,agreementGenerated:false,executiveAuthorized:false},
  {id:5,plate:'ALZ 7890 ZM',client:'Kolwezi Resources Ltd',driver:'Grace Mwansa',phone:'+260975678901',origin:'Lusaka',dest:'Kolwezi, DRC',border:'Sakania',processStep:8,status:'Transiting',shipmentStatus:'transiting',zraEntry:'ZRA-2026-001098',paymentRef:'PAY-2026-0031',paymentAmount:2600,t1Number:'T1-2026-00814',t1Generated:'2026-05-17',t1Expires:'2026-05-22',tr8Number:'TR8-2026-00174',congoArrival:'2026-05-20T10:00',docs:{invoice:true,deliveryNote:true,customsT1:true,movementSheet:true},location:'Kolwezi, DRC',eta:'Complete',lastUpdate:'07:00',pdCompleted:true,closed:false,startDate:'2026-05-15',slaStart:'2026-05-15T08:00',supplierId:3,supplierAssigned:true,agreementGenerated:true,executiveAuthorized:true},
];

/* ── DEFAULT CLIENTS (portal accounts) ── */
var DEFAULT_CLIENTS = [
  {id:1,name:'Copperbelt Mining Ltd',contact:'Mulenga Chanda',email:'mulenga@copperbeltmining.co.zm',phone:'+260971000001',whatsapp:'+260971000001',status:'approved',
   drivers:[{name:'John Banda',plate_horse:'ABZ 1234 ZM',plate_trailer:'TRL-001 ZM',fitness:'2026-08-15',roadTax:'2026-09-01',identity:'2026-12-31',whatsapp:'+260971234567',email:'john.banda@copperbelt.co.zm'}],
   trips:2,mileage:4820,joinDate:'2026-01-15'},
  {id:2,name:'DRC Minerals Corp',contact:'Jean-Pierre K.',email:'jk@drcminerals.cd',phone:'+243991000002',whatsapp:'+243991000002',status:'approved',
   drivers:[{name:'Peter Mwale',plate_horse:'GRZ 5678 ZM',plate_trailer:'TRL-002 ZM',fitness:'2026-07-20',roadTax:'2026-08-15',identity:'2026-11-30',whatsapp:'+260972345678',email:'peter.mwale@drc.cd'}],
   trips:1,mileage:2410,joinDate:'2026-02-01'},
  {id:3,name:'Tanzania Freight Co',contact:'Amina Msangi',email:'amina@tzfreight.co.tz',phone:'+255711000003',whatsapp:'+255711000003',status:'approved',
   drivers:[{name:'Mary Zulu',plate_horse:'ABB 9012 ZM',plate_trailer:'TRL-003 ZM',fitness:'2026-06-30',roadTax:'2026-07-15',identity:'2026-10-31',whatsapp:'+260973456789',email:'mary.zulu@tzfreight.tz'}],
   trips:3,mileage:7230,joinDate:'2026-01-20'},
  {id:4,name:'Kolwezi Resources Ltd',contact:'Claude Mukeba',email:'claude@kolweziresources.cd',phone:'+243997000005',whatsapp:'+243997000005',status:'pending',
   drivers:[{name:'Grace Mwansa',plate_horse:'ALZ 7890 ZM',plate_trailer:'TRL-004 ZM',fitness:'2026-05-28',roadTax:'2026-06-10',identity:'2026-09-15',whatsapp:'+260975678901',email:'grace.mwansa@kolwezi.cd'}],
   trips:0,mileage:0,joinDate:'2026-05-18'},
  {id:5,name:'Lusaka Traders Assoc.',contact:'Chanda Mutale',email:'info@lusakatraders.co.zm',phone:'+260961000004',whatsapp:'+260961000004',status:'pending',
   drivers:[],trips:0,mileage:0,joinDate:'2026-05-19'},
];

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
  var user = STAFF_ACCOUNTS.filter(function(u){ return u.email===email && u.pass===pass; })[0];
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
