
import React from 'react';
import { ArrowRight, Sparkles, Shield, Zap } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative pt-24 pb-16 px-4 overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-sky-500/10 blur-[120px] rounded-full -z-10" />
      
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-sm font-medium mb-8">
          <Sparkles className="w-4 h-4" />
          <span>Yangi: Video QR endi mavjud!</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight leading-tight">
          Har qanday faylni <br />
          <span className="gradient-text">Zamonaviy QR</span> kodga aylantiring
        </h1>
        
        <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
          Matn, rasm yoki videolaringiz uchun chiroyli va professional QR kodlar yarating. Brendingizga mos ranglar va logolar bilan boyiting.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a 
            href="#generator"
            className="w-full sm:w-auto px-8 py-4 bg-white text-slate-950 rounded-xl font-bold text-lg flex items-center justify-center gap-2 hover:bg-sky-50 transition-all group"
          >
            Hozir boshlash
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
          <a 
            href="#pricing"
            className="w-full sm:w-auto px-8 py-4 bg-slate-800 text-white rounded-xl font-bold text-lg border border-slate-700 hover:bg-slate-700 transition-all"
          >
            Tariflarni ko'rish
          </a>
        </div>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center">
              <Zap className="w-6 h-6 text-sky-400" />
            </div>
            <h3 className="font-semibold text-lg">Tezkor</h3>
            <p className="text-sm text-slate-400">1 soniyada tayyor bo'ladi</p>
          </div>
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-emerald-400" />
            </div>
            <h3 className="font-semibold text-lg">Xavfsiz</h3>
            <p className="text-sm text-slate-400">Fayllaringiz himoyalangan</p>
          </div>
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center">
              <QrCode className="w-6 h-6 text-indigo-400" />
            </div>
            <h3 className="font-semibold text-lg">Yuqori sifat</h3>
            <p className="text-sm text-slate-400">Vektor va HD formatlar</p>
          </div>
        </div>
      </div>
    </section>
  );
};

import { QrCode } from 'lucide-react';
export default Hero;
