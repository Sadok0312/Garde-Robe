import React from 'react';
import { useApp } from '../../context/AppContext';
import { COULEURS, Categorie } from '../../types';
import { Plus, Sparkles, AlertCircle, Shirt, CheckCircle, Flame } from 'lucide-react';

const CATEGORIES: ('Toutes' | Categorie)[] = ['Toutes', 'Haut', 'Bas', 'Robe', 'Veste', 'Chaussures'];

export const WardrobeTab: React.FC = () => {
  const {
    vetements,
    filtreGardeRobe,
    setFiltreGardeRobe,
    selectedCategorie,
    setSelectedCategorie,
    setIsAddModalOpen,
    incrementPort,
  } = useApp();

  // Bubble formula for well-worn ratio:
  // (Vêtements nb_ports > 2 :count / total :count) * 100 rounded to 0
  const totalCount = vetements.length;
  const wellWornCount = vetements.filter((v) => v.nb_ports > 2).length;
  const wellWornPercent = totalCount > 0 ? Math.round((wellWornCount / totalCount) * 100) : 0;

  // Idea of the day:
  // Do a search for Vêtements (statut = Actif, nb_ports < 3), sort by nb_ports asc :first item
  const ideaOfTheDay = vetements
    .filter((v) => v.statut === 'Actif' && v.nb_ports < 3)
    .sort((a, b) => a.nb_ports - b.nb_ports)[0];

  // Filtering:
  const filteredList = vetements
    .filter((v) => {
      if (filtreGardeRobe === 'a_revoir') {
        return v.nb_ports <= 2 && v.statut === 'Actif';
      }
      return true;
    })
    .filter((v) => {
      if (selectedCategorie === 'Toutes') return true;
      return v.categorie === selectedCategorie;
    })
    // Sort by creation date desc (as requested)
    .sort((a, b) => new Date(b.date_creation).getTime() - new Date(a.date_creation).getTime());

  return (
    <div className="space-y-4 pb-20">
      {/* 1. Anneau / Jauge de progression « Pièces bien portées » */}
      <div className="bg-[#FAF8F3] p-4 sm:p-5 rounded-2xl border border-[#DDD6C8] shadow-xs">
        <div className="flex items-center justify-between mb-2">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#4F6B52]">
              Ratio de rentabilité
            </span>
            <h3 className="text-base font-bold text-[#2B2F2E]">Pièces bien portées</h3>
          </div>
          <div className="text-right">
            <span className="text-2xl font-black text-[#4F6B52]">{wellWornPercent}%</span>
            <span className="text-[11px] text-gray-500 block">
              {wellWornCount} sur {totalCount} pièces
            </span>
          </div>
        </div>

        {/* Progress Bar styled to Bubble specs */}
        <div className="w-full bg-[#DDD6C8]/60 h-2.5 rounded-full overflow-hidden">
          <div
            className="bg-[#4F6B52] h-full rounded-full transition-all duration-500"
            style={{ width: `${wellWornPercent}%` }}
          />
        </div>
        <p className="text-[11px] text-gray-500 mt-2">
          Critère : vêtement porté au moins 3 fois. Plus ce chiffre grimpe, plus votre vestiaire est durable.
        </p>
      </div>

      {/* 2. Idée du jour (Bubble first item sorted by nb_ports asc, < 3) */}
      {ideaOfTheDay && (
        <div className="bg-gradient-to-r from-[#FAF8F3] to-[#F4EFE6] p-4 rounded-2xl border border-[#8FA68E]/50 shadow-xs relative overflow-hidden">
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#4F6B52] mb-2">
            <Sparkles className="w-4 h-4 text-[#8FA68E]" />
            Idée du jour • À redécouvrir aujourd'hui
          </div>
          <div className="flex items-center gap-3">
            <img
              src={ideaOfTheDay.photo}
              alt={ideaOfTheDay.nom}
              className="w-14 h-14 rounded-xl object-cover border border-[#DDD6C8] shrink-0"
            />
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-bold text-[#2B2F2E] truncate">{ideaOfTheDay.nom}</h4>
              <p className="text-xs text-gray-500">
                {ideaOfTheDay.categorie} • {ideaOfTheDay.couleur}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[10px] bg-[#F1E3C6] text-[#7A5212] px-2 py-0.5 rounded-md font-semibold">
                  Porté {ideaOfTheDay.nb_ports} fois seulement
                </span>
              </div>
            </div>
            <button
              onClick={() => incrementPort(ideaOfTheDay.id)}
              className="px-2.5 py-1.5 bg-[#4F6B52] hover:bg-[#3d5440] text-[#FAF8F3] text-xs font-semibold rounded-xl shadow-xs transition-colors shrink-0 flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              Porter
            </button>
          </div>
        </div>
      )}

      {/* 3. Filtre Toutes / À revoir & Catégories */}
      <div className="space-y-2">
        <div className="flex items-center justify-between gap-2">
          <div className="inline-flex p-1 bg-[#F4EFE6] rounded-xl border border-[#DDD6C8]">
            <button
              onClick={() => setFiltreGardeRobe('toutes')}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors ${
                filtreGardeRobe === 'toutes'
                  ? 'bg-[#4F6B52] text-[#FAF8F3]'
                  : 'text-[#2B2F2E]/70 hover:text-[#2B2F2E]'
              }`}
            >
              Toutes ({vetements.length})
            </button>
            <button
              onClick={() => setFiltreGardeRobe('a_revoir')}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1 ${
                filtreGardeRobe === 'a_revoir'
                  ? 'bg-[#7A5212] text-[#FAF8F3]'
                  : 'text-[#7A5212] bg-[#F1E3C6]/60 hover:bg-[#F1E3C6]'
              }`}
            >
              À revoir ({vetements.filter((v) => v.nb_ports <= 2 && v.statut === 'Actif').length})
            </button>
          </div>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-1 bg-[#4F6B52] hover:bg-[#3e5641] text-[#FAF8F3] px-3 py-1.5 rounded-xl text-xs font-semibold shadow-xs transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Ajouter</span>
          </button>
        </div>

        {/* Category horizontal pills */}
        <div className="flex gap-1.5 overflow-x-auto pb-1 text-xs">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategorie(cat)}
              className={`px-2.5 py-1 rounded-lg shrink-0 border transition-colors ${
                selectedCategorie === cat
                  ? 'bg-[#2B2F2E] text-white border-[#2B2F2E] font-medium'
                  : 'bg-[#FAF8F3] text-gray-600 border-[#DDD6C8] hover:bg-[#F4EFE6]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* 4. Repeating Group « Liste des vêtements » */}
      <div className="space-y-2.5">
        {filteredList.length === 0 ? (
          <div className="p-8 text-center bg-[#FAF8F3] rounded-2xl border border-dashed border-[#DDD6C8]">
            <Shirt className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm font-semibold text-[#2B2F2E]">Aucun vêtement trouvé</p>
            <p className="text-xs text-gray-500 mt-1">
              {filtreGardeRobe === 'a_revoir'
                ? 'Bravo ! Toutes vos pièces ont été portées plus de 2 fois.'
                : 'Ajoutez votre première pièce avec le bouton ci-dessus.'}
            </p>
          </div>
        ) : (
          filteredList.map((cloth) => {
            const isARevoir = cloth.nb_ports <= 2 && cloth.statut === 'Actif';
            const colorMeta = COULEURS[cloth.couleur];

            return (
              <div
                key={cloth.id}
                className="bg-[#FAF8F3] p-3 rounded-2xl border border-[#DDD6C8] hover:border-[#8FA68E] transition-all flex items-center gap-3 shadow-2xs"
              >
                {/* Photo ou pastille de couleur */}
                <div className="relative shrink-0">
                  <img
                    src={cloth.photo}
                    alt={cloth.nom}
                    className="w-14 h-14 rounded-xl object-cover border border-[#DDD6C8]"
                  />
                  <span
                    title={`Couleur: ${cloth.couleur}`}
                    className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white shadow-2xs"
                    style={{ backgroundColor: colorMeta?.hex || '#8FA68E' }}
                  />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <h4 className="text-sm font-bold text-[#2B2F2E] truncate">{cloth.nom}</h4>
                    {isARevoir && (
                      <span className="text-[10px] bg-[#F1E3C6] text-[#7A5212] px-1.5 py-0.5 rounded-md font-bold whitespace-nowrap">
                        À revoir
                      </span>
                    )}
                    {cloth.statut !== 'Actif' && (
                      <span className="text-[10px] bg-[#DDD6C8] text-[#2B2F2E] px-1.5 py-0.5 rounded-md font-medium whitespace-nowrap">
                        {cloth.statut}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 mt-0.5 text-xs text-gray-600">
                    <span>{cloth.categorie}</span>
                    <span>•</span>
                    <span className="font-semibold text-[#4F6B52]">
                      Porté {cloth.nb_ports} fois
                    </span>
                  </div>
                </div>

                {/* Quick increment button */}
                <button
                  onClick={() => incrementPort(cloth.id)}
                  title="Ajouter 1 port à ce vêtement"
                  className="w-8 h-8 rounded-xl bg-[#F4EFE6] hover:bg-[#4F6B52] hover:text-white border border-[#DDD6C8] text-[#2B2F2E] flex items-center justify-center transition-colors shrink-0"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
