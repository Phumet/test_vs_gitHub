"use client";

import { Users } from "lucide-react";

interface CapacityIndicatorProps {
  readonly capacity: number;
  readonly registered: number;
}

export function CapacityIndicator({ capacity, registered }: CapacityIndicatorProps) {
  const available = Math.max(capacity - registered, 0);
  const percentage = (registered / capacity) * 100;

  const getColor = () => {
    if (percentage >= 90) return "text-danger";
    if (percentage >= 70) return "text-warning";
    return "text-secondary";
  };

  const getBackgroundColor = () => {
    if (percentage >= 90) return "bg-danger";
    if (percentage >= 70) return "bg-warning";
    return "bg-secondary";
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-gray-600" />
          <span className="text-sm font-medium text-gray-700">จำนวนที่นั่ง</span>
        </div>
        <span className={`text-2xl font-bold ${getColor()}`}>
          {available}
        </span>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-gray-600">
          <span>จองแล้ว: {registered}</span>
          <span>ทั้งหมด: {capacity}</span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all ${getBackgroundColor()}`}
            style={{ width: `${Math.min(percentage, 100)}%` }}
          />
        </div>
      </div>
      
      {available <= 0 && (
        <div className="mt-3 text-sm text-danger font-medium">
          ⚠️ ที่นั่งเต็มแล้ว
        </div>
      )}
      
      {available > 0 && available <= 20 && (
        <div className="mt-3 text-sm text-warning font-medium">
          ⚡ เหลือที่นั่งไม่มาก!
        </div>
      )}
    </div>
  );
}
