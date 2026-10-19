import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Categorie, CouleurNom, COULEURS } from '../../types';
import { X, Plus, Upload, Sparkles, Image as ImageIcon } from 'lucide-react';

const CATEGORIES: Categorie[] = ['Haut', 'Bas', 'Robe', 'Veste', 'Chaussures'];

const PRESET_PHOTOS: { label: string; url: string; cat: Categorie }[] = [
  { label: 'Chemise beige', url: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=400&q=80', cat: 'Haut' },
  { label: 'Pull en laine', url: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=400&q=80', cat: 'Haut' },
  { label: 'Jean denim', url: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=400&q=80', cat: 'Bas' },
  { label: 'Robe midi', url: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=400&q=80', cat: 'Robe' },
  { label: 'Veste blazer', url: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=400&q=80', cat: 'Veste' },
  { label: 'Sneakers', url: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=400&q=80', cat: 'Chaussures' },
];

export const AddClothModal: React.FC = () => {
  const { isAddModalOpen, setIsAddModalOpen, addVetement } = useApp();

  const [nom, setNom] = useState('');
  const [categorie, setCategorie] = useState<Categorie>('Haut');
  const [couleur, setCouleur] = useState<CouleurNom>('Sauge');
  const [nbPorts, setNbPorts] = useState<number>(0);
  const [photoUrl, setPhotoUrl] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  if (!isAddModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nom.trim()) {
      setError('Veuillez renseigner le nom du vêtement.');
      return;
    }

    addVetement({
      nom: nom.trim(),
      categorie,
      couleur,
      nb_ports: Number(nbPorts) || 0,
      photo: photoUrl.trim() || undefined,
    });

    // Reset & close (Bubble workflow: Reset inputs, Hide Popup)
    setNom('');
    setCategorie('Haut');
    setCouleur('Sauge');
    setNbPorts(0);
    setPhotoUrl('');
    setError(null);
    setIsAddModalOpen(false);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setPhotoUrl(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-[#FAF8F3] border border-[#DDD6C8] rounded-3xl max-w-md w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={() => setIsAddModalOpen(false)}
          className="absolute top-4 right-4 p-2 rounded-full text-gray-400 hover:text-[#2B2F2E] hover:bg-[#F4EFE6] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-5">
          <div className="w-10 h-10 rounded-xl bg-[#4F6B52] text-[#FAF8F3] flex items-center justify-center mb-2 shadow-2xs">
            <Plus className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-bold text-[#2B2F2E]">Ajouter un vêtement</h2>
          <p className="text-xs text-gray-500">
            Formulaire Bubble : Nouveau vêtement avec statut Actif
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nom */}
          <div>
            <label className="block text-xs font-semibold text-[#2B2F2E] mb-1">
              Nom du vêtement *
            </label>
            <input
              type="text"
              required
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              placeholder="Ex : Chemise en lin, Jean noir..."
              className="w-full px-3 py-2 rounded-xl border border-[#DDD6C8] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#8FA68E]"
            />
          </div>

          {/* Catégorie & Couleur */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#2B2F2E] mb-1">
                Catégorie (Option set)
              </label>
              <select
                value={categorie}
                onChange={(e) => setCategorie(e.target.value as Categorie)}
                className="w-full px-3 py-2 rounded-xl border border-[#DDD6C8] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#8FA68E]"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#2B2F2E] mb-1">
                Couleur principale
              </label>
              <select
                value={couleur}
                onChange={(e) => setCouleur(e.target.value as CouleurNom)}
                className="w-full px-3 py-2 rounded-xl border border-[#DDD6C8] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#8FA68E]"
              >
                {Object.keys(COULEURS).map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Pastille de prévisualisation couleur */}
          <div className="flex items-center gap-2 text-xs text-gray-600 bg-[#F4EFE6] px-3 py-1.5 rounded-xl border border-[#DDD6C8]">
            <span
              className="w-4 h-4 rounded-full border border-black/20"
              style={{ backgroundColor: COULEURS[couleur].hex }}
            />
            <span>Couleur sélectionnée : <strong>{couleur}</strong> ({COULEURS[couleur].hex})</span>
          </div>

          {/* Nombre de ports déjà effectués */}
          <div>
            <label className="block text-xs font-semibold text-[#2B2F2E] mb-1">
              Nombre de ports déjà effectués
            </label>
            <input
              type="number"
              min="0"
              value={nbPorts}
              onChange={(e) => setNbPorts(Math.max(0, parseInt(e.target.value) || 0))}
              className="w-full px-3 py-2 rounded-xl border border-[#DDD6C8] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#8FA68E]"
            />
            <p className="text-[11px] text-gray-400 mt-1">
              Si ≤ 2 ports, la pièce recevra automatiquement le badge « À revoir ».
            </p>
          </div>

          {/* Picture Uploader (Bubble Picture Uploader element) */}
          <div>
            <label className="block text-xs font-semibold text-[#2B2F2E] mb-1">
              Photo du vêtement (Picture Uploader)
            </label>

            {photoUrl ? (
              <div className="relative mb-2 w-full h-36 rounded-xl overflow-hidden border border-[#DDD6C8] group">
                <img src={photoUrl} alt="Preview" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => setPhotoUrl('')}
                  className="absolute top-2 right-2 p-1.5 rounded-full bg-black/60 text-white hover:bg-black"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-[#DDD6C8] hover:border-[#8FA68E] rounded-xl cursor-pointer bg-white/70 hover:bg-white transition-colors">
                <div className="flex flex-col items-center justify-center pt-3 pb-3">
                  <Upload className="w-6 h-6 text-[#4F6B52] mb-1" />
                  <p className="text-xs text-gray-600 font-medium">Cliquer pour charger une image</p>
                  <p className="text-[10px] text-gray-400">PNG, JPG ou WebP</p>
                </div>
                <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
              </label>
            )}

            {/* Quick preset pictures */}
            <div className="mt-2">
              <span className="text-[11px] text-gray-500 font-medium flex items-center gap-1 mb-1">
                <Sparkles className="w-3 h-3 text-[#4F6B52]" /> Ou choisir une suggestion :
              </span>
              <div className="flex gap-2 overflow-x-auto pb-1">
                {PRESET_PHOTOS.map((p, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setPhotoUrl(p.url);
                      setCategorie(p.cat);
                      if (!nom) setNom(p.label);
                    }}
                    className="shrink-0 flex items-center gap-1.5 px-2 py-1 rounded-lg border border-[#DDD6C8] text-[10px] bg-white hover:border-[#4F6B52] transition-colors"
                  >
                    <img src={p.url} alt="" className="w-4 h-4 rounded-full object-cover" />
                    <span>{p.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {error && (
            <p className="text-xs text-red-600 bg-red-50 p-2.5 rounded-xl border border-red-200">
              {error}
            </p>
          )}

          <div className="pt-2 flex gap-2">
            <button
              type="button"
              onClick={() => setIsAddModalOpen(false)}
              className="flex-1 py-2.5 rounded-xl border border-[#DDD6C8] bg-[#F4EFE6] text-xs font-semibold text-[#2B2F2E] hover:bg-[#DDD6C8]/60 transition-colors cursor-pointer"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 rounded-xl bg-[#4F6B52] hover:bg-[#3d5440] text-[#FAF8F3] text-xs font-semibold shadow-xs transition-colors cursor-pointer"
            >
              Enregistrer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
