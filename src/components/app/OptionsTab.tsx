import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Sparkles, 
  RefreshCw, 
  Heart, 
  Share2, 
  Tag, 
  Check, 
  AlertTriangle,
  RotateCcw,
  CheckCircle2,
  PackageCheck
} from 'lucide-react';
import { Vetement } from '../../types';

export const OptionsTab: React.FC = () => {
  const {
    vetements,
    updateStatut,
    setVêtementÀVendre,
    annonces,
  } = useApp();

  const [activeSection, setActiveSection] = useState<'a_revoir' | 'circules'>('a_revoir');

  // Bubble impact search:
  // Do a search for Vêtements (statut ≠ Actif && statut ≠ Gardé) :count
  const circulatedClothes = vetements.filter(
    (v) => v.statut !== 'Actif' && v.statut !== 'Gardé'
  );
  const circulatedCount = circulatedClothes.length;

  // Kept items
  const keptClothes = vetements.filter((v) => v.statut === 'Gardé');

  // Bubble Repeating Group « À revoir »:
  // Do a search for Vêtements (statut = Actif, nb_ports < 3)
  const aRevoirList = vetements.filter(
    (v) => v.statut === 'Actif' && v.nb_ports < 3
  );

  const handleSellClick = (v: Vetement) => {
    setVêtementÀVendre(v);
  };

  return (
    <div className="space-y-4 pb-20">
      {/* 1. Carte d'impact (Spec section 4) */}
      <div className="bg-[#4F6B52] text-[#FAF8F3] p-5 rounded-2xl shadow-sm relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-2 text-[#8FA68E] text-xs font-semibold mb-1">
            <RefreshCw className="w-4 h-4" />
            Impact Circulaire
          </div>

          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-4xl font-extrabold text-[#FAF8F3] tracking-tight">
              {circulatedCount}
            </span>
            <span className="text-sm text-[#FAF8F3]/90 font-medium leading-tight">
              {circulatedCount > 1 ? 'pièces remises' : 'pièce remise'} en circulation (vente, don ou échange)
            </span>
          </div>

          <p className="text-xs text-[#FAF8F3]/75 mt-3 leading-relaxed">
            Chaque vêtement remis dans le circuit évite la production de nouvelles matières premières et prolonge sa durée de vie utile.
          </p>
        </div>

        {/* Subtle background decoration */}
        <div className="absolute -bottom-6 -right-6 w-28 h-28 bg-white/10 rounded-full blur-xl pointer-events-none" />
      </div>

      {/* Sub-toggle between "À revoir" and "Déjà arbitrées" */}
      <div className="flex bg-[#F4EFE6] p-1 rounded-xl border border-[#DDD6C8] text-xs font-semibold">
        <button
          onClick={() => setActiveSection('a_revoir')}
          className={`flex-1 py-1.5 rounded-lg transition-colors flex items-center justify-center gap-1.5 ${
            activeSection === 'a_revoir'
              ? 'bg-[#4F6B52] text-[#FAF8F3]'
              : 'text-[#2B2F2E]/70 hover:text-[#2B2F2E]'
          }`}
        >
          <span>À arbitrer</span>
          <span className="bg-[#F1E3C6] text-[#7A5212] px-1.5 py-0.2 rounded-md text-[10px]">
            {aRevoirList.length}
          </span>
        </button>

        <button
          onClick={() => setActiveSection('circules')}
          className={`flex-1 py-1.5 rounded-lg transition-colors flex items-center justify-center gap-1.5 ${
            activeSection === 'circules'
              ? 'bg-[#4F6B52] text-[#FAF8F3]'
              : 'text-[#2B2F2E]/70 hover:text-[#2B2F2E]'
          }`}
        >
          <span>Pièces arbitrées</span>
          <span className="bg-[#DDD6C8] text-[#2B2F2E] px-1.5 py-0.2 rounded-md text-[10px]">
            {circulatedCount + keptClothes.length}
          </span>
        </button>
      </div>

      {activeSection === 'a_revoir' ? (
        /* 2. Repeating Group « À revoir » */
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-bold text-[#2B2F2E]">
              Pièces peu portées (&lt; 3 ports)
            </span>
            <span className="text-[11px] text-gray-500">
              Choisissez l'avenir de chaque vêtement
            </span>
          </div>

          {aRevoirList.length === 0 ? (
            <div className="p-8 text-center bg-[#FAF8F3] rounded-2xl border border-dashed border-[#DDD6C8]">
              <PackageCheck className="w-8 h-8 text-[#4F6B52] mx-auto mb-2" />
              <p className="text-sm font-semibold text-[#2B2F2E]">Aucune pièce en attente !</p>
              <p className="text-xs text-gray-500 mt-1">
                Toutes vos pièces sont soit portées régulièrement (&gt; 2 fois), soit déjà arbitrées.
              </p>
            </div>
          ) : (
            aRevoirList.map((cloth) => (
              <div
                key={cloth.id}
                className="bg-[#FAF8F3] p-4 rounded-2xl border border-[#DDD6C8] hover:border-[#8FA68E] transition-all shadow-2xs space-y-3"
              >
                {/* Cloth top summary */}
                <div className="flex items-center gap-3">
                  <img
                    src={cloth.photo}
                    alt={cloth.nom}
                    className="w-14 h-14 rounded-xl object-cover border border-[#DDD6C8] shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-[#2B2F2E] truncate">{cloth.nom}</h4>
                      <span className="text-[10px] bg-[#F1E3C6] text-[#7A5212] px-1.5 py-0.5 rounded-md font-bold whitespace-nowrap">
                        À revoir
                      </span>
                    </div>
                    <div className="text-xs text-gray-500 mt-0.5">
                      {cloth.categorie} • {cloth.couleur}
                    </div>
                    <div className="text-xs font-semibold text-[#7A5212] mt-0.5">
                      Porté seulement {cloth.nb_ports} {cloth.nb_ports > 1 ? 'fois' : 'fois'}
                    </div>
                  </div>
                </div>

                {/* 4 Action Buttons required by spec : Garder, Donner, Échanger, Vendre */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 pt-1 border-t border-[#DDD6C8]/60">
                  {/* 1. Garder */}
                  <button
                    onClick={() => updateStatut(cloth.id, 'Gardé')}
                    className="flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl bg-[#F4EFE6] hover:bg-[#DDD6C8] text-[#2B2F2E] text-xs font-semibold transition-colors cursor-pointer"
                    title="Garder dans ma garde-robe en conscience"
                  >
                    <Check className="w-3.5 h-3.5 text-[#4F6B52]" />
                    Garder
                  </button>

                  {/* 2. Donner */}
                  <button
                    onClick={() => updateStatut(cloth.id, 'Donné')}
                    className="flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl bg-[#F4EFE6] hover:bg-[#8FA68E]/20 text-[#2B2F2E] text-xs font-semibold transition-colors cursor-pointer"
                    title="Donner à une association ou un proche"
                  >
                    <Heart className="w-3.5 h-3.5 text-rose-500" />
                    Donner
                  </button>

                  {/* 3. Échanger */}
                  <button
                    onClick={() => updateStatut(cloth.id, 'Échangé')}
                    className="flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl bg-[#F4EFE6] hover:bg-[#8FA68E]/20 text-[#2B2F2E] text-xs font-semibold transition-colors cursor-pointer"
                    title="Échanger lors d'un swap ou troc"
                  >
                    <Share2 className="w-3.5 h-3.5 text-[#4F6B52]" />
                    Échanger
                  </button>

                  {/* 4. Vendre (Opens popup) */}
                  <button
                    onClick={() => handleSellClick(cloth)}
                    className="flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl bg-[#4F6B52] hover:bg-[#3d5440] text-[#FAF8F3] text-xs font-semibold shadow-xs transition-colors cursor-pointer"
                    title="Mettre en vente avec fiche pré-remplie"
                  >
                    <Tag className="w-3.5 h-3.5" />
                    Vendre
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      ) : (
        /* History of circularized / kept items */
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-bold text-[#2B2F2E]">
              Pièces arbitrées & Annonces
            </span>
            <span className="text-[11px] text-gray-500">
              Circulation & Garde
            </span>
          </div>

          {[...circulatedClothes, ...keptClothes].length === 0 ? (
            <div className="p-8 text-center bg-[#FAF8F3] rounded-2xl border border-dashed border-[#DDD6C8]">
              <p className="text-sm font-semibold text-[#2B2F2E]">Aucune pièce arbitrée pour l'instant</p>
              <p className="text-xs text-gray-500 mt-1">
                Utilisez l'onglet « À arbitrer » pour décider du sort de vos vêtements dormants.
              </p>
            </div>
          ) : (
            [...circulatedClothes, ...keptClothes].map((cloth) => {
              const annonce = annonces.find((a) => a.vetementId === cloth.id);

              return (
                <div
                  key={cloth.id}
                  className="bg-[#FAF8F3] p-3.5 rounded-2xl border border-[#DDD6C8] flex items-center justify-between gap-3 shadow-2xs"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={cloth.photo}
                      alt={cloth.nom}
                      className="w-12 h-12 rounded-xl object-cover border border-[#DDD6C8] shrink-0"
                    />
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-[#2B2F2E] truncate">{cloth.nom}</h4>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded-md font-semibold ${
                            cloth.statut === 'En vente'
                              ? 'bg-amber-100 text-amber-800'
                              : cloth.statut === 'Donné'
                              ? 'bg-rose-100 text-rose-800'
                              : cloth.statut === 'Échangé'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-emerald-100 text-emerald-800'
                          }`}
                        >
                          {cloth.statut} {annonce && `(${annonce.prix} €)`}
                        </span>
                        <span className="text-[11px] text-gray-400">
                          {cloth.nb_ports} ports
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Revert button back to active if user changes mind */}
                  <button
                    onClick={() => updateStatut(cloth.id, 'Actif')}
                    className="p-1.5 rounded-lg border border-[#DDD6C8] text-gray-400 hover:text-[#2B2F2E] hover:bg-[#F4EFE6] transition-colors shrink-0"
                    title="Remettre en statut Actif"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
};
