const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  id:    { type: Number, required: true, unique: true }, // رقم المنتج (نفس رقم صورته images/ID.jpg)
  name:  { type: String, required: true },               // الاسم بالإنجليزي
  nameAr:{ type: String, default: "" },                  // الاسم بالعربي
  cat:   { type: String, required: true },               // القسم
  price: { type: Number, required: true, min: 0 },
  old:   { type: Number, default: 0 },                   // السعر قبل الخصم
  rate:  { type: Number, default: 4.5 },
  n:     { type: Number, default: 0 },                   // عدد التقييمات
  e:     { type: String, default: "🛍️" },               // إيموجي بديل لو الصورة مش موجودة
  img:   { type: String, default: "" },
  desc:  { type: String, default: "" },
  descAr:{ type: String, default: "" }
});

module.exports = mongoose.model("Product", productSchema);
