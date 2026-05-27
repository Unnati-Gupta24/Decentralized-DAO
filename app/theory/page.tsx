'use client';

import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/GlassCard';
import { Header } from '@/components/Header';

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

export default function Theory() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <h2 className="text-4xl sm:text-5xl font-bold gradient-text mb-3">
              Governance Theory
            </h2>
            <p className="text-white/60">
              Understanding DAO decentralization through mathematical analysis
            </p>
          </motion.div>

          {/* Content Sections */}
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-8">
            {/* Gini Coefficient */}
            <motion.div variants={itemVariants}>
              <GlassCard className="p-8" hover>
                <h3 className="text-2xl font-bold gradient-text mb-4">Gini Coefficient</h3>
                <div className="space-y-4 text-white/80">
                  <p>
                    The Gini coefficient measures inequality in a distribution on a scale from 0 to 1. In the context of
                    DAOs, it quantifies how unevenly voting power is distributed among stakeholders.
                  </p>

                  <div className="bg-white/5 border border-white/10 rounded-lg p-4 font-mono text-sm">
                    <div className="mb-2 text-cyan-400">Formula:</div>
                    <div className="text-white/70">
                      G = Σ|P<sub>i</sub> - P<sub>j</sub>| / (2n × mean)
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-white mb-2">Interpretation:</h4>
                    <ul className="space-y-1 text-white/70 text-sm">
                      <li>• <span className="text-red-400">0.0-0.2</span>: Highly Centralized</li>
                      <li>• <span className="text-orange-400">0.2-0.4</span>: Moderately Centralized</li>
                      <li>• <span className="text-yellow-400">0.4-0.6</span>: Balanced</li>
                      <li>• <span className="text-green-400">0.6-0.8</span>: Moderately Decentralized</li>
                      <li>• <span className="text-green-500">0.8-1.0</span>: Highly Decentralized</li>
                    </ul>
                  </div>

                  <div className="bg-white/5 border-l-2 border-primary p-4">
                    <p className="text-sm">
                      <span className="font-semibold">Example:</span> A DAO with voting power [40, 30, 20, 10] has high
                      inequality and lower Gini. Conversely, [25, 25, 25, 25] shows perfect equality with Gini near 0.
                    </p>
                  </div>
                </div>
              </GlassCard>
            </motion.div>

            {/* Nakamoto Coefficient */}
            <motion.div variants={itemVariants}>
              <GlassCard className="p-8" hover>
                <h3 className="text-2xl font-bold gradient-text mb-4">Nakamoto Coefficient</h3>
                <div className="space-y-4 text-white/80">
                  <p>
                    The Nakamoto coefficient measures the minimum number of entities that must collude to control 51% of
                    voting power. Named after Bitcoin&apos;s creator, it is a direct measure of network resilience against
                    concentration attacks.
                  </p>

                  <div className="bg-white/5 border border-white/10 rounded-lg p-4 font-mono text-sm">
                    <div className="mb-2 text-cyan-400">Definition:</div>
                    <div className="text-white/70">
                      N = min{'{'}k : Σ(P<sub>i</sub>) ≥ 51% for top k entities{'}'}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-white mb-2">Interpretation:</h4>
                    <ul className="space-y-1 text-white/70 text-sm">
                      <li>• <span className="text-red-400">1</span>: Single point of failure (dictatorship)</li>
                      <li>• <span className="text-orange-400">2-3</span>: Highly vulnerable to collusion</li>
                      <li>• <span className="text-yellow-400">3-5</span>: Moderate risk</li>
                      <li>• <span className="text-green-400">5-10</span>: Good decentralization</li>
                      <li>• <span className="text-green-500">10+</span>: Excellent resilience</li>
                    </ul>
                  </div>

                  <div className="bg-white/5 border-l-2 border-primary p-4">
                    <p className="text-sm">
                      <span className="font-semibold">Example:</span> If the top 3 entities control [30%, 25%, 20%],
                      their combined 75% exceeds 51%, so the Nakamoto coefficient is 3.
                    </p>
                  </div>
                </div>
              </GlassCard>
            </motion.div>

            {/* Apoke Index */}
            <motion.div variants={itemVariants}>
              <GlassCard className="p-8" hover>
                <h3 className="text-2xl font-bold gradient-text mb-4">Apoke Index</h3>
                <div className="space-y-4 text-white/80">
                  <p>
                    The Apoke index measures the variance in power among the top K entities, where K is derived from the
                    square root of the network size. It captures whether leadership is concentrated in a few hands or
                    distributed more evenly.
                  </p>

                  <div className="bg-white/5 border border-white/10 rounded-lg p-4 font-mono text-sm">
                    <div className="mb-2 text-cyan-400">Formula:</div>
                    <div className="text-white/70">
                      A = √(Σ(P<sub>i</sub> - mean)<sup>2</sup>) / mean, for top K = √n entities
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-white mb-2">Interpretation:</h4>
                    <ul className="space-y-1 text-white/70 text-sm">
                      <li>• <span className="text-red-400">1.2+</span>: Highly Centralized</li>
                      <li>• <span className="text-orange-400">0.8-1.2</span>: Moderately Centralized</li>
                      <li>• <span className="text-yellow-400">0.5-0.8</span>: Balanced</li>
                      <li>• <span className="text-green-400">0.3-0.5</span>: Moderately Decentralized</li>
                      <li>• <span className="text-green-500">0.0-0.3</span>: Highly Decentralized</li>
                    </ul>
                  </div>

                  <div className="bg-white/5 border-l-2 border-primary p-4">
                    <p className="text-sm">
                      <span className="font-semibold">Note:</span> Lower Apoke values indicate more uniform distribution of
                      power among leaders. High variance suggests power is concentrated in few hands.
                    </p>
                  </div>
                </div>
              </GlassCard>
            </motion.div>

            {/* Shapley Values */}
            <motion.div variants={itemVariants}>
              <GlassCard className="p-8" hover>
                <h3 className="text-2xl font-bold gradient-text mb-4">Shapley Values</h3>
                <div className="space-y-4 text-white/80">
                  <p>
                    Shapley values come from cooperative game theory and measure each player&apos;s average contribution to
                    different coalitions. In DAO context, they show the &quot;fair share&quot; of each entity&apos;s influence
                    based on their criticality to decision-making.
                  </p>

                  <div className="bg-white/5 border border-white/10 rounded-lg p-4 font-mono text-sm">
                    <div className="mb-2 text-cyan-400">Concept:</div>
                    <div className="text-white/70">
                      Φ<sub>i</sub> = average marginal contribution of player i across all coalitions
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-white mb-2">Properties:</h4>
                    <ul className="space-y-1 text-white/70 text-sm">
                      <li>• <strong>Efficiency:</strong> All Shapley values sum to total value</li>
                      <li>• <strong>Symmetry:</strong> Players with identical roles get identical values</li>
                      <li>• <strong>Null player:</strong> Players contributing nothing get zero value</li>
                      <li>• <strong>Additivity:</strong> Values are consistent across multiple games</li>
                    </ul>
                  </div>

                  <div className="bg-white/5 border-l-2 border-primary p-4">
                    <p className="text-sm">
                      <span className="font-semibold">Application:</span> Identify which entities are truly critical to
                      governance. A large stakeholder with many substitutes may have lower Shapley value than a smaller but
                      unique stakeholder.
                    </p>
                  </div>
                </div>
              </GlassCard>
            </motion.div>

            {/* Banzhaf Index */}
            <motion.div variants={itemVariants}>
              <GlassCard className="p-8" hover>
                <h3 className="text-2xl font-bold gradient-text mb-4">Banzhaf Index</h3>
                <div className="space-y-4 text-white/80">
                  <p>
                    The Banzhaf index measures a player&apos;s &quot;swing power&quot; – the proportion of coalitions where
                    removing them changes the outcome from losing to winning. It represents decision-making power more
                    directly than raw voting weight.
                  </p>

                  <div className="bg-white/5 border border-white/10 rounded-lg p-4 font-mono text-sm">
                    <div className="mb-2 text-cyan-400">Definition:</div>
                    <div className="text-white/70">
                      B<sub>i</sub> = (critical coalitions for i) / (total critical coalitions across all players)
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-white mb-2">Key Differences from Shapley:</h4>
                    <ul className="space-y-1 text-white/70 text-sm">
                      <li>• Focuses on &quot;swing&quot; coalitions where a player can change outcomes</li>
                      <li>• More directly measures veto or kingmaker power</li>
                      <li>• Can be more intuitive for voting analysis</li>
                      <li>• May highlight minority positions with high leverage</li>
                    </ul>
                  </div>

                  <div className="bg-white/5 border-l-2 border-primary p-4">
                    <p className="text-sm">
                      <span className="font-semibold">Example:</span> An entity with 1% of voting power could have
                      disproportionately high Banzhaf index if it&apos;s the swing vote in many decision scenarios.
                    </p>
                  </div>
                </div>
              </GlassCard>
            </motion.div>

            {/* Lorenz Curve */}
            <motion.div variants={itemVariants}>
              <GlassCard className="p-8" hover>
                <h3 className="text-2xl font-bold gradient-text mb-4">Lorenz Curve</h3>
                <div className="space-y-4 text-white/80">
                  <p>
                    The Lorenz curve is a graphical representation of the cumulative distribution of power. It plots the
                    cumulative percentage of entities against cumulative percentage of total power. The further from the
                    diagonal, the more unequal the distribution.
                  </p>

                  <div>
                    <h4 className="font-semibold text-white mb-2">Interpretation:</h4>
                    <ul className="space-y-1 text-white/70 text-sm">
                      <li>• <strong>45° diagonal:</strong> Perfect equality (everyone has equal power)</li>
                      <li>• <strong>Below diagonal:</strong> Inequality (some have more than others)</li>
                      <li>• <strong>Closer to L-shape:</strong> More concentrated power</li>
                      <li>• <strong>Area between curve and diagonal:</strong> Gini coefficient</li>
                    </ul>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                    <h4 className="font-semibold text-white mb-2 text-sm">Worked Example:</h4>
                    <div className="text-sm text-white/70 space-y-1 font-mono">
                      <div>Powers: [50, 30, 20]</div>
                      <div>Sorted: [50, 30, 20], Total: 100</div>
                      <div className="mt-2">Cumulative distribution:</div>
                      <div>• 1/3 entities = 50% power (steep)</div>
                      <div>• 2/3 entities = 80% power</div>
                      <div>• 3/3 entities = 100% power</div>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>

            {/* Composite Score */}
            <motion.div variants={itemVariants}>
              <GlassCard className="p-8" hover>
                <h3 className="text-2xl font-bold gradient-text mb-4">Composite Score</h3>
                <div className="space-y-4 text-white/80">
                  <p>
                    The Composite Score combines Gini, Nakamoto, and Apoke indices with weighted averaging to provide a
                    single decentralization metric. This allows for quick overall assessment while acknowledging that no
                    single metric tells the complete story.
                  </p>

                  <div className="bg-white/5 border border-white/10 rounded-lg p-4 font-mono text-sm">
                    <div className="mb-2 text-cyan-400">Weights:</div>
                    <div className="text-white/70">
                      <div>Composite = 40% × Gini + 35% × Nakamoto + 25% × Apoke</div>
                      <div className="mt-2 text-xs">(All normalized to 0-1 scale)</div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-white mb-2">Methodology:</h4>
                    <ul className="space-y-1 text-white/70 text-sm">
                      <li>• <strong>Gini (40%):</strong> Captures overall inequality</li>
                      <li>• <strong>Nakamoto (35%):</strong> Measures critical attack vector</li>
                      <li>• <strong>Apoke (25%):</strong> Assesses leadership concentration</li>
                    </ul>
                  </div>

                  <div className="bg-white/5 border-l-2 border-primary p-4">
                    <p className="text-sm">
                      <span className="font-semibold">Range:</span> 0% (Highly Centralized) to 100% (Highly Decentralized)
                    </p>
                  </div>
                </div>
              </GlassCard>
            </motion.div>

            {/* Further Reading */}
            <motion.div variants={itemVariants}>
              <GlassCard className="p-8" hover>
                <h3 className="text-2xl font-bold gradient-text mb-4">Further Reading</h3>
                <div className="space-y-4">
                  <div className="bg-white/5 border border-white/10 rounded-lg p-4 space-y-2">
                    <h4 className="font-semibold text-white text-sm">Academic Papers</h4>
                    <ul className="text-white/70 text-sm space-y-1">
                      <li>• Gini, C. (1912) - "Variabilità e mutabilità"</li>
                      <li>• Shapley, L. S. (1953) - "A Value for N-Person Games"</li>
                      <li>• Banzhaf, J. F. (1965) - "Weighted Voting Doesn't Work"</li>
                      <li>• Nakamoto, S. (2008) - "Bitcoin: A Peer-to-Peer Electronic Cash System"</li>
                    </ul>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-lg p-4 space-y-2">
                    <h4 className="font-semibold text-white text-sm">DAO Governance</h4>
                    <ul className="text-white/70 text-sm space-y-1">
                      <li>• Aragon Research - Decentralized Governance Frameworks</li>
                      <li>• The Curve DAO - Governance Structure Analysis</li>
                      <li>• MakerDAO - Multi-stakeholder Governance Models</li>
                      <li>• Lido - Validator Network Decentralization</li>
                    </ul>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-lg p-4 space-y-2">
                    <h4 className="font-semibold text-white text-sm">Related Concepts</h4>
                    <ul className="text-white/70 text-sm space-y-1">
                      <li>• Byzantine Fault Tolerance - Consensus mechanism resilience</li>
                      <li>• Quorum analysis - Minimum voting requirements</li>
                      <li>• Coalition games - Multi-player strategic analysis</li>
                      <li>• Voting power distribution - Optimal structures</li>
                    </ul>
                  </div>
                </div>
              </GlassCard>
            </motion.div>

            {/* Methodology */}
            <motion.div variants={itemVariants}>
              <GlassCard className="p-8" hover>
                <h3 className="text-2xl font-bold gradient-text mb-4">Methodology</h3>
                <div className="space-y-4 text-white/80">
                  <p>
                    This analyzer implements mathematically rigorous calculations based on cooperative game theory and
                    statistical distribution analysis. Each metric provides a distinct lens on governance structure:
                  </p>

                  <div className="bg-white/5 border-l-2 border-primary p-4 space-y-2">
                    <p className="text-sm">
                      <span className="font-semibold">Gini Coefficient</span> measures overall inequality across all
                      entities, useful for detecting structural imbalance.
                    </p>
                    <p className="text-sm">
                      <span className="font-semibold">Nakamoto Coefficient</span> focuses on the most critical attack vector
                      – how many entities must collude for majority control.
                    </p>
                    <p className="text-sm">
                      <span className="font-semibold">Apoke Index</span> identifies whether leadership itself is distributed,
                      even if overall distribution is equal.
                    </p>
                    <p className="text-sm">
                      <span className="font-semibold">Shapley &amp; Banzhaf</span> apply game theory to measure each
                      entity&apos;s actual decision-making power, not just voting weight.
                    </p>
                  </div>

                  <p className="text-sm">
                    Used together, these metrics provide comprehensive insight into governance resilience, fairness, and
                    actual power distribution in DAOs.
                  </p>
                </div>
              </GlassCard>
            </motion.div>
          </motion.div>
        </div>
      </main>
    </>
  );
}
