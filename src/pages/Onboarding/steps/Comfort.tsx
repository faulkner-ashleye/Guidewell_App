import React from 'react';
import { OnboardingState, Comfort as ComfortType } from '../../../data/onboardingTypes';
import { onboardingCopy } from '../copy';

interface ComfortProps {
  data: OnboardingState;
  update: <K extends keyof OnboardingState>(key: K, value: OnboardingState[K]) => void;
  onNext: () => void;
  onBack: () => void;
  onSkip: () => void;
}

const comfortOptions: { value: ComfortType; label: string }[] = [
  { value: 'beginner', label: 'Beginner' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'confident', label: 'Confident' }
];

export function Comfort({ data, update, onNext, onBack, onSkip }: ComfortProps) {
  const canProceed = !!data.comfort;

  return (
    <div className="onboarding-step">
      <h1>What's your comfort level?</h1>
      <p>How comfortable are you with different types of financial strategies?</p>
      
      <div>
        {comfortOptions.map(option => (
          <label key={option.value}>
            <input
              type="radio"
              name="comfort"
              value={option.value}
              checked={data.comfort === option.value}
              onChange={() => update('comfort', option.value)}
            />
            {option.label}
          </label>
        ))}
      </div>

      <div>
        <button onClick={onBack}>Back</button>
        <button onClick={onSkip}>{onboardingCopy.skip}</button>
        <button onClick={onNext} disabled={!canProceed}>Next</button>
      </div>
      <p className="disclaimer">{onboardingCopy.disclaimer}</p>
    </div>
  );
}
