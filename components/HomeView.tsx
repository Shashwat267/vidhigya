
import React, { useEffect, useState } from 'react';
import { AppView, Lawyer } from '../types';
import { ShieldCheckIcon, BookOpenIcon, MapPinIcon, StarIcon, BriefcaseIcon } from './Icons';
import { getRegisteredLawyers } from '../services/lawyerService';

interface HomeViewProps {
  setView: (view: AppView) => void;
  isDarkMode?: boolean;
}

const HomeView: React.FC<HomeViewProps> = ({ setView, isDarkMode }) => {
  const [featuredLawyers, setFeaturedLawyers] = useState<Lawyer[]>([]);

  useEffect(() => {
    // Get the top 3 lawyers (usually Elite tier) to feature on the dashboard
    const all = getRegisteredLawyers();
    setFeaturedLawyers(all.slice(0, 3));
  }, []);

  return (
    <div className={`flex flex-col h-full overflow-y-auto overflow-x-hidden transition-colors duration-500 ${isDarkMode ? 'bg-stone-950' : 'bg-legal-paper'}`}>
      {/* Hero Section */}
      <div className="relative pt-16 pb-20 px-8 lg:px-12 text-center max-w-7xl mx-auto w-full">
        {/* Background Decorative Element */}
        <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-[140%] h-[600px] rounded-[100%] blur-3xl -z-10 pointer-events-none transition-opacity duration-1000 ${isDarkMode ? 'bg-gradient-to-b from-legal-accent/10 to-transparent opacity-20' : 'bg-gradient-to-b from-legal-deep to-transparent opacity-[0.03]'}`}></div>

        <div className="animate-fade-in-up">
          <div className={`inline-flex items-center gap-3 px-4 py-2 rounded-full mb-8 border transition-all ${isDarkMode ? 'bg-stone-900 border-legal-accent/30' : 'bg-legal-light/40 border-legal-accent/20'}`}>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-legal-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-legal-accent"></span>
            </span>
            <span className={`text-[10px] font-bold uppercase tracking-[0.2em] ${isDarkMode ? 'text-legal-accent' : 'text-legal-gold'}`}>Constitution of India Expert</span>
          </div>
          
          <div className="mb-12">
             <span className={`font-serif italic text-2xl ${isDarkMode ? 'text-stone-500' : 'text-stone-400'}`}>Introducing</span>
             <h1 className={`text-6xl md:text-8xl lg:text-9xl font-serif font-bold tracking-tighter mt-2 transition-colors ${isDarkMode ? 'text-stone-50' : 'text-legal-deep'}`}>
                Vidhigya<span className="text-legal-accent">.</span>
             </h1>
          </div>
          
          <p className={`text-xl md:text-2xl mb-4 max-w-3xl mx-auto leading-relaxed font-light transition-colors ${isDarkMode ? 'text-stone-400' : 'text-stone-500'}`}>
            An AI-powered legal companion that breaks down complex jargon, identifies your fundamental rights, and connects you with trusted local advocates.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-3 gap-8 mt-16 w-full animate-fade-in-up delay-300">
          {[
            { 
              view: AppView.ADVISOR, 
              title: "Legal Companion", 
              desc: "Deep constitutional reasoning for your legal queries.", 
              icon: <ShieldCheckIcon className="w-8 h-8" />,
              accent: "bg-amber-500"
            },
            { 
              view: AppView.SIMPLIFIER, 
              title: "Vidhigya Decoder", 
              desc: "Upload files for plain English legal summaries.", 
              icon: <BookOpenIcon className="w-8 h-8" />,
              accent: "bg-emerald-600"
            },
            { 
              view: AppView.LAWYER_FINDER, 
              title: "Find Advocates", 
              desc: "Connect with verified local legal representation.", 
              icon: <MapPinIcon className="w-8 h-8" />,
              accent: "bg-blue-600"
            }
          ].map((feature, i) => (
            <button 
              key={i}
              onClick={() => setView(feature.view)}
              className={`group backdrop-blur-sm p-10 rounded-[32px] border transition-all duration-500 text-left overflow-hidden relative ${isDarkMode ? 'bg-stone-900/50 border-stone-800 hover:border-legal-accent/30 hover:bg-stone-900 shadow-none hover:shadow-2xl hover:shadow-black' : 'bg-white/70 border-stone-200 hover:border-legal-accent/30 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)]'}`}
            >
              <div className={`absolute top-0 right-0 w-32 h-32 ${feature.accent} opacity-[0.03] rounded-bl-full -mr-8 -mt-8 group-hover:opacity-[0.08] transition-opacity`}></div>
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 transition-all duration-500 rotate-3 group-hover:rotate-0 ${isDarkMode ? 'bg-stone-800 text-legal-accent group-hover:bg-legal-accent group-hover:text-stone-950' : 'bg-stone-100 text-legal-deep group-hover:bg-legal-deep group-hover:text-legal-accent'}`}>
                {feature.icon}
              </div>
              <h3 className={`font-serif font-bold text-2xl mb-4 ${isDarkMode ? 'text-stone-50' : 'text-legal-deep'}`}>{feature.title}</h3>
              <p className={`leading-relaxed text-sm font-medium ${isDarkMode ? 'text-stone-500' : 'text-stone-500'}`}>{feature.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Registered Advocates Dashboard Section */}
      <section className={`py-24 px-8 lg:px-12 border-t transition-colors ${isDarkMode ? 'bg-stone-900/20 border-stone-800' : 'bg-stone-50 border-stone-200'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-2 h-2 rounded-full bg-legal-accent animate-pulse"></div>
                <h2 className={`text-sm font-bold uppercase tracking-[0.3em] ${isDarkMode ? 'text-legal-accent' : 'text-legal-gold'}`}>Expert Network</h2>
              </div>
              <h3 className={`text-4xl font-serif font-bold ${isDarkMode ? 'text-stone-50' : 'text-legal-deep'}`}>Verified Legal Partners</h3>
            </div>
            <button 
              onClick={() => setView(AppView.LAWYER_FINDER)}
              className={`px-8 py-4 rounded-xl font-bold border transition-all hover:scale-105 active:scale-95 ${isDarkMode ? 'bg-stone-900 border-stone-800 text-stone-300 hover:bg-stone-800' : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-100'}`}
            >
              View Full Directory
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredLawyers.map((lawyer) => (
              <div 
                key={lawyer.id}
                className={`group p-8 rounded-[40px] border transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 relative overflow-hidden ${isDarkMode ? 'bg-stone-950 border-stone-800 hover:border-legal-accent/50' : 'bg-white border-stone-200 hover:border-legal-accent/50 shadow-sm'}`}
              >
                <div className={`absolute top-0 right-0 w-24 h-24 rounded-bl-full transition-opacity opacity-[0.05] group-hover:opacity-[0.15] ${lawyer.subscriptionTier === 'Elite' ? 'bg-legal-gold' : 'bg-stone-400'}`}></div>
                
                <div className="flex items-center gap-6 mb-8 relative z-10">
                  <div className="relative">
                    <img 
                      src={lawyer.imageUrl} 
                      alt={lawyer.name} 
                      className={`w-16 h-16 rounded-2xl object-cover border-2 shadow-sm ${isDarkMode ? 'border-stone-800' : 'border-white'}`}
                    />
                    {lawyer.subscriptionTier === 'Elite' && (
                      <div className="absolute -top-2 -right-2 bg-legal-accent text-white p-1 rounded-full shadow-sm border-2 border-white">
                        <StarIcon className="w-3 h-3" filled />
                      </div>
                    )}
                  </div>
                  <div>
                    <h4 className={`font-bold text-lg leading-tight group-hover:text-legal-accent transition-colors ${isDarkMode ? 'text-stone-100' : 'text-legal-deep'}`}>{lawyer.name}</h4>
                    <p className="text-[10px] font-black uppercase tracking-widest text-stone-400 mt-1">{lawyer.firmName}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <StarIcon className="w-3 h-3 text-legal-gold" filled />
                      <span className={`text-xs font-bold ${isDarkMode ? 'text-stone-300' : 'text-legal-deep'}`}>{lawyer.rating}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 mb-8">
                  <div className={`flex items-center gap-3 text-xs font-medium p-3 rounded-xl ${isDarkMode ? 'bg-stone-900 text-stone-400' : 'bg-stone-50 text-stone-500'}`}>
                    <MapPinIcon className="w-4 h-4 text-legal-accent" />
                    {lawyer.location}
                  </div>
                  <div className={`flex items-center gap-3 text-xs font-medium p-3 rounded-xl ${isDarkMode ? 'bg-stone-900 text-stone-400' : 'bg-stone-50 text-stone-500'}`}>
                    <BriefcaseIcon className="w-4 h-4 text-legal-emerald" />
                    {lawyer.yearsOfExperience}y Experience
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-8">
                  {lawyer.practiceAreas.slice(0, 2).map((area, idx) => (
                    <span key={idx} className={`text-[9px] font-bold px-3 py-1.5 rounded-full border ${isDarkMode ? 'bg-legal-accent/5 text-legal-accent border-legal-accent/10' : 'bg-legal-deep/5 text-legal-deep border-legal-deep/5'}`}>
                      {area}
                    </span>
                  ))}
                </div>

                <button 
                  onClick={() => setView(AppView.LAWYER_FINDER)}
                  className={`w-full py-4 rounded-2xl font-bold text-sm transition-all shadow-md group-hover:shadow-xl ${lawyer.subscriptionTier === 'Elite' ? (isDarkMode ? 'bg-legal-accent text-stone-950 hover:bg-amber-400' : 'bg-legal-deep text-white hover:bg-black') : (isDarkMode ? 'bg-stone-800 text-stone-300' : 'bg-stone-50 text-stone-700')}`}
                >
                  View Profile
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <footer className="mt-auto p-12 text-center">
        <div className={`max-w-4xl mx-auto border-t pt-12 ${isDarkMode ? 'border-stone-800' : 'border-stone-200'}`}>
            <p className="text-stone-600 text-xs font-bold uppercase tracking-[0.4em] mb-4">Empowering India</p>
            <p className={`text-sm italic font-serif ${isDarkMode ? 'text-stone-500' : 'text-stone-500'}`}>"Vidhigya is an educational tool. Information provided is not professional legal advice."</p>
        </div>
      </footer>
    </div>
  );
};

export default HomeView;
