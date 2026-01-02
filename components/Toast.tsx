
import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, X, Info } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info';

interface ToastProps {
  message: string;
  type: ToastType;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-400" />,
    error: <AlertCircle className="w-5 h-5 text-red-400" />,
    info: <Info className="w-5 h-5 text-sky-400" />
  };

  const bgColors = {
    success: 'bg-emerald-500/10 border-emerald-500/20',
    error: 'bg-red-500/10 border-red-500/20',
    info: 'bg-sky-500/10 border-sky-500/20'
  };

  return (
    <div className={`fixed top-6 right-6 z-[200] flex items-center gap-3 px-5 py-3 rounded-2xl border backdrop-blur-md shadow-2xl animate-in slide-in-from-right-8 duration-300 ${bgColors[type]}`}>
      {icons[type]}
      <p className="text-sm font-bold text-slate-200">{message}</p>
      <button onClick={onClose} className="ml-2 text-slate-500 hover:text-slate-300 transition-colors">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

export default Toast;
