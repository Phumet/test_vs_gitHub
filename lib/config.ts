export const config = {
  seminar: {
    title: "GitHub Copilot Workshop 2026",
    description: "เรียนรู้การใช้งาน GitHub Copilot เพื่อเพิ่มประสิทธิภาพในการเขียนโค้ด",
    date: "2026-03-15",
    startTime: "09:00",
    endTime: "17:00",
    venue: "Tech Conference Hall, Bangkok",
    capacity: 200,
  },
  app: {
    name: "GitHub Copilot Seminar",
    url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  },
  admin: {
    password: process.env.ADMIN_PASSWORD || "admin123",
  },
};
