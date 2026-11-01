// تغيير حالة طلب (للتجربة بدل لوحة تحكم): node set-status.js <آخر 6 حروف من رقم الطلب> <الحالة>
// الحالات: placed | processing | shipped | delivered | cancelled
// مثال:    node set-status.js A1B2C3 shipped
require("dotenv").config();
const mongoose = require("mongoose");
const Order = require("./models/Order");

const [, , idArg, status] = process.argv;
const ALLOWED = ["placed", "processing", "shipped", "delivered", "cancelled"];

(async () => {
  if (!idArg || !ALLOWED.includes(status)) {
    console.log("الاستخدام: node set-status.js <رقم الطلب> <placed|processing|shipped|delivered|cancelled>");
    console.log("مثال:      node set-status.js A1B2C3 shipped");
    process.exit(1);
  }
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const key = idArg.replace("#", "").toLowerCase();
    const all = await Order.find().select("_id").lean();
    const hit = all.find(o => String(o._id).toLowerCase().endsWith(key));
    if (!hit) return console.log("لم يتم العثور على الطلب:", idArg);
    const order = await Order.findById(hit._id);
    order.status = status;
    order.history.push({ status, at: new Date() });
    await order.save();
    console.log(`تم: الطلب #${String(order._id).slice(-6).toUpperCase()} → ${status}`);
  } catch (err) {
    console.error("فشل:", err.message);
  } finally {
    await mongoose.disconnect();
  }
})();
