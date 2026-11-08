import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function ToastNotification() {
  const { toast } = useApp();

  if (!toast) return null;

  const icons = {
    success: <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />,
    warning: <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0" />,
    info: <Info className="w-4 h-4 text-blue-400 flex-shrink-0" />
  };

  const borders = {
    success: 'border-emerald-500/40 bg-slate-900/95 text-white',
    warning: 'border-amber-500/40 bg-slate-900/95 text-white',
    info: 'border-blue-500/40 bg-slate-900/95 text-white'
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 fade-in duration-300 max-w-sm">
      <div className={`p-4 rounded-2xl shadow-2xl border backdrop-blur-md flex items-center gap-3 ${borders[toast.type || 'success']}`}>
        {icons[toast.type || 'success']}
        <p className="text-xs font-semibold leading-snug">
          {toast.message}
        </p>
      </div>
    </div>
  );
}
