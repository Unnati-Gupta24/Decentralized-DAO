export interface DAOInfo {
  id: string;
  name: string;
  token: string;
  description: string;
  established: string;
  totalVoters: number;
  votingPower: number[];
  governance: string;
  topHolders: Array<{
    name: string;
    percentage: number;
  }>;
  details: {
    treasury: string;
    totalStaked: string;
    proposalThreshold: string;
    votingPeriod: string;
  };
}

export const uniswapDAO: DAOInfo = {
  id: 'uniswap',
  name: 'Uniswap',
  token: 'UNI',
  description: 'Decentralized exchange protocol with community governance',
  established: '2020',
  totalVoters: 8543,
  votingPower: [2.5, 1.8, 1.5, 1.2, 0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.2, 0.15, 0.1, 0.08, 0.07, 0.06, 0.05, 0.04, 0.03],
  governance: 'Multi-sig Council + Token Holders',
  topHolders: [
    { name: 'Uniswap Foundation', percentage: 2.5 },
    { name: 'Paradigm Fund', percentage: 1.8 },
    { name: 'Polychain Capital', percentage: 1.5 },
    { name: 'Sequoia Capital', percentage: 1.2 },
    { name: 'a16z Crypto', percentage: 0.9 },
    { name: 'Other Whale Holders', percentage: 10.1 },
    { name: 'Community (6,543 addresses)', percentage: 80.0 },
  ],
  details: {
    treasury: '$2.1B+ in protocol fees',
    totalStaked: '450M+ UNI in governance',
    proposalThreshold: '65K UNI (~$1.2M at current prices)',
    votingPeriod: '1 week voting + 2 day timelock',
  },
};

export const aaveDAO: DAOInfo = {
  id: 'aave',
  name: 'Aave',
  token: 'AAVE',
  description: 'Decentralized lending protocol with advanced governance',
  established: '2020',
  totalVoters: 6821,
  votingPower: [4.2, 3.1, 2.8, 2.4, 2.0, 1.8, 1.5, 1.3, 1.1, 0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.35, 0.3, 0.25, 0.2, 0.15],
  governance: 'Governance + Guardian Council',
  topHolders: [
    { name: 'Aave Protocol Guild', percentage: 4.2 },
    { name: 'Tiger Global', percentage: 3.1 },
    { name: 'Standard Crypto', percentage: 2.8 },
    { name: 'Three Arrows Capital', percentage: 2.4 },
    { name: 'Founders (Marc Zeller)', percentage: 2.0 },
    { name: 'Major VCs & Wallets', percentage: 12.5 },
    { name: 'Community (5,821 addresses)', percentage: 72.0 },
  ],
  details: {
    treasury: '$520M in governance-controlled assets',
    totalStaked: '3.2M AAVE in governance',
    proposalThreshold: '80K AAVE (~$11.2M at current prices)',
    votingPeriod: '3 days voting + cooldown period',
  },
};

export const allDAOs = [uniswapDAO, aaveDAO];
