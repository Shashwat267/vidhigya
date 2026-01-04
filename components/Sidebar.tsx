
import React from 'react';
import { AppView } from '../types';
import { BookOpenIcon, MapPinIcon, ScaleIcon, ShieldCheckIcon, BriefcaseIcon, VidhigyaLogo } from './Icons';

interface SidebarProps {
  currentView: AppView;
  setView: (view: AppView) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  isDarkMode?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, setView, isOpen, setIsOpen, isDarkMode }) => {
  const menuItems = [
    { id: AppView.HOME, label: 'Home', icon: <ScaleIcon className="w-5 h-5" /> },
    { id: AppView.ADVISOR, label: 'Legal Companion', icon: <ShieldCheckIcon className="w-5 h-5" /> },
    { id: AppView.SIMPLIFIER, label: 'Vidhigya Decoder', icon: <BookOpenIcon className="w-5 h-5" /> },
    { id: AppView.LAWYER_FINDER, label: 'Find Advocates', icon: <MapPinIcon className="w-5 h-5" /> },
  ];

  return (
    <>
      {isOpen && (
        <div 
          className={`fixed inset-0 z-40 backdrop-blur-md lg:hidden ${isDarkMode ? 'bg-stone-950/60' : 'bg-stone-900/60'}`}
          onClick={() => setIsOpen(false)}
        />
      )}

      <div className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-80 text-stone-300 transform transition-all duration-500 cubic-bezier(0.16, 1, 0.3, 1)
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        flex flex-col border-r shadow-[20px_0_60px_-15px_rgba(0,0,0,0.3)]
        ${isDarkMode ? 'bg-stone-950 border-white/5' : 'bg-legal-deep border-white/5'}
      `}>
        <div className="p-10 border-b border-white/5 flex flex-col items-center gap-4 bg-gradient-to-b from-black/20 to-transparent">
          <div className="w-16 h-16 text-legal-accent drop-shadow-[0_0_15px_rgba(245,158,11,0.4)]">
            <VidhigyaLogo className="w-full h-full" />
          </div>
          <div className="text-center">
            <span className="block font-serif text-3xl font-bold tracking-tight text-white">Vidhigya</span>
            <span className="text-[10px] uppercase tracking-[0.4em] text-legal-accent/60 font-bold mt-1 block">Aam Aadmi AI</span>
          </div>
        </div>

        <nav className="flex-1 p-8 space-y-2 overflow-y-auto no-scrollbar">
          <p className="text-[10px] uppercase tracking-[0.3em] text-stone-500 font-bold mb-4 ml-2">Main Menu</p>
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setView(item.id);
                setIsOpen(false);
              }}
              className={`
                w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 group relative
                ${currentView === item.id 
                  ? 'bg-gradient-to-r from-legal-accent/10 to-transparent text-legal-accent' 
                  : 'hover:bg-white/5 hover:text-white'}
              `}
            >
              {currentView === item.id && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-8 bg-legal-accent rounded-r-full shadow-[0_0_10px_rgba(245,158,11,1)]" />
              )}
              <div className={`${currentView === item.id ? 'text-legal-accent scale-110' : 'text-stone-500 group-hover:text-stone-300'} transition-transform duration-300`}>
                {item.icon}
              </div>
              <span className={`font-semibold tracking-wide transition-all ${currentView === item.id ? 'translate-x-1' : ''}`}>
                {item.label}
              </span>
            </button>
          ))}
          
          <div className="pt-6 mt-6 border-t border-white/5">
             <button
              onClick={() => {
                setView(AppView.LAWYER_REGISTRATION);
                setIsOpen(false);
              }}
              className={`
                w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 group
                ${currentView === AppView.LAWYER_REGISTRATION 
                  ? 'bg-legal-accent text-legal-deep shadow-[0_10px_30px_-10px_rgba(245,158,11,0.5)]' 
                  : 'hover:bg-white/5 hover:text-white'}
              `}
            >
              <div className={`${currentView === AppView.LAWYER_REGISTRATION ? 'text-legal-deep' : 'text-stone-500 group-hover:text-stone-300'}`}>
                <BriefcaseIcon className="w-5 h-5" />
              </div>
              <span className="font-bold tracking-wide">Partner Portal</span>
            </button>
          </div>
        </nav>

        <div className="p-10 border-t border-white/5 text-center">
          <p className="font-serif italic text-sm text-legal-accent/40">"Satyameva Jayate"</p>
          <div className="mt-6 pt-6 border-t border-white/5">
            <p className="text-[10px] text-stone-600 uppercase tracking-widest font-bold">© 2024 Vidhigya AI</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
