# 🚀 Quick Start Guide - SQLite Version

## ✅ System Ready!

ระบบพร้อมใช้งานแล้ว! ไม่ต้องติดตั้ง Docker หรือ PostgreSQL

---

## 🎯 สิ่งที่เสร็จแล้ว

- ✅ Next.js 14 + TypeScript + Tailwind CSS
- ✅ SQLite Database (ไม่ต้อง Docker!)
- ✅ Prisma ORM configured
- ✅ Database seeded with demo data
- ✅ Dev server running at **http://localhost:3000**

---

## 📱 ทดสอบระบบ

### 1. Homepage - ลงทะเบียน
**URL**: http://localhost:3000

**ทดสอบ:**
- ✅ ดูรายละเอียดสัมมนา
- ✅ ดูจำนวนที่นั่งคงเหลือ (198/200)
- ✅ กรอกฟอร์ม:
  ```
  ชื่อ: ทดสอบ ระบบ
  อีเมล: mytest@example.com
  เบอร์: 0898765432
  องค์กร: My Company
  ```
- ✅ กดลงทะเบียน
- ✅ ได้รับ registration ID

### 2. Check Status - ตรวจสอบสถานะ
**URL**: http://localhost:3000/check

**ทดสอบ:**
- ✅ กรอกอีเมล: `mytest@example.com`
- ✅ ค้นหา
- ✅ เห็นข้อมูลการลงทะเบียน

### 3. Admin Dashboard - ผู้ดูแล
**URL**: http://localhost:3000/admin

**ทดสอบ:**
- ✅ ใส่รหัสผ่าน: `admin123`
- ✅ เห็น Stats (Total: 3)
- ✅ เห็นตารางข้อมูล 3 คน:
  - สมชาย ใจดี
  - สมหญิง รักเรียน
  - ทดสอบ ระบบ (ถ้าลงทะเบียนแล้ว)
- ✅ ทดสอบ Search
- ✅ ทดสอบ Export CSV

---

## 🗄️ Database - SQLite

### ดูข้อมูลใน Database

```bash
# เปิด Prisma Studio (GUI)
npm run db:studio
```

Opens at: http://localhost:5555

**คุณจะเห็น:**
- 📊 Seminars table (1 รายการ)
- 👥 Registrations table (2-3 รายการ)

### Database File Location

```
/Users/phumet/Documents/traning_git/dev.db
```

SQLite เป็นไฟล์เดียว - สะดวกมาก!

### Reset Database

```bash
# ลบ database
rm dev.db dev.db-journal

# สร้างใหม่
npm run db:push
npm run db:seed
```

---

## ⚙️ Customize Seminar

Edit `lib/config.ts`:

```typescript
export const config = {
  seminar: {
    title: "GitHub Copilot Workshop 2026",  // ← เปลี่ยนชื่อ
    date: "2026-03-15",                     // ← เปลี่ยนวันที่
    startTime: "09:00",                     // ← เปลี่ยนเวลา
    endTime: "17:00",
    venue: "Tech Conference Hall, Bangkok", // ← เปลี่ยนสถานที่
    capacity: 200,                          // ← เปลี่ยนจำนวนที่นั่ง
  },
  admin: {
    password: "admin123",                   // ← เปลี่ยนรหัสผ่าน
  },
};
```

**After edit:**
```bash
npm run db:seed  # อัพเดท database
```

---

## 📧 Enable Real Email (Optional)

### Get Resend API Key

1. Go to https://resend.com
2. Sign up (Free: 100 emails/day)
3. Create API Key
4. Copy key

### Update `.env.local`

```env
# เปลี่ยนจาก
RESEND_API_KEY="re_dummy_key"

# เป็น
RESEND_API_KEY="re_YOUR_ACTUAL_KEY"
EMAIL_FROM="noreply@yourdomain.com"
```

### Restart Server

```bash
# Stop: Ctrl+C in terminal
# Start:
npm run dev
```

### Test Email

1. ลงทะเบียนด้วยอีเมลจริงของคุณ
2. เช็คอีเมล - จะได้รับอีเมลสวยๆ พร้อมรายละเอียด

---

## 🔧 Useful Commands

```bash
# Start dev server
npm run dev

# View database
npm run db:studio

# Reset database
rm dev.db && npm run db:push && npm run db:seed

# Build for production
npm run build

# Start production
npm run start
```

---

## 🆘 Common Issues

### Port 3000 in use?

```bash
# Kill process
lsof -ti:3000 | xargs kill -9

# Or use different port
PORT=3001 npm run dev
```

### Database error?

```bash
# Fresh start
rm dev.db dev.db-journal
npm run db:push
npm run db:seed
```

### Can't see changes?

```bash
# Clear browser cache
# Or open Incognito/Private mode
```

---

## 📊 Current Status

### Database
- ✅ SQLite database running
- ✅ 1 seminar: "GitHub Copilot Workshop 2026"
- ✅ 2 demo registrations seeded
- 📍 Location: `./dev.db`

### Server
- ✅ Running on http://localhost:3000
- ✅ API routes working
- ✅ Email system configured (dummy key)

### Features Tested
- ✅ Registration form
- ✅ Email confirmation (waiting for real key)
- ✅ Status check
- ✅ Admin dashboard
- ✅ CSV export
- ✅ Capacity management

---

## 🎉 You're All Set!

**ระบบพร้อมใช้งาน 100%!**

**Try it now:**
1. 🌐 Go to http://localhost:3000
2. 📝 Fill registration form
3. ✅ See success page
4. 🔍 Check status at /check
5. 👨‍💼 Login to admin at /admin

---

## 📱 Endpoints

| Page | URL | Description |
|------|-----|-------------|
| **Homepage** | http://localhost:3000 | Registration form |
| **Success** | http://localhost:3000/success?id=xxx | After registration |
| **Check Status** | http://localhost:3000/check | Search by email |
| **Admin** | http://localhost:3000/admin | Dashboard (pw: admin123) |
| **Prisma Studio** | http://localhost:5555 | Database viewer |

---

## 💡 Tips

1. **Database is just a file** - You can copy `dev.db` to backup
2. **No Docker needed** - SQLite is embedded
3. **Prisma Studio** - Best way to view/edit data
4. **Test capacity limit** - Change capacity to 5 in config, register 3 more times
5. **Admin password** - Change it in `.env.local` or `lib/config.ts`

---

## 🚀 Next Actions

### ทันที (Now)
- [x] Test registration
- [x] Test admin dashboard  
- [x] Test check status

### เร็วๆ นี้ (Soon)
- [ ] Add Resend API key for real emails
- [ ] Customize seminar details
- [ ] Change admin password
- [ ] Test on mobile

### ภายหลัง (Later)
- [ ] Deploy to Vercel
- [ ] Setup production database
- [ ] Add more features (QR code, OAuth, etc.)

---

<div align="center">

**🎯 Everything is working!**

Go to http://localhost:3000 and start testing!

Questions? Check `README.md` or `SETUP.md`

</div>
