import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { Resend } from 'resend'
import nodemailer from 'nodemailer'
import multer from 'multer'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const GALLERY_DIR  = path.join(__dirname, 'public', 'gallery')
const GALLERY_JSON = path.join(__dirname, 'public', 'gallery.json')
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'london2026'

// Ensure gallery folder & JSON exist
if (!fs.existsSync(GALLERY_DIR))  fs.mkdirSync(GALLERY_DIR, { recursive: true })
if (!fs.existsSync(GALLERY_JSON)) fs.writeFileSync(GALLERY_JSON, '[]')

// Multer — save to public/gallery/
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, GALLERY_DIR),
  filename:    (req, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e6)
    cb(null, unique + path.extname(file.originalname))
  },
})
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) cb(null, true)
    else cb(new Error('Only images allowed'))
  },
})

// Helper: read/write gallery JSON
const readGallery  = () => JSON.parse(fs.readFileSync(GALLERY_JSON, 'utf8'))
const writeGallery = (data) => fs.writeFileSync(GALLERY_JSON, JSON.stringify(data, null, 2))


const app = express()
const PORT = process.env.PORT || 3001

// ── Resend (school notifications) ──────────────────────────────────────────
const resend = new Resend(process.env.RESEND_API_KEY)
const EMAIL_TO   = process.env.EMAIL_TO   || 'londonkids.greaternoida@gmail.com'
const EMAIL_FROM = process.env.EMAIL_FROM || 'onboarding@resend.dev'

// ── Nodemailer via Gmail SMTP (sends to ANY email) ──────────────────────────
const gmailTransporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
})

// Check Gmail SMTP connection on startup
gmailTransporter.verify((err) => {
  if (err) {
    console.warn('⚠️  Gmail SMTP not connected:', err.message)
    console.warn('   → Sender confirmations will be skipped until Gmail is configured.\n')
  } else {
    console.log('✅  Gmail SMTP connected — can send to ANY email address!\n')
  }
})

console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
console.log('🏫  London Kids School — Email Server')
console.log(`📧  School notifications → ${EMAIL_TO}`)
console.log(`📤  Gmail sender        → ${process.env.GMAIL_USER || 'not configured'}`)
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')

app.use(cors({ origin: '*' }))
app.use(express.json())
// Serve uploaded gallery images
app.use('/gallery', express.static(GALLERY_DIR))


// ── Send school notification via Resend ─────────────────────────────────────
async function notifySchool({ subject, html }) {
  console.log(`📨  [Resend] Sending to school: "${subject}"`)
  const result = await resend.emails.send({
    from: `London Kids School <${EMAIL_FROM}>`,
    to: [EMAIL_TO],
    subject,
    html,
  })
  if (result.error) throw new Error(result.error.message)
  console.log(`✅  School notified! ID: ${result.data?.id}`)
}

// ── Send confirmation to sender via Gmail SMTP ──────────────────────────────
async function confirmSender({ to, subject, html }) {
  if (!to) return
  console.log(`📨  [Gmail] Sending confirmation to: ${to}`)
  try {
    const info = await gmailTransporter.sendMail({
      from: `"London Kids School 🐯" <${process.env.GMAIL_USER}>`,
      to,
      subject,
      html,
    })
    console.log(`✅  Confirmation sent to sender! ID: ${info.messageId}`)
  } catch (err) {
    console.warn(`⚠️  Could not send to sender (${to}): ${err.message}`)
    // Don't throw — school notification already went through
  }
}

