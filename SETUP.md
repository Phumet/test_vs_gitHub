# 🚀 Setup Guide - GitHub Copilot Seminar Registration MVP

This guide will help you get the system running in **under 10 minutes**.

---

## ✅ Current Status

**Already Completed:**
- ✅ Next.js 14 project initialized
- ✅ All dependencies installed
- ✅ Prisma schema configured
- ✅ Environment variables set up
- ✅ All pages and components created
- ✅ API routes implemented
- ✅ Admin dashboard ready
- ✅ Docker Compose file prepared

**What's Missing:**
- ⏳ Start PostgreSQL database
- ⏳ Run database migrations
- ⏳ Seed initial data
- ⏳ Test the application

---

## 🎯 Final Steps to Complete Setup

### Step 1: Start Docker Desktop

1. Open **Docker Desktop** app on your Mac
2. Wait for Docker to start (you'll see a green icon)
3. ✅ Verify Docker is running

### Step 2: Start PostgreSQL

```bash
# Start PostgreSQL container
docker compose up -d

# Verify it's running
docker ps

# You should see: seminar_postgres container running
```

**Troubleshooting:**
- If port 5432 is in use: `lsof -ti:5432 | xargs kill -9`
- If container fails: `docker compose down && docker compose up -d`

### Step 3: Initialize Database

```bash
# Push schema to database
npm run db:push

# Expected output: "Your database is now in sync with your schema"
```

### Step 4: Seed Demo Data

```bash
# Add sample seminar and registrations
npm run db:seed

# Expected output:
# ✅ Created seminar: GitHub Copilot Workshop 2026
# ✅ Created registration: สมชาย ใจดี
# ✅ Created registration: สมหญิง รักเรียน
```

### Step 5: Start Development Server

```bash
# Start Next.js
npm run dev

# Open browser: http://localhost:3000
```

---

## 🧪 Testing Checklist

### ✅ Test Homepage

1. Go to http://localhost:3000
2. Should see:
   - Seminar details (title, date, venue)
   - Capacity indicator (198/200 available)
   - Registration form

### ✅ Test Registration

1. Fill form with test data:
   - Name: `ทดสอบ ระบบ`
   - Email: `test@example.com`
   - Phone: `0812345678`
   - Organization: `Test Company`

2. Click "ลงทะเบียน"

3. Should redirect to success page with registration ID

**Note**: Email won't be sent unless you add Resend API key (optional for testing)

### ✅ Test Check Registration

1. Go to http://localhost:3000/check
2. Enter email: `test@example.com`
3. Should show registration details

### ✅ Test Admin Dashboard

1. Go to http://localhost:3000/admin
2. Enter password: `admin123`
3. Should see:
   - Stats cards (Total: 3, Confirmed: 3)
   - Registration table with 3 people
   - Search functionality
   - Export CSV button

4. Test search: type "สมชาย"
5. Test export: click "Export CSV"

### ✅ Test Capacity Limit

1. Register 2 more people (total will be 5/5 if you changed capacity to 5 in config)
2. Try to register again
3. Should show "ที่นั่งเต็มแล้ว"

---

## 🔧 Optional: Setup Email (Resend)

To enable actual email sending:

### 1. Get Resend API Key

1. Go to https://resend.com
2. Sign up (free account - 100 emails/day)
3. Click "API Keys"
4. Create new API key
5. Copy the key

### 2. Update .env.local

```env
# Replace with your actual key
RESEND_API_KEY="re_YOUR_ACTUAL_KEY_HERE"

# Use your verified domain or email
EMAIL_FROM="noreply@yourdomain.com"
# Or use Resend testing domain:
EMAIL_FROM="onboarding@resend.dev"
```

### 3. Restart Server

```bash
# Stop server (Ctrl+C)
npm run dev
```

### 4. Test Email

1. Register with your real email
2. Check inbox for confirmation email
3. Email should have:
   - Seminar details
   - Registration ID
   - Styled HTML template

---

## 📊 Database Management

### View Database with Prisma Studio

```bash
npm run db:studio
```

Opens web UI at http://localhost:5555

You can:
- View all registrations
- Edit data
- Delete records
- See relationships

### Reset Database

```bash
# Drop all data and recreate
docker compose down -v
docker compose up -d
npm run db:push
npm run db:seed
```

### Backup Database

```bash
# Export all data
docker exec -t seminar_postgres pg_dump -U postgres seminar_db > backup.sql

# Restore from backup
docker exec -i seminar_postgres psql -U postgres seminar_db < backup.sql
```

---

## 🎨 Customization Guide

### Change Seminar Details

Edit `lib/config.ts`:

```typescript
export const config = {
  seminar: {
    title: "Your Seminar Title",      // ←  Change title
    description: "Your description",   // ←  Change description
    date: "2026-06-20",                // ←  Change date (YYYY-MM-DD)
    startTime: "13:00",                // ←  Change start time
    endTime: "18:00",                  // ←  Change end time
    venue: "Your Venue",               // ←  Change venue
    capacity: 100,                     // ←  Change capacity
  },
  admin: {
    password: "changeMe123!",          // ←  Change admin password
  },
};
```

After changing config:

```bash
# Update database
npm run db:seed
```

### Change Colors

Edit `tailwind.config.ts`:

```typescript
colors: {
  primary: "#YOUR_COLOR",    // Main color (buttons, links)
  secondary: "#YOUR_COLOR",  // Success states
  accent: "#YOUR_COLOR",     // Highlights
},
```

### Modify Form Fields

Edit `components/RegistrationForm.tsx` and `lib/validations.ts`

Example: Add "Department" field

1. Update validation:
```typescript
// lib/validations.ts
export const registrationSchema = z.object({
  // ... existing fields
  department: z.string().min(2, 'กรุณากรอกแผนก'),  // ←  Add this
});
```

2. Update Prisma schema:
```prisma
// prisma/schema.prisma
model Registration {
  // ... existing fields
  department String?  // ←  Add this
}
```

3. Push changes:
```bash
npm run db:push
```

4. Add field to form component

---

## 🐛 Common Issues & Solutions

### Issue: "Cannot connect to database"

**Solution:**
```bash
# Check Docker is running
docker ps

# Restart PostgreSQL
docker compose restart

# Check DATABASE_URL in .env.local
```

### Issue: "Port 3000 already in use"

**Solution:**
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use different port
PORT=3001 npm run dev
```

### Issue: "Module not found: @prisma/client"

**Solution:**
```bash
npm run db:generate
```

### Issue: Email not sending

**Possible causes:**
1. No Resend API key → Add key in `.env.local`
2. Invalid API key → Regenerate key in Resend dashboard
3. Email marked as spam → Check spam folder

### Issue: Admin password not working

**Solution:**
```bash
# Check password in lib/config.ts
# Or check .env.local:
cat .env.local | grep ADMIN_PASSWORD
```

---

## 📈 Performance Tips

### Development

- Use `npm run dev` for hot reload
- Use Prisma Studio for quick database inspection
- Use browser DevTools for debugging

### Production

- Run `npm run build` before deploying
- Use `npm run start` for production server
- Enable Vercel Analytics for insights
- Use Vercel Postgres for managed database

---

## 🚀 Next Steps After Setup

### 1. Customize Content
- Update seminar details in `lib/config.ts`
- Modify email templates in `lib/email.ts`
- Customize UI colors and styles

### 2. Test Thoroughly
- Register multiple users
- Test on mobile devices
- Check email deliverability
- Test admin features

### 3. Deploy to Production
- Push to GitHub
- Connect to Vercel
- Setup production database (Vercel Postgres / Railway)
- Configure environment variables
- Run migrations in production

### 4. Monitor & Improve
- Add Google Analytics
- Setup error tracking (Sentry)
- Collect user feedback
- Plan v1.1 features

---

## 📞 Need Help?

- 📖 Check [README.md](README.md) for full documentation
- 🔍 Search for error messages in browser DevTools
- 🐛 Check terminal for error logs
- 💬 Review code comments for explanations

---

## ✅ Quick Reference

```bash
# Start everything
docker compose up -d
npm run dev

# Stop everything
# Ctrl+C (stop dev server)
docker compose down

# Reset database
docker compose down -v
docker compose up -d
npm run db:push && npm run db:seed

# View database
npm run db:studio

# Check errors
npm run lint
```

---

<div align="center">

**🎉 You're all set! Happy coding!**

If you encounter any issues, refer to the Troubleshooting section above.

</div>
