
import React, { useState, useRef } from 'react';
import Markdown from 'react-markdown';
import { simplifyLegalText } from '../services/geminiService';
import { BookOpenIcon } from './Icons';

// Added props interface to fix TypeScript error in App.tsx
interface SimplifierViewProps {
  isDarkMode?: boolean;
}

const SimplifierView: React.FC<SimplifierViewProps> = ({ isDarkMode }) => {
  const [text, setText] = useState('');
  const [file, setFile] = useState<{ name: string, data: string, mimeType: string } | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      const reader = new FileReader();
      
      reader.onload = (event) => {
        const base64String = event.target?.result as string;
        const base64Data = base64String.split(',')[1];
        
        setFile({
          name: selectedFile.name,
          mimeType: selectedFile.type,
          data: base64Data
        });
      };
      
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSimplify = async () => {
    if (!text.trim() && !file) return;
    setIsLoading(true);
    try {
      const simplified = await simplifyLegalText(
        text, 
        file ? { mimeType: file.mimeType, data: file.data } : undefined
      );
      setResult(simplified);
    } catch (e) {
      setResult("Error processing request. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const markdownComponents = {
    p: ({node, ...props}: any) => <p className={`mb-4 last:mb-0 leading-relaxed ${isDarkMode ? 'text-stone-300' : 'text-stone-800'}`} {...props} />,
    strong: ({node, ...props}: any) => <strong className={`font-bold px-1 rounded ${isDarkMode ? 'text-stone-50 bg-stone-800' : 'text-stone-900 bg-amber-50'}`} {...props} />,
    ul: ({node, ...props}: any) => <ul className={`list-disc pl-5 mb-5 space-y-2 marker:text-stone-400 ${isDarkMode ? 'text-stone-300' : 'text-stone-800'}`} {...props} />,
    ol: ({node, ...props}: any) => <ol className={`list-decimal pl-5 mb-5 space-y-2 marker:text-stone-400 ${isDarkMode ? 'text-stone-300' : 'text-stone-800'}`} {...props} />,
    li: ({node, ...props}: any) => <li className="pl-1" {...props} />,
    h1: ({node, ...props}: any) => <h1 className={`text-2xl font-serif font-bold mb-4 mt-6 border-b pb-2 ${isDarkMode ? 'text-stone-50 border-stone-800' : 'text-legal-dark border-stone-200'}`} {...props} />,
    h2: ({node, ...props}: any) => <h2 className={`text-xl font-serif font-bold mb-3 mt-5 ${isDarkMode ? 'text-stone-50' : 'text-legal-dark'}`} {...props} />,
    h3: ({node, ...props}: any) => <h3 className={`text-lg font-serif font-bold mb-2 mt-4 ${isDarkMode ? 'text-stone-200' : 'text-stone-800'}`} {...props} />,
    blockquote: ({node, ...props}: any) => <blockquote className={`border-l-4 border-legal-accent pl-4 italic my-4 p-4 rounded-r shadow-sm ${isDarkMode ? 'text-stone-400 bg-stone-900' : 'text-stone-600 bg-white'}`} {...props} />,
  };

  return (
    <div className={`flex flex-col h-full overflow-y-auto transition-colors duration-500 ${isDarkMode ? 'bg-stone-950' : 'bg-legal-paper'}`}>
      <header className={`border-b p-6 md:p-8 transition-colors ${isDarkMode ? 'bg-stone-900 border-stone-800' : 'bg-white border-stone-200'}`}>
        <h2 className={`text-3xl font-serif font-bold flex items-center gap-3 ${isDarkMode ? 'text-stone-50' : 'text-legal-dark'}`}>
          <BookOpenIcon className="text-legal-accent w-8 h-8" />
          Vidhigya Decoder
        </h2>
        <p className={`mt-2 max-w-2xl text-lg font-light ${isDarkMode ? 'text-stone-400' : 'text-stone-500'}`}>
          Upload a contract, notice, or legal document to receive a crystal-clear translation in plain English.
        </p>
      </header>

      <div className="p-6 md:p-8 max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-8 h-full">
        {/* Input Section */}
        <div className="flex flex-col gap-4">
          <div className={`p-6 rounded-2xl border shadow-sm flex flex-col h-full relative overflow-hidden transition-colors ${isDarkMode ? 'bg-stone-900 border-stone-800' : 'bg-white border-stone-200'}`}>
             <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-legal-dark to-legal-accent"></div>
             <label className="text-xs font-bold text-stone-400 mb-4 uppercase tracking-widest flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-stone-400"></span>
                Source Document
             </label>
            
            {/* File Upload Area */}
            <div 
              className={`
                border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 mb-6 group cursor-pointer
                ${file 
                  ? 'border-legal-accent bg-amber-50/10' 
                  : (isDarkMode ? 'border-stone-700 hover:border-legal-accent hover:bg-stone-800/50' : 'border-stone-300 hover:border-legal-dark hover:bg-stone-50')}
              `}
              onClick={() => !file && fileInputRef.current?.click()}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="application/pdf,image/png,image/jpeg,image/webp"
                className="hidden"
              />
              
              {!file ? (
                <div>
                  <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform ${isDarkMode ? 'bg-stone-800' : 'bg-stone-100'}`}>
                    <svg className="w-8 h-8 text-stone-400 group-hover:text-legal-accent transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                  </div>
                  <p className={`text-lg font-medium ${isDarkMode ? 'text-stone-300' : 'text-legal-dark'}`}>Drop file here</p>
                  <p className="text-sm text-stone-400 mt-2">PDF, PNG, JPG supported</p>
                </div>
              ) : (
                <div className={`flex items-center justify-between p-4 rounded-lg shadow-sm border transition-colors ${isDarkMode ? 'bg-stone-800 border-stone-700' : 'bg-white border-stone-200'}`}>
                  <div className="flex items-center gap-4 overflow-hidden">
                    <div className="w-12 h-12 bg-stone-900 rounded-lg flex items-center justify-center shrink-0 text-white font-bold text-xs uppercase shadow-md">
                      {file.name.split('.').pop()}
                    </div>
                    <div className="text-left overflow-hidden">
                        <span className={`block text-sm font-bold truncate ${isDarkMode ? 'text-stone-100' : 'text-stone-900'}`}>{file.name}</span>
                        <span className="text-xs text-stone-500">Ready to decode</span>
                    </div>
                  </div>
                  <button 
                    onClick={(e) => { e.stopPropagation(); setFile(null); if(fileInputRef.current) fileInputRef.current.value = ''; }}
                    className="text-stone-400 hover:text-red-600 p-2 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                  </button>
                </div>
              )}
            </div>

            {/* Text Input */}
            <textarea
              className={`flex-1 w-full p-5 border rounded-xl focus:ring-2 focus:ring-legal-accent focus:border-transparent resize-none font-mono text-sm leading-relaxed transition-all ${isDarkMode ? 'bg-stone-950 border-stone-800 text-stone-300 focus:bg-stone-900' : 'bg-stone-50 border-stone-200 text-stone-900 focus:bg-white'}`}
              placeholder={file ? "Add specific questions (e.g., 'Is this rent agreement fair?')..." : "Or paste legal text here directly..."}
              value={text}
              onChange={(e) => setText(e.target.value)}
            />

            <button
              onClick={handleSimplify}
              disabled={isLoading || (!text.trim() && !file)}
              className={`mt-6 w-full py-4 px-6 rounded-xl font-semibold transition-all disabled:opacity-50 shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 ${isDarkMode ? 'bg-legal-accent text-stone-950 hover:bg-amber-400' : 'bg-legal-dark text-white hover:bg-stone-800'}`}
            >
              {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                      <span className={`w-4 h-4 border-2 rounded-full animate-spin ${isDarkMode ? 'border-stone-900/30 border-t-stone-900' : 'border-white/30 border-t-white'}`}></span>
                      Decoding...
                  </span>
              ) : 'Simplify & Explain'}
            </button>
          </div>
        </div>

        {/* Output Section */}
        <div className="flex flex-col h-full min-h-[500px]">
          <div className={`border rounded-2xl p-8 shadow-sm h-full flex flex-col relative transition-colors ${isDarkMode ? 'bg-stone-900 border-stone-800' : 'bg-white border-stone-200'}`}>
             <div className="absolute top-0 left-0 w-full h-1 bg-stone-100 opacity-10"></div>
             <label className="text-xs font-bold text-stone-400 mb-6 uppercase tracking-widest flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-legal-accent"></span>
                Vidhigya Analysis
             </label>

            {result ? (
              <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                  <div className="prose prose-stone prose-headings:font-serif max-w-none">
                    <Markdown components={markdownComponents}>
                      {result}
                    </Markdown>
                  </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-stone-300 opacity-50">
                <div className={`w-20 h-20 border-2 border-dashed rounded-2xl flex items-center justify-center mb-4 ${isDarkMode ? 'border-stone-700' : 'border-stone-200'}`}>
                    <BookOpenIcon className="w-8 h-8" />
                </div>
                <p className="font-serif italic text-lg text-stone-400 text-center px-4">Simplified insights will appear here</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimplifierView;
