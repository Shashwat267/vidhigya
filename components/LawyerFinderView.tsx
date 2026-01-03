import React, { useState, useEffect } from 'react';
import { findLawyersInArea } from '../services/geminiService';
import { searchRegisteredLawyers } from '../services/lawyerService';
import { MapPinIcon, CheckBadgeIcon, StarIcon, BriefcaseIcon } from './Icons';
import { Coordinates, GroundingChunk, Lawyer } from '../types';

const LawyerFinderView: React.FC = () => {
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState<Coordinates | undefined>(undefined);
  const [isLoadingLoc, setIsLoadingLoc] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  
  // State for AI results
  const [aiResults, setAiResults] = useState<{ text: string, places: GroundingChunk[] } | null>(null);
  
  // State for Registered Lawyer results
  const [registeredLawyers, setRegisteredLawyers] = useState<Lawyer[]>([]);

  useEffect(() => {
    // Load featured lawyers initially
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
          let errorMessage = "Unknown error occurred.";
          switch(error.code) {
            case error.PERMISSION_DENIED:
              errorMessage = "Permission denied. Please allow location access.";
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage = "Location unavailable. Try typing your city name instead.";
              break;
            case error.TIMEOUT:
              errorMessage = "Location request timed out. Please try again or type your city.";
              break;
          }
          console.warn("Geolocation warning:", errorMessage);
          // Don't alert aggressively, just stop loading. User can type city.
          setIsLoadingLoc(false);
        },
        { 
            enableHighAccuracy: false, // Set to false for faster, rougher location (cell towers/wifi) which is enough for finding lawyers in a city.
            timeout: 20000, // Increased timeout to 20s
            maximumAge: 60000 // Accept cached location up to 1 min old
        }
      );
    } else {
      setIsLoadingLoc(false);
      alert("Geolocation is not supported by this browser.");
    }
  };

  const handleSearch = async () => {
    if (!query.trim()) return;
    setIsSearching(true);
    setAiResults(null);

    // 1. Search Local Database
    const localMatches = searchRegisteredLawyers(query);
    setRegisteredLawyers(localMatches);

    try {
      // 2. Search AI/Maps
      const response = await findLawyersInArea(query, location);
      setAiResults({
        text: response.text || "No specific details found, please check the maps links below.",
        places: response.groundingMetadata?.groundingChunks || []
      });
    } catch (e) {
      console.error("Search error:", e);
      alert("Failed to search for lawyers. Please try again.");
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-legal-paper overflow-y-auto">
      <header className="bg-white border-b border-stone-200 p-6 md:p-8">
        <h2 className="text-3xl font-serif font-bold text-legal-dark flex items-center gap-3">
          <MapPinIcon className="text-legal-accent w-8 h-8" />
          Find Advocates
        </h2>
        <p className="text-stone-500 mt-2 text-lg font-light">
          Connect with trusted advocates and legal aid clinics in your city.
        </p>
      </header>

      <div className="p-6 md:p-8 max-w-6xl mx-auto w-full space-y-8">
        
        {/* Search Controls */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-stone-200">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">Legal Issue or City Name</label>
              <input 
                type="text" 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="e.g., Tenant dispute in Mumbai, Divorce lawyer in Delhi"
                className="w-full p-4 border border-stone-200 bg-stone-50 rounded-xl focus:ring-2 focus:ring-stone-800 focus:bg-white focus:outline-none transition-all placeholder:text-stone-400"
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            <div className="flex items-end">
               <button
                onClick={handleGetLocation}
                className={`flex items-center gap-2 px-6 py-4 border rounded-xl font-medium transition-all duration-200 h-[58px] min-w-[180px] justify-center
                  ${location 
                    ? 'bg-green-50 border-green-200 text-green-800' 
                    : 'border-stone-200 text-stone-600 hover:bg-stone-50 hover:border-stone-300'}`}
               >
                 <MapPinIcon className="w-5 h-5" />
                 {location ? 'Location Active' : (isLoadingLoc ? 'Locating...' : 'Use My Location')}
               </button>
            </div>
          </div>
          <button
            onClick={handleSearch}
            disabled={isSearching || !query}
            className="mt-6 w-full bg-legal-dark text-white py-4 rounded-xl font-semibold hover:bg-stone-800 hover:shadow-lg transition-all disabled:opacity-50 active:scale-[0.99]"
          >
            {isSearching ? 'Finding Advocates...' : 'Search for Help'}
          </button>
        </div>

        {/* Registered Lawyers Section */}
        {registeredLawyers.length > 0 && (
          <div className="animate-fade-in-up">
            <div className="flex items-center gap-3 mb-6">
              <CheckBadgeIcon className="text-legal-accent w-6 h-6" />
              <h3 className="text-2xl font-serif font-bold text-legal-dark">Verified Advocates</h3>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {registeredLawyers.map((lawyer) => (
                <div 
                  key={lawyer.id} 
                  className={`
                    relative p-6 rounded-2xl bg-white transition-all hover:shadow-xl group
                    ${lawyer.subscriptionTier === 'Elite' ? 'border-2 border-legal-accent shadow-md' : 'border border-stone-200 shadow-sm'}
                  `}
                >
                  {lawyer.subscriptionTier === 'Elite' && (
                    <div className="absolute top-0 right-0 bg-legal-accent text-legal-dark text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg z-10">
                      PREMIUM
                    </div>
                  )}
                  
                  <div className="flex items-start gap-4 mb-4">
                    <img 
                      src={lawyer.imageUrl} 
                      alt={lawyer.name} 
                      className="w-16 h-16 rounded-full object-cover border border-stone-100 shadow-sm"
                    />
                    <div>
                      <div className="flex items-center gap-1">
                        <h4 className="font-bold text-lg text-stone-900 leading-tight">{lawyer.name}</h4>
                        {(lawyer.subscriptionTier === 'Elite' || lawyer.subscriptionTier === 'Pro') && (
                          <CheckBadgeIcon className="w-4 h-4 text-blue-500" title="Verified" />
                        )}
                      </div>
                      <p className="text-sm text-stone-500 font-medium">{lawyer.firmName}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <StarIcon className="w-3 h-3 text-amber-400" filled />
                        <span className="text-xs font-bold text-stone-700">{lawyer.rating}</span>
                        <span className="text-xs text-stone-400">({lawyer.reviewCount} reviews)</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex gap-2 text-sm text-stone-600">
                      <MapPinIcon className="w-4 h-4 shrink-0 text-stone-400" />
                      <span className="truncate">{lawyer.location}</span>
                    </div>
                    <div className="flex gap-2 text-sm text-stone-600">
                      <BriefcaseIcon className="w-4 h-4 shrink-0 text-stone-400" />
                      <span className="truncate">{lawyer.yearsOfExperience} Years Exp.</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {lawyer.practiceAreas.slice(0, 3).map((area, i) => (
                      <span key={i} className="text-xs bg-stone-100 text-stone-600 px-2 py-1 rounded-md border border-stone-200">
                        {area}
                      </span>
                    ))}
                    {lawyer.practiceAreas.length > 3 && <span className="text-xs text-stone-400">+{lawyer.practiceAreas.length - 3}</span>}
                  </div>

                  <button className={`w-full py-3 rounded-xl font-bold transition-colors ${lawyer.subscriptionTier === 'Elite' ? 'bg-legal-dark text-white hover:bg-stone-800' : 'bg-white border border-stone-300 text-stone-700 hover:bg-stone-50'}`}>
                    View Profile
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* AI & Web Results Section */}
        {aiResults && (
          <div className="animate-fade-in-up">
             <div className="border-t border-stone-200 my-8"></div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-stone-200 prose prose-stone max-w-none">
              <h3 className="text-xl font-serif font-bold text-legal-dark mb-4 border-b border-stone-100 pb-2">Vidhigya Search Results</h3>
              <div className="whitespace-pre-wrap leading-relaxed text-stone-700">{aiResults.text}</div>
            </div>

            {aiResults.places.length > 0 && (
              <div className="mt-8">
                <h3 className="text-xl font-serif font-bold text-legal-dark mb-6">Google Maps Results</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {aiResults.places.map((chunk, idx) => {
                    if (!chunk.maps) return null;
                    const mapData = chunk.maps;
                    return (
                      <a 
                        key={idx} 
                        href={mapData.uri} 
                        target="_blank" 
                        rel="noreferrer"
                        className="flex flex-col bg-white p-6 rounded-2xl border border-stone-200 hover:border-legal-accent hover:shadow-lg transition-all group h-full"
                      >
                        <div className="flex justify-between items-start mb-3">
                            <h4 className="font-bold text-lg text-legal-dark group-hover:text-legal-accent transition-colors line-clamp-1">
                            {mapData.title}
                            </h4>
                            <div className="p-2 bg-stone-50 rounded-full group-hover:bg-amber-50 transition-colors">
                                <svg className="w-4 h-4 text-stone-400 group-hover:text-legal-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                            </div>
                        </div>
                        
                        {mapData.placeAnswerSources?.reviewSnippets && mapData.placeAnswerSources.reviewSnippets.length > 0 ? (
                           <div className="flex-1 mt-2 text-sm text-stone-600 italic bg-stone-50 p-4 rounded-xl border border-stone-100">
                             "{mapData.placeAnswerSources.reviewSnippets[0].content}"
                           </div>
                        ) : (
                            <div className="flex-1"></div>
                        )}

                        <div className="mt-4 pt-4 border-t border-stone-100 flex items-center gap-2 text-sm font-medium text-stone-500 group-hover:text-legal-accent">
                          <MapPinIcon className="w-4 h-4" />
                          View on Google Maps
                        </div>
                      </a>
                    );
                  })}
                </div>
              </div>
            )}
            
            {aiResults.places.length === 0 && !registeredLawyers.length && (
                <div className="text-center p-12 bg-white rounded-2xl border border-stone-200">
                    <p className="text-stone-500">No specific locations found. Try adding your city or district to the query.</p>
                </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default LawyerFinderView;