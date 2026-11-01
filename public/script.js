const $=s=>document.querySelector(s);
const esc=s=>String(s??"").replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));

/* ---------- translations: key:[English, Arabic] ---------- */
const TX={
top1:["🚚 Free Shipping on orders over {99}","🚚 شحن مجاني للطلبات فوق {99}"],top2:["🏷️ Special Discounts Up to 50%","🏷️ خصومات خاصة تصل إلى 50%"],follow:["Follow Us:","تابعنا:"],ph:["Search for products...","ابحث عن منتج..."],
wishL:["Wishlist","المفضلة"],cartL:["Cart","السلة"],allc:["☰ All Categories ⌄","☰ كل الأقسام ⌄"],
nHome:["🏠 Home","🏠 الرئيسية"],nProd:["▦ Products","▦ المنتجات"],nOff:["🏷️ Offers","🏷️ العروض"],nAbout:["ⓘ About","ⓘ من نحن"],nContact:["🎧 Contact","🎧 اتصل بنا"],
f1b:["Free Shipping","شحن مجاني"],f1s:["On Orders Over {99}","للطلبات فوق {99}"],f2b:["Secure Payment","دفع آمن"],f2s:["Your Info is Safe","بياناتك محمية"],
f3b:["24/7 Support","دعم على مدار الساعة"],f3s:["We’re Here to Help","نحن هنا لمساعدتك"],f4b:["Easy Returns","إرجاع سهل"],f4s:["No Hassle","بدون تعقيد"],
cats:["▦ Categories","▦ الأقسام"],pop:["🔥 Popular Products","🔥 الأكثر طلبًا"],viewAll:["View All →","عرض الكل ←"],sortBy:["Sort by","الترتيب"],
s0:["Featured","مميز"],s1:["Price: Low to High","السعر: الأقل أولًا"],s2:["Price: High to Low","السعر: الأعلى أولًا"],s3:["Top Rated","الأعلى تقييمًا"],foot:["© 2026 ToDo. All rights reserved.","© 2026 ToDo. جميع الحقوق محفوظة."],
close:["Close","إغلاق"],tabL:["Login","تسجيل الدخول"],tabR:["Register","حساب جديد"],lName:["Full name","الاسم الكامل"],lEmail:["Email","البريد الإلكتروني"],lPass:["Password","كلمة المرور"],lPass2:["Confirm password","تأكيد كلمة المرور"],
lPhone:["Phone (digits only)","رقم الهاتف (أرقام فقط)"],lAddr:["Delivery address","عنوان التوصيل"],myAcc:["My Account","حسابي"],signOut:["Sign out","تسجيل الخروج"],checkout:["Checkout","إتمام الطلب"],place:["Place Order","تأكيد الطلب"],
botT:["🤖 ToDo Assistant","🤖 مساعد ToDo"],botPh:["Ask about products, deals…","اسأل عن منتج أو عرض…"],send:["Send","إرسال"],
setT:["Settings","الإعدادات"],setLang:["Language","اللغة"],setCur:["Currency","العملة"],setTheme:["Theme","المظهر"],thA:["Auto","تلقائي"],thL:["Light","فاتح"],thD:["Dark","داكن"],
rateNote:["Exchange rates are approximate and for display only. Orders are recorded in US dollars.","أسعار الصرف تقريبية وللعرض فقط. يتم تسجيل الطلبات بالدولار الأمريكي."],
login:["Login","تسجيل الدخول"],hello:["Hello,","أهلًا،"],reg:["/ Register","/ حساب جديد"],
kick1:["Welcome to ToDo","أهلًا بك في ToDo"],h1a:["Shop Smart.","تسوّق بذكاء."],h1b:["Live Better.","عِش أفضل."],h1t:["Discover the latest products with the best prices!","اكتشف أحدث المنتجات بأفضل الأسعار!"],
kick2:["Hot Deals","عروض ساخنة"],h2a:["Big Savings.","وفّر أكثر."],h2b:["Every Day.","كل يوم."],h2t:["Up to 50% off on the products you love.","خصومات تصل إلى 50% على منتجاتك المفضلة."],
kick3:["New Season","موسم جديد"],h3a:["Style Meets","الأناقة تلتقي"],h3b:["Comfort.","بالراحة."],h3t:["Fresh fashion picks for every day.","اختيارات أزياء جديدة ليومك."],shop:["Shop Now →","تسوّق الآن ←"],
allP:["All Products","كل المنتجات"],resFor:["Results for “{0}”","نتائج «{0}»"],offT:["Special Offers","العروض الخاصة"],noRes:["No products found. Try another search or category.","لا توجد منتجات. جرّب بحثًا أو قسمًا آخر."],
off:["{0}% OFF","خصم {0}%"],addC:["🛒 Add to Cart","🛒 أضف إلى السلة"],addC2:["Add to Cart","أضف إلى السلة"],reviews:["({0} reviews)","({0} تقييم)"],buy:["Buy Now","اشترِ الآن"],qty:["Quantity","الكمية"],related:["Related products","منتجات مشابهة"],
inStock:["✔ In stock","✔ متوفر في المخزون"],deliv:["🚚 Delivery in 2–4 days","🚚 توصيل خلال 2 إلى 4 أيام"],ret:["↩ Free returns within 14 days","↩ إرجاع مجاني خلال 14 يومًا"],cod:["💵 Cash on delivery","💵 الدفع عند الاستلام"],
cartT:["Shopping Cart","سلة التسوق"],sub:["Subtotal","المجموع الفرعي"],shipL:["Shipping","الشحن"],free:["Free","مجاني"],total:["Total","الإجمالي"],totalCod:["Total (cash on delivery)","الإجمالي (الدفع عند الاستلام)"],
chk:["Checkout","إتمام الشراء"],cartE:["Your cart is empty. Add something you like!","سلتك فارغة. أضف منتجًا يعجبك!"],wishT:["Wishlist","المفضلة"],wishE:["Your wishlist is empty. Tap ♡ on any product.","قائمة المفضلة فارغة. اضغط ♡ على أي منتج."],add:["Add","أضف"],
added:["Added to cart","تمت الإضافة إلى السلة"],outT:["Signed out","تم تسجيل الخروج"],welcome:["Welcome, {0}","أهلًا {0}"],ordered:["Order placed ✔ #{0}","تم تأكيد طلبك ✔ رقم #{0}"],
eSrv:["Could not reach the server. Is it running?","تعذّر الاتصال بالسيرفر. هل هو شغّال؟"],eGen:["Something went wrong","حدث خطأ ما"],
eReg:["Enter your name and a valid email","أدخل اسمك وبريدًا صحيحًا"],eLog:["Enter your email and password","أدخل بريدك وكلمة المرور"],ePw:["Your password does not meet all the requirements","كلمة المرور لا تحقق كل الشروط"],eMatch:["The passwords do not match","كلمتا المرور غير متطابقتين"],
eOrd:["Enter your name, a phone number (digits only) and your address","أدخل اسمك ورقم هاتف (أرقام فقط) وعنوانك"],createAcc:["Create account","إنشاء حساب"],
r1:["At least 8 characters","8 أحرف على الأقل"],r2:["An uppercase letter (A-Z)","حرف إنجليزي كبير (A-Z)"],r3:["A lowercase letter (a-z)","حرف إنجليزي صغير (a-z)"],r4:["A number (0-9)","رقم (0-9)"],r5:["A special character (! @ # $ %)","رمز خاص (! @ # $ %)"],
abT:["About ToDo","عن ToDo"],abP:["ToDo is a full-stack online store: Node.js, Express and MongoDB on the back end, and plain HTML, CSS and JavaScript on the front end.","ToDo متجر إلكتروني متكامل: Node.js وExpress وMongoDB في الخلفية، وHTML وCSS وJavaScript في الواجهة."],
abN:["Edit this text in script.js to tell your own story.","عدّل هذا النص في script.js ليحكي قصتك."],ctT:["Contact Us","اتصل بنا"],ctP:["📧 support@todo.example\n📞 +00 000 000 0000\n🕘 Sun–Thu, 9 AM – 6 PM","📧 support@todo.example\n📞 ‎+00 000 000 0000\n🕘 الأحد–الخميس، 9 ص – 6 م"],ctN:["Replace these placeholders with your real details.","استبدل هذه البيانات التجريبية ببياناتك الحقيقية."],
hi:["Hi! I’m the ToDo assistant. Ask me about products, deals or shipping.","أهلًا! أنا مساعد ToDo. اسألني عن المنتجات أو العروض أو الشحن."],
bCartN:["You have {0} item(s) in your cart. Subtotal: {1}","عندك {0} منتج في السلة. المجموع الفرعي: {1}"],bCartE:["Your cart is empty right now.","سلتك فارغة حاليًا."],bShip:["Shipping is free on orders over {0}, otherwise {1}. Payment is cash on delivery.","الشحن مجاني للطلبات فوق {0}، وإلا فهو {1}. الدفع عند الاستلام."],
bRet:["You can return any item within 14 days of delivery.","يمكنك إرجاع أي منتج خلال 14 يومًا من الاستلام."],bDeals:["Biggest discounts:","أكبر الخصومات:"],bFound:["Here’s what I found:","وجدت لك:"],bHelp:["I can help with products, deals, shipping, returns or your cart. Try “deals” or a category name.","أقدر أساعدك في المنتجات والعروض والشحن والإرجاع والسلة. جرّب «عروض» أو اسم قسم."],
off2:["{0}% off","خصم {0}%"],
cpT:["Your Shopping Cart","سلة التسوق"],cpS:["Review your items before checkout","راجع منتجاتك قبل إتمام الشراء"],clear:["Clear Cart","إفراغ السلة"],cleared:["Cart cleared","تم إفراغ السلة"],
osT:["Order Summary","ملخص الطلب"],subN:["Subtotal ({0} items)","المجموع الفرعي ({0} منتج)"],shipFee:["Shipping Fee","رسوم الشحن"],freeShip:["Free Shipping","شحن مجاني"],
moreFree:["Add {0} more to get free shipping","أضف {0} للحصول على شحن مجاني"],proceed:["Proceed to Checkout →","إتمام الشراء ←"],or:["Or","أو"],ppay:["Pay with","ادفع عبر"],ppNote:["PayPal is not connected yet.","PayPal غير مفعّل بعد."],
contShop:["Continue Shopping","متابعة التسوق"],inStockS:["In Stock","متوفر"],remove:["Remove","حذف"],
c1b:["Secure Checkout","إتمام آمن"],c1s:["Your information is safe","بياناتك محمية"],c2b:["24/7 Support","دعم على مدار الساعة"],c2s:["We’re here to help","نحن هنا لمساعدتك"],
c3b:["Easy Returns","إرجاع سهل"],c3s:["No hassle","بدون تعقيد"],c4b:["Fast Delivery","توصيل سريع"],c4s:["Get your order quickly","استلم طلبك بسرعة"],accept:["We accept","وسائل الدفع"],
wishTitle:["My Wishlist","قائمتي المفضلة"],wishSub:["Your favorite items, all in one place","منتجاتك المفضلة في مكان واحد"],clearW:["Clear Wishlist","إفراغ المفضلة"],wItems:["{0} items in your wishlist","{0} منتج في مفضلتك"],wCleared:["Wishlist cleared","تم إفراغ المفضلة"],
mOrd:["My Orders","طلباتي"],mWish:["My Wishlist","مفضلتي"],mAddr:["My Addresses","عناويني"],mSet:["Account Settings","إعدادات الحساب"],mOut:["Logout","تسجيل الخروج"],guest:["Guest","زائر"],soon:["Coming soon","قريبًا"],
ordEmpty:["You have no orders yet.","ليس لديك طلبات بعد."],stNew:["New","جديد"],itemsN:["{0} item(s)","{0} منتج"],payM:["Payment method","طريقة الدفع"],demoNote:["Demo mode: no real payment is processed. Use a test card such as 4242 4242 4242 4242, any future date and any CVV.","وضع تجريبي: لا يتم خصم أي مبلغ فعلي. استخدم بطاقة اختبار مثل 4242 4242 4242 4242 وأي تاريخ مستقبلي وأي CVV."],
codNote:["Pay in cash when your order arrives.","ادفع نقدًا عند وصول طلبك."],codS:["Cash on delivery","الدفع عند الاستلام"],cardNo:["Card number","رقم البطاقة"],cardExp:["Expiry (MM/YY)","تاريخ الانتهاء (MM/YY)"],cardName:["Name on card","الاسم على البطاقة"],
eLuhn:["Invalid card number","رقم البطاقة غير صحيح"],eBrand:["The card number doesn’t match the selected card type","رقم البطاقة لا يطابق نوع البطاقة المختار"],eExp:["Invalid or expired date","تاريخ غير صحيح أو منتهي"],eCvv:["Invalid CVV","رمز CVV غير صحيح"],eHolder:["Enter the name on the card","أدخل الاسم على البطاقة"],
orderedD:["Order placed (demo payment) ✔ #{0}","تم تأكيد طلبك (دفع تجريبي) ✔ رقم #{0}"],loginToOrder:["Please log in to place your order","سجّل الدخول لإتمام الطلب"],savedAddr:["Saved addresses","العناوين المحفوظة"],addrEmpty:["No saved addresses yet. They appear after your first order.","لا توجد عناوين محفوظة بعد. ستظهر بعد أول طلب."],
lCode:["Verification code","كود التحقق"],lNewPass:["New password","كلمة المرور الجديدة"],forgot:["Forgot password?","نسيت كلمة المرور؟"],resend:["Resend code","إعادة إرسال الكود"],resendIn:["Resend in {0}s","إعادة الإرسال بعد {0} ث"],backLogin:["Back to login","العودة لتسجيل الدخول"],
vTitle:["Verify your email","تأكيد البريد الإلكتروني"],vMsg:["We sent a 6-digit code to {0}. Enter it below (valid for 10 minutes).","أرسلنا كودًا من 6 أرقام إلى {0}. أدخله هنا (صالح 10 دقائق)."],fTitle:["Reset your password","استعادة كلمة المرور"],fMsg:["Enter your email and we’ll send you a code.","أدخل بريدك وسنرسل لك كودًا."],
rMsg:["If this email is registered, we sent a code to {0}. Enter it with your new password.","إذا كان هذا البريد مسجلًا فقد أرسلنا كودًا إلى {0}. أدخله مع كلمة المرور الجديدة."],btnVerify:["Verify","تأكيد"],btnSend:["Send code","إرسال الكود"],btnReset:["Reset password","تغيير كلمة المرور"],
eCode:["Enter the 6-digit code","أدخل الكود المكوّن من 6 أرقام"],eEmail:["Enter a valid email","أدخل بريدًا صحيحًا"],sent:["Code sent","تم إرسال الكود"],passReset:["Password updated","تم تغيير كلمة المرور"],
trackT1:["Track Your","تتبّع"],trackT2:["Order","طلبك"],trackSub:["Follow the latest updates on all your orders","تابع آخر تحديثات جميع طلباتك"],backAcc:["Back to Account","العودة إلى الحساب"],loginOrders:["Please log in to view your orders","سجّل الدخول لعرض طلباتك"],
orderN:["Order","طلب"],placedOn:["Placed on","تاريخ الطلب"],statusL:["Status","الحالة"],stPending:["Pending","قيد الانتظار"],qtyL:["Qty: {0}","الكمية: {0}"],needHelp:["Need Help?","تحتاج مساعدة؟"],contactSup:["Contact Support","تواصل مع الدعم"],
st_placed:["Order Placed","تم الطلب"],st_processing:["Processing","قيد التجهيز"],st_shipped:["Shipped","تم الشحن"],st_delivered:["Delivered","تم التسليم"],
bd_placed:["Order Placed","تم الطلب"],bd_processing:["Processing","قيد التجهيز"],bd_shipped:["In Transit","في الطريق"],bd_delivered:["Delivered","تم التسليم"],bd_cancelled:["Cancelled","ملغي"],
m_placed:["We’ve received your order!","استلمنا طلبك!"],ms_placed:["We’ll start preparing it shortly.","سنبدأ بتجهيزه قريبًا."],m_processing:["We’re preparing your order","نقوم بتجهيز طلبك"],ms_processing:["Your items are being packed.","يتم تعبئة منتجاتك."],
m_shipped:["Your order is on the way!","طلبك في الطريق إليك!"],ms_shipped:["It will arrive soon. Thank you for shopping with ToDo!","سيصلك قريبًا. شكرًا لتسوقك من ToDo!"],m_delivered:["Your order has been delivered","تم تسليم طلبك"],ms_delivered:["We hope you enjoy it. Thank you for shopping with ToDo!","نتمنى أن ينال إعجابك. شكرًا لتسوقك من ToDo!"],
m_cancelled:["This order was cancelled","تم إلغاء هذا الطلب"],ms_cancelled:["Contact support if you need help.","تواصل مع الدعم إذا احتجت مساعدة."],
adminP:["Admin Panel","لوحة التحكم"],wishE2:["Your wishlist is empty. Tap ♡ on any product to save it here.","قائمة المفضلة فارغة. اضغط ♡ على أي منتج لحفظه هنا."]};
const t=k=>(TX[k]||[k,k])[S.lang==="ar"?1:0];
const tf=(k,...a)=>t(k).replace(/\{(\d)\}/g,(_,i)=>a[i]);

