import { Account } from './AppStateContext';

export function getPrimarySavingsGoal(accounts: Account[]) {
  const goal = accounts.find(a => a.type === 'savings' && typeof a.goalTarget === 'number');
  if (!goal || !goal.goalTarget) return null;
  const pct = Math.min(100, Math.max(0, Math.floor((goal.balance / goal.goalTarget) * 100)));
  return { name: goal.name, percent: pct, balance: goal.balance, target: goal.goalTarget };
}

export function getTotalDebt(accounts: Account[]) {
  const total = accounts
    .filter(a => a.type === 'loan' || a.type === 'credit_card')
    .reduce((sum, a) => sum + (a.balance || 0), 0);
  return total;
}

export function inferGoalsFromAccounts(accounts: Account[]) {
  const out: string[] = [];
  if (accounts.some(a => a.type === 'loan' || a.type === 'credit_card')) out.push('pay_down_debt');
  if (accounts.some(a => a.type === 'savings')) out.push('save_big_goal');
  if (accounts.some(a => a.type === 'investment')) out.push('start_investing');
  return out;
}
