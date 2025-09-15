import React from 'react';
import { OnboardingState, Timeline as TimelineType } from '../../../data/onboardingTypes';
import { onboardingCopy } from '../copy';

interface TimelineProps {
  data: OnboardingState;
  update: <K extends keyof OnboardingState>(key: K, value: OnboardingState[K]) => void;
  onNext: () => void;
  onBack: () => void;
  onSkip: () => void;
}

const timelineOptions: { value: TimelineType; label: string }[] = [
  { value: 'short', label: 'Short (1–2 years)' },
  { value: 'mid', label: 'Mid (3–5 years)' },
  { value: 'long', label: 'Long (5+ years)' }
];

export function Timeline({ data, update, onNext, onBack, onSkip }: TimelineProps) {
  const canProceed = !!data.timeline;

  return (
    <div className="onboarding-step">
      <h1>What's your timeline?</h1>
      <p>How long are you planning to work on these goals?</p>
      
      <div>
        {timelineOptions.map(option => (
          <label key={option.value}>
            <input
              type="radio"
              name="timeline"
              value={option.value}
              checked={data.timeline === option.value}
              onChange={() => update('timeline', option.value)}
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
