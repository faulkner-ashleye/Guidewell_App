import React from 'react';
import { Link } from 'react-router-dom';
import { useAppState } from '../../state/AppStateContext';
import { getPrimarySavingsGoal, getTotalDebt } from '../../state/selectors';
import { formatCurrency } from '../../utils/format';
import SupabaseConnectionTest from '../../components/SupabaseConnectionTest';
import './Home.css';

export function Home() {
  const { accounts, userProfile } = useAppState();
  
  const primaryGoal = getPrimarySavingsGoal(accounts);
  const totalDebt = getTotalDebt(accounts);

  return (
    <div className="home">
      {/* Greeting Section */}
      <div className="greeting">
        {userProfile?.topPriority ? (
          <h1>Hi there — let's focus on: {userProfile.topPriority}</h1>
        ) : (
          <h1>Hi there — ready to explore your money?</h1>
        )}
      </div>

      {/* Snapshot Summary Section */}
      <div className="snapshot-summary">
        <div className="snapshot-item">
          <span className="snapshot-label">Primary goal progress:</span>
          <span className="snapshot-value">
            {primaryGoal ? `${primaryGoal.percent}%` : 'No goals yet'}
          </span>
        </div>
        
        <div className="snapshot-item">
          <span className="snapshot-label">Total debt:</span>
          <span className="snapshot-value">
            {totalDebt > 0 ? formatCurrency(totalDebt) : 'No debt accounts'}
          </span>
        </div>
      </div>

      {/* Supabase Connection Test */}
      <SupabaseConnectionTest />

      {/* Quick Nudge Section */}
      <div className="quick-nudge">
        <h2>What would you like to do?</h2>
        
        <div className="cta-buttons">
          <Link to="/strategies" className="cta-button primary">
            Try a Recommended Strategy
          </Link>
          
          <Link to="/strategies/build" className="cta-button secondary">
            Build Your Own Strategy
          </Link>
        </div>
      </div>
    </div>
  );
}
