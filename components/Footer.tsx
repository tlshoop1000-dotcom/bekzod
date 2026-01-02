
import React from 'react';
import { QrCode, Instagram, Twitter, Github } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-900 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="bg-sky-500 p-1.5 rounded-lg">
                <QrCode className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight">QRGenius <span className="text-sky-400">Pro</span></span>
            </div>
            <p className="text-slate-400 max-w-sm mb-6 leading-relaxed">
              Professional QR kodlar yaratish uchun eng tezkor va qulay servis. Matn, video va rasmlar uchun mukammal yechim.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="p-2 bg-slate-900 rounded-lg hover:text-sky-400 transition-colors"><Twitter className="w-5 h-5" /></a>
              <a href="#" className="p-2 bg-slate-900 rounded-lg hover:text-sky-400 transition-colors"><Instagram className="w-5 h-5" /></a>
              <a href="#" className="p-2 bg-slate-900 rounded-lg hover:text-sky-400 transition-colors"><Github className="w-5 h-5" /></a>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-white">Xizmatlar</h4>
            <ul className="space-y-4 text-slate-400 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Video QR Generator</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Rasm QR Generator</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Dinamik QR</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Analitika</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-white">Ma'lumotlar</h4>
            <ul className="space-y-4 text-slate-400 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Foydalanish shartlari</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Maxfiylik siyosati</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Yordam markazi</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Hamkorlik</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} QRGenius Pro. Barcha huquqlar himoyalangan.
          </p>
          <div className="flex gap-8">
            <span className="text-slate-500 text-sm italic">O'zbekistonda mehr bilan ishlab chiqilgan</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
