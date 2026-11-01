require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const Product = require("./models/Product");
const Order = require("./models/Order");
const User = require("./models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { sendCode } = require("./mailer");

const m = (req, en, ar) => (req.headers["x-lang"] === "ar" ? ar : en); // رسائل بلغة المستخدم

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// ---------- تسجيل الدخول ----------
const sign = u => jwt.sign({ id: u._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
const readToken = req => {
  const h = req.headers.authorization || "";
  try { return jwt.verify(h.startsWith("Bearer ") ? h.slice(7) : "", process.env.JWT_SECRET).id; }
  catch { return null; }
};
const auth = (req, res, next) => {          // لازم يكون مسجّل
  req.userId = readToken(req);
  req.userId ? next() : res.status(401).json({ error: m(req, "Please sign in first", "سجّل الدخول أولًا") });
};
const optAuth = (req, res, next) => { req.userId = readToken(req); next(); }; // اختياري

// شروط كلمة المرور: 8 أحرف على الأقل + حرف كبير + حرف صغير + رقم + رمز خاص
const strongPassword = p =>
  p.length >= 8 && p.length <= 72 &&
  /[A-Z]/.test(p) && /[a-z]/.test(p) && /\d/.test(p) && /[^A-Za-z0-9]/.test(p);

// ---------- تفعيل الإيميل + نسيت كلمة المرور ----------
const genCode = () => String(crypto.randomInt(100000, 1000000));
const lang = req => (req.headers["x-lang"] === "ar" ? "ar" : "en");
const cleanEmail = v => String(v || "").trim().toLowerCase();
const PW_MSG = req => m(req, "Password must be at least 8 characters and include an uppercase letter, a lowercase letter, a number and a special character", "كلمة المرور يجب أن تكون 8 أحرف على الأقل وتحتوي على حرف كبير وحرف صغير ورقم ورمز خاص");
const mailFail = req => m(req, "Could not send the email. Please try again later.", "تعذر إرسال الإيميل. حاول لاحقًا.");
const codeError = (req, r) => r === "locked"
  ? m(req, "Too many attempts. Request a new code.", "محاولات كثيرة. اطلب كودًا جديدًا.")
  : m(req, "Invalid or expired code", "الكود غير صحيح أو منتهي");

// يبعت كود جديد (مرة كل دقيقة بحد أقصى). بيرجّع false لو في كود اتبعت من أقل من دقيقة
async function issueCode(user, purpose, req) {
  if (user.codeSentAt && Date.now() - user.codeSentAt.getTime() < 60 * 1000) return false;
  const code = genCode();
  user.codeHash = await bcrypt.hash(code, 8);
  user.codeExpires = new Date(Date.now() + 10 * 60 * 1000);
  user.codePurpose = purpose;
  user.codeAttempts = 0;
  user.codeSentAt = new Date();
  await user.save();
  await sendCode(user.email, code, purpose, lang(req));
  return true;
}

// بيتحقق من الكود (5 محاولات كحد أقصى). لو صح بيمسحه من المستخدم (لازم تعمل user.save() بعدها)
async function checkCode(user, purpose, code) {
  if (!user || !user.codeHash || user.codePurpose !== purpose || !user.codeExpires || user.codeExpires < new Date()) return "invalid";
  if (user.codeAttempts >= 5) return "locked";
  user.codeAttempts += 1;
  if (!(await bcrypt.compare(String(code || ""), user.codeHash))) {
    await user.save();
    return user.codeAttempts >= 5 ? "locked" : "invalid";
  }
  user.codeHash = undefined; user.codeExpires = undefined; user.codePurpose = undefined; user.codeAttempts = 0;
  return "ok";
}

const publicUser = u => ({ name: u.name, email: u.email, role: u.role || "user" });

app.post("/api/auth/register", async (req, res) => {
  try {
    const name = String(req.body.name || "").trim();
    const email = cleanEmail(req.body.email);
    const password = String(req.body.password || "");
    if (!name || !/^\S+@\S+\.\S+$/.test(email)) {
      return res.status(400).json({ error: m(req, "Enter your name and a valid email", "أدخل الاسم وبريدًا صحيحًا") });
    }
    if (!strongPassword(password)) return res.status(400).json({ error: PW_MSG(req) });
    let user = await User.findOne({ email });
    if (user && user.verified) {
      return res.status(409).json({ error: m(req, "This email is already registered. Try logging in", "هذا البريد مسجّل بالفعل، جرّب تسجيل الدخول") });
    }
    // حساب غير مفعّل موجود: ما بنغيّرش بياناته (عشان محدش يستولي على إيميل غيره)، بنبعت الكود بس
    if (!user) user = await User.create({ name, email, password: await bcrypt.hash(password, 10), verified: false });
    try { await issueCode(user, "verify", req); }
    catch (e) { console.error(e); return res.status(500).json({ error: mailFail(req) }); }
    res.status(201).json({ needsVerification: true, email });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: m(req, "Could not create the account", "تعذر إنشاء الحساب") });
  }
});

app.post("/api/auth/verify", async (req, res) => {
  try {
    const user = await User.findOne({ email: cleanEmail(req.body.email) });
    const r = await checkCode(user, "verify", req.body.code);
    if (r !== "ok") return res.status(400).json({ error: codeError(req, r) });
    user.verified = true;
    await user.save();
    res.json({ token: sign(user), user: publicUser(user) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: m(req, "Server error", "خطأ في السيرفر") });
  }
});

app.post("/api/auth/resend", async (req, res) => {
  try {
    const user = await User.findOne({ email: cleanEmail(req.body.email) });
    if (user && !user.verified) await issueCode(user, "verify", req);
    res.json({ ok: true }); // نفس الرد دايمًا
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: mailFail(req) });
  }
});