/* ---------- currency (display only; prices are stored in USD) ---------- */
const CUR={USD:[1,"$","$",1,2],EGP:[50,"EGP","ج.م",0,0],SAR:[3.75,"SAR","ر.س",0,0],AED:[3.67,"AED","د.إ",0,0],EUR:[.92,"€","€",1,2]}; // [rate, en, ar, symbol first, decimals]
function money(v,fixed){const c=CUR[S.cur]||CUR.USD,x=+(v*c[0]).toFixed(c[4]);
  const n=x.toLocaleString("en-US",{minimumFractionDigits:fixed||!Number.isInteger(x)?c[4]:0,maximumFractionDigits:c[4]}),sym=S.lang==="ar"?c[2]:c[1];
  return "\u2066"+(c[3]?sym+n:n+" "+sym)+"\u2069"}

/* ---------- data ---------- */
const CATS=[["Electronics","🎧","إلكترونيات"],["Phones","📱","موبايلات"],["Fashion","👟","أزياء"],["Home & Kitchen","🏠","منزل ومطبخ"],["Books","📚","كتب"],["Sports","🏋️","رياضة"]];
const catName=k=>{const c=CATS.find(c=>c[0]===k);return c?(S.lang==="ar"?c[2]:c[0]):k};
const DESC={en:{"Electronics":"Reliable electronics with solid build quality and everyday performance. Backed by a one-year warranty.","Phones":"Genuine phone gear that works with most modern devices. Replacement guarantee on manufacturing defects.","Fashion":"Comfortable fabrics and a modern look for everyday wear. Several sizes available.","Home & Kitchen":"Practical for any home: easy to clean, easy to use and built from durable materials.","Books":"Brand-new edition with a good cover and comfortable paper for reading.","Sports":"Durable sports gear for training at home or at the gym."},
ar:{"Electronics":"أجهزة إلكترونية بجودة تصنيع عالية وأداء ثابت للاستخدام اليومي، مع ضمان سنة.","Phones":"ملحقات موبايل أصلية متوافقة مع أغلب الأجهزة الحديثة، مع ضمان استبدال عند عيوب التصنيع.","Fashion":"خامات مريحة وتصميم عصري للاستخدام اليومي، وتتوفر عدة مقاسات.","Home & Kitchen":"منتج عملي للمنزل، سهل التنظيف والاستخدام ومصنوع من خامات متينة.","Books":"طبعة جديدة بغلاف جيد وورق مريح للقراءة.","Sports":"معدات رياضية متينة للتمرين في المنزل أو النادي."}};
const LOCAL=[[1, "Wireless Bluetooth Headphones", "سماعات بلوتوث لاسلكية", "Electronics", 49, 69, 4.5, 312, "🎧"], [2, "Slim Laptop 15\" 16GB RAM", "لابتوب 15 بوصة 16GB رام", "Electronics", 649, 799, 4.6, 128, "💻"], [3, "Sport Smartwatch", "ساعة ذكية رياضية", "Electronics", 59, 79, 4.2, 540, "⌚"], [4, "Wi-Fi Security Camera", "كاميرا مراقبة واي فاي", "Electronics", 29, 39, 4.1, 203, "📷"], [5, "Smartphone 128GB AMOLED", "هاتف 128GB شاشة AMOLED", "Phones", 299, 349, 4.4, 890, "📱"], [6, "65W Fast Charger", "شاحن سريع 65 واط", "Phones", 19, 26, 4.7, 1420, "🔌"], [7, "Protective Phone Case", "جراب حماية للهاتف", "Phones", 9, 15, 4.0, 2100, "📲"], [8, "Men's Casual Sneakers", "حذاء كاجوال رجالي", "Fashion", 45, 65, 4.3, 430, "👟"], [9, "Waterproof Backpack", "حقيبة ظهر مقاومة للماء", "Fashion", 29, 42, 4.5, 760, "🎒"], [10, "Polarized Sunglasses", "نظارة شمسية مستقطبة", "Fashion", 24, 35, 4.1, 310, "🕶️"], [11, "600W Countertop Blender", "خلاط كهربائي 600 واط", "Home & Kitchen", 39, 52, 4.4, 520, "🥤"], [12, "10-Piece Cookware Set", "طقم أواني طهي 10 قطع", "Home & Kitchen", 89, 120, 4.6, 260, "🍳"], [13, "LED Desk Lamp", "مصباح مكتب LED", "Home & Kitchen", 17, 24, 4.3, 610, "💡"], [14, "Learn Programming from Scratch", "كتاب تعلّم البرمجة من الصفر", "Books", 14, 19, 4.8, 95, "📘"], [15, "Bestselling Novel", "رواية الأكثر مبيعًا", "Books", 9, 13, 4.6, 340, "📖"], [16, "Adjustable Dumbbell Set", "طقم دامبل قابل للتعديل", "Sports", 79, 99, 4.4, 180, "🏋️"], [17, "Non-Slip Yoga Mat", "سجادة يوجا غير قابلة للانزلاق", "Sports", 18, 25, 4.5, 420, "🧘"], [18, "Insulated Water Bottle", "زجاجة مياه حرارية", "Sports", 15, 21, 4.7, 980, "🍶"]].map(a=>({id:a[0],name:a[1],nameAr:a[2],cat:a[3],price:a[4],old:a[5],rate:a[6],n:a[7],e:a[8],img:"images/"+a[0]+".jpg"}));
let P=LOCAL;
let S={cart:{},wish:[],cat:"",q:"",offers:false,sort:"",user:null,token:null,theme:"auto",lang:"en",cur:"USD",pm:"cod",hs:0,nav:"home"};
try{Object.assign(S,JSON.parse(localStorage.getItem("todo2")||"{}"))}catch(e){}
const sv=()=>{try{localStorage.setItem("todo2",JSON.stringify({cart:S.cart,wish:S.wish,user:S.user,token:S.token,theme:S.theme,lang:S.lang,cur:S.cur,pm:S.pm}))}catch(e){}};
const pn=p=>S.lang==="ar"&&p.nameAr?p.nameAr:p.name;
const pdesc=p=>(S.lang==="ar"?p.descAr:p.desc)||DESC[S.lang][p.cat]||"";
const disc=p=>p.old>p.price?Math.round(100-p.price/p.old*100):0;
const stars=r=>{const n=Math.round(r);return "★".repeat(n)+"☆".repeat(5-n)};
const toast=m=>{const e=$("#toast");e.textContent=m;e.style.display="block";clearTimeout(toast.t);toast.t=setTimeout(()=>e.style.display="none",2000)};
const goTo=s=>$(s).scrollIntoView({behavior:"smooth"});
const api=(u,o={})=>fetch(u,{...o,headers:{"X-Lang":S.lang,...(o.headers||{})}});
function theme(){document.documentElement.removeAttribute("data-theme");if(S.theme!=="auto")document.documentElement.dataset.theme=S.theme}

