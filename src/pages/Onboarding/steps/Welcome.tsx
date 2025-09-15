import React from 'react';
import { OnboardingState } from '../../../data/onboardingTypes';
import { onboardingCopy } from '../copy';

interface WelcomeProps {
  data: OnboardingState;
  update: <K extends keyof OnboardingState>(key: K, value: OnboardingState[K]) => void;
  onNext: () => void;
  onSkip: () => void;
}

export function Welcome({ data, update, onNext, onSkip }: WelcomeProps) {
  return (
    <div className="onboarding-step">
      <h1>{onboardingCopy.header}</h1>
      <p>{onboardingCopy.subtext}</p>
      <button onClick={onNext}>Get started</button>
      <button onClick={onSkip}>{onboardingCopy.skip}</button>
      <p className="disclaimer">{onboardingCopy.disclaimer}</p>
    </div>
  );
}
