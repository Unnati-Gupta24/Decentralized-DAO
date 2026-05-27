'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { allDAOs } from '@/lib/dao-data';
import { analyzeDAO } from '@/lib/dao-math';
import { GlassCard } from '@/components/ui/GlassCard';
import { MetricBadge } from '@/components/ui/MetricBadge';
import { AnimatedNumber } from '@/components/ui/AnimatedNumber';
import { CaseStudyModal } from '@/components/CaseStudyModal';
import { Header } from '@/components/Header';

export default function SampleDAOs() {
  const [selectedDAO, setSelectedDAO] = useState(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Title Section */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-16"
          >
            <h1 className="text-5xl sm:text-6xl font-bold gradient-text mb-4">
              Real DAO Analysis
            </h1>
            <p className="text-white/60 text-lg max-w-2xl">
              Click on any DAO to view comprehensive governance analysis, stakeholder distribution, and decentralization metrics
            </p>
          </motion.div>

          {/* DAO Cards Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
          >
            {allDAOs.map((dao) => {
              const analysis = analyzeDAO(dao.votingPower);
              
              return (
                <motion.div
                  key={dao.id}
                  variants={itemVariants}
                  onClick={() => setSelectedDAO(dao)}
                  className="cursor-pointer group"
                >
                  <GlassCard className="p-8 h-full premium-shadow hover:scale-105 transition-transform duration-300">
                    {/* Header */}
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-3">
                        <h2 className="text-4xl font-bold gradient-text">{dao.name}</h2>
                        <span className="px-4 py-2 bg-primary/20 text-primary rounded-full text-sm font-semibold">
                          {dao.token}
                        </span>
                      </div>
                      <p className="text-white/60">{dao.description}</p>
                    </div>

                    {/* Key Stats */}
                    <div className="grid grid-cols-2 gap-4 mb-6 pb-6 border-b border-white/10">
                      <div>
                        <div className="text-xs text-white/60 mb-1">Total Voters</div>
                        <div className="text-2xl font-bold text-primary">
                          {(dao.totalVoters / 1000).toFixed(1)}K
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-white/60 mb-1">Established</div>
                        <div className="text-2xl font-bold">{dao.established}</div>
                      </div>
                    </div>

                    {/* Metrics Preview */}
                    <div className="grid grid-cols-3 gap-3 mb-6">
                      <div className="bg-white/5 rounded-lg p-3 border border-white/10 text-center">
                        <div className="text-xs text-white/60 mb-1">Gini</div>
                        <div className="text-lg font-bold text-white/90">
                          <AnimatedNumber value={analysis.gini.percentage} decimals={1} />
                        </div>
                      </div>
                      <div className="bg-white/5 rounded-lg p-3 border border-white/10 text-center">
                        <div className="text-xs text-white/60 mb-1">Nakamoto</div>
                        <div className="text-lg font-bold text-white/85">
                          {analysis.nakamoto.value.toFixed(0)}
                        </div>
                      </div>
                      <div className="bg-white/5 rounded-lg p-3 border border-white/10 text-center">
                        <div className="text-xs text-white/60 mb-1">Apoke</div>
                        <div className="text-lg font-bold text-white/80">
                          <AnimatedNumber value={analysis.apoke.percentage} decimals={1} />
                        </div>
                      </div>
                    </div>

                    {/* Composite Score */}
                    <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10 mb-6">
                      <div>
                        <div className="text-sm text-white/60 mb-1">Composite Score</div>
                        <div className="text-2xl font-bold" style={{ color: analysis.compositeScore.color }}>
                          <AnimatedNumber 
                            value={analysis.compositeScore.percentage} 
                            decimals={1}
                            suffix="%"
                          />
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs font-semibold px-3 py-2 rounded-lg" style={{
                          backgroundColor: analysis.compositeScore.color + '20',
                          color: analysis.compositeScore.color,
                        }}>
                          {analysis.compositeScore.verdict}
                        </div>
                      </div>
                    </div>

                    {/* Verdict */}
                    <div className="p-4 bg-white/5 rounded-lg border border-white/10 mb-6">
                      <div className="text-sm text-white/60 mb-2">Decentralization Status</div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${analysis.compositeScore.percentage}%` }}
                            transition={{ duration: 1 }}
                            style={{ background: 'rgba(255, 255, 255, 0.5)' }}
                          />
                        </div>
                        <span className="text-xs font-semibold text-white/60">
                          {analysis.compositeScore.percentage.toFixed(0)}%
                        </span>
                      </div>
                    </div>

                    {/* CTA */}
                    <motion.button 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-3 px-4 bg-white/15 hover:bg-white/25 text-white font-semibold rounded-lg transition-all duration-300 group-hover:shadow-lg group-hover:shadow-white/10 border border-white/20">
                      View Full Case Study
                    </motion.button>
                  </GlassCard>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Comparison Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <GlassCard className="p-8 premium-shadow">
              <h2 className="text-3xl font-bold gradient-text mb-8">DAO Comparison</h2>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-4 px-6 font-semibold text-white/70">Metric</th>
                      {allDAOs.map((dao) => (
                        <th key={dao.id} className="text-center py-4 px-6 font-semibold text-white/70">
                          {dao.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="py-4 px-6 font-medium text-white/80">Gini Coefficient</td>
                      {allDAOs.map((dao) => {
                        const analysis = analyzeDAO(dao.votingPower);
                        return (
                          <td key={dao.id} className="py-4 px-6 text-center font-mono text-primary">
                            {analysis.gini.value.toFixed(2)}
                          </td>
                        );
                      })}
                    </tr>
                    <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="py-4 px-6 font-medium text-white/80">Nakamoto Coefficient</td>
                      {allDAOs.map((dao) => {
                        const analysis = analyzeDAO(dao.votingPower);
                        return (
                          <td key={dao.id} className="py-4 px-6 text-center font-mono text-primary">
                            {analysis.nakamoto.value.toFixed(0)}
                          </td>
                        );
                      })}
                    </tr>
                    <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="py-4 px-6 font-medium text-white/80">Apoke Index</td>
                      {allDAOs.map((dao) => {
                        const analysis = analyzeDAO(dao.votingPower);
                        return (
                          <td key={dao.id} className="py-4 px-6 text-center font-mono text-primary">
                            {analysis.apoke.value.toFixed(2)}
                          </td>
                        );
                      })}
                    </tr>
                    <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="py-4 px-6 font-medium text-white/80">Total Voters</td>
                      {allDAOs.map((dao) => (
                        <td key={dao.id} className="py-4 px-6 text-center font-mono text-primary">
                          {dao.totalVoters.toLocaleString()}
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="py-4 px-6 font-medium text-white/80">Composite Score</td>
                      {allDAOs.map((dao) => {
                        const analysis = analyzeDAO(dao.votingPower);
                        return (
                          <td key={dao.id} className="py-4 px-6 text-center font-mono text-primary">
                            {typeof analysis.compositeScore?.percentage === 'number' ? analysis.compositeScore.percentage.toFixed(1) + '%' : 'N/A'}
                          </td>
                        );
                      })}
                    </tr>
                  </tbody>
                </table>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </main>

      {/* Case Study Modal */}
      <CaseStudyModal dao={selectedDAO} onClose={() => setSelectedDAO(null)} />
    </>
  );
}
