"use client";

import { Users } from "lucide-react";
import { Text, Icon } from "../atoms";
import { ProgressBar } from "../molecules";

interface CapacityIndicatorProps {
  readonly capacity: number;
  readonly registered: number;
}

export function CapacityIndicator({ capacity, registered }: CapacityIndicatorProps) {
  const available = Math.max(capacity - registered, 0);
  const percentage = (registered / capacity) * 100;

  const getVariant = () => {
    if (percentage >= 90) return "danger";
    if (percentage >= 70) return "warning";
    return "default";
  };

  const getTextColor = () => {
    if (percentage >= 90) return "danger";
    if (percentage >= 70) return "warning";
    return "secondary";
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Icon icon={Users} size="md" className="text-gray-600" />
          <Text size="sm" weight="medium" variant="muted">
            จำนวนที่นั่ง
          </Text>
        </div>
        <Text size="2xl" weight="bold" variant={getTextColor()}>
          {available}
        </Text>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between">
          <Text size="sm" variant="muted">
            จองแล้ว: {registered}
          </Text>
          <Text size="sm" variant="muted">
            ทั้งหมด: {capacity}
          </Text>
        </div>
        
        <ProgressBar
          value={registered}
          max={capacity}
          variant={getVariant()}
        />
      </div>
      
      {available <= 0 && (
        <Text size="sm" variant="danger" weight="medium" className="mt-3">
          ⚠️ ที่นั่งเต็มแล้ว
        </Text>
      )}
      
      {available > 0 && available <= 20 && (
        <Text size="sm" variant="warning" weight="medium" className="mt-3">
          ⚡ เหลือที่นั่งไม่มาก!
        </Text>
      )}
    </div>
  );
}
