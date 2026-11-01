const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name:     { type: String, required: true, trim: true },
  email:    { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], default: "user" }, // يتحول لـ admin بالأمر: node make-admin.js email
  verified: { type: Boolean, default: false },   // تم تأكيد الإيميل
  codeHash: String,                               // كود التفعيل/الاستعادة (مشفّر)
  codeExpires: Date,
  codePurpose: String,                            // "verify" | "reset"
  codeAttempts: { type: Number, default: 0 },
  codeSentAt: Date // مشفّرة بـ bcrypt، مش كلمة السر الحقيقية
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
