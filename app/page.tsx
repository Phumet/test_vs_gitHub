import { prisma } from "@/lib/db";
import { config } from "@/lib/config";
import { RegistrationForm } from "@/components/RegistrationForm";
import { CapacityIndicator } from "@/components/CapacityIndicator";
import { formatDate, formatTime } from "@/lib/utils";
import { Calendar, Clock, MapPin } from "lucide-react";
import Link from "next/link";

async function getSeminar() {
  try {
    // Try to get the seminar from database
    const seminar = await prisma.seminar.findFirst({
      where: { status: "open" },
      orderBy: { date: "asc" },
    });
    return seminar;
  } catch (error) {
    console.error("Error fetching seminar:", error);
    // Return null if database is not available yet
    return null;
  }
}

export default async function HomePage() {
  const seminar = await getSeminar();

  // Use config values if database is not available
  const seminarData = seminar || {
    id: "demo-seminar-1",
    title: config.seminar.title,
    description: config.seminar.description,
    date: new Date(config.seminar.date),
    startTime: config.seminar.startTime,
    endTime: config.seminar.endTime,
    venue: config.seminar.venue,
    capacity: config.seminar.capacity,
    registeredCount: 0,
  };

  const isAvailable = seminarData.registeredCount < seminarData.capacity;

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            🎯 {seminarData.title}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {seminarData.description || "เรียนรู้การใช้งาน GitHub Copilot เพื่อเพิ่มประสิทธิภาพในการเขียนโค้ด"}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Left Column - Seminar Details */}
          <div className="md:col-span-1 space-y-6">
            <CapacityIndicator
              capacity={seminarData.capacity}
              registered={seminarData.registeredCount}
            />

            <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
              <h2 className="font-semibold text-lg text-gray-900">
                📋 รายละเอียดงาน
              </h2>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">วันที่</p>
                    <p className="font-medium text-gray-900">
                      {formatDate(seminarData.date)}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">เวลา</p>
                    <p className="font-medium text-gray-900">
                      {formatTime(seminarData.startTime, seminarData.endTime)}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">สถานที่</p>
                    <p className="font-medium text-gray-900">
                      {seminarData.venue}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-900">
                <strong>💡 หมายเหตุ:</strong> หลังลงทะเบียนแล้วคุณจะได้รับอีเมลยืนยันพร้อมรายละเอียดเพิ่มเติม
              </p>
            </div>

            <div className="text-center">
              <Link
                href="/check"
                className="text-sm text-primary hover:underline"
              >
                ตรวจสอบสถานะการลงทะเบียน →
              </Link>
            </div>
          </div>

          {/* Right Column - Registration Form */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                📝 ลงทะเบียนเข้าร่วม
              </h2>
              <RegistrationForm
                seminarId={seminarData.id}
                isAvailable={isAvailable}
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-sm text-gray-500">
          <p>Built with ❤️ using GitHub Copilot</p>
        </div>
      </div>
    </main>
  );
}
