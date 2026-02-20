"use client";

import { RegistrationForm } from "../organisms/registration-form";
import { CapacityIndicator } from "../organisms/capacity-indicator";
import { Text } from "../atoms";

interface RegistrationTemplateProps {
  readonly seminarId: string;
  readonly capacity: number;
  readonly registered: number;
  readonly title?: string;
  readonly description?: string;
}

export function RegistrationTemplate({
  seminarId,
  capacity,
  registered,
  title = "ลงทะเบียนเข้าร่วมสัมมนา",
  description,
}: RegistrationTemplateProps) {
  const isAvailable = registered < capacity;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <Text size="2xl" weight="bold" className="mb-2">
            {title}
          </Text>
          {description && (
            <Text variant="muted">
              {description}
            </Text>
          )}
        </div>

        <div className="space-y-6">
          <CapacityIndicator capacity={capacity} registered={registered} />

          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <RegistrationForm seminarId={seminarId} isAvailable={isAvailable} />
          </div>
        </div>
      </div>
    </div>
  );
}
