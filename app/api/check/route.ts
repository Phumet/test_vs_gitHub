import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json(
        { error: "กรุณาระบุอีเมล" },
        { status: 400 }
      );
    }

    // Find registration by email
    const registration = await prisma.registration.findFirst({
      where: {
        email: email.toLowerCase(),
      },
      include: {
        seminar: {
          select: {
            title: true,
            date: true,
            venue: true,
            startTime: true,
            endTime: true,
          },
        },
      },
      orderBy: {
        registrationDate: "desc",
      },
    });

    if (!registration) {
      return NextResponse.json(
        { error: "ไม่พบข้อมูลการลงทะเบียนสำหรับอีเมลนี้" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      registration: {
        id: registration.id,
        name: registration.name,
        email: registration.email,
        phone: registration.phone,
        organization: registration.organization,
        status: registration.status,
        registrationDate: registration.registrationDate.toISOString(),
        seminar: {
          title: registration.seminar.title,
          date: registration.seminar.date.toISOString(),
          venue: registration.seminar.venue,
          startTime: registration.seminar.startTime,
          endTime: registration.seminar.endTime,
        },
      },
    });
  } catch (error) {
    console.error("Check registration error:", error);
    return NextResponse.json(
      { error: "เกิดข้อผิดพลาดในการค้นหาข้อมูล" },
      { status: 500 }
    );
  }
}