app.post("/api/auth/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: cleanEmail(req.body.email) });
    // نفس الرسالة في الحالتين عشان محدش يعرف إن كان البريد مسجّل ولا لأ
    if (!user || !(await bcrypt.compare(String(req.body.password || ""), user.password))) {
      return res.status(401).json({ error: m(req, "Incorrect email or password. New here? Choose Register", "البريد أو كلمة المرور غير صحيحة. إذا لم يكن لديك حساب اختر «حساب جديد»") });
    }
    if (!user.verified) {
      try { await issueCode(user, "verify", req); } catch (e) { console.error(e); return res.status(500).json({ error: mailFail(req) }); }
      return res.status(403).json({ needsVerification: true, email: user.email, error: m(req, "Please verify your email first. We sent you a code.", "يرجى تأكيد بريدك أولًا. أرسلنا لك كودًا.") });
    }
    res.json({ token: sign(user), user: publicUser(user) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: m(req, "Could not log in", "تعذر تسجيل الدخول") });
  }
});

app.post("/api/auth/forgot", async (req, res) => {
  try {
    const user = await User.findOne({ email: cleanEmail(req.body.email) });
    if (user) await issueCode(user, "reset", req);
    res.json({ ok: true }); // نفس الرد سواء البريد مسجّل أو لأ
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: mailFail(req) });
  }
});

app.post("/api/auth/reset", async (req, res) => {
  try {
    const password = String(req.body.password || "");
    if (!strongPassword(password)) return res.status(400).json({ error: PW_MSG(req) });
    const user = await User.findOne({ email: cleanEmail(req.body.email) });
    const r = await checkCode(user, "reset", req.body.code);
    if (r !== "ok") return res.status(400).json({ error: codeError(req, r) });
    user.password = await bcrypt.hash(password, 10);
    user.verified = true; // أثبت إنه صاحب الإيميل
    await user.save();
    res.json({ token: sign(user), user: publicUser(user) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: m(req, "Server error", "خطأ في السيرفر") });
  }
});

app.get("/api/auth/me", auth, async (req, res) => {
  const user = await User.findById(req.userId).lean();
  if (!user) return res.status(401).json({ error: m(req, "Account not found", "الحساب غير موجود") });
  res.json({ name: user.name, email: user.email, role: user.role || "user" });
});

// ---------- المنتجات ----------
// كل المنتجات
app.get("/api/products", async (req, res) => {
  try {
    res.json(await Product.find().sort({ id: 1 }).lean());
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: m(req, "Could not load products", "تعذر تحميل المنتجات") });
  }
});

// منتج واحد
app.get("/api/products/:id", async (req, res) => {
  try {
    const p = await Product.findOne({ id: Number(req.params.id) }).lean();
    if (!p) return res.status(404).json({ error: m(req, "Product not found", "المنتج غير موجود") });
    res.json(p);
  } catch (err) {
    res.status(500).json({ error: m(req, "Server error", "خطأ في السيرفر") });
  }
});

