import React from 'react';
import { AppView } from '../types';
import { ShieldCheckIcon, BookOpenIcon, MapPinIcon, VidhigyaLogo } from './Icons';

interface HomeViewProps {
  setView: (view: AppView) => void;
}

const HomeView: React.FC<HomeViewProps> = ({ setView }) => {
  return (
    <div className="flex flex-col h-full bg-legal-paper overflow-y-auto">
      <div className="flex-1 flex flex-col items-center justify-center p-8 lg:p-12 text-center max-w-5xl mx-auto w-full">
        
        <div className="mb-10 animate-fade-in-up">
          <div className="w-24 h-24 mx-auto text-legal-accent mb-8 drop-shadow-lg">
             <VidhigyaLogo className="w-full h-full" />
          </div>
          
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-legal-dark mb-6 leading-tight tracking-tight">
            Vidhigya <br/>
            <span className="text-3xl md:text-4xl text-stone-500 italic font-normal">Your Trusted Legal Companion</span>
          </h1>
          
          <p className="text-lg md:text-xl text-stone-600 mb-12 max-w-2xl mx-auto leading-relaxed font-light">
            Empowering every Indian with knowledge of the <span className="font-semibold text-legal-dark">Constitution</span>. <br/>
            Simple advice. Unbiased guidance. Trusted connections.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 w-full max-w-6xl">
          <button 
            onClick={() => setView(AppView.ADVISOR)}
            className="group relative bg-white p-8 rounded-2xl border border-stone-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-left overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-stone-50 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
            <div className="relative z-10">
              <div className="w-14 h-14 bg-stone-100 rounded-xl flex items-center justify-center mb-6 text-legal-dark group-hover:bg-legal-dark group-hover:text-legal-accent transition-colors">
                <ShieldCheckIcon className="w-7 h-7" />
              </div>
              <h3 className="font-serif font-bold text-2xl text-legal-dark mb-3">Legal Companion</h3>
              <p className="text-stone-500 leading-relaxed">Chat with Vidhigya to understand your rights in simple, reassuring language.</p>
            </div>
          </button>

          <button 
            onClick={() => setView(AppView.SIMPLIFIER)}
            className="group relative bg-white p-8 rounded-2xl border border-stone-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-left overflow-hidden"
          >
             <div className="absolute top-0 right-0 w-24 h-24 bg-stone-50 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
             <div className="relative z-10">
              <div className="w-14 h-14 bg-stone-100 rounded-xl flex items-center justify-center mb-6 text-legal-dark group-hover:bg-legal-dark group-hover:text-legal-accent transition-colors">
                <BookOpenIcon className="w-7 h-7" />
              </div>
              <h3 className="font-serif font-bold text-2xl text-legal-dark mb-3">Vidhigya Decoder</h3>
              <p className="text-stone-500 leading-relaxed">Confused by legal papers? Upload them here for a plain English explanation.</p>
            </div>
          </button>

          <button 
            onClick={() => setView(AppView.LAWYER_FINDER)}
            className="group relative bg-white p-8 rounded-2xl border border-stone-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-left overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-stone-50 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
            <div className="relative z-10">
              <div className="w-14 h-14 bg-stone-100 rounded-xl flex items-center justify-center mb-6 text-legal-dark group-hover:bg-legal-dark group-hover:text-legal-accent transition-colors">
                <MapPinIcon className="w-7 h-7" />
              </div>
              <h3 className="font-serif font-bold text-2xl text-legal-dark mb-3">Find Advocates</h3>
              <p className="text-stone-500 leading-relaxed">Connect with trusted lawyers and legal aid clinics in your city.</p>
            </div>
          </button>
        </div>
      </div>
      
      <footer className="p-8 text-center text-stone-400 text-sm border-t border-stone-200/50 bg-white/50 backdrop-blur-sm">
        <p>Vidhigya is an educational tool. Information provided is not professional legal advice.</p>
      </footer>
    </div>
  );
};

export default HomeView;
