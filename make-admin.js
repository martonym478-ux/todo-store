// تحويل مستخدم لمشرف (أو إرجاعه لمستخدم عادي)
// الاستخدام:  node make-admin.js your@email.com          ← يجعله admin
//             node make-admin.js your@email.com user     ← يرجعه مستخدم عادي
// لازم يكون الحساب موجود ومفعّل (سجّل من الموقع الأول).
require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./models/User");

const email = String(process.argv[2] || "").trim().toLowerCase();
const role = process.argv[3] === "user" ? "user" : "admin";

(async () => {
  if (!email) {
    console.log("الاستخدام: node make-admin.js your@email.com [user]");
    process.exit(1);
  }
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const user = await User.findOne({ email });
    if (!user) return console.log("لا يوجد حساب بهذا البريد. سجّل من الموقع أولًا:", email);
    user.role = role;
    await user.save();
    console.log(`تم: ${user.email} → ${role}`);
  } catch (err) {
    console.error("فشل:", err.message);
  } finally {
    await mongoose.disconnect();
  }
})();
