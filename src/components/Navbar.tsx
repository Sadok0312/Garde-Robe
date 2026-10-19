import React from 'react';
import { useApp } from '../context/AppContext';
import { Sparkles, Smartphone, Globe, BookOpen, User, RotateCcw, LogOut } from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    currentView,
    setCurrentView,
    currentUser,
    users,
    switchUser,
    setCurrentUser,
    setIsLoginModalOpen,
    resetDemoData,
  } = useApp();

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F3]/90 backdrop-blur-md border-b border-[#DDD6C8] px-4 lg:px-8 py-3 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Brand */}
        <div
          onClick={() => setCurrentView('site')}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-xl bg-[#4F6B52] flex items-center justify-center text-[#FAF8F3] shadow-sm group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5 text-[#8FA68E]" />
          </div>
          <div>
            <span className="font-extrabold text-lg text-[#2B2F2E] tracking-wider block leading-tight">
              REWEAR
            </span>
            <span className="text-[11px] text-[#4F6B52] font-medium block">
              Portez ce que vous avez déjà
            </span>
          </div>
        </div>

        {/* View Switcher Tabs */}
        <nav className="hidden md:flex items-center gap-1 bg-[#F4EFE6] p-1 rounded-xl border border-[#DDD6C8]">
          <button
            onClick={() => setCurrentView('site')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              currentView === 'site'
                ? 'bg-[#4F6B52] text-[#FAF8F3] shadow-xs'
                : 'text-[#2B2F2E]/80 hover:text-[#2B2F2E] hover:bg-black/5'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            Site vitrine
          </button>

          <button
            onClick={() => setCurrentView('app')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              currentView === 'app'
                ? 'bg-[#4F6B52] text-[#FAF8F3] shadow-xs'
                : 'text-[#2B2F2E]/80 hover:text-[#2B2F2E] hover:bg-black/5'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            Application
          </button>

          <button
            onClick={() => setCurrentView('guide')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              currentView === 'guide'
                ? 'bg-[#4F6B52] text-[#FAF8F3] shadow-xs'
                : 'text-[#2B2F2E]/80 hover:text-[#2B2F2E] hover:bg-black/5'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            Guide Bubble
          </button>
        </nav>

        {/* User Account / Privacy Rule Switcher */}
        <div className="flex items-center gap-2.5">
          {currentUser ? (
            <div className="flex items-center gap-2">
              <div className="relative group">
                <button className="flex items-center gap-2 bg-[#F4EFE6] hover:bg-[#DDD6C8]/40 border border-[#DDD6C8] px-2.5 py-1.5 rounded-xl text-xs font-medium text-[#2B2F2E] transition-colors">
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.nom_affiche}
                    className="w-5 h-5 rounded-full object-cover border border-[#4F6B52]/30"
                  />
                  <span className="hidden sm:inline max-w-[110px] truncate">
                    {currentUser.nom_affiche.split(' ')[0]}
                  </span>
                  <span className="text-[10px] bg-[#8FA68E]/20 text-[#4F6B52] px-1.5 py-0.5 rounded-md font-semibold">
                    Compte
                  </span>
                </button>

                {/* Dropdown for testing Bubble Privacy Rules */}
                <div className="absolute right-0 mt-1 w-64 bg-[#FAF8F3] border border-[#DDD6C8] rounded-xl shadow-lg p-2 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all z-50">
                  <div className="px-2 py-1.5 border-b border-[#DDD6C8]/60 mb-1">
                    <p className="text-[11px] font-semibold text-[#2B2F2E]">Test des Privacy Rules :</p>
                    <p className="text-[10px] text-gray-500">Changer de compte pour vérifier que chaque utilisateur ne voit que sa propre garde-robe.</p>
                  </div>
                  {users.map((u) => (
                    <button
                      key={u.id}
                      onClick={() => switchUser(u.id)}
                      className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 text-xs rounded-lg text-left transition-colors ${
                        currentUser.id === u.id
                          ? 'bg-[#8FA68E]/20 text-[#4F6B52] font-semibold'
                          : 'hover:bg-[#F4EFE6] text-[#2B2F2E]'
                      }`}
                    >
                      <img src={u.avatar} alt="" className="w-5 h-5 rounded-full object-cover" />
                      <div className="flex-1 truncate">
                        <div className="truncate">{u.nom_affiche}</div>
                        <div className="text-[10px] text-gray-400 truncate">{u.email}</div>
                      </div>
                    </button>
                  ))}
                  <div className="border-t border-[#DDD6C8]/60 mt-1 pt-1">
                    <button
                      onClick={() => setCurrentUser(null)}
                      className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs text-red-700 hover:bg-red-50 rounded-lg text-left"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      Se déconnecter
                    </button>
                  </div>
                </div>
              </div>

              <button
                onClick={resetDemoData}
                title="Réinitialiser les données de démonstration"
                className="p-1.5 rounded-lg border border-[#DDD6C8] text-[#2B2F2E]/60 hover:text-[#2B2F2E] hover:bg-[#F4EFE6] transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsLoginModalOpen(true)}
              className="flex items-center gap-1.5 bg-[#4F6B52] hover:bg-[#4F6B52]/90 text-[#FAF8F3] px-3 py-1.5 rounded-xl text-xs font-semibold shadow-xs transition-colors"
            >
              <User className="w-3.5 h-3.5" />
              Connexion
            </button>
          )}

          {currentView === 'site' && (
            <button
              onClick={() => setCurrentView('app')}
              className="hidden sm:inline-flex bg-[#4F6B52] hover:bg-[#3e5641] text-[#FAF8F3] px-3.5 py-1.5 rounded-xl text-xs font-semibold shadow-xs transition-all hover:scale-[1.02]"
            >
              Essayer la démo
            </button>
          )}
        </div>
      </div>

      {/* Mobile nav pills */}
      <div className="flex md:hidden items-center justify-center gap-2 mt-2 pt-2 border-t border-[#DDD6C8]/60">
        <button
          onClick={() => setCurrentView('site')}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium ${
            currentView === 'site'
              ? 'bg-[#4F6B52] text-[#FAF8F3]'
              : 'text-[#2B2F2E]/80 bg-[#F4EFE6]'
          }`}
        >
          <Globe className="w-3 h-3" />
          Site
        </button>
        <button
          onClick={() => setCurrentView('app')}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium ${
            currentView === 'app'
              ? 'bg-[#4F6B52] text-[#FAF8F3]'
              : 'text-[#2B2F2E]/80 bg-[#F4EFE6]'
          }`}
        >
          <Smartphone className="w-3 h-3" />
          Application
        </button>
        <button
          onClick={() => setCurrentView('guide')}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium ${
            currentView === 'guide'
              ? 'bg-[#4F6B52] text-[#FAF8F3]'
              : 'text-[#2B2F2E]/80 bg-[#F4EFE6]'
          }`}
        >
          <BookOpen className="w-3 h-3" />
          Guide Bubble
        </button>
      </div>
    </header>
  );
};
