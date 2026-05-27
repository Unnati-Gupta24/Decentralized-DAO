/**
 * DAO Decentralization Analysis Math Library
 * Implements core metrics for analyzing governance structure
 */

export interface MetricResult {
  value: number;
  percentage: number;
  verdict: 'Highly Centralized' | 'Moderately Centralized' | 'Balanced' | 'Moderately Decentralized' | 'Highly Decentralized';
  color: string;
}

export interface DAOAnalysis {
  gini: MetricResult;
  nakamoto: MetricResult;
  apoke: MetricResult;
  lorenz: number[][];
  shapleyValues: Record<string, number>;
  banzhafIndices: Record<string, number>;
  coalitions: CoalitionAnalysis[];
  compositeScore: MetricResult;
}

export interface CoalitionAnalysis {
  size: number;
  power: number;
  threshold: boolean;
  percentage: number;
}

/**
 * Gini Coefficient: Measures wealth inequality among stakeholders
 * 0 = perfect equality, 1 = perfect inequality
 */
export function calculateGini(powers: number[]): number {
  const n = powers.length;
  const mean = powers.reduce((a, b) => a + b, 0) / n;
  
  let numerator = 0;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      numerator += Math.abs(powers[i] - powers[j]);
    }
  }
  
  const denominator = 2 * n * mean;
  return denominator === 0 ? 0 : numerator / denominator;
}

/**
 * Nakamoto Coefficient: Minimum number of entities controlling 51% of power
 * Lower = more centralized, Higher = more decentralized
 */
export function calculateNakamoto(powers: number[]): number {
  const sorted = [...powers].sort((a, b) => b - a);
  const total = sorted.reduce((a, b) => a + b, 0);
  const threshold = total * 0.51;
  
  let accumulated = 0;
  let count = 0;
  
  for (const power of sorted) {
    accumulated += power;
    count++;
    if (accumulated >= threshold) break;
  }
  
  return count;
}

/**
 * Apoke Index: Average power of top K entities
 * Lower variance = higher decentralization
 */
export function calculateApoke(powers: number[]): number {
  const sorted = [...powers].sort((a, b) => b - a);
  const k = Math.ceil(Math.sqrt(powers.length));
  const topK = sorted.slice(0, k);
  
  const mean = topK.reduce((a, b) => a + b, 0) / k;
  const variance = topK.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / k;
  
  return Math.sqrt(variance) / (mean || 1);
}

/**
 * Lorenz Curve: Cumulative distribution of power
 * Returns points for visualization
 */
export function calculateLorenz(powers: number[]): number[][] {
  const sorted = [...powers].sort((a, b) => a - b);
  const total = sorted.reduce((a, b) => a + b, 0);
  
  const lorenzPoints: number[][] = [[0, 0]];
  let cumPower = 0;
  
  for (let i = 0; i < sorted.length; i++) {
    cumPower += sorted[i];
    const x = (i + 1) / sorted.length;
    const y = cumPower / total;
    lorenzPoints.push([x, y]);
  }
  
  return lorenzPoints;
}

/**
 * Shapley Value: Each player's contribution to the coalition
 */
export function calculateShapleyValues(powers: number[]): Record<string, number> {
  const n = powers.length;
  const shapley: Record<string, number> = {};
  
  for (let i = 0; i < n; i++) {
    let contribution = 0;
    
    for (let S = 0; S < Math.pow(2, n); S++) {
      if ((S & (1 << i)) === 0) {
        const withoutI = calculateCoalitionValue(powers, S);
        const withI = calculateCoalitionValue(powers, S | (1 << i));
        const marginal = withI - withoutI;
        
        const factorial = (x: number) => {
          let result = 1;
          for (let i = 2; i <= x; i++) result *= i;
          return result;
        };
        
        const weight = (factorial(n - 1)) / (factorial(n) || 1);
        contribution += weight * marginal;
      }
    }
    
    shapley[`Entity_${i + 1}`] = contribution;
  }
  
  return shapley;
}

/**
 * Banzhaf Index: Proportion of times a player is critical to winning
 */
export function calculateBanzhafIndices(powers: number[]): Record<string, number> {
  const n = powers.length;
  const total = powers.reduce((a, b) => a + b, 0);
  const threshold = total / 2;
  const banzhaf: Record<string, number> = {};
  
  let totalPower = 0;
  
  for (let i = 0; i < n; i++) {
    let criticalCount = 0;
    
    for (let S = 0; S < Math.pow(2, n); S++) {
      if ((S & (1 << i)) !== 0) {
        const coalitionPower = calculateCoalitionValue(powers, S);
        const coalitionWithout = coalitionPower - powers[i];
        
        if (coalitionWithout < threshold && coalitionPower >= threshold) {
          criticalCount++;
        }
      }
    }
    
    banzhaf[`Entity_${i + 1}`] = criticalCount;
    totalPower += criticalCount;
  }
  
  // Normalize
  for (const key in banzhaf) {
    banzhaf[key] = totalPower > 0 ? banzhaf[key] / totalPower : 0;
  }
  
  return banzhaf;
}

/**
 * Calculate coalition value (sum of powers in coalition)
 */