/* ---------- language ---------- */
function applyStatic(){
  document.querySelectorAll("[data-i]").forEach(e=>e.textContent=t(e.dataset.i).replace("{99}",money(99)));
  document.querySelectorAll("[data-ip]").forEach(e=>e.placeholder=t(e.dataset.ip));
  document.querySelectorAll("[data-ia]").forEach(e=>e.setAttribute("aria-label",t(e.dataset.ia)));
}
function applyLang(){
  document.documentElement.lang=S.lang;document.documentElement.dir=S.lang==="ar"?"rtl":"ltr";
  applyStatic();hero();render();cart();wish();user();authMode(mode);
  $("#msgs").innerHTML="";say(t("hi"));
  if($("#prodM").classList.contains("on")&&curP)showP(curP);
  $("#sLang").value=S.lang;$("#sCur").value=S.cur;$("#sTheme").value=S.theme;sv()}

/* ---------- products ---------- */
const card=p=>{const d=disc(p),w=S.wish.some(x=>x==p.id);
return `<article class="pc">${d?`<span class="bd">${tf("off",d)}</span>`:""}<button class="hrt ${w?"on":""}" data-w="${p.id}" aria-label="♥">${w?"♥":"♡"}</button>
<div class="pimg" data-v="${p.id}"><span aria-hidden="true">${p.e}</span><img src="${esc(p.img)}" alt="${esc(pn(p))}" loading="lazy" onerror="this.remove()"></div>
<div class="pi"><h3><button class="lnk" data-v="${p.id}">${esc(pn(p))}</button></h3>
<div class="pr"><b>${money(p.price)}</b>${d?`<s>${money(p.old)}</s>`:""}</div>
<button class="btn" data-a="${p.id}">${t("addC")}</button>
<div class="rt"><span class="stars">${stars(p.rate)}</span> ${p.rate} ${tf("reviews",p.n)}</div></div></article>`};
const catBtns=()=>[["",t("allP"),"🛍️"],...CATS.map(c=>[c[0],catName(c[0]),c[1]])].map(c=>`<button class="ci ${S.cat===c[0]&&!S.offers&&!S.q?"on":""}" data-c="${esc(c[0])}"><span>${c[2]}</span>${esc(c[1])}<i>›</i></button>`).join("");
function list(){
  const q=S.q.toLowerCase();
  let l=P.filter(p=>(!S.cat||p.cat===S.cat)&&(!q||(p.name+" "+(p.nameAr||"")+" "+p.cat+" "+catName(p.cat)).toLowerCase().includes(q))&&(!S.offers||disc(p)>=25));
  if(S.sort==="lo")l.sort((a,b)=>a.price-b.price);else if(S.sort==="hi")l.sort((a,b)=>b.price-a.price);else if(S.sort==="rt")l.sort((a,b)=>b.rate-a.rate);else if(S.offers)l.sort((a,b)=>disc(b)-disc(a));
  return l}
