import { Resend } from 'resend'
import nodemailer from 'nodemailer'

const resend = new Resend(process.env.RESEND_API_KEY)
const EMAIL_TO   = process.env.EMAIL_TO   || 'londonkids.greaternoida@gmail.com'
const EMAIL_FROM = process.env.EMAIL_FROM || 'onboarding@resend.dev'

const gmail = nodemailer.createTransport({
  service: 'gmail',
  auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_APP_PASSWORD },
})

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { name, phone, email, message } = req.body
  if (!name || !phone || !message)
    return res.status(400).json({ error: 'Required: name, phone, message' })

  try {
    // Notify school via Resend
    await resend.emails.send({
      from: `London Kids School <${EMAIL_FROM}>`,
      to: [EMAIL_TO],
      subject: `📬 New Contact Message from ${name}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;border-radius:16px;overflow:hidden;border:1px solid #e2e8f0;">
          <div style="background:linear-gradient(135deg,#22c55e,#16a34a);padding:28px;text-align:center;">
            <h1 style="color:white;margin:0;font-size:22px;">📬 New Contact Message</h1>
            <p style="color:rgba(255,255,255,0.85);margin:8px 0 0;font-size:14px;">London Kids School Website</p>
          </div>
          <div style="padding:28px;background:white;">
            <table style="width:100%;border-collapse:collapse;font-size:15px;">
              <tr style="border-bottom:1px solid #e2e8f0;">
                <td style="padding:12px 8px;font-weight:700;color:#64748b;width:120px;">Name</td>
                <td style="padding:12px 8px;color:#0f172a;font-weight:600;">${name}</td>
              </tr>
              <tr style="border-bottom:1px solid #e2e8f0;">
                <td style="padding:12px 8px;font-weight:700;color:#64748b;">Phone</td>
                <td style="padding:12px 8px;"><a href="tel:${phone}" style="color:#0ea5e9;font-weight:700;">${phone}</a></td>
              </tr>
              ${email ? `<tr style="border-bottom:1px solid #e2e8f0;">
                <td style="padding:12px 8px;font-weight:700;color:#64748b;">Email</td>
                <td style="padding:12px 8px;"><a href="mailto:${email}" style="color:#0ea5e9;">${email}</a></td>
              </tr>` : ''}
              <tr>
                <td style="padding:12px 8px;font-weight:700;color:#64748b;vertical-align:top;">Message</td>
                <td style="padding:12px 8px;color:#475569;line-height:1.6;">${message}</td>
              </tr>
            </table>
            <div style="margin-top:20px;background:#f0fdf4;border-radius:12px;padding:14px 18px;border-left:4px solid #22c55e;">
              <p style="margin:0;color:#166534;font-size:13px;font-weight:600;">
                💡 Reply: <a href="tel:${phone}" style="color:#15803d;">${phone}</a>
                ${email ? ` or <a href="mailto:${email}" style="color:#15803d;">${email}</a>` : ''}
              </p>
            </div>
          </div>
          <div style="background:#f8fafc;padding:14px 28px;text-align:center;border-top:1px solid #e2e8f0;">
            <p style="color:#94a3b8;font-size:12px;margin:0;">© 2026 London Kids School | Greater Noida West</p>
          </div>
        </div>`,
    })

    // Auto-reply to sender via Gmail
    if (email) {
      try {
        await gmail.sendMail({
          from: `"London Kids School 🐯" <${process.env.GMAIL_USER}>`,
          to: email,
          subject: `✅ We received your message – London Kids School`,
          html: `
            <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;border-radius:16px;overflow:hidden;border:1px solid #e2e8f0;">
              <div style="background:linear-gradient(135deg,#22c55e,#16a34a);padding:28px;text-align:center;">
                <div style="font-size:46px;margin-bottom:10px;">✅</div>
                <h1 style="color:white;margin:0;font-size:22px;">Message Received!</h1>
                <p style="color:rgba(255,255,255,0.85);margin:8px 0 0;font-size:14px;">London Kids School</p>
              </div>
              <div style="padding:28px;background:white;">
                <p style="color:#334155;font-size:15px;line-height:1.7;">Hi <strong>${name}</strong>,</p>
                <p style="color:#475569;font-size:15px;line-height:1.75;">
                  Thank you for reaching out to <strong>London Kids School</strong>.
                  Our team will get back to you within <strong>24 hours</strong>.
                </p>
                <div style="background:#f0f9ff;border-radius:12px;padding:16px 20px;border-left:4px solid #0ea5e9;margin:16px 0;">
                  <p style="margin:0;color:#0369a1;font-size:14px;line-height:1.8;">
                    📞 <a href="tel:+919876543210" style="color:#0369a1;font-weight:700;">+91 98765 43210</a><br/>
                    📍 Ace Divino, Sector 1, Greater Noida West, UP – 201306<br/>
                    🕐 Mon–Fri: 8:00 AM – 12:00 PM | Day Care: 7 Days, 7 AM – 10 PM
                  </p>
                </div>
              </div>
              <div style="background:linear-gradient(135deg,#0ea5e9,#0369a1);padding:18px;text-align:center;">
                <p style="color:white;font-weight:700;margin:0;font-size:13px;">🐯 London Kids School — Where Little Dreams Begin!</p>
              </div>
            </div>`,
        })
      } catch (_) { /* Gmail optional */ }
    }

    res.status(200).json({ success: true, message: 'Message sent! You will receive a confirmation shortly.' })
  } catch (err) {
    console.error('Contact error:', err)
    res.status(500).json({ error: err.message })
  }
}
