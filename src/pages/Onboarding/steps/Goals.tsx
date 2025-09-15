import React from 'react';
import { OnboardingState, MainGoal } from '../../../data/onboardingTypes';
import { onboardingCopy } from '../copy';
import { Account } from '../../../state/AppStateContext';
import { inferGoalsFromAccounts } from '../../../state/selectors';

interface GoalsProps {
  data: OnboardingState;
  update: <K extends keyof OnboardingState>(key: K, value: OnboardingState[K]) => void;
  onNext: () => void;
  onBack: () => void;
  onSkip: () => void;
  accounts: Account[];
}

const goalOptions: { value: MainGoal; label: string }[] = [
  { value: 'pay_down_debt', label: 'Pay down debt' },
  { value: 'save_big_goal', label: 'Save for a big goal' },
  { value: 'build_emergency', label: 'Build an emergency fund' },
  { value: 'start_investing', label: 'Start investing' }
];

export function Goals({ data, update, onNext, onBack, onSkip, accounts }: GoalsProps) {
  // Component for selecting financial goals
  const handleGoalToggle = (goal: MainGoal) => {
    const currentGoals = data.mainGoals;
    const newGoals = currentGoals.includes(goal)
      ? currentGoals.filter(g => g !== goal)
      : [...currentGoals, goal];
    update('mainGoals', newGoals);
    
    // Clear topPriority if it's no longer in mainGoals
    if (data.topPriority && !newGoals.includes(data.topPriority)) {
      update('topPriority', undefined);
    }
  };

  const canProceed = data.mainGoals.length > 0 && data.topPriority;
  
  // Check if we should show the hint
  const inferredGoals = inferGoalsFromAccounts(accounts);
  const shouldShowHint = data.mainGoals.length === 0 && inferredGoals.length > 0;
  
  const handleAutoSelect = () => {
    update('mainGoals', inferredGoals as MainGoal[]);
  };

  return (
    <div className="onboarding-step">
      <h1>What are your main goals?</h1>
      <p>Select all that apply:</p>
      
      {shouldShowHint && (
        <div className="hint-box">
          <p>We noticed you have {inferredGoals.includes('pay_down_debt') ? 'debt' : ''}{inferredGoals.includes('pay_down_debt') && inferredGoals.includes('save_big_goal') ? ' and ' : ''}{inferredGoals.includes('save_big_goal') ? 'savings' : ''}—want to include these goals?</p>
          <button onClick={handleAutoSelect} className="auto-select-button">
            Auto-select based on my accounts
          </button>
        </div>
      )}
      
      <div>
        {goalOptions.map(option => (
          <label key={option.value}>
            <input
              type="checkbox"
              checked={data.mainGoals.includes(option.value)}
              onChange={() => handleGoalToggle(option.value)}
            />
            {option.label}
          </label>
        ))}
      </div>

      {data.mainGoals.length > 0 && (
        <div>
          <p>Which is your top priority?</p>
          {data.mainGoals.map(goal => (
            <label key={goal}>
              <input
                type="radio"
                name="topPriority"
                value={goal}
                checked={data.topPriority === goal}
                onChange={() => update('topPriority', goal)}
              />
              {goalOptions.find(opt => opt.value === goal)?.label}
            </label>
          ))}
        </div>
      )}

      <div>
        <button onClick={onBack}>Back</button>
        <button onClick={onSkip}>{onboardingCopy.skip}</button>
        <button onClick={onNext} disabled={!canProceed}>Next</button>
      </div>
      <p className="disclaimer">{onboardingCopy.disclaimer}</p>
    </div>
  );
}
