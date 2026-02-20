import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    // In production, verify admin authentication from cookies/session
    // For now, we'll trust that the layout handles auth

    // Get all registrations with seminar info
    const registrations = await prisma.registration.findMany({
      orderBy: {
        registrationDate: "desc",
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        organization: true,
        status: true,
        registrationDate: true,
      },
    });

    // Get seminar stats
    const seminar = await prisma.seminar.findFirst({
      where: { status: "open" },
    });

    const stats = {
      total: registrations.length,
      confirmed: registrations.filter((r: { status: string }) => r.status === "confirmed").length,
      pending: registrations.filter((r: { status: string }) => r.status === "pending").length,
      capacity: seminar?.capacity || 0,
      available: (seminar?.capacity || 0) - registrations.length,
    };

    return NextResponse.json({
      success: true,
      registrations,
      stats,
    });
  } catch (error) {
    console.error("Admin fetch registrations error:", error);
    return NextResponse.json(
      { error: "เกิดข้อผิดพลาดในการดึงข้อมูล" },
      { status: 500 }
    );
  }
}
