import React from 'react';
import { useApp } from '../../context/AppContext';
import { Plus, Flame, Clock, Award, History, TrendingUp } from 'lucide-react';

export const CounterTab: React.FC = () => {
  const { vetements, incrementPort, ports } = useApp();

  // Sort by nb_ports descending as specified
  const sortedVetements = [...vetements].sort((a, b) => b.nb_ports - a.nb_ports);

  // Highest nb_ports (max of search)
  const maxPorts = sortedVetements.length > 0 ? Math.max(1, sortedVetements[0].nb_ports) : 1;

  // Format date helper
  const formatDate = (isoString?: string) => {
    if (!isoString) return 'Jamais';
    try {
      const d = new Date(isoString);
      return d.toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return 'Date inconnue';
    }
  };

  return (
    <div className="space-y-4 pb-20">
      {/* Intro Header */}
      <div className="bg-[#FAF8F3] p-4 rounded-2xl border border-[#DDD6C8] shadow-xs">
        <div className="flex items-center gap-2 text-[#4F6B52] mb-1">
          <TrendingUp className="w-4 h-4" />
          <span className="text-xs font-bold uppercase tracking-wider">Compteur d'usage</span>
        </div>
        <h3 className="text-base font-bold text-[#2B2F2E]">Vos vêtements les plus portés</h3>
        <p className="text-xs text-gray-500 mt-1">
          Classement décroissant par nombre de ports. Touchez « + » dès que vous enfilez une pièce pour la comptabiliser.
        </p>
      </div>

      {/* Repeating Group */}
      <div className="space-y-2.5">
        {sortedVetements.length === 0 ? (
          <div className="p-8 text-center bg-[#FAF8F3] rounded-2xl border border-dashed border-[#DDD6C8]">
            <p className="text-sm font-semibold text-[#2B2F2E]">Votre garde-robe est vide</p>
            <p className="text-xs text-gray-500 mt-1">
              Rendez-vous dans l'onglet « Garde-robe » pour ajouter vos pièces.
            </p>
          </div>
        ) : (
          sortedVetements.map((cloth, index) => {
            // Formula from guide: nb_ports ÷ (le plus grand nb_ports du search)
            const relativePercent = Math.min(100, Math.round((cloth.nb_ports / maxPorts) * 100));
            const isLeader = index === 0 && cloth.nb_ports > 0;

            return (
              <div
                key={cloth.id}
                className="bg-[#FAF8F3] p-3.5 rounded-2xl border border-[#DDD6C8] hover:border-[#8FA68E] transition-all shadow-2xs"
              >
                <div className="flex items-center gap-3">
                  {/* Rank badge / Leader crown */}
                  <div className="relative shrink-0">
                    <img
                      src={cloth.photo}
                      alt={cloth.nom}
                      className="w-13 h-13 rounded-xl object-cover border border-[#DDD6C8]"
                    />
                    <span
                      className={`absolute -top-1.5 -left-1.5 w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center shadow-xs ${
                        isLeader
                          ? 'bg-[#4F6B52] text-[#FAF8F3]'
                          : 'bg-[#F4EFE6] text-[#2B2F2E] border border-[#DDD6C8]'
                      }`}
                    >
                      {index + 1}
                    </span>
                  </div>

                  {/* Cloth info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-[#2B2F2E] truncate">{cloth.nom}</h4>
                      <span className="text-sm font-black text-[#4F6B52] ml-2 shrink-0">
                        {cloth.nb_ports} {cloth.nb_ports > 1 ? 'ports' : 'port'}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-[11px] text-gray-500 mt-0.5">
                      <span>{cloth.categorie}</span>
                      <span>•</span>
                      <span className="truncate">Dernier : {formatDate(cloth.dernier_port)}</span>
                    </div>

                    {/* Relative Progress Bar (Formula: nb_ports ÷ max(nb_ports)) */}
                    <div className="w-full bg-[#DDD6C8]/60 h-2 rounded-full mt-2 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-300 ${
                          cloth.nb_ports > 2 ? 'bg-[#4F6B52]' : 'bg-[#7A5212]'
                        }`}
                        style={{ width: `${relativePercent}%` }}
                      />
                    </div>
                  </div>

                  {/* Big + Button (Section 4 Workflow) */}
                  <button
                    onClick={() => incrementPort(cloth.id)}
                    className="w-10 h-10 rounded-xl bg-[#4F6B52] hover:bg-[#3d5440] text-[#FAF8F3] flex items-center justify-center font-bold text-lg shadow-xs hover:scale-105 active:scale-95 transition-all shrink-0 cursor-pointer"
                    title="Incrémenter +1 port"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Journal récent des ports (Activity Log) */}
      <div className="mt-6 bg-[#FAF8F3] p-4 rounded-2xl border border-[#DDD6C8]">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#2B2F2E]">
            <History className="w-4 h-4 text-[#4F6B52]" />
            Derniers ports enregistrés
          </div>
          <span className="text-[11px] text-gray-400 font-medium">
            Table Bubble « Port »
          </span>
        </div>

        {ports.length === 0 ? (
          <p className="text-xs text-gray-400 italic">Aucun port récent enregistré.</p>
        ) : (
          <div className="space-y-2">
            {ports.slice(0, 5).map((p) => (
              <div
                key={p.id}
                className="flex items-center justify-between text-xs py-1.5 border-b border-[#DDD6C8]/40 last:border-0"
              >
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#8FA68E]" />
                  <span className="font-semibold text-[#2B2F2E]">{p.nomVetement}</span>
                </div>
                <span className="text-[11px] text-gray-500">{formatDate(p.date_port)}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
