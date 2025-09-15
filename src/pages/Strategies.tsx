import React, { useState } from 'react';
import { Card } from '../components/Card';
import { Disclaimer } from '../components/Disclaimer';
import { LineChart } from '../components/Charts';
import { Modal } from '../components/Modal';
import { Input } from '../components/Inputs';
import { Chip, ChipGroup } from '../components/Chips';
import { strategyPresets } from '../data/presets';
import { StrategyConfig } from '../data/types';
import { useStrategyEngine } from '../state/useStrategyEngine';
import { formatCurrency, formatMonthsToYears } from '../utils/format';
import './Strategies.css';

type StepperStep = 'scope' | 'preset' | 'timeline' | 'allocation' | 'results';

export function Strategies() {
  const [currentStep, setCurrentStep] = useState<StepperStep>('scope');
  const [showBuildModal, setShowBuildModal] = useState(false);
  const [strategyConfig, setStrategyConfig] = useState<Partial<StrategyConfig>>({
    monthlyContribution: 500,
    timeline: 24,
    allocation: { debt: 40, savings: 20, investment: 40 },
    riskLevel: 'medium'
  });
  
  const { calculateStrategyResult, generateNarrative } = useStrategyEngine();

  const handleNextStep = () => {
    const steps: StepperStep[] = ['scope', 'preset', 'timeline', 'allocation', 'results'];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1]);
    }
  };

  const handlePrevStep = () => {
    const steps: StepperStep[] = ['scope', 'preset', 'timeline', 'allocation', 'results'];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1]);
    }
  };

  const handlePresetSelect = (preset: typeof strategyPresets[0]) => {
    setStrategyConfig({
      ...strategyConfig,
      name: preset.name,
      type: preset.type,
      timeline: preset.defaultTimeline,
      allocation: preset.defaultAllocation,
      riskLevel: preset.riskLevel
    });
  };

  const renderStepperContent = () => {
    switch (currentStep) {
      case 'scope':
        return (
          <div className="stepper-content">
            <h3>Define Your Scope</h3>
            <p>What financial area would you like to focus on?</p>
            <ChipGroup>
              <Chip label="All" variant="default" />
              <Chip label="Debt" variant="warning" />
              <Chip label="Savings" variant="success" />
              <Chip label="Investments" variant="default" />
            </ChipGroup>
          </div>
        );
      
      case 'preset':
        return (
          <div className="stepper-content">
            <h3>Choose a Strategy</h3>
            <p>Select a preset strategy or build your own:</p>
            <div className="preset-grid">
              {strategyPresets.map((preset) => (
                <Card 
                  key={preset.id} 
                  variant="outlined" 
                  onClick={() => handlePresetSelect(preset)}
                  className="preset-card"
                >
                  <h4>{preset.name}</h4>
                  <p>{preset.description}</p>
                  <div className="preset-details">
                    <span className="preset-timeline">{formatMonthsToYears(preset.defaultTimeline)}</span>
                    <span className="preset-risk">{preset.riskLevel}</span>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        );
      
      case 'timeline':
        return (
          <div className="stepper-content">
            <h3>Set Your Timeline</h3>
            <p>How long do you want to follow this strategy?</p>
            <Input
              label="Timeline (months)"
              type="number"
              value={strategyConfig.timeline || 24}
              onChange={(e) => setStrategyConfig({
                ...strategyConfig,
                timeline: parseInt(e.target.value) || 24
              })}
            />
            <Input
              label="Monthly Contribution"
              type="number"
              value={strategyConfig.monthlyContribution || 500}
              onChange={(e) => setStrategyConfig({
                ...strategyConfig,
                monthlyContribution: parseInt(e.target.value) || 500
              })}
            />
          </div>
        );
      
      case 'allocation':
        return (
          <div className="stepper-content">
            <h3>Allocate Your Money</h3>
            <p>How would you like to distribute your monthly contribution?</p>
            <div className="allocation-inputs">
              <Input
                label="Debt Payoff (%)"
                type="number"
                value={strategyConfig.allocation?.debt || 40}
                onChange={(e) => setStrategyConfig({
                  ...strategyConfig,
                  allocation: {
                    ...strategyConfig.allocation!,
                    debt: parseInt(e.target.value) || 0
                  }
                })}
              />
              <Input
                label="Savings (%)"
                type="number"
                value={strategyConfig.allocation?.savings || 20}
                onChange={(e) => setStrategyConfig({
                  ...strategyConfig,
                  allocation: {
                    ...strategyConfig.allocation!,
                    savings: parseInt(e.target.value) || 0
                  }
                })}
              />
              <Input
                label="Investment (%)"
                type="number"
                value={strategyConfig.allocation?.investment || 40}
                onChange={(e) => setStrategyConfig({
                  ...strategyConfig,
                  allocation: {
                    ...strategyConfig.allocation!,
                    investment: parseInt(e.target.value) || 0
                  }
                })}
              />
            </div>
          </div>
        );
      
      case 'results':
        const result = calculateStrategyResult(strategyConfig as StrategyConfig);
        const narrative = generateNarrative(strategyConfig as StrategyConfig, result);
        
        return (
          <div className="stepper-content">
            <h3>Your Strategy Results</h3>
            <div className="results-summary">
              <div className="result-item">
                <span className="result-label">Total Contribution</span>
                <span className="result-value">{formatCurrency(result.totalContribution)}</span>
              </div>
              <div className="result-item">
                <span className="result-label">Projected Value</span>
                <span className="result-value">{formatCurrency(result.projectedValue)}</span>
              </div>
              <div className="result-item">
                <span className="result-label">Growth</span>
                <span className="result-value">{formatCurrency(result.growth)}</span>
              </div>
            </div>
            
            <LineChart 
              title="Projected Growth Over Time"
              data={result.monthlyBreakdown.map(item => item.total)}
              labels={['6M', '1Y', '2Y', '3Y', '4Y', '5Y']}
            />
            
            <div className="strategy-narrative">
              <h4>Strategy Overview</h4>
              <p>{narrative}</p>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="strategies">
      <div className="strategies-header">
        <h1 className="strategies-title">Financial Strategies</h1>
        <p className="strategies-subtitle">
          Explore different approaches to managing your finances
        </p>
      </div>

      <Disclaimer />

      {/* Baseline Snapshot Section */}
      <Card className="baseline-section">
        <h3>Your Current Financial Snapshot</h3>
        <div className="baseline-placeholder">
          <div className="baseline-chart">
            <LineChart 
              title="Current Allocation"
              data={[30, 25, 45]}
              labels={['Debt', 'Savings', 'Investment']}
            />
          </div>
          <div className="baseline-stats">
            <div className="stat-item">
              <span className="stat-label">Total Debt</span>
              <span className="stat-value">$15,000</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Emergency Fund</span>
              <span className="stat-value">$2,500</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Investments</span>
              <span className="stat-value">$8,000</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Strategy Cards */}
      <div className="strategy-cards">
        <Card variant="elevated" className="strategy-card recommended">
          <div className="strategy-card-content">
            <div className="strategy-card-icon">⭐</div>
            <h3>Recommended Strategy</h3>
            <p>Based on your profile, we suggest starting with a balanced approach that focuses on building your emergency fund while paying down high-interest debt.</p>
            <button className="strategy-button">View Recommendation</button>
          </div>
        </Card>

        <Card 
          variant="elevated" 
          className="strategy-card build-your-own"
          onClick={() => setShowBuildModal(true)}
        >
          <div className="strategy-card-content">
            <div className="strategy-card-icon">🛠️</div>
            <h3>Build Your Own Strategy</h3>
            <p>Create a custom financial strategy tailored to your specific goals and risk tolerance.</p>
            <button className="strategy-button">Start Building</button>
          </div>
        </Card>
      </div>

      {/* Build Your Own Modal */}
      <Modal
        isOpen={showBuildModal}
        onClose={() => setShowBuildModal(false)}
        title="Build Your Strategy"
        size="large"
      >
        <div className="stepper">
          <div className="stepper-header">
            <div className="stepper-steps">
              {['scope', 'preset', 'timeline', 'allocation', 'results'].map((step, index) => (
                <div 
                  key={step}
                  className={`stepper-step ${currentStep === step ? 'active' : ''} ${index < ['scope', 'preset', 'timeline', 'allocation', 'results'].indexOf(currentStep) ? 'completed' : ''}`}
                >
                  <div className="stepper-step-number">{index + 1}</div>
                  <div className="stepper-step-label">{step.charAt(0).toUpperCase() + step.slice(1)}</div>
                </div>
              ))}
            </div>
          </div>
          
          {renderStepperContent()}
          
          <div className="stepper-actions">
            {currentStep !== 'scope' && (
              <button className="stepper-button secondary" onClick={handlePrevStep}>
                Previous
              </button>
            )}
            {currentStep !== 'results' && (
              <button className="stepper-button primary" onClick={handleNextStep}>
                Next
              </button>
            )}
            {currentStep === 'results' && (
              <button className="stepper-button primary" onClick={() => setShowBuildModal(false)}>
                Complete
              </button>
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
}
