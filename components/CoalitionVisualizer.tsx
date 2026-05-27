'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from './ui/GlassCard';

export interface CoalitionGroup {
  entities: number[];
  totalPower: number;
  percentage: number;
  canVeto: boolean;
  canDominate: boolean;
  description: string;
}

interface CoalitionVisualizerProps {
  coalitions: CoalitionGroup[];
  powers: number[];
}

const colors = [
  'rgba(255, 107, 107, 0.8)',   // Red
  'rgba(102, 205, 170, 0.8)',   // Aquamarine
  'rgba(255, 182, 193, 0.8)',   // Light Pink
  'rgba(135, 206, 250, 0.8)',   // Light Blue
  'rgba(255, 218, 185, 0.8)',   // Peach
  'rgba(221, 160, 221, 0.8)',   // Plum
  'rgba(144, 238, 144, 0.8)',   // Light Green
  'rgba(255, 165, 0, 0.8)',     // Orange
  'rgba(173, 216, 230, 0.8)',   // Light Cyan
  'rgba(255, 192, 203, 0.8)',   // Pink
];

export function CoalitionVisualizer({ coalitions, powers }: CoalitionVisualizerProps) {
  return (
    <div className="space-y-4">
      {coalitions.slice(0, 8).map((coalition, idx) => {
        const color = colors[idx % colors.length];
        const entityNames = coalition.entities.map(e => `Entity ${e + 1}`).join(' + ');
        const entityPowers = coalition.entities.map((e, i) => `${powers[e]}`).join(' + ');

        return (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/8 transition-colors"
          >
            <div className="flex items-start justify-between gap-4 mb-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <div
                    className="w-3 h-3 rounded-full flex-shrink-0"
                    style={{ backgroundColor: color }}
                  />
                  <h4 className="font-semibold text-white/90 break-words">
                    {entityNames}
                  </h4>
                </div>
                <p className="text-xs text-white/50 font-mono">
                  {entityPowers} = {coalition.totalPower.toFixed(0)} units
                </p>
              </div>
              <div className="flex flex-col items-end gap-2 flex-shrink-0">
                <span
                  className="text-xs font-bold px-2 py-1 rounded whitespace-nowrap"
                  style={{
                    color: coalition.canDominate ? '#ffffff' : coalition.canVeto ? '#ffffff' : '#ffffff',
                    backgroundColor: coalition.canDominate
                      ? 'rgba(255, 107, 107, 0.3)'
                      : coalition.canVeto
                        ? 'rgba(255, 182, 193, 0.3)'
                        : 'rgba(255, 255, 255, 0.1)',
                  }}
                >
                  {coalition.canDominate ? 'MAJORITY (51%+)' : coalition.canVeto ? 'VETO (33%+)' : 'MINORITY'}
                </span>
                <span className="text-xs font-semibold text-white/70">
                  {coalition.percentage.toFixed(2)}%
                </span>
              </div>
            </div>

            <div className="relative w-full h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: color }}
                initial={{ width: 0 }}
                animate={{ width: `${coalition.percentage}%` }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
