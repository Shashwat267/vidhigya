
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import HomeView from './components/HomeView';
import AdvisorView from './components/AdvisorView';
import SimplifierView from './components/SimplifierView';
import LawyerFinderView from './components/LawyerFinderView';
import LawyerRegistrationView from './components/LawyerRegistrationView';
import { AppView } from './types';
import { MenuIcon, VidhigyaLogo, SunIcon, MoonIcon, ChevronLeftIcon } from './components/Icons';

function App() {
  const [currentView, setCurrentView] = useState<AppView>(AppView.HOME);
  const [viewHistory, setViewHistory] = useState<AppView[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark';
    }
    return false;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const navigateTo = (view: AppView) => {
    if (view !== currentView) {
      setViewHistory(prev => [...prev, currentView]);
      setCurrentView(view);
    }
    setIsSidebarOpen(false);
  };

  const handleBack = () => {
    if (viewHistory.length > 0) {
      const prevView = viewHistory[viewHistory.length - 1];
      setViewHistory(prev => prev.slice(0, -1));
      setCurrentView(prevView);
    }
  };

  const renderView = () => {
    switch (currentView) {
      case AppView.HOME:
        return <HomeView setView={navigateTo} isDarkMode={isDarkMode} />;
      case AppView.ADVISOR:
        return <AdvisorView isDarkMode={isDarkMode} />;
      case AppView.SIMPLIFIER:
        return <SimplifierView isDarkMode={isDarkMode} />;
      case AppView.LAWYER_FINDER:
        return <LawyerFinderView isDarkMode={isDarkMode} />;
      case AppView.LAWYER_REGISTRATION:
        return <LawyerRegistrationView setView={navigateTo} isDarkMode={isDarkMode} />;
      default:
        return <HomeView setView={navigateTo} isDarkMode={isDarkMode} />;
    }
  };

  return (
    <div className={`flex h-screen w-screen font-sans overflow-hidden transition-colors duration-500 ${isDarkMode ? 'dark bg-stone-950 text-stone-100' : 'bg-legal-paper text-legal-deep'}`}>
      <Sidebar 
        currentView={currentView} 
        setView={navigateTo} 
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        isDarkMode={isDarkMode}
      />

      <main className="flex-1 flex flex-col h-full relative w-full transition-all duration-300">
        {/* Global Persistent Header */}
        <header className="h-20 glass-header border-b border-stone-200 dark:border-stone-800 flex items-center px-6 md:px-10 justify-between shrink-0 z-30 shadow-sm transition-colors duration-500">
          <div className="flex items-center gap-6">
            {currentView !== AppView.HOME && viewHistory.length > 0 && (
              <button 
                onClick={handleBack}
                className="p-3 text-stone-500 hover:text-legal-accent dark:text-stone-400 dark:hover:text-legal-accent bg-stone-100/50 dark:bg-stone-900/50 rounded-2xl transition-all hover:translate-x-[-4px]"
                title="Go Back"
              >
                <ChevronLeftIcon className="w-5 h-5" />
              </button>
            )}

            <div className="flex items-center gap-4 cursor-pointer" onClick={() => navigateTo(AppView.HOME)}>
               <div className="w-10 h-10 text-legal-accent drop-shadow-sm">
                 <VidhigyaLogo className="w-full h-full" />
               </div>
               <div className="flex flex-col">
                  <span className="font-serif font-bold dark:text-stone-50 text-legal-deep text-2xl tracking-tight leading-none">Vidhigya</span>
                  <span className="text-[9px] uppercase tracking-[0.3em] text-legal-accent font-bold mt-1">Aam Aadmi AI</span>
               </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2 md:gap-4">
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-3 text-stone-500 hover:text-legal-accent dark:hover:text-legal-accent bg-stone-100 dark:bg-stone-900 rounded-2xl transition-all hover:scale-110"
              title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDarkMode ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
            </button>
            
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-3 text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-2xl transition-colors"
            >
              <MenuIcon />
            </button>
          </div>
        </header>

        {/* View Content */}
        <div className="flex-1 overflow-hidden relative">
          {renderView()}
        </div>
      </main>
    </div>
  );
}

export default App;
