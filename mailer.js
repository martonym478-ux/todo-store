// إرسال أكواد التفعيل بالإيميل. الأولوية:
//  1) Brevo عبر HTTPS (BREVO_API_KEY)  ← الأنسب للاستضافة المجانية (Render بيقفل بورتات SMTP)
//  2) SMTP عبر nodemailer (SMTP_HOST)   ← للتجربة على جهازك (مثلًا Gmail)
//  3) بدون إعدادات: الكود بيتطبع في التيرمينال (للتجربة فقط)
let tx = null;
function smtpTransport() {
  if (tx) return tx;
  if (!process.env.SMTP_HOST) return null;
  const nodemailer = require("nodemailer");
  const port = Number(process.env.SMTP_PORT || 465);
  tx = nodemailer.createTransport({
    host: process.env.SMTP_HOST, port, secure: port === 465,
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
  const html = `<div dir="${lang === "ar" ? "rtl" : "ltr"}" style="font-family:Arial,sans-serif;max-width:420px;margin:auto;padding:24px;border:1px solid #e6e2f4;border-radius:14px">
    <h2 style="color:#6a2be0;margin:0 0 12px">ToDo</h2><p>${line}</p>
    <p style="font-size:34px;letter-spacing:8px;font-weight:700;color:#1c1a2e;margin:16px 0">${code}</p>
    <p style="color:#6b6885;font-size:13px">${t.note}</p></div>`;
  const text = `${line} ${code}\n${t.note}`;

  if (process.env.BREVO_API_KEY) {
    const res = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: { "api-key": process.env.BREVO_API_KEY, "content-type": "application/json", accept: "application/json" },
      body: JSON.stringify({
        sender: { name: process.env.MAIL_FROM_NAME || "ToDo", email: process.env.MAIL_FROM_EMAIL },
        to: [{ email: to }],
        subject: `ToDo — ${subject}`,
        htmlContent: html,
        textContent: text
      })
    });
    if (!res.ok) throw new Error(`Brevo API error ${res.status}: ${(await res.text()).slice(0, 300)}`);
    return;
  }

  const tr = smtpTransport();
  if (tr) {
    await tr.sendMail({ from: process.env.MAIL_FROM || process.env.SMTP_USER, to, subject: `ToDo — ${subject}`, text, html });
    return;
  }

  console.log(`[DEV] ${purpose} code for ${to}: ${code}   (الإيميل غير مضبوط في .env)`);
}

module.exports = { sendCode };
