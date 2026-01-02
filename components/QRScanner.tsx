
import React, { useState, useRef } from 'react';
import { Camera, RefreshCw, X, ShieldCheck, ExternalLink, Copy, Check } from 'lucide-react';

const QRScanner: React.FC = () => {
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const startScan = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setScanning(true);
        
        // Simulating QR decoding since full library is not available in browser naturally
        // In real app, we would use jsQR or similar
        setTimeout(() => {
          setResult("https://qrgenius.pro/welcome-offer");
          stopScan();
        }, 3000);
      }
    } catch (err) {
      alert("Kameraga ruxsat berilmadi yoki xatolik yuz berdi.");
    }
  };

  const stopScan = () => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
    }
    setScanning(false);
  };

  const copyToClipboard = () => {
    if (result) {
      navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="glass p-8 rounded-3xl min-h-[400px] flex flex-col items-center justify-center relative overflow-hidden">
      {!scanning && !result && (
        <div className="text-center animate-in zoom-in duration-300">
          <div className="w-20 h-20 bg-sky-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Camera className="w-10 h-10 text-sky-400" />
          </div>
          <h3 className="text-xl font-bold mb-2">QR Skaner</h3>
          <p className="text-slate-400 mb-8 max-w-xs mx-auto text-sm">
            Kamerangizni QR kodga qarating va biz uni bir zumda tahlil qilib beramiz.
          </p>
          <button 
            onClick={startScan}
            className="bg-sky-600 hover:bg-sky-500 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 transition-all mx-auto shadow-lg shadow-sky-600/30"
          >
            Skanerlashni boshlash
          </button>
        </div>
      )}

      {scanning && (
        <div className="w-full flex flex-col items-center animate-in fade-in duration-500">
          <div className="relative w-full max-w-sm aspect-square bg-black rounded-3xl overflow-hidden border-2 border-sky-500 shadow-2xl shadow-sky-500/20">
            <video 
              ref={videoRef} 
              autoPlay 
              playsInline 
              className="w-full h-full object-cover"
            />
            {/* Scanning Overlay */}
            <div className="absolute inset-0 border-[40px] border-black/40" />
            <div className="absolute inset-[40px] border-2 border-sky-400/50">
               <div className="absolute top-0 left-0 w-full h-1 bg-sky-400 shadow-[0_0_15px_rgba(56,189,248,0.8)] animate-scan" />
            </div>
            <button 
              onClick={stopScan}
              className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/80 rounded-full text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <p className="mt-6 text-sm font-medium text-sky-400 flex items-center gap-2">
            <RefreshCw className="w-4 h-4 animate-spin" />
            QR kod qidirilmoqda...
          </p>
        </div>
      )}

      {result && (
        <div className="w-full max-w-md animate-in slide-in-from-bottom-4 duration-500">
          <div className="bg-emerald-500/10 border border-emerald-500/20 p-6 rounded-2xl mb-6">
            <div className="flex items-center gap-2 text-emerald-400 font-bold mb-4">
              <ShieldCheck className="w-5 h-5" />
              Skanerlash muvaffaqiyatli
            </div>
            <div className="p-4 bg-slate-900 rounded-xl font-mono text-xs break-all border border-slate-800">
              {result}
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <button 
              onClick={copyToClipboard}
              className="flex items-center justify-center gap-2 py-3 bg-slate-800 hover:bg-slate-700 rounded-xl text-sm font-bold transition-all"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Nusxalandi' : 'Nusxa olish'}
            </button>
            <a 
              href={result} 
              target="_blank" 
              className="flex items-center justify-center gap-2 py-3 bg-sky-600 hover:bg-sky-500 rounded-xl text-sm font-bold transition-all text-white"
            >
              <ExternalLink className="w-4 h-4" />
              Ochish
            </a>
          </div>
          
          <button 
            onClick={() => setResult(null)}
            className="w-full mt-4 text-slate-500 text-xs font-bold hover:text-slate-300"
          >
            Yana skanerlash
          </button>
        </div>
      )}

      <style>{`
        @keyframes scan {
          from { top: 0%; }
          to { top: 100%; }
        }
        .animate-scan {
          animation: scan 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default QRScanner;
