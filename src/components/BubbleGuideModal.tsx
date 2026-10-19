import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  BookOpen, 
  CheckCircle, 
  Copy, 
  ExternalLink, 
  Smartphone, 
  Database, 
  Layers, 
  Lock, 
  Palette, 
  Share2,
  Check
} from 'lucide-react';

export const BubbleGuideModal: React.FC = () => {
  const { setCurrentView } = useApp();
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(id);
    setTimeout(() => setCopiedText(null), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6">
      {/* Top Banner */}
      <div className="bg-[#4F6B52] text-[#FAF8F3] p-6 sm:p-8 rounded-3xl shadow-sm mb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-[#8FA68E] text-xs font-semibold mb-3">
              <BookOpen className="w-3.5 h-3.5" />
              Documentation Technique & Académique
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Guide de mise en œuvre Bubble.io
            </h1>
            <p className="text-sm text-[#FAF8F3]/80 mt-1 max-w-2xl">
              Projet « Garde-robe durable » conçu par Sadok Driss, Nour Arfaoui et Med Achref Saidi.
              Ce guide détaille l'architecture sans code complète (base de données, workflows, privacy rules et UI).
            </p>
          </div>

          <button
            onClick={() => setCurrentView('app')}
            className="px-5 py-2.5 rounded-xl bg-[#FAF8F3] hover:bg-white text-[#2B2F2E] font-bold text-xs shadow-md transition-all shrink-0 cursor-pointer flex items-center gap-2"
          >
            <Smartphone className="w-4 h-4 text-[#4F6B52]" />
            Ouvrir le prototype interactif
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {/* Section 0: Préparer le projet */}
        <section className="bg-[#FAF8F3] p-6 rounded-3xl border border-[#DDD6C8] shadow-2xs">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-xl bg-[#8FA68E]/20 text-[#4F6B52] flex items-center justify-center font-bold text-sm">
              0
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#2B2F2E]">0. Préparer le projet Bubble</h2>
              <p className="text-xs text-gray-500">Configuration du style & police Figtree</p>
            </div>
          </div>

          <div className="space-y-3 text-xs sm:text-sm text-[#2B2F2E]/80 leading-relaxed">
            <p>1. Créer une application web responsive nommée <strong>garde-robe-durable</strong> sur bubble.io.</p>
            <p>2. Dans l'onglet <strong>Styles</strong>, configurer la palette officielle :</p>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
              <div className="p-2.5 rounded-xl bg-[#F4EFE6] border border-[#DDD6C8]">
                <div className="w-full h-6 rounded-md bg-[#F4EFE6] border border-black/10 mb-1.5" />
                <span className="font-bold text-xs block text-[#2B2F2E]">Beige</span>
                <code className="text-[11px] text-gray-500">#F4EFE6</code>
              </div>
              <div className="p-2.5 rounded-xl bg-[#FAF8F3] border border-[#DDD6C8]">
                <div className="w-full h-6 rounded-md bg-[#FAF8F3] border border-black/10 mb-1.5" />
                <span className="font-bold text-xs block text-[#2B2F2E]">Blanc cassé</span>
                <code className="text-[11px] text-gray-500">#FAF8F3</code>
              </div>
              <div className="p-2.5 rounded-xl bg-[#F4EFE6] border border-[#DDD6C8]">
                <div className="w-full h-6 rounded-md bg-[#8FA68E] mb-1.5" />
                <span className="font-bold text-xs block text-[#2B2F2E]">Vert sauge</span>
                <code className="text-[11px] text-gray-500">#8FA68E</code>
              </div>
              <div className="p-2.5 rounded-xl bg-[#F4EFE6] border border-[#DDD6C8]">
                <div className="w-full h-6 rounded-md bg-[#4F6B52] mb-1.5" />
                <span className="font-bold text-xs block text-[#2B2F2E]">Vert foncé</span>
                <code className="text-[11px] text-gray-500">#4F6B52</code>
              </div>
              <div className="p-2.5 rounded-xl bg-[#F4EFE6] border border-[#DDD6C8]">
                <div className="w-full h-6 rounded-md bg-[#2B2F2E] mb-1.5" />
                <span className="font-bold text-xs block text-[#2B2F2E]">Anthracite</span>
                <code className="text-[11px] text-gray-500">#2B2F2E</code>
              </div>
              <div className="p-2.5 rounded-xl bg-[#F4EFE6] border border-[#DDD6C8]">
                <div className="w-full h-6 rounded-md bg-[#DDD6C8] mb-1.5" />
                <span className="font-bold text-xs block text-[#2B2F2E]">Ligne</span>
                <code className="text-[11px] text-gray-500">#DDD6C8</code>
              </div>
              <div className="p-2.5 rounded-xl bg-[#F4EFE6] border border-[#DDD6C8]">
                <div className="w-full h-6 rounded-md bg-[#F1E3C6] border border-[#7A5212]/30 mb-1.5" />
                <span className="font-bold text-xs block text-[#7A5212]">Badge À revoir</span>
                <code className="text-[11px] text-gray-500">#F1E3C6</code>
              </div>
            </div>
          </div>
        </section>

        {/* Section 1: Base de données */}
        <section className="bg-[#FAF8F3] p-6 rounded-3xl border border-[#DDD6C8] shadow-2xs">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-xl bg-[#8FA68E]/20 text-[#4F6B52] flex items-center justify-center font-bold text-sm">
              1
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#2B2F2E]">1. Modélisation de la base de données (Data)</h2>
              <p className="text-xs text-gray-500">Option sets, Data types & Privacy rules</p>
            </div>
          </div>

          <div className="space-y-4 text-xs sm:text-sm">
            {/* Option sets */}
            <div>
              <h3 className="font-bold text-sm text-[#4F6B52] mb-2 flex items-center gap-1.5">
                <Database className="w-4 h-4" />
                Option sets (Listes fixes) :
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="bg-[#F4EFE6] p-3 rounded-xl border border-[#DDD6C8]">
                  <strong className="block text-xs text-[#2B2F2E] mb-1">Catégorie :</strong>
                  <ul className="list-disc list-inside text-xs text-gray-600 space-y-0.5">
                    <li>Haut</li>
                    <li>Bas</li>
                    <li>Robe</li>
                    <li>Veste</li>
                    <li>Chaussures</li>
                  </ul>
                </div>

                <div className="bg-[#F4EFE6] p-3 rounded-xl border border-[#DDD6C8]">
                  <strong className="block text-xs text-[#2B2F2E] mb-1">Statut :</strong>
                  <ul className="list-disc list-inside text-xs text-gray-600 space-y-0.5">
                    <li>Actif (défaut)</li>
                    <li>Gardé</li>
                    <li>En vente</li>
                    <li>Donné</li>
                    <li>Échangé</li>
                  </ul>
                </div>

                <div className="bg-[#F4EFE6] p-3 rounded-xl border border-[#DDD6C8]">
                  <strong className="block text-xs text-[#2B2F2E] mb-1">Couleur :</strong>
                  <ul className="list-disc list-inside text-xs text-gray-600 space-y-0.5">
                    <li>Sauge (#8FA68E)</li>
                    <li>Beige (#F4EFE6)</li>
                    <li>Anthracite (#2B2F2E)</li>
                    <li>Blanc cassé (#FAF8F3)</li>
                    <li>Vert foncé (#4F6B52)</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Privacy rules notice */}
            <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200">
              <div className="flex items-center gap-2 text-amber-900 font-bold text-xs mb-1">
                <Lock className="w-4 h-4 text-amber-700" />
                Privacy rules (Obligatoire pour la soutenance) :
              </div>
              <p className="text-xs text-amber-900/80 leading-relaxed">
                Condition : <code>This Vêtement's propriétaire is Current User</code>. Cocher <em>Find this in searches</em>, <em>View all fields</em> et <em>Modify</em>.
                Pour le rôle Everyone else : aucune permission cochée. Ainsi deux utilisateurs différents (comme testé dans la navbar avec le menu profil) ne voient jamais les vêtements de l'autre !
              </p>
            </div>
          </div>
        </section>

        {/* Section 4: Expressions Bubble exactes */}
        <section className="bg-[#FAF8F3] p-6 rounded-3xl border border-[#DDD6C8] shadow-2xs">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-xl bg-[#8FA68E]/20 text-[#4F6B52] flex items-center justify-center font-bold text-sm">
              4
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#2B2F2E]">4. Formules dynamiques & Expressions Bubble</h2>
              <p className="text-xs text-gray-500">Prêtes à copier-coller dans l'éditeur Bubble</p>
            </div>
          </div>

          <div className="space-y-3">
            {/* Expression 1 */}
            <div className="bg-[#F4EFE6] p-3.5 rounded-2xl border border-[#DDD6C8]">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-[#2B2F2E]">1. Ratio pièces bien portées (%) :</span>
                <button
                  onClick={() =>
                    copyToClipboard(
                      "Do a search for Vêtements (propriétaire = Current User, nb_ports > 2):count ÷ Do a search for Vêtements (propriétaire = Current User):count × 100:rounded to 0",
                      'expr1'
                    )
                  }
                  className="flex items-center gap-1 text-[11px] text-[#4F6B52] hover:underline"
                >
                  {copiedText === 'expr1' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  {copiedText === 'expr1' ? 'Copié !' : 'Copier expression'}
                </button>
              </div>
              <pre className="text-xs font-mono bg-white p-2.5 rounded-xl border border-[#DDD6C8] text-[#4F6B52] overflow-x-auto">
                Do a search for Vêtements (propriétaire = Current User, nb_ports &gt; 2):count ÷ Do a search for Vêtements (propriétaire = Current User):count × 100:rounded to 0
              </pre>
            </div>

            {/* Expression 2 */}
            <div className="bg-[#F4EFE6] p-3.5 rounded-2xl border border-[#DDD6C8]">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-[#2B2F2E]">2. Idée du jour (vêtement dormant) :</span>
                <button
                  onClick={() =>
                    copyToClipboard(
                      "Do a search for Vêtements (propriétaire = Current User, statut = Actif, nb_ports < 3):sorted by nb_ports (descending = 'no'):first item",
                      'expr2'
                    )
                  }
                  className="flex items-center gap-1 text-[11px] text-[#4F6B52] hover:underline"
                >
                  {copiedText === 'expr2' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  {copiedText === 'expr2' ? 'Copié !' : 'Copier expression'}
                </button>
              </div>
              <pre className="text-xs font-mono bg-white p-2.5 rounded-xl border border-[#DDD6C8] text-[#4F6B52] overflow-x-auto">
                Do a search for Vêtements (propriétaire = Current User, statut = Actif, nb_ports &lt; 3):sorted by nb_ports (descending = 'no'):first item
              </pre>
            </div>

            {/* Expression 3 */}
            <div className="bg-[#F4EFE6] p-3.5 rounded-2xl border border-[#DDD6C8]">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-[#2B2F2E]">3. Carte d'impact (pièces remises en circulation) :</span>
                <button
                  onClick={() =>
                    copyToClipboard(
                      "Do a search for Vêtements (propriétaire = Current User, statut ≠ Actif, statut ≠ Gardé):count",
                      'expr3'
                    )
                  }
                  className="flex items-center gap-1 text-[11px] text-[#4F6B52] hover:underline"
                >
                  {copiedText === 'expr3' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  {copiedText === 'expr3' ? 'Copié !' : 'Copier expression'}
                </button>
              </div>
              <pre className="text-xs font-mono bg-white p-2.5 rounded-xl border border-[#DDD6C8] text-[#4F6B52] overflow-x-auto">
                Do a search for Vêtements (propriétaire = Current User, statut ≠ Actif, statut ≠ Gardé):count
              </pre>
            </div>

            {/* Expression 4 */}
            <div className="bg-[#F4EFE6] p-3.5 rounded-2xl border border-[#DDD6C8]">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-[#2B2F2E]">4. Description auto-générée pour vente d'occasion :</span>
                <button
                  onClick={() =>
                    copyToClipboard(
                      'vêtement_à_vendre\'s nom + ", porté " + nb_ports + " fois. Vêtement en bon état, vendu faute d\'usage."',
                      'expr4'
                    )
                  }
                  className="flex items-center gap-1 text-[11px] text-[#4F6B52] hover:underline"
                >
                  {copiedText === 'expr4' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  {copiedText === 'expr4' ? 'Copié !' : 'Copier expression'}
                </button>
              </div>
              <pre className="text-xs font-mono bg-white p-2.5 rounded-xl border border-[#DDD6C8] text-[#4F6B52] overflow-x-auto">
                vêtement_à_vendre's nom + ", porté " + nb_ports + " fois. Vêtement en bon état, vendu faute d'usage."
              </pre>
            </div>
          </div>
        </section>

        {/* Section 6 & 7 : Déploiement */}
        <section className="bg-[#FAF8F3] p-6 rounded-3xl border border-[#DDD6C8] shadow-2xs">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-xl bg-[#8FA68E]/20 text-[#4F6B52] flex items-center justify-center font-bold text-sm">
              7
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#2B2F2E]">Publication & Soutenance</h2>
              <p className="text-xs text-gray-500">Adresse `garde-robe-durable.bubbleapps.io`</p>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-[#2B2F2E]/80 leading-relaxed mb-4">
            Pour votre rendu au professeur, vous pouvez partager à la fois l'adresse de votre application live Bubble et ce démonstrateur complet qui valide le comportement visuel, l'expérience mobile 420px et les Privacy Rules multi-utilisateurs.
          </p>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentView('site')}
              className="px-4 py-2 rounded-xl bg-[#F4EFE6] border border-[#DDD6C8] text-xs font-semibold hover:bg-[#DDD6C8]/60 transition-colors"
            >
              Revoir la landing page
            </button>
            <button
              onClick={() => setCurrentView('app')}
              className="px-4 py-2 rounded-xl bg-[#4F6B52] text-[#FAF8F3] text-xs font-semibold hover:bg-[#3d5440] transition-colors"
            >
              Tester l'application mobile
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};