function calculateCoalitionValue(powers: number[], coalition: number): number {
  let value = 0;
  for (let i = 0; i < powers.length; i++) {
    if ((coalition & (1 << i)) !== 0) {
      value += powers[i];
    }
  }
  return value;
}

/**
 * Coalition Analysis: How many entities needed to control 51%
 */
export function analyzeCoalitions(powers: number[]): CoalitionAnalysis[] {
  const sorted = [...powers].map((p, i) => ({ power: p, index: i }))
    .sort((a, b) => b.power - a.power);
  
  const total = powers.reduce((a, b) => a + b, 0);
  const threshold = total * 0.51;
  
  const coalitions: CoalitionAnalysis[] = [];
  let accumulated = 0;
  
  for (let size = 1; size <= Math.min(powers.length, 5); size++) {
    accumulated = 0;
    for (let i = 0; i < size; i++) {
      accumulated += sorted[i].power;
    }
    
    coalitions.push({
      size,
      power: accumulated,
      threshold: accumulated >= threshold,
      percentage: (accumulated / total) * 100,
    });
  }
  
  return coalitions;
}

/**
 * Get verdict based on metric value
 */
function getVerdict(value: number, metricType: 'gini' | 'nakamoto' | 'apoke'): MetricResult['verdict'] {
  if (metricType === 'gini') {
    if (value > 0.8) return 'Highly Decentralized';
    if (value > 0.6) return 'Moderately Decentralized';
    if (value > 0.4) return 'Balanced';
    if (value > 0.2) return 'Moderately Centralized';
    return 'Highly Centralized';
  }
  
  if (metricType === 'nakamoto') {
    if (value >= 10) return 'Highly Decentralized';
    if (value >= 5) return 'Moderately Decentralized';
    if (value >= 3) return 'Balanced';
    if (value >= 2) return 'Moderately Centralized';
    return 'Highly Centralized';
  }
  
  if (metricType === 'apoke') {
    if (value < 0.3) return 'Highly Decentralized';
    if (value < 0.5) return 'Moderately Decentralized';
    if (value < 0.8) return 'Balanced';
    if (value < 1.2) return 'Moderately Centralized';
    return 'Highly Centralized';
  }
  
  return 'Balanced';
}

/**
 * Get color for verdict
 */
function getVerdictColor(verdict: MetricResult['verdict']): string {
  const colors: Record<MetricResult['verdict'], string> = {
    'Highly Centralized': '#ef4444',
    'Moderately Centralized': '#f97316',
    'Balanced': '#eab308',
    'Moderately Decentralized': '#84cc16',
    'Highly Decentralized': '#22c55e',
  };
  return colors[verdict];
}

/**
 * Composite Score: Weighted average of all metrics
 */
export function calculateCompositeScore(gini: number, nakamoto: number, apoke: number): MetricResult {
  // Normalize metrics to 0-1 scale
  const normalizedGini = Math.min(gini, 1);
  const normalizedNakamoto = Math.min(nakamoto / 20, 1);
  const normalizedApoke = Math.min(1 - (apoke / 2), 0, 1);
  
  const composite = (normalizedGini * 0.4 + normalizedNakamoto * 0.35 + normalizedApoke * 0.25);
  
  return {
    value: composite,
    percentage: composite * 100,
    verdict: getVerdict(composite, 'gini'),
    color: getVerdictColor(getVerdict(composite, 'gini')),
  };
}

/**
 * Full DAO Analysis
 */
export function analyzeDAO(powers: number[]): DAOAnalysis {
  if (powers.length === 0) {
    return {
      gini: { value: 0, percentage: 0, verdict: 'Balanced', color: '#eab308' },
      nakamoto: { value: 0, percentage: 0, verdict: 'Balanced', color: '#eab308' },
      apoke: { value: 0, percentage: 0, verdict: 'Balanced', color: '#eab308' },
      lorenz: [[0, 0], [1, 1]],
      shapleyValues: {},
      banzhafIndices: {},
      coalitions: [],
      compositeScore: { value: 0, percentage: 0, verdict: 'Balanced', color: '#eab308' },
    };
  }
  
  const giniValue = calculateGini(powers);
  const nakamotoValue = calculateNakamoto(powers);
  const apokeValue = calculateApoke(powers);
  
  return {
    gini: {
      value: giniValue,
      percentage: giniValue * 100,
      verdict: getVerdict(giniValue, 'gini'),
      color: getVerdictColor(getVerdict(giniValue, 'gini')),
    },
    nakamoto: {
      value: nakamotoValue,
      percentage: (nakamotoValue / powers.length) * 100,
      verdict: getVerdict(nakamotoValue, 'nakamoto'),
      color: getVerdictColor(getVerdict(nakamotoValue, 'nakamoto')),
    },
    apoke: {
      value: apokeValue,
      percentage: apokeValue * 100,
      verdict: getVerdict(apokeValue, 'apoke'),
      color: getVerdictColor(getVerdict(apokeValue, 'apoke')),
    },
    lorenz: calculateLorenz(powers),
    shapleyValues: calculateShapleyValues(powers),
    banzhafIndices: calculateBanzhafIndices(powers),
    coalitions: analyzeCoalitions(powers),
    compositeScore: calculateCompositeScore(giniValue, nakamotoValue, apokeValue),
  };
}
