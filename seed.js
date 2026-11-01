// يملأ الداتابيز بالمنتجات من products.json
// تشغيله: npm run seed   (تحذير: بيمسح مجموعة products الحالية ويكتبها من جديد)
require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("./models/Product");
const products = require("./products.json");

(async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log(`تم إضافة ${products.length} منتج`);
  } catch (err) {
    console.error("فشل:", err.message);
  } finally {
    await mongoose.disconnect();
  }
})();
