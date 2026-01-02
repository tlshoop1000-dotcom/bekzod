
import React from 'react';
import { Check, Crown, Zap, Flame } from 'lucide-react';
import { PlanType } from '../types';
import { PLANS } from '../constants';

interface PricingProps {
  onSelectPlan: (plan: PlanType) => void;
  activePlan: PlanType;
  isLoggedIn: boolean;
}

const Pricing: React.FC<PricingProps> = ({ onSelectPlan, activePlan, isLoggedIn }) => {
  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold mb-4">Har qanday brend uchun mos tariflar</h2>
        <p className="text-slate-400 max-w-2xl mx-auto">
          Ehtiyojingizga qarab tarifni tanlang. Istalgan vaqtda boshqa tarifga o'tishingiz mumkin.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {PLANS.map((plan) => {
          const isActive = activePlan === plan.id;
          const isFeatured = plan.id === PlanType.QUARTERLY;
          
          return (
            <div 
              key={plan.id}
              className={`relative flex flex-col p-8 rounded-3xl transition-all border ${
                isFeatured 
                  ? 'bg-slate-800 border-sky-500 scale-105 shadow-2xl shadow-sky-500/20' 
                  : 'bg-slate-900 border-slate-800 hover:border-slate-700'
              }`}
            >
              {isFeatured && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-sky-500 text-white text-xs font-bold rounded-full flex items-center gap-1">
                  <Flame className="w-3 h-3" />
                  OMMABOP
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold">${plan.price}</span>
                  <span className="text-slate-400 text-sm">/ {plan.duration}</span>
                </div>
              </div>

              <ul className="flex-1 space-y-4 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm">
                    <Check className="w-4 h-4 text-sky-400 mt-0.5" />
                    <span className="text-slate-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => onSelectPlan(plan.id)}
                disabled={isActive && isLoggedIn}
                className={`w-full py-3 rounded-xl font-bold transition-all ${
                  isActive && isLoggedIn
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50 cursor-default'
                    : isFeatured
                    ? 'bg-sky-500 hover:bg-sky-400 text-white'
                    : 'bg-slate-800 hover:bg-slate-750 text-white'
                }`}
              >
                {isActive && isLoggedIn ? 'Faol' : isLoggedIn ? 'Tanlash' : 'Kirish va Upgrade'}
              </button>
            </div>
          );
        })}
      </div>

      <div className="mt-16 glass p-8 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-amber-500/10 rounded-2xl flex items-center justify-center">
            <Crown className="w-6 h-6 text-amber-500" />
          </div>
          <div>
            <h4 className="font-bold text-lg">Maxsus korporativ tarif kerakmi?</h4>
            <p className="text-slate-400 text-sm">Katta jamoalar va cheksiz imkoniyatlar uchun biz bilan bog'laning.</p>
          </div>
        </div>
        <button className="px-6 py-3 bg-white text-slate-900 rounded-xl font-bold hover:bg-sky-50 transition-colors whitespace-nowrap">
          Bog'lanish
        </button>
      </div>
    </div>
  );
};

export default Pricing;
