"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registrationSchema, type RegistrationFormData } from "@/lib/validations";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface RegistrationFormProps {
  readonly seminarId: string;
  readonly isAvailable: boolean;
}

export function RegistrationForm({ seminarId, isAvailable }: RegistrationFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      seminarId,
    },
  });

  const onSubmit = async (data: RegistrationFormData) => {
    try {
      setIsSubmitting(true);
      setError(null);

      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "เกิดข้อผิดพลาดในการลงทะเบียน");
      }

      // Redirect to success page with registration ID
      router.push(`/success?id=${result.registrationId}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "เกิดข้อผิดพลาดที่ไม่ทราบสาเหตุ");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isAvailable) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <p className="text-danger font-semibold text-lg">ขออภัย ที่นั่งเต็มแล้ว</p>
        <p className="text-gray-600 mt-2">
          ไม่สามารถลงทะเบียนเพิ่มเติมได้ในขณะนี้
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-danger text-sm">{error}</p>
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="name">
          ชื่อ-นามสกุล <span className="text-danger">*</span>
        </Label>
        <Input
          id="name"
          placeholder="เช่น สมชาย ใจดี"
          {...register("name")}
          disabled={isSubmitting}
        />
        {errors.name && (
          <p className="text-danger text-sm">{errors.name.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">
          อีเมล <span className="text-danger">*</span>
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="example@email.com"
          {...register("email")}
          disabled={isSubmitting}
        />
        {errors.email && (
          <p className="text-danger text-sm">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">
          เบอร์โทรศัพท์ <span className="text-danger">*</span>
        </Label>
        <Input
          id="phone"
          type="tel"
          placeholder="08xxxxxxxx"
          {...register("phone")}
          disabled={isSubmitting}
        />
        {errors.phone && (
          <p className="text-danger text-sm">{errors.phone.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="organization">
          องค์กร/บริษัท <span className="text-danger">*</span>
        </Label>
        <Input
          id="organization"
          placeholder="เช่น ABC Company"
          {...register("organization")}
          disabled={isSubmitting}
        />
        {errors.organization && (
          <p className="text-danger text-sm">{errors.organization.message}</p>
        )}
      </div>

      <Button
        type="submit"
        className="w-full"
        size="lg"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            กำลังลงทะเบียน...
          </>
        ) : (
          "ลงทะเบียน"
        )}
      </Button>

      <p className="text-xs text-gray-500 text-center">
        เมื่อลงทะเบียนแล้ว คุณจะได้รับอีเมลยืนยันพร้อมรายละเอียดการสัมมนา
      </p>
    </form>
  );
}
