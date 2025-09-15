import { useCallback } from 'react';
import { StrategyConfig, StrategyResult } from '../data/types';

export function useStrategyEngine() {
  const calculateStrategyResult = useCallback((config: StrategyConfig): StrategyResult => {
    // Placeholder calculation logic - in a real app, this would use actual financial formulas
    const totalMonths = config.timeline;
    const monthlyContribution = config.monthlyContribution;
    const totalContribution = monthlyContribution * totalMonths;
    
    // Simple growth calculation (placeholder)
    const growthRate = config.riskLevel === 'high' ? 0.08 : config.riskLevel === 'medium' ? 0.05 : 0.03;
    const projectedValue = totalContribution * (1 + growthRate);
    const growth = projectedValue - totalContribution;
    
    // Generate monthly breakdown (placeholder)
    const monthlyBreakdown = Array.from({ length: totalMonths }, (_, index) => ({
      month: index + 1,
      debt: monthlyContribution * (config.allocation.debt / 100),
      savings: monthlyContribution * (config.allocation.savings / 100),
      investment: monthlyContribution * (config.allocation.investment / 100),
      total: monthlyContribution
    }));
    
    return {
      totalContribution,
      projectedValue,
      growth,
      monthlyBreakdown
    };
  }, []);

  const generateNarrative = useCallback((config: StrategyConfig, result: StrategyResult): string => {
    const { name, timeline, monthlyContribution, allocation } = config;
    const { projectedValue, growth } = result;
    
    return `This scenario shows how ${name} could work over ${timeline} months. 
    With a monthly contribution of $${monthlyContribution.toLocaleString()}, you might allocate 
    ${allocation.debt}% to debt payoff, ${allocation.savings}% to savings, and ${allocation.investment}% to investments. 
    This could potentially grow your money to approximately $${projectedValue.toLocaleString()}, 
    representing a growth of $${growth.toLocaleString()}. Remember, these are educational scenarios 
    and actual results may vary significantly.`;
  }, []);

  return {
    calculateStrategyResult,
    generateNarrative
  };
}

