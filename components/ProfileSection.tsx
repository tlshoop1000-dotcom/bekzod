
import React, { useState } from 'react';
import { 
  User as UserIcon, Settings, CreditCard, 
  History, LogOut, ChevronRight, 
  ArrowLeft, QrCode, Download, ExternalLink,
  ShieldCheck, Clock, Receipt, CheckCircle2,
  LayoutDashboard, Gift, Share2, Copy, Check,
  UserCircle
} from 'lucide-react';
import { PlanType, User, Transaction, MerchantConfig } from '../types';
import AdminDashboard from './AdminDashboard';

interface ProfileSectionProps {
  user: User;
  currentPlan: PlanType;
  transactions: Transaction[];
  globalTransactions: Transaction[];
  merchantConfig: MerchantConfig;
  onUpdateMerchant: (config: MerchantConfig) => void;
  onBackToGenerator: () => void;
}

const ProfileSection: React.FC<ProfileSectionProps> = ({ 
  user, 
  currentPlan, 
  transactions, 
  globalTransactions, 
  merchantConfig,
  onUpdateMerchant,
  onBackToGenerator 
}) => {
  const isAdmin = user.email === 'cheffdoda@gmail.com';
  const [activeTab, setActiveTab] = useState<'overview' | 'settings' | 'history' | 'billing' | 'admin' | 'referral'>(isAdmin ? 'admin' : 'overview');
  const [copied, setCopied] = useState(false);

  const sidebarItems = [
    ...(isAdmin ? [{ id: 'admin', icon: LayoutDashboard, label: 'Admin Boshqaruv' }] : []),
    { id: 'overview', icon: UserIcon, label: 'Hisob ma\'lumotlari' },
    { id: 'history', icon: History, label: 'Mening QR kodlarim' },
    { id: 'referral', icon: Gift, label: 'Referral Program' },
    { id: 'billing', icon: Receipt, label: 'To\'lovlar tarixi' },
    { id: 'settings', icon: Settings, label: 'Sozlamalar' },
  ];

  const copyReferral = () => {
    navigator.clipboard.writeText(`https://qrgenius.pro/invite/${user.id}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="py-12 px-4 max-w-6xl mx-auto min-h-[70vh]">
      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={onBackToGenerator}
          className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-all text-slate-400 hover:text-white"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-3xl font-bold">
          {isAdmin ? 'Boshqaruv' : 'Shaxsiy'} <span className="text-sky-400">{isAdmin ? 'Markazi' : 'Kabinet'}</span>
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-2">
          {sidebarItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${
                activeTab === item.id 
                  ? 'bg-sky-600 text-white shadow-lg shadow-sky-600/20' 
                  : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </button>
          ))}
          
          <div className="pt-8 mt-8 border-t border-slate-800">
            <div className="glass p-4 rounded-2xl">
              <p className="text-xs text-slate-500 font-bold uppercase mb-3">Bonus Balans</p>
              <div className="flex items-center gap-2 mb-3">
                <Gift className="w-5 h-5 text-amber-500" />
                <span className="font-bold text-2xl text-white">$12.50</span>
              </div>
              <p className="text-[10px] text-slate-400">Taklif etilgan do'stlar: 3</p>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3">
          <div className="glass rounded-3xl overflow-hidden min-h-[500px]">
            {activeTab === 'admin' && isAdmin && (
              <AdminDashboard 
                transactions={globalTransactions} 
                merchantConfig={merchantConfig} 
                onUpdateMerchant={onUpdateMerchant} 
              />
            )}

            {activeTab === 'referral' && (
              <div className="p-8 animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-2">Do'stlaringizni taklif qiling</h2>
                  <p className="text-slate-400">Har bir taklif etilgan do'stingiz uchun $5 bonus yoki 7 kunlik Premium oling.</p>
                </div>

                <div className="bg-slate-900/50 p-6 rounded-3xl border border-slate-800 mb-8">
                  <p className="text-sm font-medium text-slate-300 mb-4">Sizning referral havolangiz:</p>
                  <div className="flex gap-2">
                    <div className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sky-400 font-mono text-sm truncate">
                      qrgenius.pro/invite/{user.id.substring(0, 8)}
                    </div>
                    <button 
                      onClick={copyReferral}
                      className="px-6 py-3 bg-sky-600 hover:bg-sky-500 rounded-xl font-bold flex items-center gap-2 transition-all"
                    >
                      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      {copied ? 'Nusxalandi' : 'Nusxa'}
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-5 bg-slate-800/50 rounded-2xl text-center">
                    <div className="w-10 h-10 bg-sky-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Share2 className="w-5 h-5 text-sky-400" />
                    </div>
                    <h4 className="font-bold mb-1">Havolani ulashing</h4>
                    <p className="text-xs text-slate-500">Ijtimoiy tarmoqlar orqali tarqating</p>
                  </div>
                  <div className="p-5 bg-slate-800/50 rounded-2xl text-center">
                    <div className="w-10 h-10 bg-amber-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <UserCircle className="w-5 h-5 text-amber-500" />
                    </div>
                    <h4 className="font-bold mb-1">Do'stlar ro'yxatdan o'tadi</h4>
                    <p className="text-xs text-slate-500">Do'stingiz birinchi to'lovni qiladi</p>
                  </div>
                  <div className="p-5 bg-slate-800/50 rounded-2xl text-center">
                    <div className="w-10 h-10 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Gift className="w-5 h-5 text-emerald-500" />
                    </div>
                    <h4 className="font-bold mb-1">Mukofot oling</h4>
                    <p className="text-xs text-slate-500">Bonusingiz avtomatik qo'shiladi</p>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'overview' && (
               <div className="p-8 animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="flex items-center gap-6 mb-8">
                  <div className="relative">
                    <img src={user.avatar} className="w-24 h-24 rounded-full border-4 border-slate-800" alt={user.name} />
                    <div className="absolute bottom-0 right-0 p-2 bg-sky-500 rounded-full border-4 border-slate-900 shadow-lg">
                      <ShieldCheck className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">{user.name}</h2>
                    <p className="text-slate-400">{user.email}</p>
                    <div className="mt-2 inline-flex items-center gap-2 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-wider">
                      {isAdmin ? 'Tizim Administratori' : 'Tasdiqlangan Profil'}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-sm font-bold text-slate-500 uppercase">Shaxsiy ma'lumotlar</h3>
                    <div className="space-y-3">
                      <div>
                        <label className="text-xs text-slate-500 block mb-1">Foydalanuvchi ismi</label>
                        <input disabled value={user.name} className="w-full bg-slate-900/50 border border-slate-800 rounded-lg px-4 py-2 text-slate-300" />
                      </div>
                      <div>
                        <label className="text-xs text-slate-500 block mb-1">Email manzil</label>
                        <input disabled value={user.email} className="w-full bg-slate-900/50 border border-slate-800 rounded-lg px-4 py-2 text-slate-300" />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-sm font-bold text-slate-500 uppercase">Statistika</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800">
                        <p className="text-2xl font-bold text-white">12</p>
                        <p className="text-xs text-slate-500">Jami QR kodlar</p>
                      </div>
                      <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800">
                        <p className="text-2xl font-bold text-white">458</p>
                        <p className="text-xs text-slate-500">Jami skanlar</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'billing' && (
              <div className="p-8 animate-in fade-in slide-in-from-right-4 duration-300">
                <h2 className="text-xl font-bold mb-8">To'lovlar Tarixi</h2>
                {transactions.length > 0 ? (
                  <div className="space-y-4">
                    {transactions.map(tx => (
                      <div key={tx.id} className="p-4 bg-slate-900 border border-slate-800 rounded-xl flex justify-between items-center">
                        <div>
                          <p className="font-bold">{tx.planName}</p>
                          <p className="text-xs text-slate-500">{tx.date} • {tx.id}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-emerald-400">+${tx.amount}</p>
                          <p className="text-[10px] text-emerald-500 uppercase font-bold">Muvaffaqiyatli</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-slate-500 text-center py-20 italic">Hozircha to'lovlar yo'q.</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;
