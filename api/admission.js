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

  const { name, parent, phone, email, program, message } = req.body
  if (!name || !parent || !phone || !program)
    return res.status(400).json({ error: 'Required: name, parent, phone, program' })

  try {
    // Notify school via Resend
    await resend.emails.send({
      from: `London Kids School <${EMAIL_FROM}>`,
      to: [EMAIL_TO],
      subject: `🎒 New Admission Enquiry – ${name} (${program})`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;border-radius:16px;overflow:hidden;border:1px solid #e2e8f0;">
          <div style="background:linear-gradient(135deg,#0ea5e9,#0369a1);padding:32px;text-align:center;">
            <h1 style="color:white;margin:0;font-size:24px;">🎒 New Admission Enquiry</h1>
            <p style="color:rgba(255,255,255,0.85);margin:8px 0 0;font-size:14px;">London Kids School — Greater Noida West</p>
          </div>
          <div style="padding:32px;background:white;">
            <table style="width:100%;border-collapse:collapse;font-size:15px;">
              <tr style="border-bottom:1px solid #e2e8f0;">
                <td style="padding:12px 8px;font-weight:700;color:#64748b;width:150px;">Child's Name</td>
                <td style="padding:12px 8px;color:#0f172a;font-weight:600;">${name}</td>
              </tr>
              <tr style="border-bottom:1px solid #e2e8f0;">
                <td style="padding:12px 8px;font-weight:700;color:#64748b;">Parent's Name</td>
                <td style="padding:12px 8px;color:#0f172a;font-weight:600;">${parent}</td>
              </tr>
              <tr style="border-bottom:1px solid #e2e8f0;">
                <td style="padding:12px 8px;font-weight:700;color:#64748b;">Phone</td>
                <td style="padding:12px 8px;"><a href="tel:${phone}" style="color:#0ea5e9;font-weight:700;">${phone}</a></td>
              </tr>
              ${email ? `<tr style="border-bottom:1px solid #e2e8f0;">
                <td style="padding:12px 8px;font-weight:700;color:#64748b;">Email</td>
                <td style="padding:12px 8px;"><a href="mailto:${email}" style="color:#0ea5e9;">${email}</a></td>
              </tr>` : ''}
              <tr style="border-bottom:1px solid #e2e8f0;">
                <td style="padding:12px 8px;font-weight:700;color:#64748b;">Program</td>
                <td style="padding:12px 8px;"><span style="background:#dbeafe;color:#1d4ed8;padding:4px 14px;border-radius:100px;font-weight:700;font-size:13px;">${program}</span></td>
              </tr>
              ${message ? `<tr><td style="padding:12px 8px;font-weight:700;color:#64748b;vertical-align:top;">Message</td>
                <td style="padding:12px 8px;color:#475569;">${message}</td></tr>` : ''}
            </table>
            <div style="margin-top:20px;background:#f0fdf4;border-radius:12px;padding:16px;border-left:4px solid #22c55e;">
              <p style="margin:0;color:#166534;font-weight:600;">📞 Call <strong>${phone}</strong> within 24 hours</p>
            </div>
          </div>
          <div style="background:#f8fafc;padding:14px 28px;text-align:center;border-top:1px solid #e2e8f0;">
            <p style="color:#94a3b8;font-size:12px;margin:0;">© 2026 London Kids School | Ace Divino, Sector 1, Greater Noida West</p>
          </div>
        </div>`,
    })

    // Confirmation to parent via Gmail
    if (email) {
      try {
        await gmail.sendMail({
          from: `"London Kids School 🐯" <${process.env.GMAIL_USER}>`,
          to: email,
          subject: `✅ Admission Enquiry Received – London Kids School`,
          html: `
            <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;border-radius:16px;overflow:hidden;border:1px solid #e2e8f0;">
              <div style="background:linear-gradient(135deg,#0ea5e9,#0369a1);padding:32px;text-align:center;">
                <div style="font-size:52px;margin-bottom:12px;">🎉</div>
                <h1 style="color:white;margin:0;font-size:24px;">Thank You, ${parent}!</h1>
                <p style="color:rgba(255,255,255,0.85);margin:8px 0 0;">Your enquiry has been received successfully</p>
              </div>
              <div style="padding:32px;background:white;">
                <p style="color:#334155;line-height:1.6;font-size:15px;">Dear <strong>${parent}</strong>,</p>
                <p style="color:#475569;line-height:1.75;font-size:15px;">
                  Thank you for your interest in <strong>London Kids School</strong>! We have received your admission enquiry for
                  <strong>${name}</strong> for the <strong>${program}</strong> program.
                </p>
                <div style="background:#e0f7ff;border-radius:12px;padding:20px 24px;margin:20px 0;border-left:4px solid #0ea5e9;">
                  <h3 style="color:#0369a1;margin:0 0 12px;font-size:16px;">📋 What happens next?</h3>
                  <ol style="color:#475569;margin:0;padding-left:20px;line-height:2;font-size:14px;">
                    <li>Our team will call you within <strong>24 hours</strong></li>
                    <li>We'll schedule a school visit at your convenience</li>
                    <li>A friendly parent &amp; child interaction session</li>
                    <li>Admission confirmation &amp; joining formalities</li>
                  </ol>
                </div>
                <div style="background:#fff7ed;border-radius:12px;padding:16px 20px;border-left:4px solid #fb923c;">
                  <p style="margin:0;color:#9a3412;font-size:14px;line-height:1.8;">
                    📞 <a href="tel:+919236488036" style="color:#ea580c;font-weight:700;">+91 92364 88036</a><br/>
                    📍 T9,004, Ace Divino, Sector 1, Greater Noida West, UP – 201306<br/>
                    🕐 Mon–Fri: 8:00 AM – 12:00 PM | Day Care: 7 Days, 7 AM – 10 PM
                  </p>
                </div>
              </div>
              <div style="background:linear-gradient(135deg,#fb923c,#f97316);padding:20px 32px;text-align:center;">
                <p style="color:white;font-weight:700;margin:0;font-size:14px;">🐯 London Kids School — Where Little Dreams Begin!</p>
              </div>
            </div>`,
        })
      } catch (_) { /* Gmail optional */ }
    }

    res.status(200).json({ success: true, message: 'Enquiry submitted! You will receive a confirmation email shortly.' })
  } catch (err) {
    console.error('Admission error:', err)
    res.status(500).json({ error: err.message })
  }
}
