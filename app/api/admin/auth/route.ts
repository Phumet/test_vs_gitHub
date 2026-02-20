import { NextRequest, NextResponse } from "next/server";
import { config } from "@/lib/config";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { password } = body;

    if (!password) {
      return NextResponse.json(
        { error: "กรุณากรอกรหัสผ่าน" },
        { status: 400 }
      );
    }

    // Simple password check (in production, use proper authentication)
    if (password === config.admin.password) {
      return NextResponse.json({
        success: true,
        message: "เข้าสู่ระบบสำเร็จ",
      });
    } else {
      return NextResponse.json(
        { error: "รหัสผ่านไม่ถูกต้อง" },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error("Admin auth error:", error);
    return NextResponse.json(
      { error: "เกิดข้อผิดพลาด" },
      { status: 500 }
    );
  }
}
