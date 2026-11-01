const $=s=>document.querySelector(s);
const esc=s=>String(s??"").replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
let G={};try{G=JSON.parse(localStorage.getItem("todo2")||"{}")}catch(e){}
let lang=G.lang==="ar"?"ar":"en",token=G.token||null,me=null,tab="dash";
const D={stats:null,orders:null,products:null,users:null},F={status:"",q:""};
const ST=["placed","processing","shipped","delivered","cancelled"],CATS=["Electronics","Phones","Fashion","Home & Kitchen","Books","Sports"];
const TX={
title:["Admin Panel","لوحة التحكم"],nDash:["Dashboard","الرئيسية"],nOrders:["Orders","الطلبات"],nProd:["Products","المنتجات"],nUsers:["Users","المستخدمون"],back:["Back to store","العودة للمتجر"],out:["Log out","تسجيل الخروج"],
revenue:["Revenue","الإيرادات"],customers:["Customers","العملاء"],byStatus:["Orders by status","الطلبات حسب الحالة"],recent:["Recent orders","أحدث الطلبات"],
colOrder:["Order","الطلب"],colDate:["Date","التاريخ"],colCust:["Customer","العميل"],colItems:["Items","المنتجات"],colTotal:["Total","الإجمالي"],colPay:["Payment","الدفع"],colStatus:["Status","الحالة"],
view:["View","عرض"],all:["All","الكل"],searchPh:["Search by order #, name, email…","ابحث برقم الطلب أو الاسم أو الإيميل…"],
placed:["Placed","تم الطلب"],processing:["Processing","قيد التجهيز"],shipped:["Shipped","تم الشحن"],delivered:["Delivered","تم التسليم"],cancelled:["Cancelled","ملغي"],
noOrders:["No orders found.","لا توجد طلبات."],updated:["Status updated","تم تحديث الحالة"],prodAdd:["+ Add product","+ إضافة منتج"],colName:["Name","الاسم"],colCat:["Category","القسم"],colPrice:["Price","السعر"],colOld:["Old price","السعر القديم"],
edit:["Edit","تعديل"],del:["Delete","حذف"],delQ:["Delete this product?","هل تريد حذف هذا المنتج؟"],saved:["Saved","تم الحفظ"],deleted:["Deleted","تم الحذف"],
fName:["Name (English)","الاسم (إنجليزي)"],fNameAr:["Name (Arabic)","الاسم (عربي)"],fCat:["Category","القسم"],fPrice:["Price (USD)","السعر (دولار)"],fOld:["Old price (USD, optional)","السعر قبل الخصم (دولار، اختياري)"],
fEmoji:["Emoji (fallback icon)","إيموجي (أيقونة بديلة)"],fImg:["Image path or https link","مسار الصورة أو رابط https"],fImgH:["e.g. images/19.jpg (put the file in public/images)","مثال: images/19.jpg (ضع الملف في public/images)"],
fDesc:["Description (English)","الوصف (إنجليزي)"],fDescAr:["Description (Arabic)","الوصف (عربي)"],save:["Save","حفظ"],cancel:["Cancel","إلغاء"],close:["Close","إغلاق"],
colRole:["Role","الدور"],colVer:["Verified","مفعّل"],colJoined:["Joined","تاريخ التسجيل"],yes:["Yes","نعم"],no:["No","لا"],admin:["Admin","مشرف"],user:["User","مستخدم"],
loginT:["Admin login","دخول المشرف"],email:["Email","البريد الإلكتروني"],password:["Password","كلمة المرور"],loginBtn:["Login","دخول"],
notAdmin:["This account is not an admin.","هذا الحساب ليس مشرفًا."],notAdminH:["Make yourself an admin by running this command in the project folder, then reload:","لتصبح مشرفًا نفّذ هذا الأمر في فولدر المشروع ثم حدّث الصفحة:"],
custInfo:["Customer","بيانات العميل"],phone:["Phone","الهاتف"],addr:["Address","العنوان"],hist:["History","السجل"],shipL:["Shipping","الشحن"],
errGen:["Something went wrong","حدث خطأ ما"],errNet:["Could not reach the server","تعذّر الاتصال بالسيرفر"],loading:["Loading…","جاري التحميل…"],cod:["Cash on delivery","الدفع عند الاستلام"],qty:["Qty","الكمية"],
cardNote:["Card payments are demo only","الدفع بالكارت تجريبي"]};
const t=k=>(TX[k]||[k,k])[lang==="ar"?1:0];
const usd=v=>"$"+Number(v||0).toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2});
const when=d=>new Date(d).toLocaleString(lang==="ar"?"ar-EG":"en-US",{year:"numeric",month:"short",day:"numeric",hour:"numeric",minute:"2-digit"});
const nst=s=>ST.includes(s)?s:"placed",sid=id=>String(id).slice(-6).toUpperCase();
const payL=m=>m==="cod"||!m?t("cod"):({visa:"Visa",mastercard:"Mastercard",meeza:"Meeza"}[m]||m);
const toast=m=>{const e=$("#toast");e.textContent=m;e.style.display="block";clearTimeout(toast.t);toast.t=setTimeout(()=>e.style.display="none",2000)};
async function api(u,o={}){
  const r=await fetch(u,{...o,headers:{"Content-Type":"application/json","X-Lang":lang,...(token?{Authorization:"Bearer "+token}:{}),...(o.headers||{})}});
  let d={};try{d=await r.json()}catch(e){}return{ok:r.ok,st:r.status,d}}