// إنشاء طلب جديد
app.post("/api/orders", auth, async (req, res) => {
  try {
    const { name, phone, address, items } = req.body;
    const paymentMethod = ["cod", "visa", "mastercard", "meeza"].includes(req.body.paymentMethod) ? req.body.paymentMethod : "cod";

    if (!name || !address || !/^\d{8,}$/.test(String(phone || ""))) {
      return res.status(400).json({ error: m(req, "Incomplete order details", "بيانات الطلب غير مكتملة") });
    }
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: m(req, "Your cart is empty", "السلة فارغة") });
    }

    // السعر يُحسب من الداتابيز وليس من المتصفح (عشان محدش يغيّر السعر)
    const ids = items.map(i => Number(i.id));
    const found = await Product.find({ id: { $in: ids } }).lean();
    const byId = new Map(found.map(p => [p.id, p]));

    const lines = [];
    let total = 0;
    for (const i of items) {
      const p = byId.get(Number(i.id));
      const qty = Math.floor(Number(i.qty));
      if (!p || !(qty >= 1 && qty <= 50)) {
        return res.status(400).json({ error: m(req, "Invalid product or quantity", "منتج أو كمية غير صحيحة") });
      }
      lines.push({ productId: p.id, name: p.name, price: p.price, qty });
      total += p.price * qty;
    }

    const shipping = total >= 99 ? 0 : 5; // شحن مجاني فوق 99$
    total = Math.round((total + shipping) * 100) / 100;
    const order = await Order.create({ user: req.userId, name, phone, address, items: lines, shipping, total, paymentMethod, paymentStatus: paymentMethod === "cod" ? "pending" : "paid-demo", status: "placed", history: [{ status: "placed", at: new Date() }] });
    res.status(201).json({ ok: true, orderId: order._id, total });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: m(req, "Could not save the order", "تعذر حفظ الطلب") });
  }
});

// طلبات المستخدم المسجّل
app.get("/api/orders/mine", auth, async (req, res) => {
  try {
    const list = await Order.find({ user: req.userId }).sort({ createdAt: -1 }).limit(20).lean();
    res.json(list.map(o => ({ id: o._id, createdAt: o.createdAt, status: o.status, total: o.total, items: o.items, paymentMethod: o.paymentMethod, shipping: o.shipping, history: o.history })));
  } catch (err) {
    res.status(500).json({ error: m(req, "Could not load orders", "تعذر تحميل الطلبات") });
  }
});

// عناوين المستخدم السابقة (من طلباته)
app.get("/api/addresses", auth, async (req, res) => {
  try {
    const list = await Order.find({ user: req.userId }).sort({ createdAt: -1 }).limit(50).lean();
    const seen = new Set(), out = [];
    for (const o of list) {
      const key = [o.name, o.phone, o.address].join("|").toLowerCase();
      if (seen.has(key)) continue;
      seen.add(key);
      out.push({ name: o.name, phone: o.phone, address: o.address });
      if (out.length >= 10) break;
    }
    res.json(out);
  } catch (err) {
    res.status(500).json({ error: m(req, "Could not load addresses", "تعذر تحميل العناوين") });
  }
});

// ================= لوحة تحكم الأدمن (كل المسارات محمية: تسجيل دخول + role = admin) =================
const adminOnly = async (req, res, next) => {
  try {
    const u = await User.findById(req.userId).select("role").lean();
    if (!u || u.role !== "admin") return res.status(403).json({ error: m(req, "Admins only", "للمشرفين فقط") });
    next();
  } catch (err) {
    res.status(500).json({ error: m(req, "Server error", "خطأ في السيرفر") });
  }
};
const ORDER_STATUSES = ["placed", "processing", "shipped", "delivered", "cancelled"];
const CAT_LIST = ["Electronics", "Phones", "Fashion", "Home & Kitchen", "Books", "Sports"];
const srvErr = (req, res, err) => { console.error(err); res.status(500).json({ error: m(req, "Server error", "خطأ في السيرفر") }); };

app.get("/api/admin/stats", auth, adminOnly, async (req, res) => {
  try {
    const [orders, users, products, rev, byStatus, recent] = await Promise.all([
      Order.countDocuments(), User.countDocuments(), Product.countDocuments(),
      Order.aggregate([{ $match: { status: { $ne: "cancelled" } } }, { $group: { _id: null, sum: { $sum: "$total" } } }]),
      Order.aggregate([{ $group: { _id: "$status", n: { $sum: 1 } } }]),
      Order.find().sort({ createdAt: -1 }).limit(5).lean()
    ]);
    res.json({
      orders, users, products,
      revenue: rev[0] ? rev[0].sum : 0,
      byStatus: Object.fromEntries(byStatus.map(x => [x._id, x.n])),
      recent: recent.map(o => ({ id: o._id, name: o.name, total: o.total, status: o.status, createdAt: o.createdAt }))
    });
  } catch (err) { srvErr(req, res, err); }
});

app.get("/api/admin/orders", auth, adminOnly, async (req, res) => {
  try {
    const list = await Order.find().sort({ createdAt: -1 }).limit(300).populate("user", "email").lean();
    res.json(list.map(o => ({
      id: o._id, createdAt: o.createdAt, name: o.name, phone: o.phone, address: o.address,
      email: o.user ? o.user.email : "", items: o.items, shipping: o.shipping || 0, total: o.total,
      status: o.status, paymentMethod: o.paymentMethod, paymentStatus: o.paymentStatus, history: o.history || []
    })));
  } catch (err) { srvErr(req, res, err); }
});