function render(){
  const filt=S.cat||S.q||S.offers,l=list();
  $("#popW").hidden=!!filt;
  $("#pop").innerHTML=[...P].sort((a,b)=>b.n-a.n).slice(0,3).map(card).join("");
  $("#ttl").textContent=(S.q?tf("resFor",S.q):S.offers?t("offT"):S.cat?catName(S.cat):t("allP"))+" ("+l.length+")";
  $("#grid").innerHTML=l.length?l.map(card).join(""):`<p class="empty">${t("noRes")}</p>`;
  $("#catL").innerHTML=catBtns();$("#ddm").innerHTML=catBtns();
  document.querySelectorAll(".nv .l").forEach(b=>b.classList.toggle("on",b.dataset.n===S.nav));
}
function nav(n){
  if(n==="about"||n==="contact")return info(n);
  toHome();S.cat="";S.q="";S.offers=n==="offers";S.nav=n;$("#q").value="";render();
  n==="home"?window.scrollTo({top:0,behavior:"smooth"}):goTo("#all")}
let curP=null;
function showP(id){
  const p=P.find(x=>x.id==id);if(!p)return;curP=id;
  const rel=P.filter(x=>x.cat===p.cat&&x.id!=p.id).slice(0,3),d=disc(p),w=S.wish.some(x=>x==p.id);
  $("#prodM").innerHTML=`<button class="x" data-close aria-label="${t("close")}">×</button>
  <div class="pd"><div class="tile big"><span aria-hidden="true">${p.e}</span><img src="${esc(p.img)}" alt="${esc(pn(p))}" onerror="this.remove()"></div>
  <div><h2 style="margin:0">${esc(pn(p))}</h2>
  <div class="rt"><span class="stars">${stars(p.rate)}</span> ${p.rate} ${tf("reviews",p.n)}</div><hr style="border:0;border-top:1px solid var(--line)">
  <div class="pr">${d?`<span class="bd" style="position:static;margin-inline-end:8px">${tf("off",d)}</span>`:""}<b>${money(p.price)}</b>${d?`<s>${money(p.old)}</s>`:""}</div>
  <p>${esc(pdesc(p))}</p>
  <ul class="inf"><li>${t("inStock")}</li><li>${t("deliv")}</li><li>${t("ret")}</li><li>${t("cod")}</li></ul>
  <label>${t("qty")} <select id="pq">${[1,2,3,4,5,6,7,8,9,10].map(n=>`<option>${n}</option>`).join("")}</select></label>
  <div style="display:flex;gap:8px;margin-top:12px"><button class="btn" style="flex:1" data-ad="${p.id}">${t("addC2")}</button><button class="btn alt" style="flex:1" data-buy="${p.id}">${t("buy")}</button><button class="btn" style="background:var(--soft);color:var(--ink)" data-w="${p.id}" aria-label="♥">${w?"♥":"♡"}</button></div></div></div>
  ${rel.length?`<h3>${t("related")}</h3><div class="rel">${rel.map(x=>`<button class="relc" data-v="${x.id}">${x.e} ${esc(pn(x))}<br><b>${money(x.price)}</b></button>`).join("")}</div>`:""}`;
  openM("#prodM")}

/* ---------- hero ---------- */
const SL=[["kick1","h1a","h1b","h1t","📱📱💻","","51%"],["kick2","h2a","h2b","h2t","🏷️🛍️🛒","offers","55%"],["kick3","h3a","h3b","h3t","👟🎒🕶️","Fashion","62%"]];
function hero(){$("#hero").innerHTML=SL.map((s,i)=>`<div class="sl ${i===S.hs?"on":""}"><img class="bg" style="object-position:right ${s[6]}" src="images/hero-${i+1}.jpg" alt="" onerror="this.parentElement.classList.add('noimg');this.remove()"><div class="tx"><small>${t(s[0])}</small><h2>${t(s[1])}<span>${t(s[2])}</span></h2><p>${t(s[3])}</p><button class="btn lg" data-s="${s[5]}">${t("shop")}</button></div><div class="hv"><span aria-hidden="true">${s[4]}</span></div></div>`).join("")+`<button class="ar l" data-h="-1" aria-label="‹">‹</button><button class="ar r" data-h="1" aria-label="›">›</button>`}
const go=n=>{S.hs=(n+SL.length)%SL.length;document.querySelectorAll(".sl").forEach((e,i)=>e.classList.toggle("on",i===S.hs))};
setInterval(()=>{if(!document.hidden&&!matchMedia("(prefers-reduced-motion:reduce)").matches)go(S.hs+1)},5500);

