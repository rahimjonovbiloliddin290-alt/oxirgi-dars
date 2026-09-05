import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { useLanguage } from '../context/LanguageContext.jsx';
import { Eye, EyeOff, ShieldCheck, User, Lock, Mail, Phone, X, Sparkles } from 'lucide-react';

export const AuthModal = () => {
  const { login, register, showAuthModal, setShowAuthModal } = useAuth();
  const { t } = useLanguage();

  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');

  if (!showAuthModal) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    if (isRegisterMode) {
      const res = await register(name, email, password, phone);
      if (!res.success) {
        setErrorMsg(res.error);
      }
    } else {
      const res = await login(email, password);
      if (!res.success) {
        setErrorMsg(res.error);
      }
    }
    setLoading(false);
  };

  const handleQuickAdmin = async () => {
    setEmail('admin@telefon.com');
    setPassword('telefon123');
    setIsRegisterMode(false);
    setLoading(true);
    setErrorMsg('');
    const res = await login('admin@telefon.com', 'telefon123');
    if (!res.success) {
      setErrorMsg(res.error);
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Mountain Lake High-Res Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-700 filter brightness-90"
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=80')` 
        }}
      >
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[3px]"></div>
      </div>

      {/* Frosted Glass Login Card */}
      <div className="relative z-10 w-full max-w-md p-8 rounded-3xl bg-white/10 dark:bg-black/30 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-2xl shadow-black/50 text-white animate-in fade-in zoom-in duration-300">
        
        {/* Close Button */}
        <button
          onClick={() => setShowAuthModal(false)}
          className="absolute top-4 right-4 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 mb-3 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/30">
            <ShieldCheck className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-white via-sky-100 to-cyan-200">
            {isRegisterMode ? t('registerTitle') : t('loginTitle')}
          </h2>
          <p className="text-sm text-cyan-100/80 mt-1 font-medium">
            TechFixHub - Mobil Xizmatlar Markazi
          </p>
        </div>

        {errorMsg && (
          <div className="mb-4 p-3 rounded-xl bg-red-500/20 border border-red-500/40 text-red-100 text-sm text-center font-medium backdrop-blur-md">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegisterMode && (
            <>
              <div>
                <label className="block text-xs font-semibold text-white/80 uppercase tracking-wider mb-1">
                  Ismingiz
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-3.5 w-5 h-5 text-white/50" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ismingizni kiriting"
                    className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white/15 dark:bg-white/5 border border-white/20 focus:border-cyan-400 focus:bg-white/20 text-white placeholder-white/40 focus:outline-none transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-white/80 uppercase tracking-wider mb-1">
                  Telefon Raqam
                </label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-3.5 w-5 h-5 text-white/50" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+998 90 123 45 67"
                    className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white/15 dark:bg-white/5 border border-white/20 focus:border-cyan-400 focus:bg-white/20 text-white placeholder-white/40 focus:outline-none transition"
                  />
                </div>
              </div>
            </>
          )}

          <div>
            <label className="block text-xs font-semibold text-white/80 uppercase tracking-wider mb-1">
              {t('usernameOrEmail')}
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3.5 w-5 h-5 text-white/50" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@telefon.com"
                className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white/15 dark:bg-white/5 border border-white/20 focus:border-cyan-400 focus:bg-white/20 text-white placeholder-white/40 focus:outline-none transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-white/80 uppercase tracking-wider mb-1">
              {t('password')}
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3.5 w-5 h-5 text-white/50" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-11 pr-12 py-3 rounded-2xl bg-white/15 dark:bg-white/5 border border-white/20 focus:border-cyan-400 focus:bg-white/20 text-white placeholder-white/40 focus:outline-none transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-3.5 text-white/60 hover:text-white transition"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-4 rounded-2xl font-bold uppercase tracking-wider text-white bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 active:scale-95 shadow-lg shadow-cyan-500/40 transition-all duration-200"
          >
            {loading ? 'Kutilmoqda...' : isRegisterMode ? t('registerBtn') : t('loginBtn')}
          </button>
        </form>

        {/* Quick Admin Helper */}
        <div className="mt-5 pt-4 border-t border-white/10 text-center">
          <button
            onClick={handleQuickAdmin}
            className="w-full py-2.5 px-3 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/40 text-amber-200 text-xs font-semibold flex items-center justify-center gap-2 transition"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            {t('quickAdmin')} (admin@telefon.com / telefon123)
          </button>
        </div>

        {/* Toggle Mode */}
        <div className="mt-4 text-center text-sm text-white/80">
          <span>{isRegisterMode ? t('haveAccount') : t('noAccount')} </span>
          <button
            onClick={() => {
              setIsRegisterMode(!isRegisterMode);
              setErrorMsg('');
            }}
            className="font-bold text-cyan-300 hover:underline ml-1"
          >
            {isRegisterMode ? t('loginTitle') : t('registerTitle')}
          </button>
        </div>

      </div>
    </div>
  );
};

