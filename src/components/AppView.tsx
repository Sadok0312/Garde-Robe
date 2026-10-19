import React from 'react';
import { useApp } from '../context/AppContext';
import { WardrobeTab } from './app/WardrobeTab';
import { CounterTab } from './app/CounterTab';
import { OptionsTab } from './app/OptionsTab';
import { AddClothModal } from './app/AddClothModal';
import { SellModal } from './app/SellModal';
import { 
  Shirt, 
  BarChart3, 
  RefreshCw, 
  Smartphone, 
  Maximize2, 
  Plus, 
  Sparkles,
  ArrowLeft,
  User,
  ShieldCheck
} from 'lucide-react';

export const AppView: React.FC = () => {
  const {
    appTab,
    setAppTab,
    phoneFrame,
    setPhoneFrame,
    currentUser,
    setCurrentView,
    setIsLoginModalOpen,
    setIsAddModalOpen,
    toastMessage,
  } = useApp();

  if (!currentUser) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-4">
        <div className="bg-[#FAF8F3] border border-[#DDD6C8] rounded-3xl p-8 max-w-sm text-center shadow-lg">
          <div className="w-12 h-12 rounded-2xl bg-[#4F6B52] text-[#FAF8F3] flex items-center justify-center mx-auto mb-4">
            <User className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-[#2B2F2E]">Connexion requise</h3>
          <p className="text-xs text-gray-500 mt-2 mb-6">
            Conformément aux règles Bubble (Privacy rules), vous devez être connecté pour accéder à votre garde-robe personnelle.
          </p>
          <button
            onClick={() => setIsLoginModalOpen(true)}
            className="w-full py-2.5 rounded-xl bg-[#4F6B52] hover:bg-[#3d5440] text-white font-semibold text-xs shadow-xs transition-colors"
          >
            Se connecter ou choisir un profil test
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F4EFE6] py-4 px-2 sm:px-4">
      {/* Top control bar: Phone frame toggle & Back to site */}
      <div className="max-w-4xl mx-auto flex items-center justify-between gap-3 mb-4 text-xs">
        <button
          onClick={() => setCurrentView('site')}
          className="flex items-center gap-1.5 text-[#2B2F2E]/70 hover:text-[#2B2F2E] font-medium bg-[#FAF8F3] px-3 py-1.5 rounded-xl border border-[#DDD6C8] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Retour au site</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="text-gray-500 hidden sm:inline text-[11px]">Rendu Bubble :</span>
          <div className="inline-flex p-0.5 bg-[#FAF8F3] rounded-xl border border-[#DDD6C8]">
            <button
              onClick={() => setPhoneFrame(true)}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg font-semibold transition-colors ${
                phoneFrame
                  ? 'bg-[#4F6B52] text-white shadow-2xs'
                  : 'text-gray-600 hover:text-[#2B2F2E]'
              }`}
              title="Largeur max 420 px conforme au cahier des charges Bubble"
            >
              <Smartphone className="w-3 h-3" />
              <span>Mobile (420px)</span>
            </button>
            <button
              onClick={() => setPhoneFrame(false)}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg font-semibold transition-colors ${
                !phoneFrame
                  ? 'bg-[#4F6B52] text-white shadow-2xs'
                  : 'text-gray-600 hover:text-[#2B2F2E]'
              }`}
            >
              <Maximize2 className="w-3 h-3" />
              <span>Plein écran</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Container: centered max 420px for phone rendering if enabled */}
      <div
        className={`mx-auto transition-all duration-300 relative ${
          phoneFrame
            ? 'max-w-[420px] bg-[#FAF8F3] rounded-3xl border-2 border-[#DDD6C8] shadow-xl overflow-hidden min-h-[720px] flex flex-col'
            : 'max-w-2xl bg-[#FAF8F3] rounded-3xl border border-[#DDD6C8] shadow-md p-4 sm:p-6'
        }`}
      >
        {/* Phone Notch & Status bar simulation (when phone frame active) */}
        {phoneFrame && (
          <div className="bg-[#FAF8F3] pt-3 pb-2 px-5 flex items-center justify-between border-b border-[#DDD6C8]/60 text-[11px] font-semibold text-[#2B2F2E]/60 select-none">
            <span>09:41</span>
            <div className="w-20 h-4 bg-[#2B2F2E]/10 rounded-full mx-auto" />
            <div className="flex items-center gap-1">
              <span>5G</span>
              <div className="w-4 h-2 rounded-xs border border-[#2B2F2E]/60 relative">
                <div className="w-2.5 h-full bg-[#4F6B52]" />
              </div>
            </div>
          </div>
        )}

        {/* In-App Header */}
        <div className={`p-4 ${phoneFrame ? 'pt-3' : 'pt-0'} border-b border-[#DDD6C8]/60 bg-[#FAF8F3]`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <img
                src={currentUser.avatar}
                alt={currentUser.nom_affiche}
                className="w-9 h-9 rounded-full object-cover border border-[#4F6B52]/40"
              />
              <div>
                <h2 className="text-sm font-extrabold text-[#2B2F2E] leading-tight">
                  {appTab === 'garde-robe' && 'Ma garde-robe'}
                  {appTab === 'compteur' && 'Mon compteur'}
                  {appTab === 'options' && 'Mes options'}
                </h2>
                <span className="text-[11px] text-[#4F6B52] font-medium block">
                  {currentUser.nom_affiche}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="p-1.5 rounded-xl bg-[#4F6B52] text-[#FAF8F3] hover:bg-[#3d5440] transition-colors shadow-2xs"
                title="Ajouter un vêtement"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Body content based on onglet custom state */}
        <div className={`flex-1 p-4 overflow-y-auto ${phoneFrame ? 'max-h-[600px]' : ''}`}>
          {appTab === 'garde-robe' && <WardrobeTab />}
          {appTab === 'compteur' && <CounterTab />}
          {appTab === 'options' && <OptionsTab />}
        </div>

        {/* Floating Group in bottom with 3 buttons (Spec section 4) */}
        <div
          className={`${
            phoneFrame
              ? 'sticky bottom-0 left-0 right-0 border-t border-[#DDD6C8] bg-[#FAF8F3]/95 backdrop-blur-md p-2'
              : 'fixed bottom-4 left-1/2 -translate-x-1/2 w-full max-w-sm z-40 px-4'
          }`}
        >
          <div className="bg-[#FAF8F3] p-1 rounded-2xl border border-[#DDD6C8] shadow-lg flex items-center justify-around gap-1">
            {/* Bouton 1: Ma garde-robe */}
            <button
              onClick={() => setAppTab('garde-robe')}
              className={`flex-1 flex flex-col items-center justify-center py-2 px-1 rounded-xl transition-all cursor-pointer ${
                appTab === 'garde-robe'
                  ? 'bg-[#4F6B52] text-[#FAF8F3] shadow-xs'
                  : 'text-[#2B2F2E]/70 hover:text-[#2B2F2E] hover:bg-[#F4EFE6]'
              }`}
            >
              <Shirt className="w-4 h-4 mb-0.5" />
              <span className="text-[10px] font-bold tracking-tight">Garde-robe</span>
            </button>

            {/* Bouton 2: Mon compteur */}
            <button
              onClick={() => setAppTab('compteur')}
              className={`flex-1 flex flex-col items-center justify-center py-2 px-1 rounded-xl transition-all cursor-pointer ${
                appTab === 'compteur'
                  ? 'bg-[#4F6B52] text-[#FAF8F3] shadow-xs'
                  : 'text-[#2B2F2E]/70 hover:text-[#2B2F2E] hover:bg-[#F4EFE6]'
              }`}
            >
              <BarChart3 className="w-4 h-4 mb-0.5" />
              <span className="text-[10px] font-bold tracking-tight">Compteur</span>
            </button>

            {/* Bouton 3: Mes options */}
            <button
              onClick={() => setAppTab('options')}
              className={`flex-1 flex flex-col items-center justify-center py-2 px-1 rounded-xl transition-all cursor-pointer ${
                appTab === 'options'
                  ? 'bg-[#4F6B52] text-[#FAF8F3] shadow-xs'
                  : 'text-[#2B2F2E]/70 hover:text-[#2B2F2E] hover:bg-[#F4EFE6]'
              }`}
            >
              <RefreshCw className="w-4 h-4 mb-0.5" />
              <span className="text-[10px] font-bold tracking-tight">Options</span>
            </button>
          </div>
        </div>
      </div>

      {/* Popups specified in Bubble specs */}
      <AddClothModal />
      <SellModal />

      {/* Toast Notification (Bubble Toast plugin simulation) */}
      {toastMessage && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 bg-[#2B2F2E] text-[#FAF8F3] px-4 py-2 rounded-xl text-xs font-semibold shadow-xl flex items-center gap-2 animate-fade-in border border-white/20">
          <Sparkles className="w-3.5 h-3.5 text-[#8FA68E]" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};
