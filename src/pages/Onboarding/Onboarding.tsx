import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { OnboardingState } from '../../data/onboardingTypes';
import { useAppState } from '../../state/AppStateContext';
import { Welcome } from './steps/Welcome';
import { Goals } from './steps/Goals';
import { Timeline } from './steps/Timeline';
import { Comfort } from './steps/Comfort';
import Connect from './steps/Connect';
import { Finish } from './steps/Finish';
import './Onboarding.css';

type OnboardingStep = 'welcome' | 'goals' | 'timeline' | 'comfort' | 'connect' | 'finish';

const stepOrder: OnboardingStep[] = ['welcome', 'goals', 'timeline', 'comfort', 'connect', 'finish'];

export function Onboarding() {
  // Onboarding flow controller
  const [currentStep, setCurrentStep] = useState<OnboardingStep>('welcome');
  const [data, setData] = useState<OnboardingState>({ mainGoals: [] });
  const navigate = useNavigate();
  const { setUserProfile, accounts } = useAppState();

  const update = <K extends keyof OnboardingState>(key: K, value: OnboardingState[K]) =>
    setData(prev => ({ ...prev, [key]: value }));

  const currentStepIndex = stepOrder.indexOf(currentStep);
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === stepOrder.length - 1;

  const handleNext = () => {
    if (isLastStep) {
      navigate('/');
    } else {
      const nextStep = stepOrder[currentStepIndex + 1];
      setCurrentStep(nextStep);
    }
  };

  const handleBack = () => {
    if (!isFirstStep) {
      const prevStep = stepOrder[currentStepIndex - 1];
      setCurrentStep(prevStep);
    }
  };

  const handleSkip = () => {
    navigate('/');
  };

  const handleFinish = (finalData: OnboardingState) => {
    setUserProfile({
      ageRange: finalData.ageRange,
      mainGoals: finalData.mainGoals,
      topPriority: finalData.topPriority,
      timeline: finalData.timeline,
      comfortLevel: finalData.comfort
    });
    navigate('/');
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'welcome':
        return <Welcome data={data} update={update} onNext={handleNext} onSkip={handleSkip} />;
      case 'goals':
        return <Goals data={data} update={update} onNext={handleNext} onBack={handleBack} onSkip={handleSkip} accounts={accounts} />;
      case 'timeline':
        return <Timeline data={data} update={update} onNext={handleNext} onBack={handleBack} onSkip={handleSkip} />;
      case 'comfort':
        return <Comfort data={data} update={update} onNext={handleNext} onBack={handleBack} onSkip={handleSkip} />;
      case 'connect':
        return <Connect onNext={handleNext} onBack={handleBack} />;
      case 'finish':
        return <Finish data={data} update={update} onFinish={handleFinish} onBack={handleBack} />;
      default:
        return <Welcome data={data} update={update} onNext={handleNext} onSkip={handleSkip} />;
    }
  };

  return (
    <div className="onboarding">
      <div className="onboarding-content">
        {renderCurrentStep()}
      </div>
    </div>
  );
}