import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Tag, DollarSign, CheckCircle2 } from 'lucide-react';

export const SellModal: React.FC = () => {
  const { vêtementÀVendre, setVêtementÀVendre, creerAnnonce } = useApp();

  const [titre, setTitre] = useState('');
  const [description, setDescription] = useState('');
  const [prix, setPrix] = useState<number>(15);
  const [error, setError] = useState<string | null>(null);

  // Pre-fill initial contents when vêtementÀVendre changes
  useEffect(() => {
    if (vêtementÀVendre) {
      setTitre(vêtementÀVendre.nom);
      setDescription(
        `${vêtementÀVendre.nom}, porté ${vêtementÀVendre.nb_ports} fois. Vêtement en bon état, vendu faute d'usage.`
      );
      setPrix(15);
      setError(null);
    }
  }, [vêtementÀVendre]);

  if (!vêtementÀVendre) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!titre.trim()) {
      setError('Le titre est requis.');
      return;
    }
    if (prix <= 0) {
      setError('Le prix doit être supérieur à 0 €.');
      return;
    }

    // Workflow : Create a new thing Annonce + Make changes to vêtement (statut = En vente)
    creerAnnonce(vêtementÀVendre.id, titre.trim(), description.trim(), Number(prix));
    setVêtementÀVendre(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-[#FAF8F3] border border-[#DDD6C8] rounded-3xl max-w-md w-full p-6 shadow-2xl relative">
        <button
          onClick={() => setVêtementÀVendre(null)}
          className="absolute top-4 right-4 p-2 rounded-full text-gray-400 hover:text-[#2B2F2E] hover:bg-[#F4EFE6] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-5 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#4F6B52] text-[#FAF8F3] flex items-center justify-center shrink-0 shadow-2xs">
            <Tag className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-[#2B2F2E]">Fiche de vente</h2>
            <p className="text-xs text-gray-500">Mise en vente sur le circuit circulaire</p>
          </div>
        </div>

        {/* Selected cloth preview */}
        <div className="flex items-center gap-3 p-3 bg-[#F4EFE6] rounded-2xl border border-[#DDD6C8] mb-4">
          <img
            src={vêtementÀVendre.photo}
            alt={vêtementÀVendre.nom}
            className="w-14 h-14 rounded-xl object-cover border border-[#DDD6C8]"
          />
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-bold text-[#2B2F2E] truncate">{vêtementÀVendre.nom}</h4>
            <div className="flex items-center gap-2 mt-0.5 text-xs text-gray-600">
              <span>{vêtementÀVendre.categorie}</span>
              <span>•</span>
              <span className="font-medium text-[#4F6B52]">Porté {vêtementÀVendre.nb_ports} fois</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Titre pré-rempli */}
          <div>
            <label className="block text-xs font-semibold text-[#2B2F2E] mb-1">
              Titre de l'annonce
            </label>
            <input
              type="text"
              required
              value={titre}
              onChange={(e) => setTitre(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-[#DDD6C8] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#8FA68E]"
            />
          </div>

          {/* Description pré-remplie */}
          <div>
            <label className="block text-xs font-semibold text-[#2B2F2E] mb-1">
              Description pré-générée
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-[#DDD6C8] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#8FA68E]"
            />
            <p className="text-[11px] text-gray-500 mt-1">
              Mentionne l'historique de ports pour une transparence totale d'occasion.
            </p>
          </div>

          {/* Prix libre */}
          <div>
            <label className="block text-xs font-semibold text-[#2B2F2E] mb-1">
              Prix souhaité (€) *
            </label>
            <div className="relative">
              <input
                type="number"
                min="1"
                step="0.5"
                required
                value={prix}
                onChange={(e) => setPrix(parseFloat(e.target.value) || 0)}
                className="w-full pl-8 pr-3 py-2 rounded-xl border border-[#DDD6C8] bg-white text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#8FA68E]"
              />
              <span className="absolute left-3 top-2.5 text-gray-400 text-sm font-bold">€</span>
            </div>
          </div>

          {error && (
            <p className="text-xs text-red-600 bg-red-50 p-2 rounded-xl border border-red-200">
              {error}
            </p>
          )}

          <div className="pt-2 flex gap-2">
            <button
              type="button"
              onClick={() => setVêtementÀVendre(null)}
              className="flex-1 py-2.5 rounded-xl border border-[#DDD6C8] bg-[#F4EFE6] text-xs font-semibold text-[#2B2F2E] hover:bg-[#DDD6C8]/60 transition-colors cursor-pointer"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 rounded-xl bg-[#4F6B52] hover:bg-[#3d5440] text-[#FAF8F3] text-xs font-semibold shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              Mettre en vente
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
