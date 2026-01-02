
import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, X, Sparkles, MessageSquare } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

const AIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'bot'; text: string }[]>([
    { role: 'bot', text: "Salom! Men QRGenius yordamchisiman. Sizga qanday yordam bera olaman?" }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userMessage,
        config: {
          systemInstruction: "You are a helpful assistant for QRGenius Pro, a QR code generation service in Uzbekistan. You help users create QR codes for images, videos, and text. You can explain pricing plans (Free, Monthly: $5, Quarterly: $10, Yearly: $70). Keep responses helpful, concise, and in Uzbek language unless asked otherwise.",
        },
      });

      const botResponse = response.text || "Kechirasiz, hozircha javob bera olmayman.";
      setMessages(prev => [...prev, { role: 'bot', text: botResponse }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'bot', text: "Tizimda xatolik yuz berdi. Iltimos, keyinroq urinib ko'ring." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100]">
      {!isOpen ? (
        <button 
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 bg-sky-600 hover:bg-sky-500 rounded-full shadow-2xl flex items-center justify-center text-white transition-all hover:scale-110 group relative"
        >
          <div className="absolute -top-12 right-0 bg-slate-800 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
            AI Yordamchi
          </div>
          <MessageSquare className="w-7 h-7" />
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-slate-950" />
        </button>
      ) : (
        <div className="w-[350px] sm:w-[400px] h-[550px] glass rounded-[32px] overflow-hidden flex flex-col shadow-2xl animate-in slide-in-from-bottom-8 duration-300">
          {/* Header */}
          <div className="p-5 bg-sky-600 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-white font-bold text-sm">QRGenius AI</h3>
                <p className="text-sky-100 text-[10px] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                  Online yordam
                </p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 p-5 overflow-y-auto space-y-4 custom-scrollbar">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                  msg.role === 'user' 
                    ? 'bg-sky-600 text-white rounded-tr-none' 
                    : 'bg-slate-800 text-slate-200 rounded-tl-none border border-slate-700'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-slate-800 p-3 rounded-2xl rounded-tl-none border border-slate-700">
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce" />
                    <div className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <div className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-slate-800 bg-slate-900/50">
            <div className="relative">
              <input 
                type="text"
                placeholder="Savolingizni yozing..."
                className="w-full bg-slate-800 border border-slate-700 rounded-xl py-3 pl-4 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/50 transition-all"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              />
              <button 
                onClick={handleSend}
                disabled={isTyping}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-sky-600 hover:bg-sky-500 rounded-lg text-white disabled:opacity-50 transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <p className="text-[10px] text-center text-slate-500 mt-2 flex items-center justify-center gap-1">
              <Sparkles className="w-3 h-3 text-sky-500" />
              Gemini AI tomonidan quvvatlanadi
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIChat;
