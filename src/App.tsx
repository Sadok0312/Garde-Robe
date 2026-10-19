/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { LandingPage } from './components/LandingPage';
import { AppView } from './components/AppView';
import { BubbleGuideModal } from './components/BubbleGuideModal';
import { LoginModal } from './components/LoginModal';

function MainRouter() {
  const { currentView } = useApp();

  return (
    <div className="min-h-screen bg-[#F4EFE6] text-[#2B2F2E] flex flex-col font-['Figtree',sans-serif]">
      <Navbar />

      <main className="flex-1">
        {currentView === 'site' && <LandingPage />}
        {currentView === 'app' && <AppView />}
        {currentView === 'guide' && <BubbleGuideModal />}
      </main>

      <LoginModal />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainRouter />
    </AppProvider>
  );
}
