'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { GlassCard } from './ui/GlassCard';
import { DAOInfo } from '@/lib/dao-data';
import { analyzeDAO } from '@/lib/dao-math';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface CaseStudyModalProps {
  dao: DAOInfo | null;
  onClose: () => void;
}

export function CaseStudyModal({ dao, onClose }: CaseStudyModalProps) {
  if (!dao) return null;

  const analysis = analyzeDAO(dao.votingPower);

  const majorVotersData = dao.topHolders.map((holder, idx) => ({
    name: holder.name,
    value: holder.percentage,
    color: getColorByIndex(idx),
  }));

  const coalitionSimulation = [
    { size: '2 entities', power: 37.5, canControl: true },
    { size: '3 entities', power: 52.3, canControl: true },
    { size: '4 entities', power: 62.8, canControl: true },
    { size: '5 entities', power: 71.2, canControl: true },
  ];

  const governanceTimeline = [
    { period: 'Month 1', proposals: 2, passed: 1, participation: 28 },
    { period: 'Month 2', proposals: 4, passed: 3, participation: 35 },
    { period: 'Month 3', proposals: 6, passed: 4, participation: 42 },
    { period: 'Month 4', proposals: 8, passed: 6, participation: 48 },
    { period: 'Month 5', proposals: 10, passed: 7, participation: 55 },
    { period: 'Month 6', proposals: 12, passed: 8, participation: 61 },
  ];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="w-full max-w-5xl max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <GlassCard className="p-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/10">
              <div>
                <h2 className="text-4xl font-bold text-white mb-2">{dao.name} DAO Case Study</h2>
                <p className="text-white/60">Token: {dao.token} • Established: {dao.established}</p>
              </div>
              <button
                onClick={onClose}
                className="text-4xl text-white/60 hover:text-white transition-colors"
              >
                ×
              </button>
            </div>

            {/* Overview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
            >
              <GlassCard className="p-6">
                <h3 className="text-sm font-semibold text-white/60 uppercase mb-4">DAO Overview</h3>
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-white/60 mb-1">Description</div>
                    <p className="text-white/90">{dao.description}</p>
                  </div>
                  <div>
                    <div className="text-sm text-white/60 mb-1">Governance Model</div>
                    <p className="text-white/90 font-mono">{dao.governance}</p>
                  </div>
                  <div>
                    <div className="text-sm text-white/60 mb-1">Total Voters</div>
                    <p className="text-2xl font-bold text-white/90">{dao.totalVoters.toLocaleString()}</p>
                  </div>
                </div>
              </GlassCard>

              <GlassCard className="p-6">
                <h3 className="text-sm font-semibold text-white/60 uppercase mb-4">Key Metrics</h3>
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-white/60 mb-2">Gini Coefficient (Inequality)</div>
                    <div className="text-3xl font-bold text-white/90">{(analysis.gini.value * 100).toFixed(1)}%</div>
                    <div className="text-xs text-white/50 mt-1">{analysis.gini.verdict}</div>
                  </div>
                  <div>
                    <div className="text-sm text-white/60 mb-2">Nakamoto Coefficient</div>
                    <div className="text-3xl font-bold text-white/90">{Math.ceil(analysis.nakamoto.value)} entities</div>
                    <div className="text-xs text-white/50 mt-1">needed for 51% control</div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>

            {/* Treasury & Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
            >
              <GlassCard className="p-6">
                <h3 className="text-sm font-semibold text-white/60 uppercase mb-4">Treasury & Staking</h3>
                <div className="space-y-3">
                  <div>
                    <div className="text-xs text-white/60">Treasury</div>
                    <div className="font-mono text-white/90">{dao.details.treasury}</div>
                  </div>
                  <div>
                    <div className="text-xs text-white/60">Total Staked</div>
                    <div className="font-mono text-white/90">{dao.details.totalStaked}</div>
                  </div>
                </div>
              </GlassCard>

              <GlassCard className="p-6">
                <h3 className="text-sm font-semibold text-white/60 uppercase mb-4">Governance Parameters</h3>
                <div className="space-y-3">
                  <div>
                    <div className="text-xs text-white/60">Proposal Threshold</div>
                    <div className="font-mono text-white/90 text-sm">{dao.details.proposalThreshold}</div>
                  </div>
                  <div>
                    <div className="text-xs text-white/60">Voting Period</div>
                    <div className="font-mono text-white/90 text-sm">{dao.details.votingPeriod}</div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>

            {/* Charts Row 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8"
            >
              {/* Top Voters Distribution */}
              <GlassCard className="p-6">
                <h3 className="text-sm font-semibold text-white/60 uppercase mb-4">Top Voters Distribution</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={majorVotersData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {majorVotersData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${value.toFixed(1)}%`} />
                  </PieChart>
                </ResponsiveContainer>
              </GlassCard>

              {/* Coalition Power */}
              <GlassCard className="p-6">
                <h3 className="text-sm font-semibold text-white/60 uppercase mb-4">Coalition Control Analysis</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={coalitionSimulation}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="size" stroke="rgba(255,255,255,0.5)" />
                    <YAxis stroke="rgba(255,255,255,0.5)" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'rgba(0,0,0,0.8)',
                        border: '1px solid rgba(255,255,255,0.2)',
                      }}
                      formatter={(value) => `${value}%`}
                    />
                    <Bar dataKey="power" fill="rgba(255,255,255,0.4)" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </GlassCard>
            </motion.div>

            {/* Charts Row 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-1 gap-6 mb-8"
            >
              {/* Governance Activity Timeline */}
              <GlassCard className="p-6">
                <h3 className="text-sm font-semibold text-white/60 uppercase mb-4">6-Month Governance Activity</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={governanceTimeline}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="period" stroke="rgba(255,255,255,0.5)" />
                    <YAxis stroke="rgba(255,255,255,0.5)" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'rgba(0,0,0,0.8)',
                        border: '1px solid rgba(255,255,255,0.2)',
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="proposals"
                      stroke="rgba(255,255,255,0.6)"
                      strokeWidth={2}
                      dot={{ fill: 'rgba(255,255,255,0.8)' }}
                      name="Proposals"
                    />
                    <Line
                      type="monotone"
                      dataKey="participation"
                      stroke="rgba(255,255,255,0.4)"
                      strokeWidth={2}
                      dot={{ fill: 'rgba(255,255,255,0.6)' }}
                      name="Participation %"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </GlassCard>
            </motion.div>

            {/* Major Voters List */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mb-8"
            >
              <GlassCard className="p-6">
                <h3 className="text-sm font-semibold text-white/60 uppercase mb-4">Major Stakeholders</h3>
                <div className="space-y-3">
                  {majorVotersData.map((voter, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10 hover:border-white/20 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-4 h-4 rounded"
                          style={{ backgroundColor: voter.color }}
                        />
                        <div>
                          <div className="font-medium text-white/90">{voter.name}</div>
                          <div className="text-xs text-white/50">{voter.value.toFixed(2)}% of voting power</div>
                        </div>
                      </div>
                      <div className="flex-1 h-2 bg-white/10 rounded-full mx-4">
                        <div
                          className="h-full rounded-full transition-all"
                          style={{
                            width: `${Math.min(voter.value * 3, 100)}%`,
                            backgroundColor: voter.color,
                          }}
                        />
                      </div>
                      <div className="text-right">
                        <div className="font-mono text-white/90 text-sm">{voter.value.toFixed(2)}%</div>
                      </div>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </motion.div>

            {/* Key Insights */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <GlassCard className="p-6 bg-white/[0.08] border-l-2" style={{ borderLeftColor: 'rgba(255, 255, 255, 0.4)' }}>
                <h3 className="text-sm font-semibold text-white/60 uppercase mb-4">Key Insights</h3>
                <div className="space-y-3 text-sm text-white/80">
                  <p>
                    • <strong>Decentralization Status:</strong> {analysis.gini.verdict} - {analysis.gini.value > 0.5 ? 'Significant concentration among major holders' : 'Relatively well-distributed governance'}
                  </p>
                  <p>
                    • <strong>Minimum Coalition:</strong> Just {Math.ceil(analysis.nakamoto.value)} entities are needed to achieve 51% voting power and control proposals.
                  </p>
                  <p>
                    • <strong>Community Participation:</strong> {dao.topHolders[dao.topHolders.length - 1].percentage.toFixed(1)}% of voting power is held by the broader community across {dao.totalVoters.toLocaleString()} addresses.
                  </p>
                  <p>
                    • <strong>Governance Efficiency:</strong> Multi-tiered governance structure with {dao.governance} ensures both security and responsiveness.
                  </p>
                </div>
              </GlassCard>
            </motion.div>

            {/* Close Button */}
            <div className="mt-8 pt-6 border-t border-white/10">
              <button
                onClick={onClose}
                className="w-full py-3 px-4 bg-white/10 hover:bg-white/15 text-white font-semibold rounded-lg transition-all duration-300 border border-white/20"
              >
                Close Case Study
              </button>
            </div>
          </GlassCard>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function getColorByIndex(index: number): string {
  const colors = [
    'rgba(255, 200, 87, 1)',   // Warm amber
    'rgba(255, 167, 38, 1)',   // Orange
    'rgba(244, 124, 95, 1)',   // Coral
    'rgba(229, 89, 52, 1)',    // Red
    'rgba(196, 89, 139, 1)',   // Purple-red
    'rgba(155, 89, 182, 1)',   // Purple
    'rgba(108, 92, 231, 1)',   // Blue-purple
    'rgba(63, 81, 181, 1)',    // Indigo
  ];
  return colors[index % colors.length];
}
