import { DAOAnalysis } from './dao-math';

const chartColors = [
  '#FF6B6B', // Red
  '#4ECDC4', // Teal
  '#FFE66D', // Yellow
  '#95E1D3', // Mint
  '#C7CEEA', // Lavender
  '#FF8E72', // Coral
  '#74B9FF', // Sky Blue
  '#A29BFE', // Purple
  '#FD79A8', // Pink
  '#FDCB6E', // Gold
];

export function getEntityColor(index: number): string {
  return chartColors[index % chartColors.length];
}

export function getChartDataWithColors(analysis: DAOAnalysis, powers: number[]) {
  const shapleyData = Object.entries(analysis.shapleyValues).map(([key, value], idx) => ({
    name: `Entity ${idx + 1}`,
    value: parseFloat(value.toFixed(4)),
    fill: getEntityColor(idx),
  }));

  const banzhafData = Object.entries(analysis.banzhafIndices).map(([key, value], idx) => ({
    name: `Entity ${idx + 1}`,
    value: parseFloat((value * 100).toFixed(2)),
    fill: getEntityColor(idx),
  }));

  const lorenzData = analysis.lorenz.map(([x, y]) => ({
    x: parseFloat((x * 100).toFixed(1)),
    y: parseFloat((y * 100).toFixed(1)),
  }));

  return {
    shapleyData,
    banzhafData,
    lorenzData,
  };
}

export function formatMetrics(analysis: DAOAnalysis, powers: number[]) {
  const shapleyValues = Object.values(analysis.shapleyValues);
  const sorted = [...shapleyValues].sort((a, b) => b - a);
  const sum = sorted.reduce((a, b) => a + b, 0);

  return {
    giniValue: (analysis.gini.value * 100).toFixed(2),
    nakamotoValue: analysis.nakamoto.value.toFixed(0),
    apokeValue: (analysis.apoke.value).toFixed(2),
    totalEntities: powers.length,
    concentrationRatio: powers.length > 0 ? ((powers[0] / powers.reduce((a, b) => a + b, 0)) * 100).toFixed(2) : '0',
  };
}
