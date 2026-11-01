const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user:    { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // صاحب الطلب لو كان مسجّل دخول
  name:    { type: String, required: true, trim: true },
  phone:   { type: String, required: true, trim: true },
  address: { type: String, required: true, trim: true },
  items: [{
    productId: Number,
    name: String,
    price: Number,
    qty: Number
  }],
  shipping: { type: Number, default: 0 },
  paymentMethod: { type: String, enum: ["cod", "visa", "mastercard", "meeza"], default: "cod" },
  paymentStatus: { type: String, default: "pending" }, // pending | paid-demo (الدفع بالكارت تجريبي)
  total:  { type: Number, required: true },
  status: { type: String, default: "placed" }, // placed | processing | shipped | delivered | cancelled
  history: [{ status: String, at: Date }]
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);
