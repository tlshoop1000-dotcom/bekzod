
import React, { useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { 
  Type, Link, Image as ImageIcon, Video, 
  Download, Palette, Layout, Lock, 
  CloudUpload, Trash2, BarChart3, 
  QrCode as QrIcon, Scan as ScanIcon, FileCode
} from 'lucide-react';
import { PlanType, InputType, QRState, User } from '../types';
import { PLANS } from '../constants';
import QRScanner from './QRScanner';
import { ToastType } from './Toast';

interface QRGeneratorProps {
  currentPlan: PlanType;
  user: User | null;
  showToast: (msg: string, type: ToastType) => void;
}

const QRGenerator: React.FC<QRGeneratorProps> = ({ currentPlan, user, showToast }) => {
  const [activeMode, setActiveMode] = useState<'create' | 'scan'>('create');
  const [state, setState] = useState<QRState>({
    value: 'https://google.com',
    fgColor: '#000000',
    bgColor: '#ffffff',
    inputType: 'url',
    logoImage: undefined,
    analyticsEnabled: false
  });

  const planInfo = PLANS.find(p => p.id === currentPlan)!;
  const isSpecialUser = user?.email === 'cheffdoda@gmail.com';

  const handleDownload = (format: 'png' | 'svg') => {
    const canvas = document.querySelector('#qr-canvas canvas') as HTMLCanvasElement;
    if (canvas) {
      if (format === 'png') {
        const url = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.download = `qr-genius-${Date.now()}.png`;
        link.href = url;
        link.click();
        showToast("QR kod PNG formatda yuklandi", 'success');
      } else {
        if (planInfo.highResExport || isSpecialUser) {
          showToast("SVG format premium foydalanuvchilar uchun tayyorlanmoqda", 'info');
        } else {
          showToast("SVG formati uchun tarifni yangilang", 'error');
        }
      }
    }
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (planInfo.logoUpload || isSpecialUser) {
        const reader = new FileReader();
        reader.onload = (event) => {
          setState(prev => ({ ...prev, logoImage: event.target?.result as string }));
          showToast("Brend logotipi yuklandi", 'success');
        };
        reader.readAsDataURL(file);
      } else {
        showToast("Logo yuklash uchun tarifni yangilang", 'error');
      }
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-center">
        <div className="bg-slate-900 p-1.5 rounded-2xl flex border border-slate-800">
          <button 
            onClick={() => setActiveMode('create')}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold transition-all ${activeMode === 'create' ? 'bg-sky-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
          >
            <QrIcon className="w-4 h-4" />
            Yaratish
          </button>
          <button 
            onClick={() => setActiveMode('scan')}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold transition-all ${activeMode === 'scan' ? 'bg-sky-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
          >
            <ScanIcon className="w-4 h-4" />
            Skanerlash
          </button>
        </div>
      </div>

      {activeMode === 'scan' ? (
        <div className="max-w-2xl mx-auto">
          <QRScanner />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-in fade-in duration-500">
          <div className="lg:col-span-8 space-y-6">
            <div className="glass p-6 rounded-2xl">
              <label className="block text-sm font-semibold mb-4 text-slate-400 uppercase tracking-wider">Tarkib turini tanlang</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { id: 'url', icon: Link, label: 'URL Link' },
                  { id: 'text', icon: Type, label: 'Matn' },
                  { id: 'image', icon: ImageIcon, label: 'Rasm' },
                  { id: 'video', icon: Video, label: 'Video' }
                ].map(type => (
                  <button
                    key={type.id}
                    onClick={() => setState(prev => ({ ...prev, inputType: type.id as InputType }))}
                    className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all ${
                      state.inputType === type.id 
                        ? 'bg-sky-500/10 border-sky-500 text-sky-400' 
                        : 'bg-slate-800/50 border-slate-700 hover:border-slate-600 text-slate-400'
                    }`}
                  >
                    <type.icon className="w-6 h-6 mb-2" />
                    <span className="text-sm font-medium">{type.label}</span>
                  </button>
                ))}
              </div>

              <div className="mt-8">
                <textarea
                  value={state.value}
                  onChange={(e) => setState(prev => ({ ...prev, value: e.target.value }))}
                  placeholder={state.inputType === 'url' ? "https://example.com" : "Matn kiriting..."}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-sky-500/50 transition-all min-h-[120px]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className={`glass p-6 rounded-2xl relative ${!planInfo.colorCustomization && !isSpecialUser ? 'opacity-70 grayscale' : ''}`}>
                {!planInfo.colorCustomization && !isSpecialUser && (
                  <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-slate-900/40 backdrop-blur-[2px] rounded-2xl">
                    <Lock className="w-8 h-8 text-amber-500 mb-2" />
                    <p className="font-bold text-amber-500 text-sm">Premium Kerak</p>
                  </div>
                )}
                <div className="flex items-center gap-2 mb-4">
                  <Palette className="w-5 h-5 text-sky-400" />
                  <h3 className="font-bold">Ranglar</h3>
                </div>
                <div className="space-y-4">
                  <input 
                    type="color" 
                    value={state.fgColor} 
                    onChange={(e) => setState(prev => ({ ...prev, fgColor: e.target.value }))}
                    className="w-full h-10 rounded-lg cursor-pointer bg-slate-900 border-none" 
                  />
                  <input 
                    type="color" 
                    value={state.bgColor} 
                    onChange={(e) => setState(prev => ({ ...prev, bgColor: e.target.value }))}
                    className="w-full h-10 rounded-lg cursor-pointer bg-slate-900 border-none" 
                  />
                </div>
              </div>

              <div className={`glass p-6 rounded-2xl relative ${!planInfo.logoUpload && !isSpecialUser ? 'opacity-70 grayscale' : ''}`}>
                <div className="flex items-center gap-2 mb-4">
                  <Layout className="w-5 h-5 text-sky-400" />
                  <h3 className="font-bold">Brending</h3>
                </div>
                <div className="flex flex-col gap-4">
                  {state.logoImage ? (
                    <div className="relative group w-24 h-24 mx-auto">
                      <img src={state.logoImage} className="w-full h-full object-contain bg-white rounded-lg p-2" alt="Logo" />
                      <button onClick={() => setState(prev => ({ ...prev, logoImage: undefined }))} className="absolute -top-2 -right-2 bg-red-500 p-1.5 rounded-full"><Trash2 className="w-3 h-3 text-white" /></button>
                    </div>
                  ) : (
                    <label className="border-2 border-dashed border-slate-700 rounded-xl p-6 text-center cursor-pointer hover:bg-slate-800 transition-colors">
                      <CloudUpload className="w-8 h-8 text-slate-500 mx-auto mb-2" />
                      <p className="text-xs text-slate-400">Logo yuklash</p>
                      <input type="file" className="hidden" accept="image/*" onChange={handleLogoUpload} disabled={!planInfo.logoUpload && !isSpecialUser} />
                    </label>
                  )}
                </div>
              </div>
            </div>

            <div className={`glass p-6 rounded-2xl relative overflow-hidden transition-all ${!planInfo.advancedAnalytics && !isSpecialUser ? 'bg-slate-900/50 opacity-60' : 'bg-slate-800/40'}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-sky-400" />
                  <h3 className="font-bold">Advanced Analytics</h3>
                </div>
                <button 
                  onClick={() => {
                    if (planInfo.advancedAnalytics || isSpecialUser) {
                      setState(prev => ({ ...prev, analyticsEnabled: !prev.analyticsEnabled }));
                      showToast(state.analyticsEnabled ? "Analitika o'chirildi" : "Analitika yoqildi", 'info');
                    } else {
                      showToast("Analitika uchun tarifni yangilang", 'error');
                    }
                  }}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${state.analyticsEnabled ? 'bg-sky-500' : 'bg-slate-700'}`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${state.analyticsEnabled ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 sticky top-24">
            <div className="glass p-8 rounded-3xl text-center space-y-6">
              <h3 className="text-xl font-bold">Jonli Preview</h3>
              <div id="qr-canvas" className="bg-white p-4 rounded-2xl inline-block shadow-2xl shadow-sky-500/10 mx-auto">
                <QRCodeCanvas
                  value={state.value || 'https://google.com'}
                  size={240}
                  level={"H"}
                  includeMargin={true}
                  fgColor={planInfo.colorCustomization || isSpecialUser ? state.fgColor : '#000000'}
                  bgColor={planInfo.colorCustomization || isSpecialUser ? state.bgColor : '#ffffff'}
                  imageSettings={state.logoImage && (planInfo.logoUpload || isSpecialUser) ? {
                    src: state.logoImage,
                    height: 48,
                    width: 48,
                    excavate: true,
                  } : undefined}
                />
              </div>
              <div className="grid grid-cols-1 gap-3">
                <button 
                  onClick={() => handleDownload('png')}
                  className="w-full bg-sky-600 hover:bg-sky-500 py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-sky-600/20"
                >
                  <Download className="w-5 h-5" />
                  PNG Yuklash
                </button>
                <div className="grid grid-cols-2 gap-3">
                  <button 
                    onClick={() => handleDownload('svg')}
                    className="flex items-center justify-center gap-2 py-3 bg-slate-800 hover:bg-slate-700 rounded-xl text-xs font-bold transition-all border border-slate-700"
                  >
                    <FileCode className="w-4 h-4 text-sky-400" />
                    SVG
                  </button>
                  <button 
                    onClick={() => showToast("PDF eksport faqat Ultra Pro tarifida", 'info')}
                    className="flex items-center justify-center gap-2 py-3 bg-slate-800 hover:bg-slate-700 rounded-xl text-xs font-bold transition-all border border-slate-700"
                  >
                    <ImageIcon className="w-4 h-4 text-emerald-400" />
                    PDF
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QRGenerator;