/* ---------- cart & wishlist (amounts are USD internally) ---------- */
const items=()=>Object.keys(S.cart).map(id=>({p:P.find(x=>x.id==id),q:S.cart[id]})).filter(i=>i.p);
const sub=()=>items().reduce((a,i)=>a+i.p.price*i.q,0);
const ship=s=>s===0||s>=99?0:5;
const xBtn=()=>`<button class="x" data-close aria-label="${t("close")}">×</button>`;
const pmPills=()=>`<div class="cards">`+[["cod",`<span>${t("cod")}</span>`],["visa","VISA"],["mastercard","<i></i><i></i>"],["meeza","meeza"]].map(([k,c])=>`<button type="button" class="cd ${k} ${S.pm===k?"on":""}" data-pm="${k}" aria-pressed="${S.pm===k}" title="${k}">${c}</button>`).join("")+`</div>`;
const TR=`<svg viewBox="0 0 24 24" class="ic sm" style="color:inherit"><path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/></svg>`;
const CARTI=`<svg viewBox="0 0 24 24" class="ic" style="width:64px;height:64px;color:var(--pri)"><path d="M2 3h3l2.5 12h11L21 7H6"/><circle cx="9" cy="20" r="1.6"/><circle cx="17" cy="20" r="1.6"/></svg>`;
function cart(){
  const it=items(),s=sub(),sh=ship(s),cnt=it.reduce((a,i)=>a+i.q,0);
  $("#cnt").textContent=cnt;$("#cartTot").textContent="("+cnt+")";
  const row=i=>`<article class="cr"><div class="tile cimg" data-v="${i.p.id}"><span aria-hidden="true">${i.p.e}</span><img src="${esc(i.p.img)}" alt="${esc(pn(i.p))}" onerror="this.remove()"></div>
  <div class="cinfo"><button class="lnk" data-v="${i.p.id}">${esc(pn(i.p))}</button><span class="mut">${esc(catName(i.p.cat))}</span><span class="instock">✔ ${t("inStockS")}</span><b class="cp">${money(i.p.price)}</b></div>
  <div class="qty2"><button data-m="${i.p.id}" aria-label="−">−</button><input class="qin" type="number" min="1" max="50" inputmode="numeric" data-q="${i.p.id}" value="${i.q}" aria-label="${t("qty")}"><button data-p="${i.p.id}" aria-label="+">+</button></div>
  <b class="ct">${money(i.p.price*i.q)}</b><button class="trb" data-rm="${i.p.id}" aria-label="${t("remove")}">${TR}</button></article>`;
  const side=`<aside class="osum"><h2>📋 ${t("osT")}</h2><div class="ob"><p><span>${tf("subN",cnt)}</span><b>${money(s)}</b></p><p><span>${t("shipFee")}</span><b>${money(sh)}</b></p>
  ${sh?`<p class="hint">🚚 ${tf("moreFree",money(99-s))}</p>`:`<p class="okl">🚚 ${t("freeShip")}</p>`}<hr><p class="gt"><span>${t("total")}</span><b>${money(s+sh)}</b></p>
  <button class="btn lg blk" id="chk">${t("proceed")}</button><div class="accept"><small>🔒 ${t("payM")}</small>${pmPills()}</div></div></aside>`;
  $("#cartV").innerHTML=`<div class="cbanner">${CARTI}<div><h1>${t("cpT")}</h1><p>${t("cpS")}</p></div><span class="cdeco" aria-hidden="true">🛒🛍️</span></div>`
  +(it.length?`<div class="cl"><div><div>${it.map(row).join("")}</div><button class="clr" id="clr">${TR} ${t("clear")}</button></div>${side}</div>`
  :`<div class="cempty"><span>🛒</span><p>${t("cartE")}</p><button class="btn lg" data-n="products">${t("contShop")}</button></div>`)
  +`<section class="feat cfeat"><div><span>🛡️</span><p><b>${t("c1b")}</b><small>${t("c1s")}</small></p></div><div><span>🎧</span><p><b>${t("c2b")}</b><small>${t("c2s")}</small></p></div><div><span>🔄</span><p><b>${t("c3b")}</b><small>${t("c3s")}</small></p></div><div><span>🚚</span><p><b>${t("c4b")}</b><small>${t("c4s")}</small></p></div></section>`;
  sv()}
/* ---------- views: home / cart (#cart) ---------- */
function view(){const h=location.hash,c=h==="#cart",w=h==="#wishlist",o=h==="#orders";$("#homeV").hidden=c||w||o;$("#cartV").hidden=!c;$("#wishV").hidden=!w;$("#ordV").hidden=!o;if(c||w||o)S.nav="";else if(!S.nav)S.nav="home";render();if(c||w||o)window.scrollTo(0,0);if(o)loadOrders()}
function toHome(){if(["#cart","#wishlist","#orders"].includes(location.hash)){history.pushState(null,"",location.pathname+location.search);view()}}
window.addEventListener("hashchange",view);
const HEARTI=`<svg viewBox="0 0 24 24" class="ic" style="width:64px;height:64px;color:var(--pri)"><path d="M12 21s-8-5.3-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 10c0 5.7-8 11-8 11z"/></svg>`;
const wcard=p=>{const d=disc(p);return `<article class="wc"><button class="whrt" data-w="${p.id}" aria-label="${t("remove")}">♥</button>
<div class="wimg" data-v="${p.id}"><span aria-hidden="true">${p.e}</span><img src="${esc(p.img)}" alt="${esc(pn(p))}" loading="lazy" onerror="this.remove()"></div>
<button class="lnk wn" data-v="${p.id}">${esc(pn(p))}</button>
<div class="rt"><span class="stars">${stars(p.rate)}</span> ${p.rate} ${tf("reviews",p.n)}</div>
<div class="pr"><b>${money(p.price)}</b>${d?`<s>${money(p.old)}</s>`:""}</div>
<div class="wbtns"><button class="btn" data-a="${p.id}">${t("addC")}</button><button class="rmv" data-w="${p.id}">${TR} ${t("remove")}</button></div></article>`};
function wish(){
  const l=S.wish.map(id=>P.find(p=>p.id==id)).filter(Boolean),n=l.length,u=S.user;
  $("#wc").textContent="("+n+")";$("#wcnt").textContent=n;$("#bWish").classList.toggle("hasw",n>0);
  const side=`<div><aside class="acc"><div class="acch"><div class="av"><svg viewBox="0 0 24 24" class="ic" style="width:42px;height:42px"><circle cx="12" cy="8" r="4" fill="currentColor"/><path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7" fill="currentColor"/></svg></div><b>${esc(u?u.name:t("guest"))}</b>${u?`<small>${esc(u.email)}</small>`:`<button class="btn" data-acc="login">${t("tabL")}</button>`}</div>
  <nav class="accn"><button data-acc="acct">👤 ${t("myAcc")}</button><button data-acc="orders">📦 ${t("mOrd")}</button><button class="on" data-acc="wish">♥ ${t("mWish")}</button><button data-acc="addr">📍 ${t("mAddr")}</button><button data-acc="set">⚙️ ${t("mSet")}</button>${u&&u.role==="admin"?`<button data-acc="admin">🛠 ${t("adminP")}</button>`:""}${u?`<button data-acc="out">↪ ${t("mOut")}</button>`:""}</nav></aside>
  <button class="promo" data-n="home"><span aria-hidden="true">🛒</span><b>${t("h1a")}<br>${t("h1b")}</b></button></div>`;
  $("#wishV").innerHTML=`<div class="wl">${side}<div><div class="cbanner">${HEARTI}<div><h1>${t("wishTitle")}</h1><p>${t("wishSub")}</p></div><span class="cdeco" aria-hidden="true">💜</span></div>`
  +(n?`<div class="wgrid">${l.map(wcard).join("")}</div><div class="wbar"><button class="clrw" id="clrw">${TR} ${t("clearW")}</button><span class="wcnt2">${tf("wItems",n)}</span></div>`
  :`<div class="cempty"><span>🤍</span><p>${t("wishE2")}</p><button class="btn lg" data-n="products">${t("contShop")}</button></div>`)+`</div></div>`;
  sv()}

