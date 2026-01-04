
import React, { useState, useEffect } from 'react';
import { findLawyersInArea } from '../services/geminiService';
import { searchRegisteredLawyers } from '../services/lawyerService';
import { MapPinIcon, CheckBadgeIcon, StarIcon, BriefcaseIcon } from './Icons';
import { Coordinates, GroundingChunk, Lawyer } from '../types';

// Added props interface to fix TypeScript error in App.tsx
interface LawyerFinderViewProps {
  isDarkMode?: boolean;
}

const LawyerFinderView: React.FC<LawyerFinderViewProps> = ({ isDarkMode }) => {
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState<Coordinates | undefined>(undefined);
  const [isLoadingLoc, setIsLoadingLoc] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  
  const [aiResults, setAiResults] = useState<{ text: string, places: GroundingChunk[] } | null>(null);
  const [registeredLawyers, setRegisteredLawyers] = useState<Lawyer[]>([]);

  useEffect(() => {
    setRegisteredLawyers(searchRegisteredLawyers(''));
  }, []);

  const handleGetLocation = () => {
    setIsLoadingLoc(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
          setIsLoadingLoc(false);
        },
        (error) => {
          setIsLoadingLoc(false);
        },
        { timeout: 15000 }
      );
    } else {
      setIsLoadingLoc(false);
    }
  };

  const handleSearch = async () => {
    if (!query.trim()) return;
    setIsSearching(true);
    setAiResults(null);

    const localMatches = searchRegisteredLawyers(query);
    setRegisteredLawyers(localMatches);

    try {
      const response = await findLawyersInArea(query, location);
      // Fix: Cast grounding chunks to any or the local type to ensure compatibility with SDK output
      setAiResults({
        text: response.text || "No specific details found.",
        places: (response.groundingMetadata?.groundingChunks as any) || []
      });
    } catch (e) {
      console.error(e);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className={`flex flex-col h-full overflow-y-auto overflow-x-hidden no-scrollbar transition-colors duration-500 ${isDarkMode ? 'bg-stone-950' : 'bg-legal-paper'}`}>
      <header className={`border-b p-10 md:p-14 transition-colors ${isDarkMode ? 'bg-stone-900 border-stone-800' : 'bg-white border-stone-200'}`}>
        <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-legal-emerald text-white rounded-2xl shadow-lg shadow-legal-emerald/20">
                    <MapPinIcon className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold uppercase tracking-[0.3em] text-legal-emerald">Proximity Search</span>
            </div>
            <h2 className={`text-5xl font-serif font-bold ${isDarkMode ? 'text-stone-50' : 'text-legal-deep'}`}>Find Advocates</h2>
            <p className={`mt-4 text-xl font-light max-w-2xl leading-relaxed ${isDarkMode ? 'text-stone-400' : 'text-stone-500'}`}>
              Discover verified legal representation and free legal aid clinics grounded in real-time geographic data.
            </p>
        </div>
      </header>

      <div className="p-6 md:p-14 max-w-6xl mx-auto w-full space-y-20 pb-32">
        
        {/* Modern Search Bar */}
        <div className="relative -mt-24 z-20">
            <div className={`p-10 rounded-[40px] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.1)] border flex flex-col gap-8 transition-colors ${isDarkMode ? 'bg-stone-900 border-stone-800' : 'bg-white border-stone-200'}`}>
                <div className="flex flex-col lg:flex-row gap-8">
                    <div className="flex-1 space-y-2">
                        <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest ml-1">Case Detail / City</label>
                        <input 
                            type="text" 
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="e.g., Human Rights lawyer in Bengaluru"
                            className={`w-full p-6 border-2 rounded-3xl focus:border-legal-accent focus:outline-none transition-all text-lg font-medium ${isDarkMode ? 'bg-stone-950 border-stone-800 text-stone-100 focus:bg-stone-900' : 'bg-stone-50 border-stone-100 text-legal-deep focus:bg-white'}`}
                            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                        />
                    </div>
                    <div className="lg:w-1/3 space-y-2">
                        <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest ml-1">Current Coordinates</label>
                        <button
                            onClick={handleGetLocation}
                            className={`w-full flex items-center justify-center gap-3 px-6 py-6 border-2 rounded-3xl font-bold transition-all duration-300 h-full
                            ${location 
                                ? 'bg-legal-emerald/5 border-legal-emerald text-legal-emerald' 
                                : (isDarkMode ? 'border-stone-800 text-stone-500 hover:border-stone-700' : 'border-stone-100 text-stone-500 hover:border-stone-300')}`}
                        >
                            <MapPinIcon className="w-5 h-5" />
                            {location ? 'GPS Active' : (isLoadingLoc ? 'Searching...' : 'Detect City')}
                        </button>
                    </div>
                </div>
                <button
                    onClick={handleSearch}
                    disabled={isSearching || !query}
                    className={`w-full py-6 rounded-3xl font-bold text-lg shadow-xl hover:-translate-y-1 transition-all disabled:opacity-30 flex items-center justify-center gap-3 ${isDarkMode ? 'bg-legal-accent text-stone-950 hover:bg-amber-400' : 'bg-legal-deep text-white hover:bg-black'}`}
                >
                    {isSearching && <div className={`w-5 h-5 border-2 rounded-full animate-spin ${isDarkMode ? 'border-stone-900/30 border-t-stone-900' : 'border-white/30 border-t-white'}`}></div>}
                    {isSearching ? 'Querying Knowledge Base...' : 'Search for Help'}
                </button>
            </div>
        </div>

        {/* Registered Lawyers Section */}
        {registeredLawyers.length > 0 && (
          <div className="animate-fade-in-up">
            <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${isDarkMode ? 'bg-legal-accent/10 text-legal-accent' : 'bg-legal-accent/20 text-legal-accent'}`}>
                        <CheckBadgeIcon className="w-6 h-6" />
                    </div>
                    <h3 className={`text-3xl font-serif font-bold ${isDarkMode ? 'text-stone-50' : 'text-legal-deep'}`}>Verified Partners</h3>
                </div>
                <div className={`h-px flex-1 mx-8 hidden md:block ${isDarkMode ? 'bg-stone-800' : 'bg-stone-200'}`}></div>
                <span className="text-xs font-bold text-stone-400 uppercase tracking-widest">Featured Profiles</span>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {registeredLawyers.map((lawyer) => (
                <div 
                  key={lawyer.id} 
                  className={`
                    group relative p-8 rounded-[36px] transition-all duration-500 hover:shadow-[0_50px_80px_-20px_rgba(0,0,0,0.15)] hover:-translate-y-2
                    ${lawyer.subscriptionTier === 'Elite' 
                      ? (isDarkMode ? 'border-2 border-legal-accent bg-stone-900 ring-8 ring-legal-accent/5' : 'border-2 border-legal-accent bg-white ring-8 ring-legal-accent/5') 
                      : (isDarkMode ? 'border border-stone-800 bg-stone-900' : 'border border-stone-100 bg-white')}
                  `}
                >
                  <div className="flex items-start gap-6 mb-8">
                    <div className="relative">
                        <img 
                            src={lawyer.imageUrl} 
                            alt={lawyer.name} 
                            className="w-20 h-20 rounded-3xl object-cover shadow-lg border border-white"
                        />
                        {lawyer.subscriptionTier === 'Elite' && (
                            <div className="absolute -top-2 -right-2 bg-legal-accent text-white p-1 rounded-full shadow-lg border-4 border-white">
                                <StarIcon className="w-4 h-4" filled />
                            </div>
                        )}
                    </div>
                    <div>
                      <h4 className={`font-bold text-xl transition-colors group-hover:text-legal-accent ${isDarkMode ? 'text-stone-100' : 'text-legal-deep'}`}>{lawyer.name}</h4>
                      <p className="text-xs font-bold text-stone-400 uppercase tracking-widest mt-1 truncate max-w-[120px]">{lawyer.firmName}</p>
                      <div className={`flex items-center gap-1.5 mt-2 px-2 py-1 rounded-lg w-fit ${isDarkMode ? 'bg-stone-950' : 'bg-stone-50'}`}>
                        <StarIcon className="w-3 h-3 text-legal-gold" filled />
                        <span className={`text-xs font-black ${isDarkMode ? 'text-stone-100' : 'text-legal-deep'}`}>{lawyer.rating}</span>
                        <span className="text-[10px] text-stone-400 font-bold">({lawyer.reviewCount})</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 mb-8">
                    <div className={`flex items-center gap-3 text-sm font-medium p-3 rounded-2xl transition-colors ${isDarkMode ? 'bg-stone-950 text-stone-400' : 'bg-stone-50/50 text-stone-500'}`}>
                      <MapPinIcon className="w-5 h-5 text-legal-accent" />
                      {lawyer.location}
                    </div>
                    <div className={`flex items-center gap-3 text-sm font-medium p-3 rounded-2xl transition-colors ${isDarkMode ? 'bg-stone-950 text-stone-400' : 'bg-stone-50/50 text-stone-500'}`}>
                      <BriefcaseIcon className="w-5 h-5 text-legal-emerald" />
                      {lawyer.yearsOfExperience} Years Experience
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-8">
                    {lawyer.practiceAreas.slice(0, 2).map((area, i) => (
                      <span key={i} className={`text-[10px] font-bold px-3 py-1.5 rounded-full border ${isDarkMode ? 'bg-legal-accent/5 text-legal-accent border-legal-accent/10' : 'bg-legal-deep/5 text-legal-deep border-legal-deep/5'}`}>
                        {area}
                      </span>
                    ))}
                  </div>

                  <button className={`w-full py-5 rounded-2xl font-bold transition-all ${lawyer.subscriptionTier === 'Elite' ? (isDarkMode ? 'bg-legal-accent text-stone-950 hover:bg-amber-400 shadow-lg shadow-legal-accent/10' : 'bg-legal-deep text-white hover:bg-black shadow-lg shadow-legal-deep/20') : (isDarkMode ? 'bg-stone-800 text-stone-300 hover:bg-stone-700' : 'bg-stone-50 text-stone-700 hover:bg-stone-100')}`}>
                    Consult Advocate
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* AI & Maps Grounding View */}
        {aiResults && (
          <div className="animate-fade-in-up space-y-12">
             <div className={`p-12 rounded-[48px] shadow-sm border transition-colors ${isDarkMode ? 'bg-stone-900 border-stone-800' : 'bg-white border-stone-200'}`}>
                <div className="flex items-center gap-3 mb-8">
                    <span className="px-3 py-1 bg-legal-deep text-white text-[10px] font-bold rounded-lg uppercase tracking-widest">Vidhigya Analysis</span>
                </div>
                <div className={`prose prose-lg max-w-none leading-relaxed font-medium whitespace-pre-wrap ${isDarkMode ? 'prose-invert text-stone-400' : 'prose-stone text-stone-600'}`}>
                    {aiResults.text}
                </div>
             </div>

            {aiResults.places.length > 0 && (
              <div>
                <div className="flex items-center gap-4 mb-10">
                    <h3 className={`text-3xl font-serif font-bold ${isDarkMode ? 'text-stone-50' : 'text-legal-deep'}`}>Grounded Search Data</h3>
                    <div className={`h-px flex-1 ${isDarkMode ? 'bg-stone-800' : 'bg-stone-200'}`}></div>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                  {aiResults.places.map((chunk, idx) => {
                    if (!chunk.maps) return null;
                    const mapData = chunk.maps;
                    return (
                      <a 
                        key={idx} 
                        href={mapData.uri || '#'} 
                        target="_blank" 
                        rel="noreferrer"
                        className={`group p-10 rounded-[40px] border transition-all duration-500 hover:shadow-2xl flex flex-col h-full overflow-hidden relative ${isDarkMode ? 'bg-stone-900 border-stone-800 hover:border-legal-gold' : 'bg-white border-stone-200 hover:border-legal-gold'}`}
                      >
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity">
                            <div className="p-3 bg-legal-gold/10 text-legal-gold rounded-full">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                            </div>
                        </div>
                        
                        <h4 className={`font-bold text-2xl mb-6 group-hover:text-legal-gold transition-colors pr-10 ${isDarkMode ? 'text-stone-50' : 'text-legal-deep'}`}>
                            {mapData.title || 'Legal Resource'}
                        </h4>
                        
                        {mapData.placeAnswerSources?.reviewSnippets?.[0] && (
                           <div className={`flex-1 p-6 rounded-[24px] border mb-6 italic font-medium leading-relaxed relative transition-colors ${isDarkMode ? 'bg-stone-950 border-stone-800 text-stone-500' : 'bg-stone-50 border-stone-100 text-stone-500'}`}>
                             <span className="absolute -top-3 left-4 text-4xl text-stone-200 font-serif opacity-30">“</span>
                             {mapData.placeAnswerSources.reviewSnippets[0].content || ''}
                           </div>
                        )}

                        <div className="mt-auto flex items-center justify-between text-xs font-bold uppercase tracking-widest text-stone-400 group-hover:text-legal-gold transition-colors">
                          <div className="flex items-center gap-2">
                             <MapPinIcon className="w-4 h-4" />
                             Maps Coordinates
                          </div>
                          <span>Visit Website</span>
                        </div>
                      </a>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default LawyerFinderView;
