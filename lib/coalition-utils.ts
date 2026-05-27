export interface CoalitionGroup {
  entities: number[];
  totalPower: number;
  percentage: number;
  canVeto: boolean;
  canDominate: boolean;
  description: string;
}

export function analyzeCoalitions(powers: number[]): CoalitionGroup[] {
  const totalPower = powers.reduce((a, b) => a + b, 0);
  const coalitions: CoalitionGroup[] = [];

  // Generate all possible non-empty subsets
  const subsets: number[][] = [];
  for (let mask = 1; mask < Math.pow(2, powers.length); mask++) {
    const subset: number[] = [];
    for (let i = 0; i < powers.length; i++) {
      if (mask & (1 << i)) {
        subset.push(i);
      }
    }
    subsets.push(subset);
  }

  // Filter to only viable coalitions (those with significant power)
  const viableCoalitions = subsets.filter((subset) => {
    const power = subset.reduce((sum, i) => sum + powers[i], 0);
    return power >= totalPower * 0.3; // At least 30% power
  });

  // Sort by power and take top 10
  const topCoalitions = viableCoalitions
    .sort((a, b) => {
      const powerA = a.reduce((sum, i) => sum + powers[i], 0);
      const powerB = b.reduce((sum, i) => sum + powers[i], 0);
      return powerB - powerA;
    })
    .slice(0, 10);

  // Convert to coalition groups
  topCoalitions.forEach((entities) => {
    const coalitionPower = entities.reduce((sum, i) => sum + powers[i], 0);
    const percentage = (coalitionPower / totalPower) * 100;
    const canDominate = percentage >= 51;
    const canVeto = percentage >= 33.33;

    // Generate description
    let description = '';
    if (entities.length === 1) {
      description = `Entity ${entities[0] + 1} alone`;
    } else if (entities.length === 2) {
      description = `Entities ${entities.map((e) => e + 1).join(' & ')}`;
    } else {
      description = `Coalition of ${entities.length} entities`;
    }

    coalitions.push({
      entities,
      totalPower: coalitionPower,
      percentage,
      canVeto,
      canDominate,
      description,
    });
  });

  return coalitions;
}

export function getCoalitionStats(coalitions: CoalitionGroup[]) {
  const dominantCoalitions = coalitions.filter((c) => c.canDominate);
  const vetoCoalitions = coalitions.filter((c) => c.canVeto);
  const minToVeto = coalitions.find((c) => c.canVeto && !c.canDominate);

  return {
    dominantCount: dominantCoalitions.length,
    vetoCount: vetoCoalitions.length,
    minToVeto: minToVeto,
    mostPowerful: coalitions[0],
  };
}