function addCart(id,q){S.cart[id]=Math.min(50,(S.cart[id]||0)+q);cart();toast(t("added"))}
function toggleW(id){const i=S.wish.findIndex(x=>x==id);if(i<0)S.wish.push(P.find(p=>p.id==id).id);else S.wish.splice(i,1);render();wish();if($("#prodM").classList.contains("on"))showP(id)}

/* ---------- modals ---------- */
function openM(id){$("#shade").classList.add("on");$(id).classList.add("on")}
function closeAll(){document.querySelectorAll(".shade.on,.panel.on,.modal.on").forEach(e=>e.classList.remove("on"));$("#ddm").classList.remove("on")}
function info(n){$("#infoM").innerHTML=xBtn()+(n==="about"?`<h2 style="margin-top:0">${t("abT")}</h2><p>${t("abP")}</p><p class="mut">${t("abN")}</p>`:`<h2 style="margin-top:0">${t("ctT")}</h2><p style="white-space:pre-line">${t("ctP")}</p><p class="mut">${t("ctN")}</p>`);openM("#infoM")}
function user(){$("#uL1").textContent=S.user?t("hello"):t("login");$("#uL2").textContent=S.user?S.user.name:t("reg");$("#acctTxt").textContent=S.user?S.user.name+" ("+S.user.email+")":"";wish();if(location.hash==="#orders"){if(S.user&&!Array.isArray(ORD))loadOrders();else{if(!S.user)ORD=null;renderOrders()}}}

/* ---------- auth ---------- */
let mode="L",after=null,pend="",coolT=null,coolN=0;
const RULES=[["r1",p=>p.length>=8],["r2",p=>/[A-Z]/.test(p)],["r3",p=>/[a-z]/.test(p)],["r4",p=>/\d/.test(p)],["r5",p=>/[^A-Za-z0-9]/.test(p)]];
function pwUI(){const p=$("#aP").value;$("#pwR").innerHTML=RULES.map(r=>{const ok=r[1](p);return `<li class="${ok?"ok":""}">${ok?"✔":"○"} ${t(r[0])}</li>`}).join("")}
function cool(n){clearInterval(coolT);coolN=n;const b=$("#rsd"),tick=()=>{b.disabled=coolN>0;b.textContent=coolN>0?tf("resendIn",coolN):t("resend");if(coolN<=0)clearInterval(coolT);coolN--};tick();if(n>0)coolT=setInterval(tick,1000)}
function authMode(m,msg){
  mode=m;const L=m==="L",Sg=m==="S",V=m==="V",F=m==="F",R=m==="R";
  $("#aTabs").hidden=!(L||Sg);$("#tL").className=L?"on":"";$("#tS").className=Sg?"on":"";
  $("#aTitle").hidden=L||Sg;$("#aTitle").textContent=t(V?"vTitle":"fTitle");$("#aMsg").hidden=!msg;$("#aMsg").textContent=msg||"";
  $("#nameW").hidden=!Sg;$("#emW").hidden=!(L||Sg||F);$("#pwW").hidden=!(L||Sg||R);$("#regW").hidden=!(Sg||R);$("#codeW").hidden=!(V||R);
  $("#aPL").textContent=t(R?"lNewPass":"lPass");$("#aP").autocomplete=L?"current-password":"new-password";
  $("#aGo").textContent=t({L:"tabL",S:"createAcc",V:"btnVerify",F:"btnSend",R:"btnReset"}[m]);
  $("#fgt").hidden=!L;$("#rsd").hidden=!(V||R);$("#bkL").hidden=L||Sg;$("#aErr").textContent="";
  if(Sg||R)pwUI();if(V||R)cool(Math.max(coolN,0))}
function needLogin(k,msg){after=k;authMode("L");$("#aErr").textContent=t(msg);openM("#authM")}
const jpost=(u,b)=>api(u,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(b)}).then(r=>r.json().then(d=>({ok:r.ok,d,st:r.status})));
function authDone(d){
  S.user=d.user;S.token=d.token;sv();user();closeAll();["aP","aP2","aC"].forEach(i=>$("#"+i).value="");pend="";toast(tf("welcome",d.user.name));
  if(after==="pay"){after=null;payOpen()}else if(after==="orders"){after=null;location.hash="orders"}}
function doAuth(){
  const n=$("#aN").value.trim(),m=$("#aE").value.trim(),p=$("#aP").value,err=x=>{$("#aErr").textContent=x},fail=r=>err(r.d.error||t("eGen")),net=()=>err(t("eSrv")),okMail=/^\S+@\S+\.\S+$/.test(m);
  if(mode==="L"){
    if(!okMail||!p)return err(t("eLog"));
    jpost("/api/auth/login",{email:m,password:p}).then(r=>{if(r.ok)return authDone(r.d);if(r.d.needsVerification){pend=m;coolN=60;return authMode("V",tf("vMsg",m))}fail(r)}).catch(net)}
  else if(mode==="S"){
    if(!okMail||!n)return err(t("eReg"));
    if(RULES.some(r=>!r[1](p)))return err(t("ePw"));if(p!==$("#aP2").value)return err(t("eMatch"));
    jpost("/api/auth/register",{name:n,email:m,password:p}).then(r=>{if(r.ok&&r.d.needsVerification){pend=m;coolN=60;return authMode("V",tf("vMsg",m))}fail(r)}).catch(net)}
  else if(mode==="V"){
    const c=$("#aC").value.trim();if(!/^\d{6}$/.test(c))return err(t("eCode"));
    jpost("/api/auth/verify",{email:pend,code:c}).then(r=>r.ok?authDone(r.d):fail(r)).catch(net)}
  else if(mode==="F"){
    if(!okMail)return err(t("eEmail"));
    jpost("/api/auth/forgot",{email:m}).then(r=>{if(r.ok){pend=m;coolN=60;return authMode("R",tf("rMsg",m))}fail(r)}).catch(net)}
  else{
    const c=$("#aC").value.trim();if(!/^\d{6}$/.test(c))return err(t("eCode"));
    if(RULES.some(r=>!r[1](p)))return err(t("ePw"));if(p!==$("#aP2").value)return err(t("eMatch"));
    jpost("/api/auth/reset",{email:pend,code:c,password:p}).then(r=>{if(r.ok){authDone(r.d);toast(t("passReset"))}else fail(r)}).catch(net)}}
function resend(){jpost(mode==="V"?"/api/auth/resend":"/api/auth/forgot",{email:pend}).then(()=>{cool(60);toast(t("sent"))}).catch(()=>{$("#aErr").textContent=t("eSrv")})}

/* ---------- checkout ---------- */
const PMN=()=>({cod:t("codS"),visa:"Visa",mastercard:"Mastercard",meeza:"Meeza"});
function loadAddrs(){if(!S.token)return Promise.resolve([]);return api("/api/addresses",{headers:{Authorization:"Bearer "+S.token}}).then(r=>r.ok?r.json():[]).then(l=>(S.addrs=l)).catch(()=>[])}
function startCheckout(){closeAll();if(!S.user||!S.token){after="pay";authMode("L");$("#aErr").textContent=t("loginToOrder");openM("#authM")}else payOpen()}
function payUI(){
  const card=S.pm!=="cod",s=sub(),sh=ship(s);
  $("#oPay").innerHTML=`<label><span>${t("payM")}</span></label>${pmPills()}`+(card?`<p class="demo">${t("demoNote")}</p><label><span>${t("cardNo")}</span><input id="cN" inputmode="numeric" autocomplete="off" placeholder="4242 4242 4242 4242" maxlength="23"></label><div class="two"><label><span>${t("cardExp")}</span><input id="cE" inputmode="numeric" autocomplete="off" placeholder="MM/YY" maxlength="5"></label><label><span>CVV</span><input id="cC" type="password" inputmode="numeric" autocomplete="off" maxlength="4"></label></div><label><span>${t("cardName")}</span><input id="cH" autocomplete="off"></label>`:`<p class="mut">${t("codNote")}</p>`);
  $("#oS").innerHTML=`<p><span>${t("sub")}</span><span>${money(s)}</span></p><p><span>${t("shipL")}</span><span>${sh?money(sh):t("free")}</span></p><p class="tot"><span>${t(card?"total":"totalCod")}</span><span>${money(s+sh)}</span></p>`}
