"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registrationSchema, type RegistrationFormData } from "@/lib/validations";
import { Button, Spinner, Text } from "../atoms";
import { FormField, AlertBox } from "../molecules";
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
      <AlertBox variant="danger">
        <Text weight="semibold" size="lg" className="mb-2">
          ขออภัย ที่นั่งเต็มแล้ว
        </Text>
        <Text variant="muted">
          ไม่สามารถลงทะเบียนเพิ่มเติมได้ในขณะนี้
        </Text>
      </AlertBox>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {error && (
        <AlertBox variant="danger">
          {error}
        </AlertBox>
      )}

      <FormField
        label="ชื่อ-นามสกุล"
        placeholder="เช่น สมชาย ใจดี"
        required
        error={errors.name?.message}
        disabled={isSubmitting}
        {...register("name")}
      />

      <FormField
        label="อีเมล"
        type="email"
        placeholder="example@email.com"
        required
        error={errors.email?.message}
        disabled={isSubmitting}
        {...register("email")}
      />

      <FormField
        label="เบอร์โทรศัพท์"
        type="tel"
        placeholder="08xxxxxxxx"
        required
        error={errors.phone?.message}
        disabled={isSubmitting}
        {...register("phone")}
      />

      <FormField
        label="องค์กร/บริษัท"
        placeholder="เช่น ABC Company"
        required
        error={errors.organization?.message}
        disabled={isSubmitting}
        {...register("organization")}
      />

      <Button
        type="submit"
        className="w-full"
        size="lg"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Spinner size="sm" className="mr-2" />
            กำลังลงทะเบียน...
          </>
        ) : (
          "ลงทะเบียน"
        )}
      </Button>

      <Text size="xs" variant="muted" className="text-center">
        เมื่อลงทะเบียนแล้ว คุณจะได้รับอีเมลยืนยันพร้อมรายละเอียดการสัมมนา
      </Text>
    </form>
  );
}