// ══════════════════════════════════════════════════════════════════
//  ADMISSION FORM
// ══════════════════════════════════════════════════════════════════
app.post('/api/admission', async (req, res) => {
  console.log('\n🎒 [ADMISSION] New enquiry:', req.body)
  const { name, parent, phone, email, program, message } = req.body

  if (!name || !parent || !phone || !program) {
    return res.status(400).json({ error: 'Required: name, parent, phone, program' })
  }

  try {
    // 1️⃣ Notify school via Resend
    await notifySchool({
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
                <td style="padding:12px 8px;">
                  <span style="background:#dbeafe;color:#1d4ed8;padding:4px 14px;border-radius:100px;font-weight:700;font-size:13px;">${program}</span>
                </td>
              </tr>
              ${message ? `<tr>
                <td style="padding:12px 8px;font-weight:700;color:#64748b;vertical-align:top;">Message</td>
                <td style="padding:12px 8px;color:#475569;">${message}</td>
              </tr>` : ''}
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

    // 2️⃣ Send confirmation to parent via Gmail (any email)
    if (email) {
      await confirmSender({
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
                Thank you for your interest in <strong>London Kids School</strong>! We've received your admission enquiry for 
                <strong>${name}</strong> for the <strong>${program}</strong> program.
              </p>
              <div style="background:#e0f7ff;border-radius:12px;padding:20px 24px;margin:20px 0;border-left:4px solid #0ea5e9;">
                <h3 style="color:#0369a1;margin:0 0 12px;font-size:16px;">📋 What happens next?</h3>
                <ol style="color:#475569;margin:0;padding-left:20px;line-height:2;font-size:14px;">
                  <li>Our team will call you within <strong>24 hours</strong></li>
                  <li>We'll schedule a school visit at your convenience</li>
                  <li>A friendly parent & child interaction session</li>
                  <li>Admission confirmation & joining formalities</li>
                </ol>
              </div>
              <div style="background:#fff7ed;border-radius:12px;padding:16px 20px;border-left:4px solid #fb923c;">
                <p style="margin:0;color:#9a3412;font-size:14px;line-height:1.8;">
                  📞 <a href="tel:+919876543210" style="color:#0369a1;font-weight:700;">+91 98765 43210</a><br/>
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
    }

    res.json({ success: true, message: 'Enquiry submitted! You will receive a confirmation email shortly.' })
  } catch (err) {
    console.error('❌ Admission error:', err.message)
    res.status(500).json({ error: err.message })
  }
})

// ══════════════════════════════════════════════════════════════════
//  CONTACT FORM
// ══════════════════════════════════════════════════════════════════
app.post('/api/contact', async (req, res) => {
  console.log('\n📬 [CONTACT] New message:', req.body)
  const { name, phone, email, message } = req.body

  if (!name || !phone || !message) {
    return res.status(400).json({ error: 'Required: name, phone, message' })
  }

  try {
    // 1️⃣ Notify school via Resend
    await notifySchool({
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
                💡 Reply to: <a href="tel:${phone}" style="color:#15803d;">${phone}</a>
                ${email ? ` or <a href="mailto:${email}" style="color:#15803d;">${email}</a>` : ''}
              </p>
            </div>
          </div>
          <div style="background:#f8fafc;padding:14px 28px;text-align:center;border-top:1px solid #e2e8f0;">
            <p style="color:#94a3b8;font-size:12px;margin:0;">© 2026 London Kids School | Greater Noida West</p>
          </div>
        </div>`,
    })

    // 2️⃣ Auto-reply to sender via Gmail (any email)
    if (email) {
      await confirmSender({
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
                We've received your message and our team will get back to you within <strong>24 hours</strong>.
              </p>
              <div style="background:#f0f9ff;border-radius:12px;padding:16px 20px;border-left:4px solid #0ea5e9;margin:16px 0;">
                <p style="margin:0;color:#0369a1;font-size:14px;line-height:1.8;">
                  📞 <a href="tel:+919876543210" style="color:#0369a1;font-weight:700;">+91 98765 43210</a><br/>
                  📍 Ace Divino, Sector 1, Greater Noida West, UP – 201306<br/>
                  🕐 Mon–Sat: 8:00 AM – 2:00 PM
                </p>
              </div>
              <p style="color:#475569;font-size:14px;line-height:1.7;">
                You can also <strong>WhatsApp us</strong> or visit our school for a campus tour anytime during school hours.
              </p>
            </div>
            <div style="background:linear-gradient(135deg,#0ea5e9,#0369a1);padding:18px;text-align:center;">
              <p style="color:white;font-weight:700;margin:0;font-size:13px;">🐯 London Kids School — Where Little Dreams Begin!</p>
            </div>
          </div>`,
      })
    }

    res.json({ success: true, message: 'Message sent! You will receive a confirmation email shortly.' })
  } catch (err) {
    console.error('❌ Contact error:', err.message)
    res.status(500).json({ error: err.message })
  }
})

// ══════════════════════════════════════════════════════════════════
//  NEWSLETTER
// ══════════════════════════════════════════════════════════════════
app.post('/api/newsletter', async (req, res) => {
  const { email } = req.body
  if (!email) return res.status(400).json({ error: 'Email required' })
  try {
    await notifySchool({
      subject: `📧 New Newsletter Subscriber – ${email}`,
      html: `<div style="font-family:Arial;padding:24px;"><h2>📧 New Subscriber</h2><p><strong>${email}</strong> subscribed to London Kids School newsletter.</p></div>`,
    })
    res.json({ success: true })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// ══════════════════════════════════════════════════════════════════
//  GALLERY API
// ══════════════════════════════════════════════════════════════════

// GET all photos
app.get('/api/gallery', (req, res) => {
  res.json(readGallery())
})

// POST upload photo (admin only)
app.post('/api/gallery/upload', upload.single('photo'), (req, res) => {
  const { password, category, caption } = req.body
  if (password !== ADMIN_PASSWORD) {
    if (req.file) fs.unlinkSync(req.file.path)
    return res.status(401).json({ error: 'Invalid admin password' })
  }
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' })

  const gallery = readGallery()
  const entry = {
    id:       Date.now().toString(),
    filename: req.file.filename,
    url:      `/gallery/${req.file.filename}`,
    category: category || 'General',
    caption:  caption  || '',
    uploadedAt: new Date().toISOString(),
  }
  gallery.unshift(entry)
  writeGallery(gallery)
  console.log(`📸 Gallery: uploaded "${entry.filename}" [${entry.category}]`)
  res.json({ success: true, photo: entry })
})

// DELETE photo (admin only)
app.delete('/api/gallery/:id', (req, res) => {
  const { password } = req.body
  if (password !== ADMIN_PASSWORD) return res.status(401).json({ error: 'Invalid admin password' })

  const gallery  = readGallery()
  const photo    = gallery.find(p => p.id === req.params.id)
  if (!photo) return res.status(404).json({ error: 'Photo not found' })

  const filePath = path.join(GALLERY_DIR, photo.filename)
  if (fs.existsSync(filePath)) fs.unlinkSync(filePath)

  writeGallery(gallery.filter(p => p.id !== req.params.id))
  console.log(`🗑️  Gallery: deleted "${photo.filename}"`)
  res.json({ success: true })
})

// ══════════════════════════════════════════════════════════════════
//  HEALTH CHECK
// ══════════════════════════════════════════════════════════════════
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    schoolEmail: EMAIL_TO,
    gmailConfigured: !!(process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD),
  })
})

app.listen(PORT, () => {
  console.log(`🚀 Server running → http://localhost:${PORT}\n`)
})
