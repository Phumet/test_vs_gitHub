# 🚀 Deploy to Vercel (FREE!)

## เตรียมพร้อมแล้ว!

Git repository พร้อม ✅  
Prisma schema updated ✅  
Vercel config created ✅

---

## 📋 ขั้นตอน Deploy (5-10 นาที)

### 1️⃣ สร้าง GitHub Repository

```bash
# Option A: ผ่าน GitHub CLI (ถ้ามี)
gh repo create copilot-registration --public --source=. --push

# Option B: ทำเองใน GitHub
# 1. ไปที่ https://github.com/new
# 2. ตั้งชื่อ: copilot-registration
# 3. เลือก Public
# 4. ไม่ต้องติ๊ก "Add README" (มีอยู่แล้ว)
# 5. Create repository
```

**ถ้าทำ Option B ให้รันคำสั่งนี้:**
```bash
git remote add origin https://github.com/YOUR_USERNAME/copilot-registration.git
git branch -M main
git push -u origin main
```

---

### 2️⃣ สมัคร Vercel (ฟรี)

1. ไปที่ https://vercel.com/signup
2. เลือก **"Continue with GitHub"**
3. อนุญาตให้ Vercel เข้าถึง GitHub

---

### 3️⃣ Import Project

1. ใน Vercel Dashboard กด **"Add New..."** → **"Project"**
2. เลือก repository: **copilot-registration**
3. กด **"Import"**

---

### 4️⃣ Configure Project

**Framework Preset:** Next.js (auto-detected) ✅

**Environment Variables:** กด "Add" และใส่:

```
ADMIN_PASSWORD=admin123
RESEND_API_KEY=your-resend-api-key
EMAIL_FROM=onboarding@resend.dev
NEXT_PUBLIC_APP_URL=https://your-project.vercel.app
```

> 💡 **DATABASE_URL** จะถูกเพิ่มอัตโนมัติในขั้นตอนถัดไป

---

### 5️⃣ เพิ่ม Vercel Postgres (ฟรี!)

**ก่อน Deploy** กด "Storage" tab:

1. คลิก **"Create"** → เลือก **"Postgres"**
2. ตั้งชื่อ: `copilot-db`
3. เลือก Region: **Singapore** (ใกล้ที่สุด)
4. กด **"Create"**

Vercel จะ:
- ✅ สร้าง PostgreSQL database
- ✅ เพิ่ม `DATABASE_URL` เข้า Environment Variables อัตโนมัติ
- ✅ Link database กับ project

---

### 6️⃣ Deploy!

1. กด **"Deploy"**
2. รอ 2-3 นาที
3. เห็น **"Congratulations!"** = สำเร็จ! 🎉

---

### 7️⃣ Setup Database (ครั้งเดียว)

หลัง Deploy สำเร็จ ต้องรัน migration + seed:

#### Option A: ผ่าน Vercel CLI (แนะนำ)

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Link project
vercel link

# Run migration
vercel env pull .env.production
npx prisma migrate deploy
npx prisma db seed
```

#### Option B: ผ่าน Vercel Dashboard

1. ไปที่ **Settings** → **Environment Variables**
2. คัดลอกค่า `DATABASE_URL`
3. รันบนเครื่องคุณ:

```bash
# สร้างไฟล์ชั่วคราว
echo "DATABASE_URL=postgres://..." > .env.production

# Run migration
DATABASE_URL="postgres://..." npx prisma migrate deploy

# Seed data
DATABASE_URL="postgres://..." npx prisma db seed
```

---

## ✅ เสร็จแล้ว!

**เว็บของคุณออนไลน์แล้วที่:**  
`https://your-project.vercel.app`

---

## 🧪 ทดสอบ

- ✅ https://your-project.vercel.app - Homepage
- ✅ https://your-project.vercel.app/check - Check status
- ✅ https://your-project.vercel.app/admin - Admin (pw: admin123)

---

## 💰 Free Tier Limits

**Vercel (Free Forever):**
- ✅ 100 GB Bandwidth/เดือน
- ✅ 100 deployments/วัน
- ✅ Unlimited projects
- ✅ SSL Certificate ฟรี
- ✅ Custom domain ฟรี

**Vercel Postgres (Free):**
- ✅ 256 MB storage
- ✅ 60 hours compute/เดือน (~2,500 queries)
- ✅ Enough for ~5,000 registrations

---

## 🔄 Update เว็บ

เมื่อต้องการอัพเดทเว็บ:

```bash
# แก้โค้ด
git add .
git commit -m "Update features"
git push

# Vercel จะ auto-deploy ให้อัตโนมัติ! 🚀
```

---

## 🎨 Custom Domain (Optional)

1. ไปที่ Vercel Dashboard → **Settings** → **Domains**
2. กด **"Add"**
3. ใส่โดเมนของคุณ (เช่น seminar.your-domain.com)
4. ตั้งค่า DNS ตามที่ Vercel บอก
5. รอ 5-10 นาที = พร้อมใช้งาน! ✅

---

## 🆘 Troubleshooting

### Deploy failed: "Database error"
→ ยังไม่ได้รัน migration  
→ ทำขั้นตอนที่ 7 ใหม่

### "Too many requests"
→ ถึง free tier limit  
→ รอ 24 ชั่วโมง หรืออัพเกรด plan

### Email ไม่ส่ง
→ ใส่ `RESEND_API_KEY` จริง ใน Environment Variables

---

## 📞 Support

- Vercel Docs: https://vercel.com/docs
- Vercel Discord: https://vercel.com/discord
- Prisma Docs: https://www.prisma.io/docs

---

<div align="center">

**🎉 ขอให้สนุกกับเว็บใหม่! 🎉**

Made with ❤️ by GitHub Copilot

</div>