function persist(){let a={};try{a=JSON.parse(localStorage.getItem("todo2")||"{}")}catch(e){}a.lang=lang;a.token=token;a.user=me?{name:me.name,email:me.email,role:me.role}:null;try{localStorage.setItem("todo2",JSON.stringify(a))}catch(e){}}
function dirs(){document.documentElement.lang=lang;document.documentElement.dir=lang==="ar"?"rtl":"ltr"}

/* ---------- boot / login ---------- */
async function boot(){
  dirs();
  if(!token)return loginView();
  const r=await api("/api/auth/me").catch(()=>null);
  if(!r)return fatal(t("errNet"));
  if(!r.ok){token=null;me=null;persist();return loginView()}
  me=r.d;persist();
  if(me.role!=="admin")return denied();
  go(tab)}
function fatal(msg){$("#app").innerHTML=`<div class="login"><div class="box"><p>${esc(msg)}</p></div></div>`}
function loginView(err){
  $("#app").innerHTML=`<div class="login"><form id="lf" class="box"><h1>🛠 ${t("loginT")}</h1>
  <label>${t("email")}<input name="email" type="email" required autocomplete="email"></label>
  <label>${t("password")}<input name="password" type="password" required autocomplete="current-password"></label>
  <button class="btn" type="submit">${t("loginBtn")}</button><p class="err" id="lerr">${esc(err||"")}</p>
  <p class="mut"><a href="/">↩ ${t("back")}</a> · <button type="button" class="lnk" data-act="lang">🌐 ${lang==="ar"?"English":"العربية"}</button></p></form></div>`}
function denied(){
  $("#app").innerHTML=`<div class="login"><div class="box"><h1>⛔ ${t("notAdmin")}</h1><p class="mut">${esc(me.email)}</p><p>${t("notAdminH")}</p><code>node make-admin.js ${esc(me.email)}</code>
  <p><a href="/">↩ ${t("back")}</a> · <button class="lnk" data-act="out">${t("out")}</button></p></div></div>`}

/* ---------- shell / navigation ---------- */
function shell(){
  dirs();
  $("#app").innerHTML=`<div class="shell"><aside class="side"><div class="brand">To<b>Do</b><small>${t("title")}</small></div>
  <nav>${[["dash","📊","nDash"],["orders","📦","nOrders"],["products","🛍️","nProd"],["users","👥","nUsers"]].map(([k,i,n])=>`<button class="nb ${tab===k?"on":""}" data-tab="${k}">${i} ${t(n)}</button>`).join("")}</nav>
  <div class="sf"><button class="nb" data-act="lang">🌐 ${lang==="ar"?"English":"العربية"}</button><a class="nb" href="/">↩ ${t("back")}</a><button class="nb" data-act="out">⎋ ${t("out")}</button></div></aside>
  <main class="main"><div id="view"><p class="mut">${t("loading")}</p></div></main></div>`}
async function go(k){
  tab=k;shell();
  const need={dash:()=>load("stats","/api/admin/stats"),orders:()=>load("orders","/api/admin/orders"),products:()=>load("products","/api/products"),users:()=>load("users","/api/admin/users")}[k];
  await need();view()}