function payOpen(){
  if(S.user&&!$("#oN").value)$("#oN").value=S.user.name;$("#oErr").textContent="";payUI();openM("#payM");
  loadAddrs().then(l=>{$("#oAd").innerHTML=l.length?`<div class="chips"><small>${t("savedAddr")}</small>${l.map((a,i)=>`<button type="button" class="chip" data-addr="${i}">📍 ${esc(a.address)}</button>`).join("")}</div>`:""})}
function cardErr(){
  const n=$("#cN").value.replace(/\s/g,""),e=$("#cE").value,c=$("#cC").value,h=$("#cH").value.trim();
  const lu=x=>{let s=0,d=false;for(let i=x.length-1;i>=0;i--){let v=+x[i];if(d){v*=2;if(v>9)v-=9}s+=v;d=!d}return s%10===0};
  if(!/^\d{13,19}$/.test(n)||!lu(n))return t("eLuhn");
  if((S.pm==="visa"&&!/^4/.test(n))||(S.pm==="mastercard"&&!/^(5[1-5]|2[2-7])/.test(n)))return t("eBrand");
  const m=/^(\d\d)\/(\d\d)$/.exec(e);if(!m||+m[1]<1||+m[1]>12)return t("eExp");
  const now=new Date(),y=2000+ +m[2];if(y<now.getFullYear()||(y===now.getFullYear()&&+m[1]<now.getMonth()+1))return t("eExp");
  if(!/^\d{3,4}$/.test(c))return t("eCvv");if(!h)return t("eHolder");return ""}
function placeOrder(){
  const name=$("#oN").value.trim(),phone=$("#oP").value.trim(),address=$("#oA").value.trim(),err=x=>{$("#oErr").textContent=x};
  if(!S.user||!S.token)return startCheckout();
  if(!name||!/^\d{8,}$/.test(phone)||!address)return err(t("eOrd"));
  if(S.pm!=="cod"){const ce=cardErr();if(ce)return err(ce)}
  api("/api/orders",{method:"POST",headers:{"Content-Type":"application/json",Authorization:"Bearer "+S.token},body:JSON.stringify({name,phone,address,paymentMethod:S.pm,items:items().map(i=>({id:i.p.id,qty:i.q}))})})
    .then(r=>r.json().then(d=>({ok:r.ok,d,st:r.status})))
    .then(({ok,d,st})=>{
      if(st===401){S.user=null;S.token=null;user();sv();return startCheckout()}
      if(!ok)return err(d.error||t("eGen"));
      S.cart={};cart();closeAll();toast(tf(S.pm==="cod"?"ordered":"orderedD",String(d.orderId).slice(-6).toUpperCase()))})
    .catch(()=>err(t("eSrv")))}
function showAddresses(){
  $("#adrM").innerHTML=xBtn()+`<h2 style="margin-top:0">${t("mAddr")}</h2><div id="adrL" class="mut">…</div>`;openM("#adrM");
  loadAddrs().then(l=>{$("#adrL").innerHTML=l.length?l.map(a=>`<div class="ord"><p><b>${esc(a.name)}</b> · <bdi>${esc(a.phone)}</bdi></p><p>📍 ${esc(a.address)}</p></div>`).join(""):t("addrEmpty")})}

/* ---------- orders tracking (#orders) ---------- */
let ORD=null;
const STEPS=["placed","processing","shipped","delivered"];
const nst=x=>STEPS.includes(x)||x==="cancelled"?x:"placed";
const fmtD=(d,full)=>new Date(d).toLocaleString(S.lang==="ar"?"ar-EG":"en-US",full?{year:"numeric",month:"short",day:"numeric"}:{month:"short",day:"numeric",hour:"numeric",minute:"2-digit"});
function loadOrders(){
  if(!S.token){ORD=null;return renderOrders()}
  ORD="load";renderOrders();
  api("/api/orders/mine",{headers:{Authorization:"Bearer "+S.token}}).then(r=>r.json().then(d=>({ok:r.ok,d,st:r.status}))).then(({ok,d,st})=>{
    if(st===401){S.user=null;S.token=null;sv();ORD=null;user()}else ORD=ok?d:"err";renderOrders()}).catch(()=>{ORD="err";renderOrders()})}
function orderCard(o){
  const st=nst(o.status),idx=STEPS.indexOf(st),canc=st==="cancelled";
  const at=k=>{const h=(o.history||[]).filter(x=>x.status===k).pop();return h?h.at:(k==="placed"?o.createdAt:null)};
  const steps=STEPS.map((k,i)=>{const done=!canc&&i<=idx,cur=!canc&&i===idx,w=at(k);
    return `<div class="stp ${done?"done":""} ${cur?"cur":""}"><span class="dot">${cur&&k==="shipped"?"🚚":"✓"}</span><b>${t("st_"+k)}</b><small>${done&&w?fmtD(w):t("stPending")}</small></div>`}).join("");
  const items=o.items.map(i=>{const p=P.find(x=>x.id==i.productId);return `<div class="oi"><div class="oimg"><span aria-hidden="true">${p?p.e:"📦"}</span>${p?`<img src="${esc(p.img)}" alt="" onerror="this.remove()">`:""}</div><div><b>${esc(p?pn(p):i.name)}</b><small>${tf("qtyL",i.qty)}</small><span class="oprice">${money(i.price*i.qty)}</span></div></div>`}).join("");
  return `<section class="orow"><div class="oc"><h2>${t("orderN")} <span>#${String(o.id).slice(-6).toUpperCase()}</span></h2>
  <p class="om">${t("placedOn")}: ${fmtD(o.createdAt,1)} • ${t("statusL")}: <span class="bdg">${t("bd_"+st)}</span> • ${PMN()[o.paymentMethod]||PMN().cod}</p>
  ${canc?"":`<div class="stps">${steps}</div>`}<div class="omsg"><span aria-hidden="true">📦</span><div><b>${t("m_"+st)}</b><small>${t("ms_"+st)}</small></div></div></div>
  <aside class="os"><h3>📋 ${t("osT")}</h3>${items}<div class="osr"><p><span>${t("sub")}</span><span>${money(o.total-(o.shipping||0))}</span></p><p><span>${t("shipL")}</span><span>${money(o.shipping||0)}</span></p><p class="ot"><span>${t("total")}</span><span>${money(o.total)}</span></p></div></aside></section>`}
function renderOrders(){
  const head=`<div class="ovh"><button class="bkacc" data-back="acc">← ${t("backAcc")}</button><div class="ovt"><span class="ovi" aria-hidden="true">📦</span><h1>${t("trackT1")} <span>${t("trackT2")}</span></h1><p>${t("trackSub")}</p></div><span class="ovd" aria-hidden="true">📍🚚</span></div>`;
  let body;
  if(!S.user)body=`<div class="ovm"><p>${t("loginOrders")}</p><button class="btn lg" data-acc="login">${t("tabL")}</button></div>`;
  else if(ORD==="load"||ORD===null)body=`<div class="ovm">…</div>`;
  else if(ORD==="err")body=`<div class="ovm">${t("eGen")}</div>`;
  else if(!ORD.length)body=`<div class="ovm"><p>${t("ordEmpty")}</p><button class="btn lg" data-n="products">${t("contShop")}</button></div>`;
  else body=ORD.map(orderCard).join("")+`<button class="help" data-n="contact"><span aria-hidden="true">🎧</span><div><b>${t("needHelp")}</b><small>${t("contactSup")}</small></div><i>→</i></button>`;
  $("#ordV").innerHTML=`<div class="ov">${head}${body}</div>`}

