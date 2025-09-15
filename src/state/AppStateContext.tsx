import React, { createContext, useContext, useState, ReactNode } from 'react';

export type AccountType = 'loan' | 'credit_card' | 'savings' | 'checking' | 'investment';

export interface Account {
  id: string;
  type: AccountType;
  name: string;
  balance: number;
  apr?: number;
  minPayment?: number;
  goalTarget?: number;
  monthlyDirectDeposit?: number;
}

export interface UserProfile {
  ageRange?: string;
  mainGoals: string[];
  topPriority?: string;
  timeline?: string;
  comfortLevel?: string;
}

export interface StrategyAllocation {
  debtPct: number;
  savingsPct: number;
  investPct: number;
}

export interface StrategyConfig {
  scope: 'all' | 'debts' | 'savings' | 'investments' | 'single';
  preset?: 'debt_crusher' | 'goal_keeper' | 'nest_builder' | 'balanced_climb';
  targetTimeline: 'short' | 'mid' | 'long';
  extraContribution: number;
  allocation: StrategyAllocation;
  singleAccountId?: string;
}

interface AppStateContextType {
  accounts: Account[];
  userProfile: UserProfile | null;
  strategyConfig: StrategyConfig;
  setAccounts: React.Dispatch<React.SetStateAction<Account[]>>;
  setUserProfile: (userProfile: UserProfile | null) => void;
  setStrategyConfig: (strategyConfig: StrategyConfig) => void;
}

const AppStateContext = createContext<AppStateContextType | undefined>(undefined);

const defaultStrategyConfig: StrategyConfig = {
  scope: 'all',
  targetTimeline: 'mid',
  extraContribution: 0,
  allocation: {
    debtPct: 0,
    savingsPct: 0,
    investPct: 0
  }
};

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [strategyConfig, setStrategyConfig] = useState<StrategyConfig>(defaultStrategyConfig);

  const value: AppStateContextType = {
    accounts,
    userProfile,
    strategyConfig,
    setAccounts,
    setUserProfile,
    setStrategyConfig
  };

  return (
    <AppStateContext.Provider value={value}>
      {children}
    </AppStateContext.Provider>
  );
}

export function useAppState() {
  const context = useContext(AppStateContext);
  if (context === undefined) {
    throw new Error('useAppState must be used within an AppStateProvider');
  }
  return context;
}