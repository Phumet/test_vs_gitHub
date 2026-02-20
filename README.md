# 🎯 GitHub Copilot Seminar Registration System - MVP

ระบบลงทะเบียนเข้าร่วมสัมมนา GitHub Copilot แบบ Full-Stack พัฒนาด้วย Next.js 14, TypeScript, Prisma และ PostgreSQL

![Status](https://img.shields.io/badge/Status-MVP-success)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)

---

## ✨ Features (MVP)

- ✅ **Registration Form** - ลงทะเบียนเข้าร่วมสัมมนา
- ✅ **Email Confirmation** - ยืนยันการลงทะเบียนผ่านอีเมล
- ✅ **Capacity Management** - จัดการจำนวนที่นั่ง ป้องกันลงทะเบียนเกิน
- ✅ **Registration Check** - ตรวจสอบสถานะด้วยอีเมล
- ✅ **Admin Dashboard** - แดชบอร์ดสำหรับผู้ดูแล
- ✅ **CSV Export** - ส่งออกข้อมูลเป็น CSV
- ✅ **Responsive Design** - รองรับทุกหน้าจอ

---

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL 15 + Prisma ORM
- **Email**: Resend
- **Auth**: Simple password-based (จะปรับเป็น OAuth ใน v1.1)
- **Deployment**: Vercel (recommended)

---

## 📦 Prerequisites

ติดตั้งเครื่องมือเหล่านี้ก่อนเริ่มต้น:

- **Node.js** >= 18.0.0 ✅ (คุณมี v22.14.0)
- **npm** >= 9.0.0 ✅ (คุณมี 11.5.2)
- **Docker** >= 24.0 ✅ (คุณมี 28.3.2) - สำหรับ PostgreSQL
- **Git** ✅ (คุณมี 2.50.1)

---

## 🚀 Quick Start

### 1. Start PostgreSQL Database

```bash
# Start Docker Desktop first, then run:
docker compose up -d

# Verify PostgreSQL is running:
docker ps
```

### 2. Setup Database

```bash
# Push database schema
npm run db:push

# Seed initial data
npm run db:seed
```

### 3. Run Development Server

```bash
# Start Next.js dev server
npm run dev
```

เปิดเบราว์เซอร์ไปที่ [http://localhost:3000](http://localhost:3000)

---

## 📖 Full Setup Guide

### Step 1: Install Dependencies

```bash
# Dependencies are already installed
# If needed, reinstall with:
npm install
```

### Step 2: Configure Environment Variables

ไฟล์ `.env.local` ถูกสร้างไว้แล้ว แก้ไขค่าต่อไปนี้ตามต้องการ:

```env
# Database - Default values work with Docker
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/seminar_db"

# Email - Get free key from https://resend.com
RESEND_API_KEY="re_your_actual_key_here"
EMAIL_FROM="noreply@yourdomain.com"

# Admin Password - Change this!
ADMIN_PASSWORD="your_secure_password"

# App URL
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### Step 3: Get Resend API Key (Optional for testing)

1. ไปที่ [https://resend.com](https://resend.com)
2. สมัครบัญชี (ฟรี 100 emails/วัน)
3. สร้าง API Key
4. ใส่ใน `.env.local`

> **Note**: ระบบจะทำงานได้แม้ไม่มี Resend API Key แต่จะไม่ส่งอีเมลจริง

### Step 4: Initialize Database

```bash
# Start PostgreSQL first
docker compose up -d

# Push schema to database
npm run db:push

# Seed demo data (optional)
npm run db:seed
```

### Step 5: Start Development

```bash
# Start dev server
npm run dev

# Open http://localhost:3000
```

---

## 📱 Usage

### For Users (ผู้เข้าร่วม)

1. **ลงทะเบียน**: เข้า [http://localhost:3000](http://localhost:3000)
2. กรอกข้อมูล: ชื่อ, อีเมล, เบอร์โทร, องค์กร
3. กดปุ่ม "ลงทะเบียน"
4. รับรหัสลงทะเบียนและอีเมลยืนยัน
5. **ตรวจสอบสถานะ**: เข้า [http://localhost:3000/check](http://localhost:3000/check)

### For Admin (ผู้ดูแลระบบ)

1. เข้า [http://localhost:3000/admin](http://localhost:3000/admin)
2. ใส่รหัสผ่าน (default: `admin123`)
3. ดูรายการลงทะเบียนทั้งหมด
4. ค้นหา/กรองข้อมูล
5. Export เป็น CSV

---

## 🗂️ Project Structure

```
copilot-seminar-mvp/
├── app/
│   ├── page.tsx                # หน้าแรก + Registration form
│   ├── success/page.tsx        # หน้าสำเร็จ
│   ├── check/page.tsx          # ตรวจสอบสถานะ
│   ├── admin/
│   │   ├── layout.tsx          # Admin auth wrapper
│   │   └── page.tsx            # Admin dashboard
│   ├── api/
│   │   ├── register/route.ts   # POST registration
│   │   ├── check/route.ts      # GET registration status
│   │   └── admin/
│   │       ├── auth/route.ts   # Admin authentication
│   │       └── registrations/route.ts  # GET all registrations
│   ├── layout.tsx              # Root layout
│   └── globals.css             # Global styles
│
├── components/
│   ├── ui/                     # UI components (Button, Input, Label)
│   ├── RegistrationForm.tsx
│   └── CapacityIndicator.tsx
│
├── lib/
│   ├── db.ts                   # Prisma client
│   ├── email.ts                # Email functions
│   ├── validations.ts          # Zod schemas
│   ├── config.ts               # App config
│   └── utils.ts                # Utilities
│
├── prisma/
│   ├── schema.prisma           # Database schema
│   └── seed.ts                 # Seed data
│
├── .env.local                  # Environment variables
├── docker-compose.yml          # PostgreSQL setup
├── package.json
└── README.md
```

---

## 🗄️ Database Schema

```prisma
model Seminar {
  id              String         @id @default(cuid())
  title           String
  description     String?
  date            DateTime
  startTime       String
  endTime         String
  venue           String
  capacity        Int
  registeredCount Int            @default(0)
  status          String         @default("open")
  registrations   Registration[]
}

model Registration {
  id               String   @id @default(cuid())
  seminarId        String
  name             String
  email            String
  phone            String
  organization     String?
  status           String   @default("confirmed")
  registrationDate DateTime @default(now())
  
  @@unique([seminarId, email])
}
```

---

## 🔧 Available Scripts

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm run start            # Start production server
npm run lint             # Run ESLint

# Database
npm run db:generate      # Generate Prisma Client
npm run db:push          # Push schema to database
npm run db:migrate       # Run migrations
npm run db:seed          # Seed demo data
npm run db:studio        # Open Prisma Studio
```

---

## 🧪 Testing the System

### Test Registration Flow

1. ไปที่ http://localhost:3000
2. ตรวจสอบว่าแสดงจำนวนที่นั่งถูกต้อง
3. กรอกฟอร์มลงทะเบียน
4. ตรวจสอบว่า redirect ไป success page
5. ตรวจสอบว่าได้รับ registration ID
6. (ถ้ามี Resend API) ตรวจสอบอีเมล

### Test Registration Check

1. ไปที่ http://localhost:3000/check
2. กรอกอีเมลที่ลงทะเบียนไว้
3. ตรวจสอบว่าแสดงข้อมูลถูกต้อง

### Test Admin Dashboard

1. ไปที่ http://localhost:3000/admin
2. ใส่รหัสผ่าน: `admin123`
3. ตรวจสอบว่าแสดงรายการลงทะเบียน
4. ทดสอบ search/filter
5. ทดสอบ Export CSV

### Test Capacity Limit

1. เปลี่ยน capacity ใน `lib/config.ts` เป็น 2
2. Restart server
3. ลงทะเบียนจนครบ
4. ตรวจสอบว่าไม่สามารถลงทะเบียนเพิ่มได้

---

## 🚨 Troubleshooting

### Docker PostgreSQL ไม่ทำงาน

```bash
# เริ่ม Docker Desktop
# จากนั้นรันคำสั่ง:
docker compose down
docker compose up -d

# ตรวจสอบ logs:
docker compose logs -f
```

### Cannot find module '@prisma/client'

```bash
npm run db:generate
```

### Database connection error

```bash
# ตรวจสอบว่า PostgreSQL ทำงาน:
docker ps

# ตรวจสอบ DATABASE_URL ใน .env.local
```

### Port 3000 is already in use

```bash
# Kill process บน port 3000:
lsof -ti:3000 | xargs kill -9

# หรือใช้ port อื่น:
PORT=3001 npm run dev
```

---

## 📝 Configuration

### เปลี่ยนข้อมูลสัมมนา

แก้ไขไฟล์ `lib/config.ts`:

```typescript
export const config = {
  seminar: {
    title: "ชื่อสัมมนาของคุณ",
    description: "รายละเอียด",
    date: "2026-03-15",
    startTime: "09:00",
    endTime: "17:00",
    venue: "สถานที่จัดงาน",
    capacity: 200,  // จำนวนที่นั่ง
  },
  admin: {
    password: "your_secure_password",  // เปลี่ยนรหัสผ่าน admin
  },
};
```

หลังแก้ไข config ให้รัน:

```bash
npm run db:seed  # อัพเดทข้อมูลใน database
```

---

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push code to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin YOUR_REPO_URL
   git push -u origin main
   ```

2. Connect to Vercel:
   - ไปที่ [vercel.com](https://vercel.com)
   - Import GitHub repository
   - Vercel จะ detect Next.js automatically

3. Setup Environment Variables ใน Vercel:
   - `DATABASE_URL` - ใช้ Vercel Postgres หรือ Railway
   - `RESEND_API_KEY`
   - `EMAIL_FROM`
   - `ADMIN_PASSWORD`
   - `NEXT_PUBLIC_APP_URL` - URL ของคุณ

4. Setup Database:
   - ใช้ [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres) (Free tier)
   - หรือ [Railway](https://railway.app) PostgreSQL (Free tier)
   - หรือ [Supabase](https://supabase.com) (Free tier)

5. Run migrations:
   ```bash
   # ใน Vercel CLI หรือ local:
   DATABASE_URL="your_production_url" npx prisma db push
   DATABASE_URL="your_production_url" npx prisma db seed
   ```

---

## 📈 Next Steps (v1.1)

Features ที่จะเพิ่มในเวอร์ชันถัดไป:

- [ ] OAuth Authentication (Google, GitHub)
- [ ] QR Code generation for check-in
- [ ] Real-time dashboard updates
- [ ] Email reminders (24h, 1h before event)
- [ ] Registration cancellation
- [ ] Multi-language support (Thai/English toggle)
- [ ] Dark mode
- [ ] Certificate generation PDF
- [ ] Feedback survey system
- [ ] Calendar integration (Google Calendar, Outlook)

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/AmazingFeature`
3. Commit changes: `git commit -m 'Add AmazingFeature'`
4. Push to branch: `git push origin feature/AmazingFeature`
5. Open Pull Request

---

## 📄 License

MIT License - see LICENSE file for details

---

## 👥 Support

- 📧 Email: support@example.com
- 🐛 Issues: [GitHub Issues](https://github.com/yourusername/repo/issues)
- 📖 Docs: This README

---

## 🙏 Acknowledgments

- Built with ❤️ using **GitHub Copilot**
- UI components inspired by **shadcn/ui**
- Email templates powered by **Resend**

---

<div align="center">

**🌟 Star this repo if you find it helpful!**

Made with 🎯 by [Your Name]

</div>
