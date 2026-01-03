import React, { useState, useRef, useEffect } from 'react';
import Markdown from 'react-markdown';
import { Message } from '../types';
import { getLegalAdvice } from '../services/geminiService';
import { SendIcon, ShieldCheckIcon } from './Icons';

const AdvisorView: React.FC = () => {
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
    p: ({node, ...props}: any) => <p className="mb-3 last:mb-0 leading-7" {...props} />,
    strong: ({node, ...props}: any) => <strong className={`font-bold ${role === 'user' ? 'text-stone-50' : 'text-stone-900'}`} {...props} />,
    em: ({node, ...props}: any) => <em className="italic opacity-80" {...props} />,
    ul: ({node, ...props}: any) => <ul className="list-disc pl-5 mb-4 space-y-1 marker:text-legal-accent" {...props} />,
    ol: ({node, ...props}: any) => <ol className="list-decimal pl-5 mb-4 space-y-1 marker:text-legal-accent" {...props} />,
    li: ({node, ...props}: any) => <li className="pl-1" {...props} />,
    h1: ({node, ...props}: any) => <h1 className="text-xl font-serif font-bold mb-3 mt-4 text-stone-900 border-b border-stone-200 pb-1" {...props} />,
    h2: ({node, ...props}: any) => <h2 className="text-lg font-serif font-bold mb-2 mt-3 text-stone-900" {...props} />,
    h3: ({node, ...props}: any) => <h3 className="text-md font-serif font-bold mb-2 mt-2 text-stone-800" {...props} />,
    blockquote: ({node, ...props}: any) => <blockquote className={`border-l-4 pl-4 italic my-4 ${role === 'user' ? 'border-stone-500' : 'border-legal-accent bg-stone-50 py-2 pr-2 rounded-r text-stone-600'}`} {...props} />,
    a: ({node, ...props}: any) => <a className="underline decoration-legal-accent underline-offset-2 hover:text-legal-accent transition-colors font-medium" {...props} target="_blank" rel="noopener noreferrer" />
  });

  return (
    <div className="flex flex-col h-full bg-legal-paper relative font-sans">
      <header className="bg-white/80 backdrop-blur-md border-b border-stone-200 p-5 sticky top-0 z-10 shadow-sm flex items-center justify-between">
        <div>
            <h2 className="text-xl font-serif font-bold text-stone-900 flex items-center gap-2">
            <ShieldCheckIcon className="text-legal-accent w-6 h-6" />
            Vidhigya Companion
            </h2>
            <p className="text-xs text-stone-500 mt-1 uppercase tracking-wider font-semibold pl-8">Your Rights, Simplified</p>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}>
            <div className={`
              max-w-[90%] md:max-w-[80%] rounded-2xl p-6 shadow-sm text-[15px]
              ${msg.role === 'user' 
                ? 'bg-stone-800 text-stone-100 rounded-br-none shadow-md' 
                : 'bg-white text-stone-700 border border-stone-100 rounded-bl-none shadow-sm'}
              ${msg.isError ? 'border-red-200 bg-red-50 text-red-800' : ''}
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
            <div className="bg-white border border-stone-100 rounded-2xl p-5 shadow-sm flex items-center gap-2 rounded-bl-none">
              <span className="text-xs text-stone-400 font-medium mr-2">Vidhigya is thinking</span>
              <div className="w-1.5 h-1.5 bg-legal-accent rounded-full animate-bounce"></div>
              <div className="w-1.5 h-1.5 bg-legal-accent rounded-full animate-bounce delay-100"></div>
              <div className="w-1.5 h-1.5 bg-legal-accent rounded-full animate-bounce delay-200"></div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 md:p-6 bg-white border-t border-stone-200">
        <div className="max-w-4xl mx-auto flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about your rights or explain your situation..."
            className="flex-1 p-4 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-stone-800 focus:bg-white transition-all placeholder:text-stone-400"
            disabled={isLoading}
          />
          <button 
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="bg-legal-dark text-white p-4 rounded-xl hover:bg-stone-800 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95"
          >
            <SendIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdvisorView;