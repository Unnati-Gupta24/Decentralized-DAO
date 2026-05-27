import React from 'react';
import { MetricResult } from '@/lib/dao-math';

interface MetricBadgeProps {
  label: string;
  metric: MetricResult;
  suffix?: string;
}

export function MetricBadge({ label, metric, suffix = '' }: MetricBadgeProps) {
  return (
    <div className="glass-card p-4 space-y-2">
      <div className="section-label">{label}</div>
      <div className="flex items-baseline justify-between">
        <div className="mono-number text-white/90">
          {metric.value.toFixed(3)}{suffix}
        </div>
        <div className="text-xs font-medium text-white/60 px-2 py-1 bg-white/5 rounded">
          {metric.verdict}
        </div>
      </div>
      <div className="w-full bg-white/10 rounded-full h-2">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${Math.min(metric.percentage, 100)}%`,
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
          }}
        />
      </div>
    </div>
  );
}
