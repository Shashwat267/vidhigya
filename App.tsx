import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import HomeView from './components/HomeView';
import AdvisorView from './components/AdvisorView';
import SimplifierView from './components/SimplifierView';
import LawyerFinderView from './components/LawyerFinderView';
import LawyerRegistrationView from './components/LawyerRegistrationView';
import { AppView } from './types';
import { MenuIcon, VidhigyaLogo } from './components/Icons';

function App() {
  const [currentView, setCurrentView] = useState<AppView>(AppView.HOME);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const renderView = () => {
    switch (currentView) {
      case AppView.HOME:
        return <HomeView setView={setCurrentView} />;
      case AppView.ADVISOR:
        return <AdvisorView />;
      case AppView.SIMPLIFIER:
        return <SimplifierView />;
      case AppView.LAWYER_FINDER:
        return <LawyerFinderView />;
      case AppView.LAWYER_REGISTRATION:
        return <LawyerRegistrationView />;
      default:
        return <HomeView setView={setCurrentView} />;
    }
  };

  return (
    <div className="flex h-screen w-screen bg-legal-paper font-sans text-legal-dark overflow-hidden">
      <Sidebar 
        currentView={currentView} 
        setView={setCurrentView} 
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />

      <main className="flex-1 flex flex-col h-full relative w-full transition-all duration-300">
        {/* Mobile Header */}
        <div className="lg:hidden h-16 bg-white border-b border-stone-200 flex items-center px-4 justify-between shrink-0 shadow-sm z-20">
          <div className="flex items-center gap-2">
             <div className="w-8 h-8 text-legal-accent">
               <VidhigyaLogo className="w-full h-full" />
             </div>
             <span className="font-serif font-bold text-legal-dark text-lg">Vidhigya</span>
          </div>
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 text-stone-600 hover:bg-stone-100 rounded-lg transition-colors"
          >
            <MenuIcon />
          </button>
        </div>

        {/* View Content */}
        <div className="flex-1 overflow-hidden relative">
          {renderView()}
        </div>
      </main>
    </div>
  );
}

export default App;