/* ---------- events ---------- */
document.addEventListener("click",e=>{
  if(!e.target.closest("#bAll,#ddm"))$("#ddm").classList.remove("on");
  const x=e.target.closest("button,[data-v],.shade");if(!x)return;const d=x.dataset,id=x.id;
  if(d.c!==undefined){toHome();S.cat=d.c;S.q="";S.offers=false;S.nav="products";$("#q").value="";render();$("#ddm").classList.remove("on");goTo("#all")}
  else if(d.s==="offers")nav("offers");
  else if(d.s!==undefined){toHome();S.cat=d.s;S.q="";S.offers=false;S.nav="products";render();goTo("#all")}
  else if(d.n)nav(d.n);
  else if(d.h)go(S.hs+ +d.h);
  else if(d.v)showP(d.v);
  else if(d.ad)addCart(d.ad,+$("#pq").value||1);
  else if(d.buy){S.cart[d.buy]=Math.min(50,(S.cart[d.buy]||0)+(+$("#pq").value||1));cart();startCheckout()}
  else if(d.a)addCart(d.a,1);
  else if(d.w)toggleW(d.w);
  else if(d.acc){const a=d.acc;
    if(a==="login")openM("#authM");else if(a==="acct")openM(S.user?"#acctM":"#authM");else if(a==="orders"){if(S.user)location.hash="orders";else needLogin("orders","loginOrders")}
    else if(a==="admin")location.href="admin.html";else if(a==="addr")S.user?showAddresses():openM("#authM");else if(a==="set"){$("#sLang").value=S.lang;$("#sCur").value=S.cur;$("#sTheme").value=S.theme;openM("#setM")}
    else if(a==="out"){S.user=null;S.token=null;user();sv();toast(t("outT"))}}
  else if(d.back){location.hash="wishlist"}
  else if(d.pm){S.pm=d.pm;sv();cart();if($("#payM").classList.contains("on"))payUI()}
  else if(d.addr!==undefined){const a=(S.addrs||[])[+d.addr];if(a){$("#oN").value=a.name;$("#oP").value=a.phone;$("#oA").value=a.address}}
  else if(d.rm){delete S.cart[d.rm];cart()}
  else if(d.p){S.cart[d.p]=Math.min(50,S.cart[d.p]+1);cart()}
  else if(d.m){if(--S.cart[d.m]<=0)delete S.cart[d.m];cart()}
  else if(id==="bAll")$("#ddm").classList.toggle("on");
  else if(id==="bCart")location.hash="cart";
  else if(id==="bWish")location.hash="wishlist";
  else if(id==="bSet"){$("#sLang").value=S.lang;$("#sCur").value=S.cur;$("#sTheme").value=S.theme;openM("#setM")}
  else if(id==="bAcc"){after=null;user();openM(S.user?"#acctM":"#authM")}
  else if(id==="chk")startCheckout();
  else if(id==="clrw"){S.wish=[];render();wish();toast(t("wCleared"))}
  else if(id==="clr"){S.cart={};cart();toast(t("cleared"))}
  else if(id==="out"){S.user=null;S.token=null;user();sv();closeAll();toast(t("outT"))}
  else if(id==="tL")authMode("L");else if(id==="tS")authMode("S");
  else if(id==="fgt")authMode("F",t("fMsg"));else if(id==="bkL")authMode("L");else if(id==="rsd")resend();
  else if(id==="aGo")doAuth();
  else if(id==="oGo")placeOrder();
  else if(id==="vall")nav("products");
  else if(id==="cbtn")$("#cbox").classList.toggle("on");
  else if(x.matches("[data-close],.shade"))closeAll();
});
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeAll();if(e.key==="Enter"&&e.target.closest("#authM")&&e.target.tagName==="INPUT")doAuth();if(e.key==="Enter"&&e.target.classList.contains("qin"))e.target.blur()});
document.addEventListener("focusin",e=>{if(e.target.classList.contains("qin"))e.target.select()});
document.addEventListener("change",e=>{const q=e.target.closest(".qin");if(q){let v=Math.floor(+q.value);if(!(v>=1))v=1;if(v>50)v=50;S.cart[q.dataset.q]=v;cart()}});
document.addEventListener("input",e=>{const i=e.target;
  if(i.id==="cN")i.value=i.value.replace(/\D/g,"").slice(0,19).replace(/(\d{4})(?=\d)/g,"$1 ");
  else if(i.id==="cE"){const v=i.value.replace(/\D/g,"").slice(0,4);i.value=v.length>2?v.slice(0,2)+"/"+v.slice(2):v}
  else if(i.id==="cC")i.value=i.value.replace(/\D/g,"").slice(0,4);
  else if(i.id==="aC")i.value=i.value.replace(/\D/g,"").slice(0,6)});
$("#aP").addEventListener("input",()=>{if(mode==="S")pwUI()});
$("#sf").onsubmit=e=>{e.preventDefault();toHome();S.q=$("#q").value.trim();S.cat="";S.offers=false;S.nav="products";render();goTo("#all")};
$("#sort").onchange=e=>{S.sort=e.target.value;render()};
$("#sLang").onchange=e=>{S.lang=e.target.value;applyLang()};
$("#sCur").onchange=e=>{S.cur=e.target.value;applyLang()};
$("#sTheme").onchange=e=>{S.theme=e.target.value;theme();sv()};

/* ---------- assistant ---------- */
function say(m,me){const d=document.createElement("div");d.className="m"+(me?" me":"");d.textContent=m;$("#msgs").append(d);$("#msgs").scrollTop=1e9}
function bot(m){m=m.toLowerCase();const line=p=>p.e+" "+pn(p)+" — "+money(p.price);
  if(/cart|سلة|سلتي/.test(m))return items().length?tf("bCartN",items().length,money(sub())):t("bCartE");
  if(/ship|deliver|شحن|توصيل/.test(m))return tf("bShip",money(99),money(5));
  if(/return|refund|ارجاع|إرجاع|استرجاع/.test(m))return t("bRet");
  if(/offer|deal|discount|sale|عرض|عروض|خصم|تخفيض/.test(m))return t("bDeals")+"\n"+[...P].sort((a,b)=>disc(b)-disc(a)).slice(0,3).map(p=>line(p)+" ("+tf("off2",disc(p))+")").join("\n");
  const c=CATS.find(c=>m.includes(c[0].toLowerCase())||m.includes(c[2])),w=m.split(/\s+/).filter(x=>x.length>2);
  const r=P.filter(p=>(c&&p.cat===c[0])||w.some(x=>p.name.toLowerCase().includes(x)||(p.nameAr||"").includes(x))).slice(0,4);
  return r.length?t("bFound")+"\n"+r.map(line).join("\n"):t("bHelp")}
$("#cf").onsubmit=e=>{e.preventDefault();const m=$("#ci").value.trim();if(!m)return;say(m,1);$("#ci").value="";setTimeout(()=>say(bot(m)),350)};

/* ---------- start ---------- */
async function load(){
  if(S.user&&!S.token){S.user=null;sv();user()}
  if(S.token)api("/api/auth/me",{headers:{Authorization:"Bearer "+S.token}}).then(r=>r.status===401?(S.user=null,S.token=null,sv(),user()):r.ok?r.json().then(d=>{if(S.user&&S.user.role!==d.role){S.user.role=d.role;sv();user()}}):0).catch(()=>{});
  try{const r=await fetch("/api/products"),d=await r.json();
    if(Array.isArray(d)&&d.length){P=d.map((x,i)=>({id:x.id??x._id,name:x.name,nameAr:x.nameAr||"",cat:x.cat||x.category||"Electronics",price:x.price,old:x.old||x.price,rate:x.rate||4.5,n:x.n||0,e:x.e||"🛍️",desc:x.desc,descAr:x.descAr,img:x.img||x.image||"images/"+(x.id??i+1)+".jpg"}));render();cart();wish()}
  }catch(e){}
}
theme();applyLang();view();load();
