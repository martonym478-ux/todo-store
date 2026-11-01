// إرسال أكواد التفعيل بالإيميل (nodemailer). بدون إعدادات SMTP الكود بيتطبع في التيرمينال (للتجربة).
let tx = null;
function transport() {
  if (tx) return tx;
  if (!process.env.SMTP_HOST) return null;
  const nodemailer = require("nodemailer");
  const port = Number(process.env.SMTP_PORT || 465);
  tx = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure: port === 465,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
  });
  return tx;
}

const T = {
  en: { verify: ["Verify your email", "Your ToDo verification code is:"], reset: ["Reset your password", "Your ToDo password reset code is:"], note: "This code expires in 10 minutes. If you didn’t request it, you can ignore this email." },
  ar: { verify: ["تأكيد بريدك الإلكتروني", "كود التحقق الخاص بك في ToDo هو:"], reset: ["استعادة كلمة المرور", "كود استعادة كلمة المرور في ToDo هو:"], note: "ينتهي الكود خلال 10 دقائق. إذا لم تطلبه فتجاهل هذه الرسالة." }
};

async function sendCode(to, code, purpose, lang = "en") {
  const t = T[lang] || T.en, [subject, line] = t[purpose];
  const tr = transport();
  if (!tr) {
    console.log(`[DEV] ${purpose} code for ${to}: ${code}   (SMTP غير مضبوط في .env)`);
    return;
  }
  const html = `<div dir="${lang === "ar" ? "rtl" : "ltr"}" style="font-family:Arial,sans-serif;max-width:420px;margin:auto;padding:24px;border:1px solid #e6e2f4;border-radius:14px">
    <h2 style="color:#6a2be0;margin:0 0 12px">ToDo</h2><p>${line}</p>
    <p style="font-size:34px;letter-spacing:8px;font-weight:700;color:#1c1a2e;margin:16px 0">${code}</p>
    <p style="color:#6b6885;font-size:13px">${t.note}</p></div>`;
  await tr.sendMail({ from: process.env.MAIL_FROM || process.env.SMTP_USER, to, subject: `ToDo — ${subject}`, text: `${line} ${code}\n${t.note}`, html });
}

module.exports = { sendCode };
