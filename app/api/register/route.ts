import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { registrationSchema } from "@/lib/validations";
import { sendConfirmationEmail } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const validatedData = registrationSchema.parse(body);

    // Check if seminar exists and is open
    const seminar = await prisma.seminar.findUnique({
      where: { id: validatedData.seminarId },
    });

    if (!seminar) {
      return NextResponse.json(
        { error: "ไม่พบข้อมูลสัมมนาที่เลือก" },
        { status: 404 }
      );
    }

    if (seminar.status !== "open") {
      return NextResponse.json(
        { error: "สัมมนานี้ปิดรับสมัครแล้ว" },
        { status: 400 }
      );
    }

    // Check capacity
    if (seminar.registeredCount >= seminar.capacity) {
      return NextResponse.json(
        { error: "ที่นั่งเต็มแล้ว ไม่สามารถลงทะเบียนเพิ่มได้" },
        { status: 400 }
      );
    }

    // Check for duplicate email
    const existingRegistration = await prisma.registration.findFirst({
      where: {
        seminarId: validatedData.seminarId,
        email: validatedData.email.toLowerCase(),
      },
    });

    if (existingRegistration) {
      return NextResponse.json(
        { error: "อีเมลนี้ได้ลงทะเบียนไว้แล้ว" },
        { status: 400 }
      );
    }

    // Create registration
    const registration = await prisma.registration.create({
      data: {
        name: validatedData.name,
        email: validatedData.email.toLowerCase(),
        phone: validatedData.phone,
        organization: validatedData.organization,
        seminarId: validatedData.seminarId,
        status: "confirmed",
      },
    });

    // Update seminar registered count
    await prisma.seminar.update({
      where: { id: validatedData.seminarId },
      data: {
        registeredCount: {
          increment: 1,
        },
      },
    });

    // Send confirmation email (non-blocking)
    sendConfirmationEmail({
      to: registration.email,
      name: registration.name,
      registrationId: registration.id,
      seminarTitle: seminar.title,
      seminarDate: seminar.date.toISOString().split("T")[0],
      seminarVenue: seminar.venue,
      seminarTime: `${seminar.startTime} - ${seminar.endTime}`,
    }).catch((error) => {
      console.error("Failed to send confirmation email:", error);
      // Don't fail the registration if email fails
    });

    return NextResponse.json({
      success: true,
      registrationId: registration.id,
      message: "ลงทะเบียนสำเร็จ",
    });
  } catch (error) {
    console.error("Registration error:", error);

    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json(
        { error: "ข้อมูลไม่ถูกต้อง กรุณาตรวจสอบและลองใหม่อีกครั้ง" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "เกิดข้อผิดพลาดในการลงทะเบียน กรุณาลองใหม่อีกครั้ง" },
      { status: 500 }
    );
  }
}
