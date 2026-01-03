import React from 'react';
import { AppView } from '../types';
import { BookOpenIcon, MapPinIcon, ScaleIcon, ShieldCheckIcon, BriefcaseIcon, VidhigyaLogo } from './Icons';

interface SidebarProps {
  currentView: AppView;
  setView: (view: AppView) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, setView, isOpen, setIsOpen }) => {
  const menuItems = [
    { id: AppView.HOME, label: 'Home', icon: <ScaleIcon className="w-5 h-5" /> },
    { id: AppView.ADVISOR, label: 'Legal Companion', icon: <ShieldCheckIcon className="w-5 h-5" /> },
    { id: AppView.SIMPLIFIER, label: 'Vidhigya Decoder', icon: <BookOpenIcon className="w-5 h-5" /> },
    { id: AppView.LAWYER_FINDER, label: 'Find Advocates', icon: <MapPinIcon className="w-5 h-5" /> },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-20 bg-stone-900/50 backdrop-blur-sm lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-30
        w-72 bg-legal-dark text-stone-300 transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        flex flex-col border-r border-stone-800 shadow-2xl
      `}>
        <div className="p-8 border-b border-stone-800 flex items-center gap-4">
          <div className="w-10 h-10 text-legal-accent">
            <VidhigyaLogo className="w-full h-full" />
          </div>
          <span className="font-serif text-2xl font-bold tracking-tight text-stone-100">Vidhigya</span>
        </div>

        <nav className="flex-1 p-6 space-y-3">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setView(item.id);
                setIsOpen(false);
              }}
              className={`
                w-full flex items-center gap-4 px-4 py-4 rounded-xl transition-all duration-200 group
                ${currentView === item.id 
                  ? 'bg-stone-800 text-legal-accent shadow-inner' 
                  : 'hover:bg-stone-800/50 hover:text-stone-100'}
              `}
            >
              <div className={`${currentView === item.id ? 'text-legal-accent' : 'text-stone-500 group-hover:text-stone-300'}`}>
                {item.icon}
              </div>
              <span className="font-medium tracking-wide">{item.label}</span>
            </button>
          ))}
          
          <div className="pt-6 mt-6 border-t border-stone-800">
             <button
              onClick={() => {
                setView(AppView.LAWYER_REGISTRATION);
                setIsOpen(false);
              }}
              className={`
                w-full flex items-center gap-4 px-4 py-4 rounded-xl transition-all duration-200 group
                ${currentView === AppView.LAWYER_REGISTRATION 
                  ? 'bg-stone-800 text-legal-accent shadow-inner' 
                  : 'hover:bg-stone-800/50 hover:text-stone-100'}
              `}
            >
              <div className={`${currentView === AppView.LAWYER_REGISTRATION ? 'text-legal-accent' : 'text-stone-500 group-hover:text-stone-300'}`}>
                <BriefcaseIcon className="w-5 h-5" />
              </div>
              <span className="font-medium tracking-wide">Partner Portal</span>
            </button>
          </div>
        </nav>

        <div className="p-8 border-t border-stone-800 text-xs text-stone-500">
          <p className="font-serif italic opacity-70">"Satyameva Jayate"</p>
          <div className="mt-4 pt-4 border-t border-stone-800/50">
            <p>© 2024 Vidhigya AI.</p>
            <p className="mt-1">Empowering India.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
