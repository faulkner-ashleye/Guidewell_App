export interface Account {
  id: string;
  name: string;
  type: 'checking' | 'savings' | 'investment' | 'debt';
  balance: number;
  interestRate?: number;
  monthlyContribution?: number;
}

export interface UserProfile {
  id: string;
  name: string;
  age: number;
  income: number;
  riskTolerance: 'conservative' | 'moderate' | 'aggressive';
  financialGoals: string[];
  accounts: Account[];
}

export interface StrategyConfig {
  id: string;
  name: string;
  type: 'debt_payoff' | 'emergency_fund' | 'retirement' | 'investment' | 'custom';
  timeline: number; // months
  monthlyContribution: number;
  allocation: {
    debt: number;
    savings: number;
    investment: number;
  };
  targetAmount?: number;
  riskLevel: 'low' | 'medium' | 'high';
}

export interface StrategyResult {
  totalContribution: number;
  projectedValue: number;
  growth: number;
  monthlyBreakdown: {
    month: number;
    debt: number;
    savings: number;
    investment: number;
    total: number;
  }[];
}

export interface StrategyPreset {
  id: string;
  name: string;
  description: string;
  type: StrategyConfig['type'];
  defaultTimeline: number;
  defaultAllocation: StrategyConfig['allocation'];
  riskLevel: StrategyConfig['riskLevel'];
}

