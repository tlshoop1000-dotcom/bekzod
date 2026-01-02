
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import QRGenerator from './components/QRGenerator';
import Pricing from './components/Pricing';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import ProfileSection from './components/ProfileSection';
import PaymentModal from './components/PaymentModal';
import AIChat from './components/AIChat';
import Toast, { ToastType } from './components/Toast';
import { PlanType, User, Plan, Transaction, MerchantConfig } from './types';
import { PLANS } from './constants';

const App: React.FC = () => {
  const [currentPlan, setCurrentPlan] = useState<PlanType>(PlanType.FREE);
  const [user, setUser] = useState<User | null>(null);
  const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);
  
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem('qrgenius_transactions');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [merchantConfig, setMerchantConfig] = useState<MerchantConfig>(() => {
    const saved = localStorage.getItem('qrgenius_merchant');
    return saved ? JSON.parse(saved) : {
      merchantId: '88005553535',
      cardNumber: '9860 **** **** 1234',
      provider: 'payme',
      isActive: true
    };
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedPlanToBuy, setSelectedPlanToBuy] = useState<Plan | null>(null);
  const [view, setView] = useState<'home' | 'profile'>('home');

  useEffect(() => {
    localStorage.setItem('qrgenius_transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('qrgenius_merchant', JSON.stringify(merchantConfig));
  }, [merchantConfig]);

  const showToast = (message: string, type: ToastType = 'success') => {
    setToast({ message, type });
  };

  const handleUpgrade = (planId: PlanType) => {
    if (!user) {
      setIsAuthModalOpen(true);
      return;
    }
    
    const plan = PLANS.find(p => p.id === planId);
    if (!plan) return;

    if (planId === PlanType.FREE) {
      setCurrentPlan(planId);
      showToast("Bepul tarifga o'tildi", 'info');
      return;
    }

    if (user.email === 'cheffdoda@gmail.com') {
      setCurrentPlan(planId);
      showToast("Admin uchun tarif avtomatik yangilandi", 'success');
      return;
    }

    setSelectedPlanToBuy(plan);
    setIsPaymentModalOpen(true);
  };

  const handlePaymentSuccess = (planId: PlanType) => {
    const plan = PLANS.find(p => p.id === planId);
    if (plan) {
      const newTx: Transaction = {
        id: `TX-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
        planName: plan.name,
        amount: plan.price,
        date: new Date().toLocaleDateString('uz-UZ'),
        status: 'Muvaffaqiyatli',
        customerEmail: user?.email || 'guest@example.com'
      };
      setTransactions(prev => [newTx, ...prev]);
    }

    setCurrentPlan(planId);
    setIsPaymentModalOpen(false);
    setView('home');
    showToast("To'lov muvaffaqiyatli! Tarif yangilandi.", 'success');
    
    setTimeout(() => {
      const generatorSection = document.getElementById('generator');
      if (generatorSection) generatorSection.scrollIntoView({ behavior: 'smooth' });
    }, 500);
  };

  const handleAuthSuccess = (loggedUser: User) => {
    setUser(loggedUser);
    showToast(`Xush kelibsiz, ${loggedUser.name}!`, 'success');
    if (loggedUser.email === 'cheffdoda@gmail.com') {
      setCurrentPlan(PlanType.YEARLY);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPlan(PlanType.FREE);
    setView('home');
    showToast("Tizimdan chiqildi", 'info');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-sky-500/30">
      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={() => setToast(null)} 
        />
      )}

      <Header 
        currentPlan={currentPlan} 
        user={user}
        onAuthClick={() => setIsAuthModalOpen(true)}
        onLogout={handleLogout}
        onProfileClick={() => { setView('profile'); window.scrollTo(0, 0); }}
        onLogoClick={() => { setView('home'); window.scrollTo(0, 0); }}
        onUpgradeClick={() => {
          setView('home');
          setTimeout(() => {
            document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        }} 
      />
      
      <main>
        {view === 'home' ? (
          <>
            <Hero />
            <div id="generator" className="py-20 px-4">
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">QR Markazi</h2>
                  <p className="text-slate-400">
                    Sizning joriy tarifingiz: <span className="text-sky-400 font-semibold uppercase">{currentPlan}</span>
                  </p>
                </div>
                <QRGenerator currentPlan={currentPlan} user={user} showToast={showToast} />
              </div>
            </div>
            <div id="pricing" className="py-20 bg-slate-900/50">
              <Pricing onSelectPlan={handleUpgrade} activePlan={currentPlan} isLoggedIn={!!user} />
            </div>
          </>
        ) : (
          <ProfileSection 
            user={user!} 
            currentPlan={currentPlan} 
            transactions={transactions.filter(t => t.customerEmail === user?.email)}
            globalTransactions={transactions}
            merchantConfig={merchantConfig}
            onUpdateMerchant={(config) => {
              setMerchantConfig(config);
              showToast("Merchant sozlamalari saqlandi", 'success');
            }}
            onBackToGenerator={() => setView('home')}
          />
        )}
      </main>

      <Footer />
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} onSuccess={handleAuthSuccess} />
      {selectedPlanToBuy && (
        <PaymentModal 
          isOpen={isPaymentModalOpen} 
          onClose={() => setIsPaymentModalOpen(false)} 
          selectedPlan={selectedPlanToBuy} 
          merchantConfig={merchantConfig} 
          onSuccess={handlePaymentSuccess} 
        />
      )}
      <AIChat />
    </div>
  );
};

export default App;
