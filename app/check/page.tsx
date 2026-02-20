"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { checkRegistrationSchema } from "@/lib/validations";
import { Input, Label, Button } from "@/components/atoms";
import { Loader2, Search, CheckCircle2, Calendar, MapPin, User } from "lucide-react";
import Link from "next/link";
import { formatDate } from "@/lib/utils";

interface Registration {
  id: string;
  name: string;
  email: string;
  phone: string;
  organization: string | null;
  status: string;
  registrationDate: string;
  seminar: {
    title: string;
    date: string;
    venue: string;
    startTime: string;
    endTime: string;
  };
}

export default function CheckPage() {
  const [isChecking, setIsChecking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [registration, setRegistration] = useState<Registration | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ email: string }>({
    resolver: zodResolver(checkRegistrationSchema),
  });

  const onSubmit = async (data: { email: string }) => {
    try {
      setIsChecking(true);
      setError(null);
      setRegistration(null);

      const response = await fetch(`/api/check?email=${encodeURIComponent(data.email)}`);
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "เกิดข้อผิดพลาด");
      }

      setRegistration(result.registration);
    } catch (err) {
      setError(err instanceof Error ? err.message : "เกิดข้อผิดพลาดที่ไม่ทราบสาเหตุ");
    } finally {
      setIsChecking(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            🔍 ตรวจสอบสถานะการลงทะเบียน
          </h1>
          <p className="text-gray-600">
            กรอกอีเมลที่ใช้ลงทะเบียนเพื่อตรวจสอบสถานะ
          </p>
        </div>

        {/* Search Form */}
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 mb-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">อีเมล</Label>
              <Input
                id="email"
                type="email"
                placeholder="example@email.com"
                {...register("email")}
                disabled={isChecking}
              />
              {errors.email && (
                <p className="text-danger text-sm">{errors.email.message as string}</p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full"
              size="lg"
              disabled={isChecking}
            >
              {isChecking ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  กำลังค้นหา...
                </>
              ) : (
                <>
                  <Search className="mr-2 h-4 w-4" />
                  ค้นหา
                </>
              )}
            </Button>
          </form>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-danger">{error}</p>
            <p className="text-sm text-gray-600 mt-2">
              หากคุณแน่ใจว่าได้ลงทะเบียนแล้ว กรุณาตรวจสอบอีเมลอีกครั้ง
            </p>
          </div>
        )}

        {/* Registration Result */}
        {registration && (
          <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
            {/* Status Badge */}
            <div className="flex items-center justify-center mb-6">
              <div className="bg-secondary/10 px-4 py-2 rounded-full flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-secondary" />
                <span className="font-semibold text-secondary">
                  {registration.status === "confirmed" ? "ยืนยันแล้ว" : registration.status}
                </span>
              </div>
            </div>

            {/* Registration Details */}
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  ข้อมูลการลงทะเบียน
                </h2>
                <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                  <div className="flex items-start gap-3">
                    <User className="w-5 h-5 text-gray-600 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500">ชื่อ-นามสกุล</p>
                      <p className="font-medium text-gray-900">{registration.name}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">อีเมล</p>
                    <p className="font-medium text-gray-900">{registration.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">เบอร์โทรศัพท์</p>
                    <p className="font-medium text-gray-900">{registration.phone}</p>
                  </div>
                  {registration.organization && (
                    <div>
                      <p className="text-sm text-gray-500">องค์กร</p>
                      <p className="font-medium text-gray-900">{registration.organization}</p>
                    </div>
                  )}
                  <div>
                    <p className="text-sm text-gray-500">รหัสลงทะเบียน</p>
                    <p className="font-mono text-sm text-gray-900 break-all">
                      {registration.id}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-3">
                  รายละเอียดสัมมนา
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500">หัวข้อ</p>
                      <p className="font-medium text-gray-900">
                        {registration.seminar.title}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500">วันที่</p>
                      <p className="font-medium text-gray-900">
                        {formatDate(registration.seminar.date)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500">สถานที่</p>
                      <p className="font-medium text-gray-900">
                        {registration.seminar.venue}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-900">
                  <strong>💡 เตรียมตัวให้พร้อม:</strong> อย่าลืมนำรหัสลงทะเบียนมาในวันงานเพื่อเช็คอิน
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Back to Home Link */}
        <div className="text-center mt-8">
          <Link href="/" className="text-primary hover:underline">
            ← กลับหน้าแรก
          </Link>
        </div>
      </div>
    </main>
  );
}
