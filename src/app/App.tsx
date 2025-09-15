import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppStateProvider } from '../state/AppStateContext';
import { NavBar } from '../components/NavBar';
import { Home } from '../pages/Home/Home';
import { Strategies } from '../pages/Strategies';
import { Goals } from '../pages/Goals';
import { Settings } from '../pages/Settings/Settings';
import { Onboarding } from '../pages/Onboarding/Onboarding';
import './App.css';

function App() {
  return (
    <AppStateProvider>
      <Router>
        <div className="app">
          <main className="app-main">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/strategies" element={<Strategies />} />
              <Route path="/strategies/build" element={<Strategies />} />
              <Route path="/goals" element={<Goals />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/onboarding" element={<Onboarding />} />
            </Routes>
          </main>
          <NavBar />
        </div>
      </Router>
    </AppStateProvider>
  );
}

export default App;
