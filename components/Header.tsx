
import React, { useState } from 'react';
import { QrCode, Crown, User as UserIcon, LogOut, ChevronDown, UserCircle } from 'lucide-react';
import { PlanType, User } from '../types';

interface HeaderProps {
  currentPlan: PlanType;
  user: User | null;
  onAuthClick: () => void;
  onLogout: () => void;
  onProfileClick: () => void;
  onLogoClick: () => void;
  onUpgradeClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ currentPlan, user, onAuthClick, onLogout, onProfileClick, onLogoClick, onUpgradeClick }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <header className="sticky top-0 z-50 glass border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div 
          className="flex items-center gap-2 cursor-pointer group" 
          onClick={onLogoClick}
        >
          <div className="bg-sky-500 p-1.5 rounded-lg group-hover:scale-110 transition-transform">
            <QrCode className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight">QRGenius <span className="text-sky-400">Pro</span></span>
        </div>

        <nav className="hidden lg:flex items-center gap-8">
          <button onClick={onLogoClick} className="hover:text-sky-400 transition-colors text-sm font-medium">Bosh sahifa</button>
          <a href="#generator" className="hover:text-sky-400 transition-colors text-sm font-medium">Generator</a>
          <a href="#pricing" className="hover:text-sky-400 transition-colors text-sm font-medium">Tariflar</a>
        </nav>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-slate-800 rounded-full border border-slate-700">
            <Crown className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-medium uppercase">{currentPlan}</span>
          </div>

          {user ? (
            <div className="relative">
              <button 
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center gap-2 pl-2 pr-1 py-1 rounded-full bg-slate-800 border border-slate-700 hover:bg-slate-750 transition-all"
              >
                <img src={user.avatar} className="w-7 h-7 rounded-full" alt={user.name} />
                <span className="text-sm font-medium hidden sm:inline-block max-w-[100px] truncate">{user.name}</span>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
              </button>

              {showDropdown && (
                <>
                  <div className="fixed inset-0 z-[-1]" onClick={() => setShowDropdown(false)} />
                  <div className="absolute right-0 mt-2 w-56 glass border border-slate-700 rounded-2xl shadow-xl py-2 animate-in fade-in slide-in-from-top-2">
                    <div className="px-4 py-3 border-b border-slate-800 mb-2">
                      <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Profil</p>
                      <p className="text-sm font-bold truncate">{user.name}</p>
                      <p className="text-xs text-slate-400 truncate">{user.email}</p>
                    </div>
                    <button 
                      onClick={() => {
                        onProfileClick();
                        setShowDropdown(false);
                      }}
                      className="w-full flex items-center gap-2 px-4 py-2.5 hover:bg-slate-800 transition-colors text-sm"
                    >
                      <UserCircle className="w-4 h-4 text-sky-400" />
                      Mening profilim
                    </button>
                    <button 
                      onClick={() => {
                        onLogout();
                        setShowDropdown(false);
                      }}
                      className="w-full flex items-center gap-2 px-4 py-2.5 hover:bg-red-500/10 text-red-400 transition-colors text-sm font-medium"
                    >
                      <LogOut className="w-4 h-4" />
                      Chiqish
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <button 
              onClick={onAuthClick}
              className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-xl text-sm font-semibold transition-all border border-slate-700"
            >
              <UserIcon className="w-4 h-4" />
              Kirish
            </button>
          )}

          <button 
            onClick={onUpgradeClick}
            className="bg-sky-600 hover:bg-sky-500 text-white px-4 py-2 rounded-xl text-sm font-bold transition-all shadow-lg shadow-sky-600/20"
          >
            Upgrade
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
