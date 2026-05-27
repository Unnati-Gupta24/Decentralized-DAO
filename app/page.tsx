'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { analyzeDAO, DAOAnalysis } from '@/lib/dao-math';
import { analyzeCoalitions, getCoalitionStats } from '@/lib/coalition-utils';
import { GlassCard } from '@/components/ui/GlassCard';
import { MetricBadge } from '@/components/ui/MetricBadge';
import { AnimatedNumber } from '@/components/ui/AnimatedNumber';
import { Header } from '@/components/Header';
import { CoalitionVisualizer } from '@/components/CoalitionVisualizer';
import { getChartDataWithColors, formatMetrics } from '@/lib/chart-utils';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  Cell,
  RadarChart,
  Radar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const DEFAULT_POWERS = [30, 25, 20, 15, 10];

export default function Calculator() {
  const [powers, setPowers] = useState<number[]>(DEFAULT_POWERS);
  const [input, setInput] = useState('');

  const analysis: DAOAnalysis = useMemo(() => analyzeDAO(powers), [powers]);
  const coalitions = useMemo(() => analyzeCoalitions(powers), [powers]);
  const coalitionStats = useMemo(() => getCoalitionStats(coalitions), [coalitions]);

  const handleAddPower = () => {
    if (input && !isNaN(Number(input))) {
      setPowers([...powers, Number(input)]);
      setInput('');
    }
  };

  const handleRemove = (index: number) => {
    setPowers(powers.filter((_, i) => i !== index));
  };

  const handleReset = () => {
    setPowers(DEFAULT_POWERS);
    setInput('');
  };

  const chartData = getChartDataWithColors(analysis, powers);
  const metrics = formatMetrics(analysis, powers);
  
  const shapleyData = chartData.shapleyData;
  const banzhafData = chartData.banzhafData;
  const lorenzData = chartData.lorenzData;
  
  const coalitionData = analysis.coalitions.map((c) => ({
    size: `Top ${c.size}`,
    power: parseFloat(c.percentage.toFixed(2)),
  }));

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <h2 className="text-4xl sm:text-5xl font-bold gradient-text mb-3">
              DAO Analysis Calculator
            </h2>
            <p className="text-white/60 max-w-2xl">
              Analyze governance decentralization using Gini coefficient, Nakamoto coefficient, and
              other metrics
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* Input Panel */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="lg:col-span-1"
            >
              <GlassCard className="p-6 space-y-6">
                <div>
                  <h3 className="section-label mb-4">Input Voting Power</h3>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleAddPower()}
                      placeholder="Enter power value"
                      className="glass-input flex-1"
                      min="0"
                      step="1"
                    />
                    <button
                      onClick={handleAddPower}
                      className="px-4 py-3 rounded-lg bg-primary text-background font-semibold hover:bg-primary/90 transition-colors"
                    >
                      Add
                    </button>
                  </div>
                </div>

                <div>
                  <h3 className="section-label mb-3">Entities</h3>
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {powers.map((power, i) => (
                      <motion.div
                        key={i}
                        variants={itemVariants}
                        className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10"
                      >
                        <span className="text-sm font-medium">
                          Entity {i + 1}: <span className="text-primary font-bold">{power}</span>
                        </span>
                        <button
                          onClick={() => handleRemove(i)}
                          className="text-xs text-red-400 hover:text-red-300 transition-colors"
                        >
                          Remove
                        </button>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={handleReset}
                    className="flex-1 px-4 py-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors text-sm font-medium"
                  >
                    Reset
                  </button>
                  <div className="flex-1 text-center py-2 text-sm text-white/60">
                    Total: <span className="text-primary font-bold">{powers.reduce((a, b) => a + b, 0)}</span>
                  </div>
                </div>
              </GlassCard>
            </motion.div>

            {/* Metrics Panel */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="lg:col-span-2"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
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

              {/* Technical Summary */}
              <GlassCard className="p-4 bg-white/[0.05] border border-white/10 mb-4">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div>
                    <div className="text-white/50 font-mono mb-1">Total Entities</div>
                    <div className="text-lg font-bold text-white/90">{metrics.totalEntities}</div>
                  </div>
                  <div>
                    <div className="text-white/50 font-mono mb-1">Concentration Ratio</div>
                    <div className="text-lg font-bold text-white/90">{metrics.concentrationRatio}%</div>
                  </div>
                  <div>
                    <div className="text-white/50 font-mono mb-1">Top Entity Power</div>
                    <div className="text-lg font-bold text-white/90">{powers[0]}</div>
                  </div>
                  <div>
                    <div className="text-white/50 font-mono mb-1">Avg Entity Power</div>
                    <div className="text-lg font-bold text-white/90">{(powers.reduce((a, b) => a + b, 0) / powers.length).toFixed(0)}</div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          </div>

          {/* Visualizations */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12"
          >
            {/* Lorenz Curve */}
            <GlassCard className="p-6" hover>
              <h3 className="section-label mb-4">Lorenz Curve</h3>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={lorenzData}>
                  <defs>
                    <linearGradient id="colorArea" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="rgba(255,255,255,0.3)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="rgba(255,255,255,0.3)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="x" stroke="rgba(255,255,255,0.5)" />
                  <YAxis stroke="rgba(255,255,255,0.5)" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(0,0,0,0.8)',
                      border: '1px solid rgba(255,255,255,0.2)',
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="y"
                    stroke="rgba(255,255,255,0.6)"
                    fillOpacity={1}
                    fill="url(#colorArea)"
                  />
                  <Line type="linear" dataKey="x" stroke="#ffffff" opacity={0.3} isAnimationActive={false} />
                </AreaChart>
              </ResponsiveContainer>
            </GlassCard>

            {/* Coalition Power Distribution */}
            <GlassCard className="p-6" hover>
              <h3 className="section-label mb-4">Coalition Power</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={coalitionData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="size" stroke="rgba(255,255,255,0.5)" />
                  <YAxis stroke="rgba(255,255,255,0.5)" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(0,0,0,0.8)',
                      border: '1px solid rgba(255,255,255,0.2)',
                    }}
                  />
                  <Bar dataKey="power" fill="rgba(255,255,255,0.4)" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </GlassCard>

            {/* Shapley Values */}
            <GlassCard className="p-6" hover>
              <h3 className="section-label mb-4">Shapley Values</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={shapleyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" angle={-45} textAnchor="end" height={80} />
                  <YAxis stroke="rgba(255,255,255,0.5)" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(0,0,0,0.8)',
                      border: '1px solid rgba(255,255,255,0.2)',
                    }}
                  />
                  <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                    {shapleyData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </GlassCard>

            {/* Banzhaf Indices */}
            <GlassCard className="p-6" hover>
              <h3 className="section-label mb-4">Banzhaf Indices</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={banzhafData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" angle={-45} textAnchor="end" height={80} />
                  <YAxis stroke="rgba(255,255,255,0.5)" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(0,0,0,0.8)',
                      border: '1px solid rgba(255,255,255,0.2)',
                    }}
                  />
                  <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                    {banzhafData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </GlassCard>
          </motion.div>

          {/* Detailed Tables */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            {/* Shapley Table */}
            <GlassCard className="p-6" hover>
              <h3 className="section-label mb-4">Shapley Value Analysis</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-3 px-3 font-semibold text-white/70">Entity</th>
                      <th className="text-right py-3 px-3 font-semibold text-white/70">Contribution</th>
                    </tr>
                  </thead>
                  <tbody>
                    {shapleyData.map((item, i) => (
                      <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                        <td className="py-3 px-3">{item.name}</td>
                        <td className="py-3 px-3 text-right font-mono text-primary">
                          {item.value.toFixed(4)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </GlassCard>

            {/* Coalition Formation Analysis - Enhanced */}
            <GlassCard className="p-6 premium-shadow">
              <h3 className="section-label mb-4">Coalition Formations with Entity Details</h3>
              <CoalitionVisualizer coalitions={coalitions} powers={powers} />
            </GlassCard>
          </motion.div>

          {/* Coalition Statistics */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-12"
          >
            <GlassCard className="p-4 premium-shadow">
              <div className="section-label mb-3">Majority Coalitions</div>
              <div className="text-4xl font-bold gradient-text">
                {coalitionStats.dominantCount}
              </div>
              <p className="text-xs text-white/60 mt-2">Groups with 51%+ control</p>
            </GlassCard>
            <GlassCard className="p-4 premium-shadow">
              <div className="section-label mb-3">Veto Coalitions</div>
              <div className="text-4xl font-bold gradient-text">
                {coalitionStats.vetoCount}
              </div>
              <p className="text-xs text-white/60 mt-2">Groups with 33%+ power</p>
            </GlassCard>
            <GlassCard className="p-4 premium-shadow">
              <div className="section-label mb-3">Most Powerful</div>
              <div className="text-lg font-bold text-white/90 mt-1">
                {coalitionStats.mostPowerful.description}
              </div>
              <div className="text-xs text-white/60 mt-2">
                {coalitionStats.mostPowerful.percentage.toFixed(1)}% power
              </div>
            </GlassCard>
            <GlassCard className="p-4 premium-shadow">
              <div className="section-label mb-3">Min for Veto</div>
              <div className="text-lg font-bold text-white/80 mt-1">
                {coalitionStats.minToVeto?.description || 'N/A'}
              </div>
              <div className="text-xs text-white/60 mt-2">
                {coalitionStats.minToVeto?.entities.length || 0} entities needed
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </main>
    </>
  );
}
