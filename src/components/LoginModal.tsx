import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Lock, Mail, User as UserIcon, Sparkles } from 'lucide-react';

export const LoginModal: React.FC = () => {
  const {
    isLoginModalOpen,
    setIsLoginModalOpen,
    users,
    switchUser,
    registerUser,
    setCurrentView,
    currentUser,
  } = useApp();

  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nom, setNom] = useState('');
  const [error, setError] = useState<string | null>(null);

  if (!isLoginModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError('Veuillez remplir tous les champs.');
      return;
    }

    if (mode === 'signup') {
      if (!nom) {
        setError('Veuillez indiquer votre nom ou prénom.');
        return;
      }
      registerUser(nom, email);
      setIsLoginModalOpen(false);
      setCurrentView('app');
    } else {
      // Find matching user or log into the first or generate
      const existing = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
      if (existing) {
        switchUser(existing.id);
      } else {
        // Auto-create or login
        registerUser(email.split('@')[0], email);
      }
      setIsLoginModalOpen(false);
      setCurrentView('app');
    }
  };

  const handleSelectQuickAccount = (userId: string) => {
    switchUser(userId);
    setIsLoginModalOpen(false);
    setCurrentView('app');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fade-in">
      <div className="bg-[#FAF8F3] border border-[#DDD6C8] rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative">
        <button
          onClick={() => setIsLoginModalOpen(false)}
          className="absolute top-5 right-5 p-2 rounded-full text-gray-400 hover:text-[#2B2F2E] hover:bg-[#F4EFE6] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-[#4F6B52] text-[#FAF8F3] flex items-center justify-center mx-auto mb-3 shadow-xs">
            <Lock className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-[#2B2F2E]">
            {mode === 'login' ? 'Connexion à votre espace' : 'Créer un compte'}
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            REWEAR • Accédez à vos vêtements et vos statistiques
          </p>
        </div>

        {/* Quick Demo Accounts for fast testing of Privacy Rules */}
        <div className="mb-6 p-3.5 rounded-2xl bg-[#F4EFE6] border border-[#DDD6C8]">
          <div className="text-[11px] font-semibold text-[#4F6B52] mb-2 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            Accès rapide démo (Test des Privacy Rules Bubble) :
          </div>
          <div className="grid grid-cols-1 gap-1.5">
            {users.map((u) => (
              <button
                key={u.id}
                type="button"
                onClick={() => handleSelectQuickAccount(u.id)}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-left text-xs transition-colors border ${
                  currentUser?.id === u.id
                    ? 'bg-white border-[#4F6B52] shadow-2xs font-semibold text-[#4F6B52]'
                    : 'bg-white/60 border-transparent hover:bg-white text-[#2B2F2E]'
                }`}
              >
                <img src={u.avatar} alt="" className="w-6 h-6 rounded-full object-cover" />
                <div className="truncate flex-1">
                  <span className="font-medium text-[#2B2F2E]">{u.nom_affiche}</span>
                  <span className="text-[10px] text-gray-400 block truncate">{u.email}</span>
                </div>
                <span className="text-[10px] text-[#4F6B52] underline">Choisir</span>
              </button>
            ))}
          </div>
        </div>

        <div className="relative flex items-center justify-center mb-6">
          <hr className="w-full border-[#DDD6C8]" />
          <span className="absolute bg-[#FAF8F3] px-3 text-[11px] uppercase tracking-wider text-gray-400">
            Ou formulaire classique
          </span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'signup' && (
            <div>
              <label className="block text-xs font-semibold text-[#2B2F2E] mb-1.5">
                Nom affiché
              </label>
              <div className="relative">
                <UserIcon className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  value={nom}
                  onChange={(e) => setNom(e.target.value)}
                  placeholder="Ex : Camille Martin"
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-[#DDD6C8] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#8FA68E]"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-[#2B2F2E] mb-1.5">
              Adresse e-mail
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="votre.email@exemple.com"
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-[#DDD6C8] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#8FA68E]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#2B2F2E] mb-1.5">
              Mot de passe
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-[#DDD6C8] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#8FA68E]"
              />
            </div>
          </div>

          {error && (
            <p className="text-xs text-red-600 bg-red-50 p-2.5 rounded-xl border border-red-200">
              {error}
            </p>
          )}

          <div className="pt-2 flex flex-col gap-2">
            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-[#4F6B52] hover:bg-[#3d5440] text-[#FAF8F3] font-semibold text-sm shadow-xs transition-colors cursor-pointer"
            >
              {mode === 'login' ? 'Se connecter' : "S'inscrire"}
            </button>

            <button
              type="button"
              onClick={() => {
                setError(null);
                setMode(mode === 'login' ? 'signup' : 'login');
              }}
              className="text-xs text-center text-[#4F6B52] hover:underline pt-1"
            >
              {mode === 'login'
                ? "Pas encore de compte ? S'inscrire"
                : 'Déjà un compte ? Se connecter'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
