
import React from 'react';

interface ArchitectureViewProps {
  isDarkMode?: boolean;
}

const ArchitectureView: React.FC<ArchitectureViewProps> = ({ isDarkMode }) => {
  return (
    <div className={`flex flex-col h-full overflow-y-auto font-sans selection:bg-legal-light transition-colors duration-500 ${isDarkMode ? 'bg-stone-950' : 'bg-legal-paper'}`}>
      <header className={`border-b p-8 md:p-12 transition-colors ${isDarkMode ? 'bg-stone-900 border-stone-800' : 'bg-white border-stone-200'}`}>
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <span className={`${isDarkMode ? 'bg-legal-accent text-stone-950' : 'bg-legal-dark text-legal-accent'} px-3 py-1 rounded text-[10px] font-bold uppercase tracking-[0.2em]`}>System Design v1.2</span>
          </div>
          <h2 className={`text-4xl md:text-5xl font-serif font-bold flex items-center gap-4 ${isDarkMode ? 'text-stone-50' : 'text-legal-dark'}`}>
            <svg className="w-12 h-12 text-legal-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
            </svg>
            Architecture Overview
          </h2>
          <p className={`mt-4 text-xl font-light max-w-3xl leading-relaxed ${isDarkMode ? 'text-stone-400' : 'text-stone-500'}`}>
            Vidhigya utilizes a decoupled, service-oriented frontend architecture powered by Google's latest multimodal models to deliver fast, grounded, and empathetic legal assistance.
          </p>
        </div>
      </header>

      <div className="p-6 md:p-12 max-w-6xl mx-auto w-full space-y-16">
        
        {/* Main Diagram */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <div className={`h-px flex-1 ${isDarkMode ? 'bg-stone-800' : 'bg-stone-200'}`}></div>
            <h3 className="text-sm font-bold text-stone-400 uppercase tracking-widest px-4">Core System Diagram</h3>
            <div className={`h-px flex-1 ${isDarkMode ? 'bg-stone-800' : 'bg-stone-200'}`}></div>
          </div>
          
          <div className={`p-8 md:p-12 rounded-3xl shadow-sm border transition-colors ${isDarkMode ? 'bg-stone-900 border-stone-800' : 'bg-white border-stone-200'}`}>
            <svg viewBox="0 0 900 650" className="w-full h-auto min-w-[800px]">
              <defs>
                <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
                  <polygon points="0 0, 10 3.5, 0 7" fill={isDarkMode ? "#57534e" : "#78716c"} />
                </marker>
                <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity={isDarkMode ? "0.3" : "0.1"} />
                </filter>
              </defs>

              {/* LAYER: USER INTERFACE */}
              <g filter="url(#shadow)">
                <rect x="250" y="20" width="400" height="90" rx="16" fill={isDarkMode ? "#09090b" : "#1c1917"} stroke={isDarkMode ? "#F59E0B" : "none"} strokeWidth="1" />
                <text x="450" y="60" textAnchor="middle" fill="#FEF3C7" className="font-bold font-serif text-xl">Client-Side Application</text>
                <text x="450" y="85" textAnchor="middle" fill={isDarkMode ? "#78716c" : "#a8a29e"} className="text-xs">React 19 + Tailwind CSS + Vite/ESM</text>
              </g>

              {/* Interaction Flow */}
              <path d="M450,110 L450,160" stroke={isDarkMode ? "#44403c" : "#78716c"} strokeWidth="2" strokeDasharray="4" markerEnd="url(#arrowhead)" />

              {/* LAYER: SERVICES (ORCHESTRATOR) */}
              <g filter="url(#shadow)">
                <rect x="150" y="180" width="600" height="130" rx="16" fill={isDarkMode ? "#18181b" : "white"} stroke={isDarkMode ? "#27272a" : "#e7e5e4"} strokeWidth="1" />
                <rect x="160" y="190" width="280" height="110" rx="12" fill={isDarkMode ? "#09090b" : "#fafaf9"} stroke="#D97706" strokeWidth="2" />
                <text x="300" y="225" textAnchor="middle" fill={isDarkMode ? "#f5f5f4" : "#1c1917"} className="font-bold">Gemini Service</text>
                <text x="300" y="250" textAnchor="middle" fill="#78716c" className="text-[10px]">Context Management & System Prompts</text>
                
                <rect x="460" y="190" width="280" height="110" rx="12" fill={isDarkMode ? "#09090b" : "#fafaf9"} stroke={isDarkMode ? "#3f3f46" : "#292524"} strokeWidth="1" />
                <text x="600" y="225" textAnchor="middle" fill={isDarkMode ? "#f5f5f4" : "#1c1917"} className="font-bold">Lawyer Service</text>
                <text x="600" y="250" textAnchor="middle" fill="#78716c" className="text-[10px]">Mock Database + Subscription Logic</text>
              </g>

              {/* Connecting Logic */}
              <path d="M300,310 L200,390" stroke={isDarkMode ? "#44403c" : "#78716c"} strokeWidth="1.5" markerEnd="url(#arrowhead)" />
              <path d="M300,310 L450,390" stroke={isDarkMode ? "#44403c" : "#78716c"} strokeWidth="1.5" markerEnd="url(#arrowhead)" />
              <path d="M300,310 L700,390" stroke={isDarkMode ? "#44403c" : "#78716c"} strokeWidth="1.5" markerEnd="url(#arrowhead)" />

              {/* LAYER: MODELS & TOOLS */}
              {/* Gemini 3 Pro */}
              <g filter="url(#shadow)">
                <rect x="50" y="410" width="230" height="120" rx="16" fill={isDarkMode ? "#1c1917" : "#FEF3C7"} stroke="#D97706" strokeWidth="1" />
                <text x="165" y="445" textAnchor="middle" fill={isDarkMode ? "#F59E0B" : "#B45309"} className="font-bold text-lg">Gemini 3 Pro</text>
                <text x="165" y="475" textAnchor="middle" fill="#78716c" className="text-[10px]">High-Reasoning Legal Brain</text>
                <rect x="80" y="495" width="170" height="20" rx="4" fill={isDarkMode ? "#451a03" : "#FDE68A"} />
                <text x="165" y="509" textAnchor="middle" fill={isDarkMode ? "#FDE68A" : "#92400E"} className="text-[9px] font-bold uppercase tracking-widest">Legal Companion</text>
              </g>

              {/* Gemini 2.5 Flash */}
              <g filter="url(#shadow)">
                <rect x="335" y="410" width="230" height="120" rx="16" fill={isDarkMode ? "#1c1917" : "#f5f5f4"} stroke={isDarkMode ? "#3f3f46" : "#78716c"} strokeWidth="1" />
                <text x="450" y="445" textAnchor="middle" fill={isDarkMode ? "#e4e4e7" : "#1c1917"} className="font-bold text-lg">Gemini 2.5 Flash</text>
                <text x="450" y="475" textAnchor="middle" fill="#78716c" className="text-[10px]">Multimodal / OCR / Speed</text>
                <rect x="365" y="495" width="170" height="20" rx="4" fill={isDarkMode ? "#27272a" : "#e7e5e4"} />
                <text x="450" y="509" textAnchor="middle" fill={isDarkMode ? "#a1a1aa" : "#44403c"} className="text-[9px] font-bold uppercase tracking-widest">Vidhigya Decoder</text>
              </g>

              {/* Grounding Tools */}
              <g filter="url(#shadow)">
                <rect x="620" y="410" width="230" height="120" rx="16" fill={isDarkMode ? "#1c1917" : "white"} stroke={isDarkMode ? "#F59E0B" : "#1c1917"} strokeWidth="1" />
                <text x="735" y="445" textAnchor="middle" fill={isDarkMode ? "#f5f5f4" : "#1c1917"} className="font-bold text-lg">Grounding</text>
                <text x="735" y="475" textAnchor="middle" fill="#78716c" className="text-[10px]">Real-time Verification</text>
                <g transform="translate(685, 495)">
                  <circle cx="0" cy="5" r="8" fill="#4285F4" />
                  <text x="0" y="8" textAnchor="middle" fill="white" className="text-[7px] font-bold">G</text>
                  <text x="50" y="8" fill={isDarkMode ? "#a1a1aa" : "#78716c"} className="text-[10px]">Google Search/Maps</text>
                </g>
              </g>

              {/* INFRASTRUCTURE FOOTER */}
              <rect x="50" y="580" width="800" height="40" rx="8" fill={isDarkMode ? "#18181b" : "#1c1917"} stroke={isDarkMode ? "#27272a" : "none"} strokeWidth="1" />
              <text x="450" y="605" textAnchor="middle" fill={isDarkMode ? "#52525b" : "#57534e"} className="text-[10px] uppercase tracking-[0.4em]">Secure Environment • Edge Delivery • Zero-Backend-Footprint</text>
            </svg>
          </div>
        </section>

        {/* Technical Deep Dive */}
        <div className="grid md:grid-cols-3 gap-12">
          
          <div className="space-y-6">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${isDarkMode ? 'bg-amber-900/20 text-legal-accent' : 'bg-legal-light text-legal-accent'}`}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
            </div>
            <h4 className={`text-2xl font-serif font-bold ${isDarkMode ? 'text-stone-50' : 'text-legal-dark'}`}>Model Orchestration</h4>
            <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-stone-400' : 'text-stone-600'}`}>
              We employ a <strong>Dual-Model Strategy</strong>. For complex legal reasoning involving the Constitution of India, we utilize <strong>Gemini 3 Pro</strong>. For document OCR and high-speed grounding tasks like finding lawyers, we use <strong>Gemini 2.5 Flash</strong> to minimize latency and cost.
            </p>
          </div>

          <div className="space-y-6">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${isDarkMode ? 'bg-stone-800 text-stone-300' : 'bg-stone-100 text-stone-600'}`}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
            </div>
            <h4 className={`text-2xl font-serif font-bold ${isDarkMode ? 'text-stone-50' : 'text-legal-dark'}`}>Privacy & Trust</h4>
            <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-stone-400' : 'text-stone-600'}`}>
              Vidhigya operates with a <strong>Stateless Architecture</strong>. User documents and chat history are kept entirely within the client-side React state. We do not persist sensitive legal queries on our servers, ensuring maximum privacy for individuals in vulnerable legal situations.
            </p>
          </div>

          <div className="space-y-6">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${isDarkMode ? 'bg-amber-900/20 text-amber-500' : 'bg-amber-50 text-amber-600'}`}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
            </div>
            <h4 className={`text-2xl font-serif font-bold ${isDarkMode ? 'text-stone-50' : 'text-legal-dark'}`}>Grounding Loop</h4>
            <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-stone-400' : 'text-stone-600'}`}>
              Legal aid discovery is enhanced with <strong>Google Maps Search Grounding</strong>. When a user asks for help in Mumbai, the model doesn't just hallucinate—it queries real-world location data to provide URLs and reviews for verified legal aid clinics.
            </p>
          </div>

        </div>

        {/* Tech Stack Footer */}
        <div className={`pt-16 border-t ${isDarkMode ? 'border-stone-800' : 'border-stone-200'}`}>
          <h4 className="text-center text-stone-400 text-xs font-bold uppercase tracking-[0.3em] mb-8">Technology Stack</h4>
          <div className="flex flex-wrap justify-center gap-4">
            {['React 19', 'TypeScript', 'Google Gemini API', 'Tailwind CSS', 'ESM Import Maps'].map(tech => (
              <span key={tech} className={`px-4 py-2 border rounded-full text-xs font-medium shadow-sm transition-colors ${isDarkMode ? 'bg-stone-900 border-stone-800 text-stone-400' : 'bg-white border-stone-200 text-stone-500'}`}>
                {tech}
              </span>
            ))}
          </div>
        </div>

      </div>
      
      <div className="h-24 shrink-0"></div>
    </div>
  );
};

export default ArchitectureView;