async function load(key,url){
  const r=await api(url).catch(()=>null);
  if(!r){$("#view").innerHTML=`<p class="err">${t("errNet")}</p>`;return}
  if(r.st===401||r.st===403){token=null;persist();return loginView()}
  if(!r.ok){$("#view").innerHTML=`<p class="err">${esc(r.d.error||t("errGen"))}</p>`;return}
  D[key]=r.d}
function view(){
  const v=$("#view");if(!v)return;
  if(tab==="dash"&&D.stats)v.innerHTML=dashView();
  else if(tab==="orders"&&D.orders)v.innerHTML=ordersView();
  else if(tab==="products"&&D.products)v.innerHTML=productsView();
  else if(tab==="users"&&D.users)v.innerHTML=usersView()}

/* ---------- dashboard ---------- */
const card=(i,l,v)=>`<div class="card"><span aria-hidden="true">${i}</span><div><small>${l}</small><b>${v}</b></div></div>`;
function dashView(){
  const s=D.stats,by={};ST.forEach(k=>by[k]=0);Object.entries(s.byStatus||{}).forEach(([k,n])=>{by[nst(k)]+=n});
  const mx=Math.max(1,...Object.values(by));
  return `<h1>${t("nDash")}</h1><div class="cards">${card("💰",t("revenue"),usd(s.revenue))}${card("📦",t("nOrders"),s.orders)}${card("👥",t("customers"),s.users)}${card("🛍️",t("nProd"),s.products)}</div>
  <div class="two"><section class="box"><h2>${t("byStatus")}</h2>${ST.map(k=>`<div class="bar"><span class="st-${k}">${t(k)}</span><i style="width:${by[k]/mx*100}%"></i><b>${by[k]}</b></div>`).join("")}</section>
  <section class="box"><h2>${t("recent")}</h2><div class="tw"><table class="tb"><tr><th>${t("colOrder")}</th><th>${t("colCust")}</th><th>${t("colTotal")}</th><th>${t("colStatus")}</th></tr>
  ${(s.recent||[]).map(o=>`<tr><td><b>#${sid(o.id)}</b><small>${when(o.createdAt)}</small></td><td>${esc(o.name)}</td><td>${usd(o.total)}</td><td><span class="badge st-${nst(o.status)}">${t(nst(o.status))}</span></td></tr>`).join("")||`<tr><td colspan="4" class="mut">${t("noOrders")}</td></tr>`}</table></div></section></div>`}

/* ---------- orders ---------- */
function ordersTable(){
  const q=F.q.toLowerCase();
  const l=D.orders.filter(o=>(!F.status||nst(o.status)===F.status)&&(!q||(sid(o.id)+" "+o.name+" "+(o.email||"")).toLowerCase().includes(q)));
  return `<table class="tb"><tr><th>${t("colOrder")}</th><th>${t("colCust")}</th><th>${t("colItems")}</th><th>${t("colTotal")}</th><th>${t("colPay")}</th><th>${t("colStatus")}</th><th></th></tr>
  ${l.map(o=>{const st=nst(o.status);return `<tr><td><b>#${sid(o.id)}</b><small>${when(o.createdAt)}</small></td><td>${esc(o.name)}<small>${esc(o.email||"")}</small></td><td>${o.items.reduce((a,i)=>a+i.qty,0)}</td><td>${usd(o.total)}</td><td>${esc(payL(o.paymentMethod))}</td>
  <td><select class="stsel st-${st}" data-os="${o.id}" aria-label="${t("colStatus")}">${ST.map(k=>`<option value="${k}" ${k===st?"selected":""}>${t(k)}</option>`).join("")}</select></td><td><button class="sm" data-view="${o.id}">${t("view")}</button></td></tr>`}).join("")||`<tr><td colspan="7" class="mut">${t("noOrders")}</td></tr>`}</table>`}
function ordersView(){
  return `<h1>${t("nOrders")}</h1><div class="tools"><input id="oq" type="search" placeholder="${t("searchPh")}" value="${esc(F.q)}"><select id="ofs"><option value="">${t("all")}</option>${ST.map(k=>`<option value="${k}" ${F.status===k?"selected":""}>${t(k)}</option>`).join("")}</select></div><div class="tw" id="otb">${ordersTable()}</div>`}
const modal=h=>{$("#modal").innerHTML=`<div class="mshade" data-x><div class="mbox" role="dialog">${h}</div></div>`};
const closeM=()=>{$("#modal").innerHTML=""};
function orderModal(o){
  modal(`<h2>${t("colOrder")} #${sid(o.id)}</h2><p class="mut">${when(o.createdAt)}</p>
  <div class="grid2"><div><h3>${t("custInfo")}</h3><p><b>${esc(o.name)}</b><br>${esc(o.email||"")}<br>${t("phone")}: <bdi>${esc(o.phone)}</bdi><br>${t("addr")}: ${esc(o.address)}</p></div>
  <div><h3>${t("colPay")}</h3><p>${esc(payL(o.paymentMethod))}${o.paymentStatus==="paid-demo"?`<br><small class="mut">${t("cardNote")}</small>`:""}<br>${t("colStatus")}: ${t(nst(o.status))}</p></div></div>
  <h3>${t("colItems")}</h3><div class="tw"><table class="tb">${o.items.map(i=>`<tr><td>${esc(i.name)}</td><td>${t("qty")}: ${i.qty}</td><td>${usd(i.price*i.qty)}</td></tr>`).join("")}</table></div>
  <p class="tot">${t("shipL")}: ${usd(o.shipping)} · ${t("colTotal")}: <b>${usd(o.total)}</b></p>
  <h3>${t("hist")}</h3><ul class="hist">${(o.history||[]).map(h=>`<li>${t(nst(h.status))} — ${when(h.at)}</li>`).join("")||`<li>${t("placed")} — ${when(o.createdAt)}</li>`}</ul>
  <div class="mf"><button class="btn ghost" data-x>${t("close")}</button></div>`)}

/* ---------- products ---------- */
function productsView(){
  return `<h1>${t("nProd")}</h1><div class="tools"><button class="btn" data-add>${t("prodAdd")}</button></div><div class="tw"><table class="tb"><tr><th></th><th>${t("colName")}</th><th>${t("colCat")}</th><th>${t("colPrice")}</th><th>${t("colOld")}</th><th></th></tr>
  ${[...D.products].sort((a,b)=>a.id-b.id).map(p=>`<tr><td><div class="thumb"><span>${esc(p.e||"🛍️")}</span>${p.img?`<img src="${esc(p.img)}" alt="" onerror="this.remove()">`:""}</div></td><td><b>${esc(lang==="ar"&&p.nameAr?p.nameAr:p.name)}</b><small>#${p.id}</small></td><td>${esc(p.cat)}</td><td>${usd(p.price)}</td><td>${p.old>p.price?usd(p.old):"—"}</td>
  <td><button class="sm" data-edit="${p.id}">${t("edit")}</button> <button class="sm red" data-del="${p.id}">${t("del")}</button></td></tr>`).join("")}</table></div>`}
function productModal(p){
  const v=k=>esc(p?p[k]??"":"");
  modal(`<h2>${p?t("edit")+" #"+p.id:t("prodAdd")}</h2><form class="fm" id="pf"><input type="hidden" name="id" value="${p?p.id:""}">
  <label>${t("fName")}<input name="name" required maxlength="120" value="${v("name")}"></label><label>${t("fNameAr")}<input name="nameAr" maxlength="120" value="${v("nameAr")}"></label>
  <div class="grid2"><label>${t("fCat")}<select name="cat">${CATS.map(c=>`<option ${p&&p.cat===c?"selected":""}>${c}</option>`).join("")}</select></label><label>${t("fEmoji")}<input name="e" maxlength="8" value="${v("e")}"></label></div>
  <div class="grid2"><label>${t("fPrice")}<input name="price" type="number" step="0.01" min="0" required value="${v("price")}"></label><label>${t("fOld")}<input name="old" type="number" step="0.01" min="0" value="${p&&p.old>p.price?p.old:""}"></label></div>
  <label>${t("fImg")}<input name="img" value="${v("img")}" placeholder="images/19.jpg"><small>${t("fImgH")}</small></label>
  <label>${t("fDesc")}<textarea name="desc" rows="2" maxlength="600">${v("desc")}</textarea></label><label>${t("fDescAr")}<textarea name="descAr" rows="2" maxlength="600">${v("descAr")}</textarea></label>
  <p class="err" id="ferr"></p><div class="mf"><button type="button" class="btn ghost" data-x>${t("cancel")}</button><button class="btn" type="submit">${t("save")}</button></div></form>`)}
async function saveProduct(f){
  const g=n=>f.elements[n].value.trim(),id=g("id");
  const body={name:g("name"),nameAr:g("nameAr"),cat:g("cat"),price:g("price"),old:g("old"),e:g("e"),img:g("img"),desc:g("desc"),descAr:g("descAr")};
  const r=await api(id?"/api/admin/products/"+id:"/api/admin/products",{method:id?"PUT":"POST",body:JSON.stringify(body)}).catch(()=>null);
  if(!r)return $("#ferr").textContent=t("errNet");
  if(!r.ok)return $("#ferr").textContent=r.d.error||t("errGen");
  toast(t("saved"));closeM();await load("products","/api/products");view()}

/* ---------- users ---------- */
function usersView(){
  return `<h1>${t("nUsers")}</h1><div class="tw"><table class="tb"><tr><th>${t("colName")}</th><th>${t("email")}</th><th>${t("colRole")}</th><th>${t("colVer")}</th><th>${t("colJoined")}</th></tr>
  ${D.users.map(u=>`<tr><td><b>${esc(u.name)}</b></td><td>${esc(u.email)}</td><td><span class="badge">${t(u.role==="admin"?"admin":"user")}</span></td><td>${u.verified?"✅ "+t("yes"):"⏳ "+t("no")}</td><td>${u.createdAt?when(u.createdAt):"—"}</td></tr>`).join("")}</table></div>`}

/* ---------- events ---------- */
document.addEventListener("click",async e=>{
  const x=e.target.closest("[data-tab],[data-act],[data-view],[data-add],[data-edit],[data-del],[data-x]");if(!x)return;
  if(x.matches("[data-x]")&&x.classList.contains("mshade")&&e.target!==x)return;
  const d=x.dataset;
  if(d.tab)go(d.tab);
  else if(d.act==="lang"){lang=lang==="ar"?"en":"ar";persist();dirs();me&&me.role==="admin"?(shell(),view()):boot()}
  else if(d.act==="out"){token=null;me=null;persist();loginView()}
  else if(d.view){const o=D.orders.find(o=>o.id===d.view);if(o)orderModal(o)}
  else if("add" in d)productModal(null);
  else if(d.edit){const p=D.products.find(p=>p.id==d.edit);if(p)productModal(p)}
  else if(d.del){
    if(!confirm(t("delQ")))return;
    const r=await api("/api/admin/products/"+d.del,{method:"DELETE"}).catch(()=>null);
    if(r&&r.ok){toast(t("deleted"));await load("products","/api/products");view()}else toast((r&&r.d.error)||t("errGen"))}
  else if("x" in d)closeM()});
document.addEventListener("change",async e=>{
  const s=e.target;
  if(s.dataset.os){
    const r=await api("/api/admin/orders/"+s.dataset.os+"/status",{method:"PATCH",body:JSON.stringify({status:s.value})}).catch(()=>null);
    if(r&&r.ok){const o=D.orders.find(o=>o.id===s.dataset.os);if(o){o.status=s.value;(o.history=o.history||[]).push({status:s.value,at:new Date().toISOString()})}s.className="stsel st-"+s.value;toast(t("updated"))}
    else{toast((r&&r.d.error)||t("errGen"));go("orders")}}
  else if(s.id==="ofs"){F.status=s.value;$("#otb").innerHTML=ordersTable()}});
document.addEventListener("input",e=>{if(e.target.id==="oq"){F.q=e.target.value.trim();$("#otb").innerHTML=ordersTable()}});
document.addEventListener("submit",async e=>{
  e.preventDefault();const f=e.target;
  if(f.id==="pf")return saveProduct(f);
  if(f.id==="lf"){
    const r=await api("/api/auth/login",{method:"POST",body:JSON.stringify({email:f.elements.email.value,password:f.elements.password.value})}).catch(()=>null);
    if(!r)return loginView(t("errNet"));
    if(!r.ok)return loginView(r.d.error||t("errGen"));
    token=r.d.token;me=r.d.user;persist();boot()}});
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeM()});
boot();
