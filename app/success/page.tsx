"use client";

import { CheckCircle2, Mail, Copy } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function SuccessPage({
  searchParams,
}: Readonly<{
  searchParams: { id?: string };
}>) {
  const registrationId = searchParams.id;

  if (!registrationId) {
    return (
      <main className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <p className="text-gray-600">ไม่พบข้อมูลการลงทะเบียน</p>
          <Link href="/" className="text-primary hover:underline mt-4 inline-block">
            กลับหน้าแรก
          </Link>
        </div>
      </main>
    );
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(registrationId);
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-green-50 to-white">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-lg shadow-xl p-8 md:p-12">
          {/* Success Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-secondary/10 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-12 h-12 text-secondary" />
            </div>
          </div>

          {/* Success Message */}
          <h1 className="text-3xl font-bold text-center text-gray-900 mb-4">
            ลงทะเบียนสำเร็จ!
          </h1>
          <p className="text-center text-gray-600 mb-8">
            ขอบคุณที่ลงทะเบียนเข้าร่วมสัมมนา GitHub Copilot
          </p>

          {/* Registration ID Card */}
          <div className="bg-gradient-to-r from-primary to-secondary rounded-lg p-6 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-white/80 text-sm mb-1">รหัสลงทะเบียนของคุณ</p>
                <p className="text-white font-mono text-lg break-all">
                  {registrationId}
                </p>
              </div>
              <button
                onClick={copyToClipboard}
                className="ml-4 p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                title="คัดลอกรหัส"
              >
                <Copy className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>

          {/* Info Boxes */}
          <div className="space-y-4 mb-8">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
              <Mail className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <p className="font-medium text-blue-900 mb-1">
                  ตรวจสอบอีเมลของคุณ
                </p>
                <p className="text-sm text-blue-700">
                  เราได้ส่งอีเมลยืนยันพร้อมรายละเอียดการสัมมนาไปยังอีเมลที่คุณลงทะเบียนไว้แล้ว
                </p>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-sm text-yellow-800">
                <strong>💡 หมายเหตุ:</strong> กรุณาเก็บรหัสลงทะเบียนนี้ไว้สำหรับการเช็คอินในวันงาน
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/check" className="flex-1">
              <Button variant="outline" className="w-full">
                ตรวจสอบสถานะ
              </Button>
            </Link>
            <Link href="/" className="flex-1">
              <Button className="w-full">
                กลับหน้าแรก
              </Button>
            </Link>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6 text-sm text-gray-500">
          <p>หากมีคำถามหรือต้องการความช่วยเหลือ</p>
          <p>กรุณาติดต่อเราได้ที่ support@example.com</p>
        </div>
      </div>
    </main>
  );
}