app.patch("/api/admin/orders/:id/status", auth, adminOnly, async (req, res) => {
  try {
    const status = String(req.body.status || "");
    if (!ORDER_STATUSES.includes(status)) return res.status(400).json({ error: m(req, "Invalid status", "حالة غير صحيحة") });
    if (!mongoose.isValidObjectId(req.params.id)) return res.status(404).json({ error: m(req, "Order not found", "الطلب غير موجود") });
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ error: m(req, "Order not found", "الطلب غير موجود") });
    order.status = status;
    order.history.push({ status, at: new Date() });
    await order.save();
    res.json({ ok: true, status });
  } catch (err) { srvErr(req, res, err); }
});

function validateProduct(b, req) {
  const bad = (en, ar) => ({ error: m(req, en, ar) });
  const name = String(b.name || "").trim().slice(0, 120);
  if (!name) return bad("Product name is required", "اسم المنتج مطلوب");
  const cat = String(b.cat || "");
  if (!CAT_LIST.includes(cat)) return bad("Choose a valid category", "اختر قسمًا صحيحًا");
  const price = Math.round(Number(b.price) * 100) / 100;
  if (!(price >= 0 && price <= 1000000)) return bad("Enter a valid price", "أدخل سعرًا صحيحًا");
  const old = b.old === "" || b.old == null ? price : Math.round(Number(b.old) * 100) / 100;
  if (!(old >= 0 && old <= 1000000)) return bad("Enter a valid old price", "أدخل سعرًا قديمًا صحيحًا");
  const img = String(b.img || "").trim();
  if (img && !/^(images\/[\w.\-]+|https:\/\/[^\s"'<>]+)$/.test(img)) {
    return bad("Image must look like images/19.jpg or be an https link", "الصورة لازم تكون مثل images/19.jpg أو رابط https");
  }
  return { data: {
    name, cat, price, old, img,
    nameAr: String(b.nameAr || "").trim().slice(0, 120),
    e: String(b.e || "").trim().slice(0, 8) || "🛍️",
    desc: String(b.desc || "").trim().slice(0, 600),
    descAr: String(b.descAr || "").trim().slice(0, 600)
  } };
}

app.post("/api/admin/products", auth, adminOnly, async (req, res) => {
  try {
    const v = validateProduct(req.body, req);
    if (v.error) return res.status(400).json({ error: v.error });
    const last = await Product.findOne().sort({ id: -1 }).select("id").lean();
    const id = (last ? last.id : 0) + 1;
    if (!v.data.img) v.data.img = `images/${id}.jpg`;
    const product = await Product.create({ ...v.data, id });
    res.status(201).json(product);
  } catch (err) { srvErr(req, res, err); }
});

app.put("/api/admin/products/:id", auth, adminOnly, async (req, res) => {
  try {
    const v = validateProduct(req.body, req);
    if (v.error) return res.status(400).json({ error: v.error });
    const id = Number(req.params.id);
    if (!v.data.img) v.data.img = `images/${id}.jpg`;
    const product = await Product.findOneAndUpdate({ id }, { $set: v.data }, { new: true });
    if (!product) return res.status(404).json({ error: m(req, "Product not found", "المنتج غير موجود") });
    res.json(product);
  } catch (err) { srvErr(req, res, err); }
});

app.delete("/api/admin/products/:id", auth, adminOnly, async (req, res) => {
  try {
    const r = await Product.deleteOne({ id: Number(req.params.id) });
    if (!r.deletedCount) return res.status(404).json({ error: m(req, "Product not found", "المنتج غير موجود") });
    res.json({ ok: true });
  } catch (err) { srvErr(req, res, err); }
});

app.get("/api/admin/users", auth, adminOnly, async (req, res) => {
  try {
    res.json(await User.find().select("name email role verified createdAt").sort({ createdAt: -1 }).limit(300).lean());
  } catch (err) { srvErr(req, res, err); }
});

async function connectDB() {
  if (mongoose.connection.readyState === 1) return;

  if (!global.dbPromise) {
    global.dbPromise = mongoose
      .connect(process.env.MONGODB_URI)
      .catch((err) => {
        global.dbPromise = null;
        throw err;
      });
  }

  return global.dbPromise;
}

if (require.main === module) {
  if (!process.env.JWT_SECRET || !process.env.MONGODB_URI) {
    console.error("JWT_SECRET أو MONGODB_URI غير موجود");
    process.exit(1);
  }

  connectDB()
    .then(() => {
      console.log("Connected to MongoDB");
      const PORT = process.env.PORT || 3000;
      app.listen(PORT, () =>
        console.log(`Server running on http://localhost:${PORT}`)
      );
    })
    .catch((err) => {
      console.error("MongoDB connection failed:", err.message);
      process.exit(1);
    });
}

module.exports = { app, connectDB };