
import React, { useState } from 'react';
import { X, CreditCard, ShieldCheck, Lock, ArrowRight, CheckCircle2, Smartphone, Globe } from 'lucide-react';
import { Plan, PlanType, MerchantConfig } from '../types';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (plan: PlanType) => void;
  selectedPlan: Plan;
  merchantConfig: MerchantConfig;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, onSuccess, selectedPlan, merchantConfig }) => {
  const [step, setStep] = useState<'checkout' | 'processing' | 'success'>('checkout');
  const [cardData, setCardData] = useState({ number: '', expiry: '', cvc: '', name: '' });

  if (!isOpen) return null;

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('processing');
    
    // IN REALITY: This is where you call the Merchant API (Click, Payme, or Stripe)
    // Example: fetch('https://api.merchant.uz/pay', { body: JSON.stringify({ to: merchantConfig.cardNumber, amount: selectedPlan.price }) })
    
    setTimeout(() => {
      setStep('success');
      setTimeout(() => {
        onSuccess(selectedPlan.id);
        onClose();
        setStep('checkout');
      }, 1500);
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md" onClick={onClose} />
      
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-[32px] overflow-hidden shadow-2xl animate-in zoom-in duration-300">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 hover:bg-slate-800 rounded-full transition-colors z-10"
        >
          <X className="w-5 h-5 text-slate-400" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left Side: Order Summary */}
          <div className="bg-slate-800/50 p-8 border-r border-slate-700/50">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-sky-400" />
              Xavfsiz To'lov
            </h2>

            <div className="space-y-6">
              <div className="p-4 bg-slate-900/50 rounded-2xl border border-slate-700">
                <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-2">Tanlangan Tarif</p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold">{selectedPlan.name} Plan</span>
                  <span className="text-sky-400 font-bold">${selectedPlan.price}</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl border border-slate-800 bg-slate-950/50">
                <p className="text-[10px] text-slate-500 uppercase font-bold mb-3 tracking-widest">Qabul qiluvchi (Merchant):</p>
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${merchantConfig.provider === 'payme' ? 'bg-sky-500/10 text-sky-400' : 'bg-blue-500/10 text-blue-400'}`}>
                    {merchantConfig.provider === 'payme' ? <Smartphone className="w-5 h-5" /> : <Globe className="w-5 h-5" />}
                  </div>
                  <div>
                    <p className="text-sm font-bold uppercase">{merchantConfig.provider} Merchant</p>
                    <p className="text-[10px] text-slate-500 font-mono">{merchantConfig.cardNumber}</p>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-700 text-xl font-bold flex justify-between items-center">
                <span>Jami:</span>
                <span className="text-white">${selectedPlan.price}.00</span>
              </div>
            </div>
          </div>

          {/* Right Side: Payment Form */}
          <div className="p-8 flex flex-col justify-center min-h-[450px]">
            {step === 'checkout' && (
              <form onSubmit={handlePayment} className="space-y-4 animate-in fade-in duration-500">
                <div className="text-center mb-6">
                  <p className="text-sm text-slate-400 font-medium">To'lovni amalga oshirish uchun karta ma'lumotlarini kiriting.</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-xs text-slate-500 block mb-1">Karta raqami</label>
                    <input 
                      type="text" 
                      placeholder="8600 **** **** ****"
                      required
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-500/50 transition-all font-mono"
                      value={cardData.number}
                      onChange={(e) => setCardData({...cardData, number: e.target.value})}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-slate-500 block mb-1">Muddati</label>
                      <input 
                        type="text" 
                        placeholder="MM/YY"
                        required
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-500/50 transition-all"
                        value={cardData.expiry}
                        onChange={(e) => setCardData({...cardData, expiry: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="text-xs text-slate-500 block mb-1">CVC</label>
                      <input 
                        type="text" 
                        placeholder="•••"
                        required
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-500/50 transition-all"
                        value={cardData.cvc}
                        onChange={(e) => setCardData({...cardData, cvc: e.target.value})}
                      />
                    </div>
                  </div>
                </div>

                <button 
                  type="submit"
                  className="w-full bg-sky-600 hover:bg-sky-500 py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all mt-6 shadow-lg shadow-sky-600/30"
                >
                  To'lash ${selectedPlan.price}.00
                  <ArrowRight className="w-5 h-5" />
                </button>
                <p className="text-[10px] text-center text-slate-500 flex items-center justify-center gap-1">
                  <Lock className="w-3 h-3" />
                  Xavfsiz 256-bit shifrlash
                </p>
              </form>
            )}

            {step === 'processing' && (
              <div className="text-center py-12 animate-in zoom-in duration-500">
                <div className="w-20 h-20 border-4 border-sky-500/20 border-t-sky-500 rounded-full animate-spin mx-auto mb-6" />
                <h3 className="text-xl font-bold mb-2">Merchant Tizimi</h3>
                <p className="text-slate-400">To'lov tasdiqlanmoqda...</p>
                <p className="text-[10px] text-slate-600 mt-4 uppercase font-bold tracking-widest">{merchantConfig.provider} GATEWAY</p>
              </div>
            )}

            {step === 'success' && (
              <div className="text-center py-12 animate-in zoom-in duration-500">
                <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                </div>
                <h3 className="text-2xl font-bold mb-2">To'lov Qabul Qilindi!</h3>
                <p className="text-slate-400">Mablag' merchant hisobiga yo'naltirildi.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
