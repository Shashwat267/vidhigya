
import React, { useState, useRef, useEffect } from 'react';
import Markdown from 'react-markdown';
import { Message } from '../types';
import { getLegalAdvice } from '../services/geminiService';
import { SendIcon, ShieldCheckIcon } from './Icons';

interface AdvisorViewProps {
  isDarkMode?: boolean;
}

const AdvisorView: React.FC<AdvisorViewProps> = ({ isDarkMode }) => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'Namaste. I am **Vidhigya**, your legal companion.\n\nI am here to help you understand the **Indian Constitution** and guide you through legal procedures with care and clarity. \n\nWhether you have questions about filing an FIR, understanding a contract, or knowing your fundamental rights, I am here to listen and explain.\n\n*Note: I am an AI educator, not a lawyer.*' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: Message = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const responseText = await getLegalAdvice(input, messages);
      setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: 'Namaste. I encountered a small issue connecting to the knowledge base. Please ask again.', isError: true }]);
    } finally {
      setIsLoading(false);
    }
  };

  const renderMarkdownComponents = (role: 'user' | 'model') => ({
    p: ({node, ...props}: any) => <p className="mb-4 last:mb-0 leading-relaxed" {...props} />,
    strong: ({node, ...props}: any) => <strong className={`font-bold ${role === 'user' ? 'text-white' : (isDarkMode ? 'text-stone-50 underline decoration-legal-accent/50 underline-offset-4' : 'text-legal-deep underline decoration-legal-accent/30 underline-offset-4')}`} {...props} />,
    em: ({node, ...props}: any) => <em className="italic opacity-80" {...props} />,
    ul: ({node, ...props}: any) => <ul className="list-disc pl-5 mb-5 space-y-2 marker:text-legal-accent" {...props} />,
    ol: ({node, ...props}: any) => <ol className="list-decimal pl-5 mb-5 space-y-2 marker:text-legal-accent" {...props} />,
    li: ({node, ...props}: any) => <li className="pl-1" {...props} />,
    h1: ({node, ...props}: any) => <h1 className={`text-2xl font-serif font-bold mb-5 mt-6 border-b pb-2 ${isDarkMode ? 'text-stone-50 border-stone-800' : 'text-legal-deep border-stone-200'}`} {...props} />,
    h2: ({node, ...props}: any) => <h2 className={`text-xl font-serif font-bold mb-4 mt-5 ${isDarkMode ? 'text-stone-50' : 'text-legal-deep'}`} {...props} />,
    h3: ({node, ...props}: any) => <h3 className={`text-lg font-serif font-bold mb-3 mt-4 ${isDarkMode ? 'text-stone-200' : 'text-stone-800'}`} {...props} />,
    blockquote: ({node, ...props}: any) => <blockquote className={`border-l-4 pl-4 italic my-6 ${role === 'user' ? 'border-white/30' : (isDarkMode ? 'border-legal-accent bg-stone-900/50 py-3 pr-3 rounded-r text-stone-400' : 'border-legal-accent bg-stone-50 py-3 pr-3 rounded-r text-stone-600')}`} {...props} />,
    a: ({node, ...props}: any) => <a className="underline decoration-legal-accent underline-offset-2 hover:text-legal-gold transition-colors font-bold" {...props} target="_blank" rel="noopener noreferrer" />
  });

  return (
    <div className={`flex flex-col h-full relative font-sans overflow-hidden transition-colors duration-500 ${isDarkMode ? 'bg-stone-950' : 'bg-legal-paper'}`}>
      <header className={`glass-header border-b p-6 md:p-8 sticky top-0 z-10 flex items-center justify-between transition-colors ${isDarkMode ? 'border-stone-800' : 'border-stone-200'}`}>
        <div className="flex items-center gap-4">
            <div className={`p-3 rounded-2xl shadow-lg transition-colors ${isDarkMode ? 'bg-stone-900 text-legal-accent' : 'bg-legal-deep text-legal-accent'}`}>
                <ShieldCheckIcon className="w-6 h-6" />
            </div>
            <div>
                <h2 className={`text-2xl font-serif font-bold transition-colors leading-none ${isDarkMode ? 'text-stone-50' : 'text-legal-deep'}`}>Legal Companion</h2>
                <p className="text-[10px] text-stone-500 mt-1 uppercase tracking-[0.2em] font-bold">Expert Reasoning Mode</p>
            </div>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-6 md:p-10 space-y-8 no-scrollbar">
        <div className="max-w-4xl mx-auto space-y-8">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in-up`}>
              <div className={`
                max-w-[85%] rounded-[28px] p-8 text-[16px] leading-relaxed transition-all
                ${msg.role === 'user' 
                  ? (isDarkMode ? 'bg-legal-accent text-stone-950 rounded-tr-none shadow-xl' : 'bg-legal-deep text-white rounded-tr-none shadow-[0_20px_50px_-10px_rgba(15,23,42,0.3)]') 
                  : (isDarkMode ? 'bg-stone-900 text-stone-300 border border-stone-800 rounded-tl-none' : 'bg-white text-stone-700 border border-stone-200 rounded-tl-none')}
                ${msg.isError ? 'border-red-500 bg-red-950/20 text-red-400' : ''}
              `}>
                <Markdown 
                  components={renderMarkdownComponents(msg.role)}
                >
                  {msg.text}
                </Markdown>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className={`border rounded-[28px] rounded-tl-none p-6 shadow-sm flex items-center gap-3 transition-colors ${isDarkMode ? 'bg-stone-900 border-stone-800' : 'bg-white border-stone-200'}`}>
                <div className="flex gap-1.5">
                  <div className="w-2 h-2 bg-legal-accent rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-legal-accent rounded-full animate-bounce delay-150"></div>
                  <div className="w-2 h-2 bg-legal-accent rounded-full animate-bounce delay-300"></div>
                </div>
                <span className="text-xs text-stone-500 font-bold uppercase tracking-widest">Vidhigya is thinking</span>
              </div>
            </div>
          )}
        </div>
        <div ref={messagesEndRef} />
      </div>

      <div className={`p-8 md:p-10 glass-header border-t transition-colors ${isDarkMode ? 'border-stone-800' : 'border-stone-200'}`}>
        <div className="max-w-4xl mx-auto relative group">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Explain your situation..."
            className={`w-full p-6 pr-20 border-2 rounded-[24px] focus:outline-none focus:border-legal-accent focus:ring-4 focus:ring-legal-accent/10 transition-all text-lg placeholder:text-stone-500 ${isDarkMode ? 'bg-stone-900 border-stone-800 text-stone-100' : 'bg-white border-stone-200 text-legal-deep'}`}
            disabled={isLoading}
          />
          <button 
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className={`absolute right-3 top-1/2 -translate-y-1/2 p-4 rounded-2xl transition-all active:scale-90 disabled:opacity-30 disabled:cursor-not-allowed ${isDarkMode ? 'bg-legal-accent text-stone-950 hover:bg-amber-400' : 'bg-legal-deep text-white hover:bg-black'}`}
          >
            <SendIcon />
          </button>
        </div>
        <p className="text-[10px] text-center mt-6 text-stone-600 font-bold uppercase tracking-widest">Stateless & Private Session</p>
      </div>
    </div>
  );
};

export default AdvisorView;
