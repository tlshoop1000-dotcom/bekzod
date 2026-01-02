
import React, { useState } from 'react';
import { 
  DollarSign, Users, Activity, ArrowUpRight, 
  ArrowDownRight, ShoppingBag, Clock, Shield,
  CreditCard, Smartphone, Save, Globe, AlertCircle
} from 'lucide-react';
import { Transaction, MerchantConfig } from '../types';

interface AdminDashboardProps {
  transactions: Transaction[];
  merchantConfig: MerchantConfig;
  onUpdateMerchant: (config: MerchantConfig) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ transactions, merchantConfig, onUpdateMerchant }) => {
  const [localConfig, setLocalConfig] = useState<MerchantConfig>(merchantConfig);
  const [isSaving, setIsSaving] = useState(false);
  
  const totalRevenue = transactions.reduce((acc, tx) => acc + tx.amount, 0);
  const successfulTx = transactions.filter(t => t.status === 'Muvaffaqiyatli').length;

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      onUpdateMerchant(localConfig);
      setIsSaving(false);
      alert("Sozlamalar saqlandi! Endi barcha to'lovlar ushbu hisobga yo'naltiriladi.");
    }, 1000);
  };

  return (
    <div className="p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold flex items-center gap-3">
            <Shield className="w-8 h-8 text-sky-400" />
            Merchant <span className="text-sky-400">Panel</span>
          </h2>
          <p className="text-slate-400 text-sm">Sayt egasi uchun moliyaviy boshqaruv markazi</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
          <span className="text-emerald-400 text-sm font-bold">To'lov Tizimi Faol</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="glass p-6 rounded-2xl border-l-4 border-l-sky-500">
          <p className="text-slate-400 text-xs font-bold uppercase mb-2">Umumiy Daromad</p>
          <h3 className="text-3xl font-bold">${totalRevenue.toLocaleString()}.00</h3>
          <div className="mt-4 flex items-center gap-2 text-emerald-400 text-xs font-bold">
            <ArrowUpRight className="w-4 h-4" /> +24% o'sish
          </div>
        </div>
        <div className="glass p-6 rounded-2xl border-l-4 border-l-emerald-500">
          <p className="text-slate-400 text-xs font-bold uppercase mb-2">Muvaffaqiyatli Sotuvlar</p>
          <h3 className="text-3xl font-bold">{successfulTx}</h3>
          <div className="mt-4 text-slate-500 text-xs font-bold">Jami {transactions.length} urinishdan</div>
        </div>
        <div className="glass p-6 rounded-2xl border-l-4 border-l-amber-500">
          <p className="text-slate-400 text-xs font-bold uppercase mb-2">Sizning Balansingiz</p>
          <h3 className="text-3xl font-bold text-amber-400">${totalRevenue}.00</h3>
          <button className="mt-4 text-xs bg-amber-500/10 hover:bg-amber-500/20 text-amber-500 px-3 py-1.5 rounded-lg transition-colors font-bold">Yechib Olish</button>
        </div>
        <div className="glass p-6 rounded-2xl border-l-4 border-l-purple-500">
          <p className="text-slate-400 text-xs font-bold uppercase mb-2">Konversiya Rate</p>
          <h3 className="text-3xl font-bold">4.2%</h3>
          <div className="mt-4 text-slate-500 text-xs font-bold">O'rtacha check: $25.00</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Merchant Settings */}
        <div className="glass p-8 rounded-3xl">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <CreditCard className="w-6 h-6 text-sky-400" />
            To'lov Sozlamalari (Pul qabul qilish)
          </h3>
          
          <div className="space-y-6">
            <div className="p-4 bg-sky-500/5 border border-sky-500/10 rounded-2xl flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
              <p className="text-xs text-sky-400/80 leading-relaxed">
                Bu yerda ko'rsatilgan karta yoki Merchant ID orqali barcha foydalanuvchi to'lovlari sizning hisobingizga borib tushadi.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => setLocalConfig({...localConfig, provider: 'payme'})}
                className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${localConfig.provider === 'payme' ? 'bg-sky-500/10 border-sky-500 text-sky-400' : 'bg-slate-900 border-slate-800'}`}
              >
                <Smartphone className="w-6 h-6" />
                <span className="text-sm font-bold">Payme</span>
              </button>
              <button 
                onClick={() => setLocalConfig({...localConfig, provider: 'click'})}
                className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${localConfig.provider === 'click' ? 'bg-blue-500/10 border-blue-500 text-blue-400' : 'bg-slate-900 border-slate-800'}`}
              >
                <Globe className="w-6 h-6" />
                <span className="text-sm font-bold">Click</span>
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs text-slate-500 block mb-1 font-bold uppercase">Karta Raqamingiz (Yoki Merchant ID)</label>
                <input 
                  type="text" 
                  value={localConfig.cardNumber}
                  onChange={(e) => setLocalConfig({...localConfig, cardNumber: e.target.value})}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 focus:ring-2 focus:ring-sky-500 outline-none transition-all font-mono"
                  placeholder="8600 **** **** ****"
                />
              </div>
              <div>
                <label className="text-xs text-slate-500 block mb-1 font-bold uppercase">Secret Key / Provider ID</label>
                <input 
                  type="password" 
                  value={localConfig.merchantId}
                  onChange={(e) => setLocalConfig({...localConfig, merchantId: e.target.value})}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 focus:ring-2 focus:ring-sky-500 outline-none transition-all font-mono"
                  placeholder="••••••••••••"
                />
              </div>
            </div>

            <button 
              onClick={handleSave}
              disabled={isSaving}
              className="w-full bg-sky-600 hover:bg-sky-500 py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-sky-600/20"
            >
              {isSaving ? <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" /> : <Save className="w-5 h-5" />}
              Sozlamalarni Saqlash
            </button>
          </div>
        </div>

        {/* Transactions list */}
        <div className="glass rounded-3xl overflow-hidden">
          <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-900/50">
            <h3 className="font-bold flex items-center gap-2">
              <Clock className="w-5 h-5 text-slate-400" />
              Real Vaqtdagi To'lovlar
            </h3>
            <span className="text-[10px] bg-sky-500/10 text-sky-400 px-2 py-1 rounded font-bold uppercase">Live Log</span>
          </div>
          <div className="p-0 max-h-[400px] overflow-y-auto custom-scrollbar">
            {transactions.length > 0 ? (
              <table className="w-full text-left">
                <thead className="sticky top-0 bg-slate-900/90 backdrop-blur-md">
                  <tr className="text-slate-500 text-[10px] font-bold uppercase tracking-wider border-b border-slate-800">
                    <th className="py-4 px-6">Xaridor</th>
                    <th className="py-4 px-6">Plan</th>
                    <th className="py-4 px-6">Summa</th>
                    <th className="py-4 px-6">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {transactions.map((tx) => (
                    <tr key={tx.id} className="text-sm hover:bg-slate-800/30 transition-colors">
                      <td className="py-4 px-6">
                        <div className="font-bold">{tx.customerEmail.split('@')[0]}</div>
                        <div className="text-[10px] text-slate-500 truncate max-w-[120px]">{tx.customerEmail}</div>
                      </td>
                      <td className="py-4 px-6 text-xs">{tx.planName}</td>
                      <td className="py-4 px-6 font-bold text-sky-400">${tx.amount}</td>
                      <td className="py-4 px-6">
                        <span className="text-emerald-400 font-bold text-[10px] uppercase">Muvaffaqiyatli</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="py-20 text-center text-slate-500">
                <ShoppingBag className="w-12 h-12 mx-auto mb-4 opacity-10" />
                <p>Hozircha sotuvlar yo'q</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
