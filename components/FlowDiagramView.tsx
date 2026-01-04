
import React from 'react';

interface FlowDiagramViewProps {
  isDarkMode?: boolean;
}

const FlowDiagramView: React.FC<FlowDiagramViewProps> = ({ isDarkMode }) => {
  return (
    <div className={`flex flex-col h-full overflow-y-auto font-sans selection:bg-legal-light transition-colors duration-500 ${isDarkMode ? 'bg-stone-950' : 'bg-legal-paper'}`}>
      <header className={`border-b p-8 md:p-12 transition-colors ${isDarkMode ? 'bg-stone-900 border-stone-800' : 'bg-white border-stone-200'}`}>
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <span className={`${isDarkMode ? 'bg-legal-accent text-stone-950' : 'bg-legal-dark text-legal-accent'} px-3 py-1 rounded text-[10px] font-bold uppercase tracking-[0.2em]`}>Logic Flow v1.0</span>
          </div>
          <h2 className={`text-4xl font-serif font-bold flex items-center gap-4 ${isDarkMode ? 'text-stone-50' : 'text-legal-dark'}`}>
            <svg className="w-10 h-10 text-legal-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
            System Logic Flow
          </h2>
          <p className={`mt-4 text-lg font-light max-w-2xl leading-relaxed ${isDarkMode ? 'text-stone-400' : 'text-stone-500'}`}>
            Visualization of how user queries navigate through our AI orchestration layers, grounding tools, and the Indian Legal Knowledge base.
          </p>
        </div>
      </header>

      <div className="p-6 md:p-12 max-w-6xl mx-auto w-full">
        {/* SVG Flow Diagram */}
        <div className={`p-8 md:p-12 rounded-3xl shadow-sm border transition-colors ${isDarkMode ? 'bg-stone-900 border-stone-800' : 'bg-white border-stone-200'}`}>
          <svg viewBox="0 0 1000 800" className="w-full h-auto min-w-[900px]">
            <defs>
              <marker id="arrowhead-flow" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill={isDarkMode ? "#57534e" : "#78716c"} />
              </marker>
              <linearGradient id="grad-user" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style={{stopColor: isDarkMode ? '#F59E0B' : '#1c1917', stopOpacity: 1}} />
                <stop offset="100%" style={{stopColor: isDarkMode ? '#D97706' : '#44403c', stopOpacity: 1}} />
              </linearGradient>
            </defs>

            {/* --- SECTION 1: USER INPUT --- */}
            <rect x="400" y="20" width="200" height="60" rx="30" fill="url(#grad-user)" />
            <text x="500" y="55" textAnchor="middle" fill={isDarkMode ? "#09090b" : "white"} className="font-bold text-sm">User Request</text>

            {/* Decision Branch */}
            <path d="M500,80 L500,120" stroke={isDarkMode ? "#44403c" : "#78716c"} strokeWidth="2" markerEnd="url(#arrowhead-flow)" />
            
            {/* Router Node */}
            <rect x="350" y="120" width="300" height="50" rx="8" fill={isDarkMode ? "#18181b" : "#fafaf9"} stroke={isDarkMode ? "#3f3f46" : "#e7e5e4"} strokeWidth="1" />
            <text x="500" y="150" textAnchor="middle" fill={isDarkMode ? "#f5f5f4" : "#1c1917"} className="font-bold text-xs uppercase tracking-widest">Logic Router</text>

            {/* Branching to Features */}
            <path d="M350,145 L150,145 L150,220" stroke={isDarkMode ? "#44403c" : "#78716c"} strokeWidth="2" markerEnd="url(#arrowhead-flow)" />
            <path d="M500,170 L500,220" stroke={isDarkMode ? "#44403c" : "#78716c"} strokeWidth="2" markerEnd="url(#arrowhead-flow)" />
            <path d="M650,145 L850,145 L850,220" stroke={isDarkMode ? "#44403c" : "#78716c"} strokeWidth="2" markerEnd="url(#arrowhead-flow)" />

            {/* --- FEATURE COLUMNS --- */}
            
            {/* 1. Legal Companion Flow */}
            <rect x="50" y="220" width="200" height="80" rx="12" fill={isDarkMode ? "#451a03" : "#FEF3C7"} stroke="#D97706" strokeWidth="1" />
            <text x="150" y="255" textAnchor="middle" fill={isDarkMode ? "#F59E0B" : "#B45309"} className="font-bold text-sm">Legal Companion</text>
            <text x="150" y="275" textAnchor="middle" fill={isDarkMode ? "#78716c" : "#92400E"} className="text-[10px]">Chat-based Reasoning</text>

            <path d="M150,300 L150,340" stroke={isDarkMode ? "#44403c" : "#78716c"} strokeWidth="2" markerEnd="url(#arrowhead-flow)" />
            
            <rect x="50" y="340" width="200" height="100" rx="8" fill={isDarkMode ? "#09090b" : "white"} stroke="#D97706" strokeWidth="1" strokeDasharray="4" />
            <text x="150" y="370" textAnchor="middle" fill={isDarkMode ? "#e4e4e7" : "#1c1917"} className="font-bold text-[11px]">Prompt Augmentation</text>
            <text x="150" y="390" textAnchor="middle" fill="#78716c" className="text-[9px]">Injects System Instructions</text>
            <text x="150" y="410" textAnchor="middle" fill="#78716c" className="text-[9px]">+ Context History</text>

            <path d="M150,440 L150,480" stroke={isDarkMode ? "#44403c" : "#78716c"} strokeWidth="2" markerEnd="url(#arrowhead-flow)" />

            <rect x="50" y="480" width="200" height="60" rx="8" fill={isDarkMode ? "#F59E0B" : "#1c1917"} />
            <text x="150" y="515" textAnchor="middle" fill={isDarkMode ? "#09090b" : "#FEF3C7"} className="font-bold text-xs">Gemini 3 Pro</text>

            {/* 2. Vidhigya Decoder Flow */}
            <rect x="400" y="220" width="200" height="80" rx="12" fill={isDarkMode ? "#18181b" : "#f5f5f4"} stroke={isDarkMode ? "#3f3f46" : "#78716c"} strokeWidth="1" />
            <text x="500" y="255" textAnchor="middle" fill={isDarkMode ? "#f5f5f4" : "#1c1917"} className="font-bold text-sm">Decoder</text>
            <text x="500" y="275" textAnchor="middle" fill="#78716c" className="text-[10px]">Multimodal OCR</text>

            <path d="M500,300 L500,340" stroke={isDarkMode ? "#44403c" : "#78716c"} strokeWidth="2" markerEnd="url(#arrowhead-flow)" />
            
            <rect x="400" y="340" width="200" height="100" rx="8" fill={isDarkMode ? "#09090b" : "white"} stroke={isDarkMode ? "#3f3f46" : "#78716c"} strokeWidth="1" strokeDasharray="4" />
            <text x="500" y="370" textAnchor="middle" fill={isDarkMode ? "#e4e4e7" : "#1c1917"} className="font-bold text-[11px]">Document Parsing</text>
            <text x="500" y="390" textAnchor="middle" fill="#78716c" className="text-[9px]">Base64 Encoding</text>
            <text x="500" y="410" textAnchor="middle" fill="#78716c" className="text-[9px]">MIME Type Validation</text>

            <path d="M500,440 L500,480" stroke={isDarkMode ? "#44403c" : "#78716c"} strokeWidth="2" markerEnd="url(#arrowhead-flow)" />

            <rect x="400" y="480" width="200" height="60" rx="8" fill={isDarkMode ? "#27272a" : "#57534e"} />
            <text x="500" y="515" textAnchor="middle" fill="white" className="font-bold text-xs">Gemini 2.5 Flash</text>

            {/* 3. Find Advocates Flow */}
            <rect x="750" y="220" width="200" height="80" rx="12" fill={isDarkMode ? "#18181b" : "#f5f5f4"} stroke={isDarkMode ? "#F59E0B" : "#1c1917"} strokeWidth="1" />
            <text x="850" y="255" textAnchor="middle" fill={isDarkMode ? "#f5f5f4" : "#1c1917"} className="font-bold text-sm">Find Advocates</text>
            <text x="850" y="275" textAnchor="middle" fill="#78716c" className="text-[10px]">Grounded Search</text>

            <path d="M850,300 L850,340" stroke={isDarkMode ? "#44403c" : "#78716c"} strokeWidth="2" markerEnd="url arrowhead-flow)" />
            
            {/* DB Decision */}
            <polygon points="850,340 920,380 850,420 780,380" fill={isDarkMode ? "#09090b" : "white"} stroke={isDarkMode ? "#F59E0B" : "#1c1917"} strokeWidth="1" />
            <text x="850" y="385" textAnchor="middle" fill={isDarkMode ? "#e4e4e7" : "#1c1917"} className="font-bold text-[8px]">LOCAL DB MATCH?</text>

            <path d="M920,380 L960,380 L960,650 L850,650" stroke={isDarkMode ? "#52525b" : "#78716c"} strokeWidth="1" strokeDasharray="2" />
            <text x="965" y="450" textAnchor="start" fill="#78716c" className="text-[8px] italic">YES: Return Partners</text>

            <path d="M850,420 L850,480" stroke={isDarkMode ? "#44403c" : "#78716c"} strokeWidth="2" markerEnd="url(#arrowhead-flow)" />

            <rect x="750" y="480" width="200" height="60" rx="8" fill={isDarkMode ? "#27272a" : "#57534e"} />
            <text x="850" y="515" textAnchor="middle" fill="white" className="font-bold text-xs">Gemini 2.5 Flash</text>

            {/* Google Maps Grounding Subflow */}
            <path d="M950,510 L980,510 L980,550 L850,550" stroke="#4285F4" strokeWidth="1" markerEnd="url(#arrowhead-flow)" />
            <circle cx="980" cy="530" r="12" fill="#4285F4" />
            <text x="980" y="534" textAnchor="middle" fill="white" className="font-bold text-[8px]">M</text>
            <text x="915" y="565" textAnchor="middle" fill="#4285F4" className="text-[8px] font-bold">GOOGLE MAPS GROUNDING</text>

            {/* --- CONVERGENCE --- */}
            <path d="M150,540 L150,600 L500,600" stroke={isDarkMode ? "#44403c" : "#78716c"} strokeWidth="2" />
            <path d="M500,540 L500,600" stroke={isDarkMode ? "#44403c" : "#78716c"} strokeWidth="2" />
            <path d="M850,540 L850,600 L500,600" stroke={isDarkMode ? "#44403c" : "#78716c"} strokeWidth="2" />
            
            <path d="M500,600 L500,640" stroke={isDarkMode ? "#44403c" : "#78716c"} strokeWidth="2" markerEnd="url(#arrowhead-flow)" />

            {/* OUTPUT TRANSFORMATION */}
            <rect x="350" y="640" width="300" height="70" rx="8" fill={isDarkMode ? "#18181b" : "white"} stroke={isDarkMode ? "#3f3f46" : "#e7e5e4"} strokeWidth="2" />
            <text x="500" y="675" textAnchor="middle" fill={isDarkMode ? "#f5f5f4" : "#1c1917"} className="font-bold text-xs">Output Transformation</text>
            <text x="500" y="695" textAnchor="middle" fill="#78716c" className="text-[9px]">Markdown Rendering + Resource Linking</text>

            <path d="M500,710 L500,750" stroke={isDarkMode ? "#44403c" : "#78716c"} strokeWidth="2" markerEnd="url(#arrowhead-flow)" />

            <rect x="400" y="750" width="200" height="40" rx="20" fill="#D97706" />
            <text x="500" y="775" textAnchor="middle" fill={isDarkMode ? "#09090b" : "#1c1917"} className="font-bold text-xs">Final Response</text>
          </svg>
        </div>

        {/* Detailed Explanation */}
        <div className="grid md:grid-cols-2 gap-12 mt-16 pb-20">
          <section className="space-y-6">
            <h3 className={`text-2xl font-serif font-bold ${isDarkMode ? 'text-stone-50' : 'text-legal-dark'}`}>Orchestration Details</h3>
            <div className="space-y-4">
              <div className={`p-6 rounded-xl border shadow-sm transition-colors ${isDarkMode ? 'bg-stone-900 border-stone-800' : 'bg-white border-stone-100'}`}>
                <h4 className={`font-bold mb-2 ${isDarkMode ? 'text-stone-100' : 'text-legal-dark'}`}>1. The Router Phase</h4>
                <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-stone-400' : 'text-stone-600'}`}>
                  Every interaction begins at the <strong>Logic Router</strong>. Depending on the view (Companion, Decoder, or Finder), the system prepares the appropriate payload. For the Finder, we check our internal partner database first to prioritize verified Vidhigya advocates.
                </p>
              </div>
              <div className={`p-6 rounded-xl border shadow-sm transition-colors ${isDarkMode ? 'bg-stone-900 border-stone-800' : 'bg-white border-stone-100'}`}>
                <h4 className={`font-bold mb-2 ${isDarkMode ? 'text-stone-100' : 'text-legal-dark'}`}>2. Model Selection</h4>
                <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-stone-400' : 'text-stone-600'}`}>
                  <strong>Gemini 3 Pro</strong> is reserved for tasks requiring high logical fidelity (legal interpretation). <strong>Gemini 2.5 Flash</strong> handles high-throughput tasks like OCR and Map searches to ensure a snappy user experience.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-6">
            <h3 className={`text-2xl font-serif font-bold ${isDarkMode ? 'text-stone-50' : 'text-legal-dark'}`}>Safety & Grounding</h3>
            <div className="space-y-4">
              <div className={`p-6 rounded-xl border shadow-sm transition-colors ${isDarkMode ? 'bg-stone-900 border-stone-800' : 'bg-white border-stone-100'}`}>
                <h4 className={`font-bold mb-2 ${isDarkMode ? 'text-stone-100' : 'text-legal-dark'}`}>The Grounding Loop</h4>
                <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-stone-400' : 'text-stone-600'}`}>
                  In the <strong>Find Advocates</strong> flow, we don't just rely on training data. We trigger a <code>googleMaps</code> grounding tool that fetches live place data, ensuring users see real addresses, ratings, and URLs.
                </p>
              </div>
              <div className={`p-6 rounded-xl border shadow-sm transition-colors ${isDarkMode ? 'bg-stone-900 border-stone-800' : 'bg-white border-stone-100'}`}>
                <h4 className={`font-bold mb-2 ${isDarkMode ? 'text-stone-100' : 'text-legal-dark'}`}>Privacy Assurance</h4>
                <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-stone-400' : 'text-stone-600'}`}>
                  As shown in the flow, no data leaves the browser for persistent storage. The <strong>Context History</strong> is managed in the client-side state, meaning the session memory exists only as long as your tab is open.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default FlowDiagramView;
