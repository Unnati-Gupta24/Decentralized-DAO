'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { analyzeDAO } from '@/lib/dao-math';
import { DAOInfo } from '@/lib/dao-data';
import { GlassCard } from './ui/GlassCard';
import { MetricBadge } from './ui/MetricBadge';
import { AnimatedNumber } from './ui/AnimatedNumber';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from 'recharts';

interface DAODetailModalProps {
  dao: DAOInfo | null;
  onClose: () => void;
}

export function DAODetailModal({ dao, onClose }: DAODetailModalProps) {
  if (!dao) return null;

  const analysis = analyzeDAO(dao.votingPower);
  
  const topHoldersData = dao.topHolders.slice(0, 6).map(h => ({
    name: h.name,
    percentage: h.percentage,
  }));

  const radarData = [
    {
      metric: 'Decentralization',
      value: Math.round((100 - analysis.gini) * 10) / 10,
    },
    {
      metric: 'Distribution',
      value: Math.round((100 / analysis.nakamoto) * 10) / 10,
    },
    {
      metric: 'Concentration',
      value: Math.round(analysis.apoke),
    },
  ];

  const colors = ['#06b6d4', '#14b8a6', '#8b5cf6', '#f59e0b', '#ef4444', '#ec4899'];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 modal-overlay z-40 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-6xl max-h-[90vh] overflow-y-auto"
        >
          <GlassCard className="p-8 premium-shadow">
            {/* Header */}
            <div className="flex items-start justify-between mb-8">
              <div>
                <h2 className="text-4xl font-bold gradient-text mb-2">{dao.name} DAO</h2>
                <p className="text-white/60 text-lg">{dao.description}</p>
              </div>
              <button
                onClick={onClose}
                className="text-white/60 hover:text-white text-3xl transition-colors w-10 h-10 flex items-center justify-center"
              >
                ×
              </button>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <MetricBadge label="Gini Coefficient" metric={analysis.gini} suffix="%" />
              <MetricBadge label="Nakamoto Coefficient" metric={analysis.nakamoto} />
              <MetricBadge label="Apoke Index" metric={analysis.apoke} suffix="%" />
              <GlassCard className="p-4">
                <div className="space-y-2">
                  <div className="section-label">Composite Score</div>
                  <div className="flex items-baseline justify-between">
                    <div
                      className="text-3xl font-bold"
                      style={{ color: analysis.compositeScore.color }}
                    >
                      <AnimatedNumber
                        value={analysis.compositeScore.percentage}
                        decimals={1}
                        suffix="%"
                      />
                    </div>
                    <div className="text-xs font-medium text-white/60 px-2 py-1 bg-white/5 rounded">
                      {analysis.compositeScore.verdict}
                    </div>
                  </div>
                </div>
              </GlassCard>
            </div>

            {/* DAO Information */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Left: DAO Details */}
              <GlassCard className="p-6 premium-shadow">
                <h3 className="section-label mb-6">DAO Information</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-4 border-b border-white/10">
                    <span className="text-white/60">Token</span>
                    <span className="font-semibold text-primary">{dao.token}</span>
                  </div>
                  <div className="flex justify-between items-center pb-4 border-b border-white/10">
                    <span className="text-white/60">Established</span>
                    <span className="font-semibold">{dao.established}</span>
                  </div>
                  <div className="flex justify-between items-center pb-4 border-b border-white/10">
                    <span className="text-white/60">Total Voters</span>
                    <span className="font-semibold text-primary">{dao.totalVoters.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center pb-4 border-b border-white/10">
                    <span className="text-white/60">Governance Model</span>
                    <span className="font-semibold text-right">{dao.governance}</span>
                  </div>
                  <div className="pt-2">
                    <span className="text-white/60 block mb-2">Treasury</span>
                    <span className="font-semibold text-primary">{dao.details.treasury}</span>
                  </div>
                </div>
              </GlassCard>

              {/* Right: Details */}
              <GlassCard className="p-6 premium-shadow">
                <h3 className="section-label mb-6">Governance Details</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                    <div className="text-xs text-white/60 mb-1">Total Staked</div>
                    <div className="font-semibold text-primary text-lg">{dao.details.totalStaked}</div>
                  </div>
                  <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                    <div className="text-xs text-white/60 mb-1">Proposal Threshold</div>
                    <div className="font-semibold text-lg">{dao.details.proposalThreshold}</div>
                  </div>
                  <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                    <div className="text-xs text-white/60 mb-1">Voting Period</div>
                    <div className="font-semibold text-lg">{dao.details.votingPeriod}</div>
                  </div>
                </div>
              </GlassCard>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Top Holders */}
              <GlassCard className="p-6 premium-shadow">
                <h3 className="section-label mb-6">Top Stakeholders</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={topHoldersData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis 
                      dataKey="name" 
                      stroke="rgba(255,255,255,0.5)"
                      angle={-45}
                      textAnchor="end"
                      height={100}
                      tick={{ fontSize: 12 }}
                    />
                    <YAxis stroke="rgba(255,255,255,0.5)" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'rgba(0,0,0,0.8)',
                        border: '1px solid rgba(255,255,255,0.2)',
                      }}
                    />
                    <Bar dataKey="percentage" fill="#06b6d4" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </GlassCard>

              {/* Radar Chart */}
              <GlassCard className="p-6 premium-shadow">
                <h3 className="section-label mb-6">Governance Profile</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart data={radarData}>
                    <PolarGrid stroke="rgba(255,255,255,0.1)" />
                    <PolarAngleAxis dataKey="metric" stroke="rgba(255,255,255,0.5)" />
                    <PolarRadiusAxis stroke="rgba(255,255,255,0.5)" />
                    <Radar
                      name="Score"
                      dataKey="value"
                      stroke="#06b6d4"
                      fill="#06b6d4"
                      fillOpacity={0.3}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </GlassCard>
            </div>

            {/* Power Distribution Table */}
            <GlassCard className="p-6 premium-shadow">
              <h3 className="section-label mb-6">Stakeholder Breakdown</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-3 px-4 font-semibold text-white/70">Stakeholder</th>
                      <th className="text-right py-3 px-4 font-semibold text-white/70">Voting Power %</th>
                      <th className="text-right py-3 px-4 font-semibold text-white/70">Control Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dao.topHolders.map((holder, i) => (
                      <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                        <td className="py-3 px-4">{holder.name}</td>
                        <td className="py-3 px-4 text-right">
                          <span className="font-mono text-primary">{holder.percentage.toFixed(2)}%</span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          {holder.percentage > 50 ? (
                            <span className="text-xs font-semibold px-2 py-1 bg-white/20 text-white/90 rounded">
                              Majority
                            </span>
                          ) : holder.percentage > 10 ? (
                            <span className="text-xs font-semibold px-2 py-1 bg-white/15 text-white/80 rounded">
                              Significant
                            </span>
                          ) : holder.percentage > 5 ? (
                            <span className="text-xs font-semibold px-2 py-1 bg-white/10 text-white/70 rounded">
                              Notable
                            </span>
                          ) : (
                            <span className="text-xs font-semibold px-2 py-1 bg-white/5 text-white/60 rounded">
                              Minor
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </GlassCard>
          </GlassCard>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
