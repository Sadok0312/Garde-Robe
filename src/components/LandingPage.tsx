import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  ArrowRight, 
  Sparkles, 
  Clock, 
  Tag, 
  RefreshCw, 
  Heart, 
  Eye, 
  Share2, 
  ShieldCheck, 
  CheckCircle2, 
  ExternalLink,
  Info
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { setCurrentView, currentUser, setIsLoginModalOpen } = useApp();

  const handleLaunchApp = () => {
    if (currentUser) {
      setCurrentView('app');
    } else {
      setIsLoginModalOpen(true);
    }
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F3] text-[#2B2F2E]">
      {/* Sub-header Navigation anchors */}
      <div className="bg-[#F4EFE6] border-b border-[#DDD6C8] py-2 px-4 sticky top-[61px] z-30 hidden sm:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs font-medium text-[#2B2F2E]/70">
          <div className="flex items-center gap-6">
            <button onClick={() => scrollToSection('hero')} className="hover:text-[#4F6B52] transition-colors">
              Accueil
            </button>
            <button onClick={() => scrollToSection('probleme')} className="hover:text-[#4F6B52] transition-colors">
              Le problème
            </button>
            <button onClick={() => scrollToSection('fonctionnement')} className="hover:text-[#4F6B52] transition-colors">
              Comment ça marche
            </button>
            <button onClick={() => scrollToSection('valeurs')} className="hover:text-[#4F6B52] transition-colors">
              Voir, agir, valoriser
            </button>
            <button onClick={() => scrollToSection('equipe')} className="hover:text-[#4F6B52] transition-colors">
              L'équipe
            </button>
          </div>
          <button
            onClick={() => setCurrentView('guide')}
            className="text-[#4F6B52] hover:underline flex items-center gap-1 font-semibold"
          >
            Consulter le guide Bubble
            <ExternalLink className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* 1. Hero Section */}
      <section id="hero" className="relative px-4 sm:px-6 lg:px-8 pt-16 pb-20 md:pt-24 md:pb-28 overflow-hidden bg-gradient-to-b from-[#FAF8F3] via-[#F4EFE6]/50 to-[#FAF8F3]">
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#8FA68E]/20 text-[#4F6B52] text-xs font-semibold mb-6 border border-[#8FA68E]/30 animate-fade-in">
            <Sparkles className="w-3.5 h-3.5" />
            Mode durable & consommation consciente
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-[#2B2F2E] mb-6 leading-[1.1]">
            Portez ce que vous <span className="text-[#4F6B52] italic font-serif">avez déjà</span>.
          </h1>

          <p className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-[#2B2F2E]/80 mb-10 leading-relaxed font-normal">
            Prenez conscience de votre vestiaire réel, comptez vos ports quotidiens, redécouvrez vos pièces oubliées et remettez en circulation celles qui ne vous servent plus.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={handleLaunchApp}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#4F6B52] hover:bg-[#3d5440] text-[#FAF8F3] font-semibold text-base shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 group cursor-pointer"
            >
              Lancer l'application démo
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => scrollToSection('probleme')}
              className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-[#F4EFE6] hover:bg-[#DDD6C8]/60 text-[#2B2F2E] font-medium text-base border border-[#DDD6C8] transition-colors cursor-pointer"
            >
              Comprendre la démarche
            </button>
          </div>

          {/* Quick Mockup preview teaser */}
          <div className="mt-14 max-w-3xl mx-auto p-3 bg-white/80 rounded-3xl border border-[#DDD6C8] shadow-lg backdrop-blur-xs">
            <div className="bg-[#FAF8F3] rounded-2xl p-4 sm:p-6 text-left grid grid-cols-1 sm:grid-cols-3 gap-4 border border-[#DDD6C8]/60">
              <div className="p-4 rounded-xl bg-white border border-[#DDD6C8]/50 shadow-2xs">
                <div className="text-xs text-gray-500 font-medium">Rotation du vestiaire</div>
                <div className="text-2xl font-bold text-[#4F6B52] mt-1">62 %</div>
                <div className="text-[11px] text-[#8FA68E] mt-0.5 font-medium">Pièces bien portées (&gt;2 fois)</div>
              </div>
              <div className="p-4 rounded-xl bg-white border border-[#DDD6C8]/50 shadow-2xs">
                <div className="text-xs text-gray-500 font-medium">Idée du matin</div>
                <div className="text-sm font-semibold text-[#2B2F2E] mt-1 truncate">Pull sauge</div>
                <div className="text-[11px] text-[#7A5212] bg-[#F1E3C6] px-1.5 py-0.5 rounded-sm inline-block mt-1 font-medium">À revoir (0 port)</div>
              </div>
              <div className="p-4 rounded-xl bg-white border border-[#DDD6C8]/50 shadow-2xs">
                <div className="text-xs text-gray-500 font-medium">Impact circulaire</div>
                <div className="text-2xl font-bold text-[#2B2F2E] mt-1">+1 port</div>
                <div className="text-[11px] text-gray-500 mt-0.5">En 1 clic chaque matin</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Le problème (fond anthracite #2B2F2E) */}
      <section id="probleme" className="bg-[#2B2F2E] text-[#FAF8F3] py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[#8FA68E] text-xs font-medium mb-4">
            <Info className="w-3.5 h-3.5" />
            Constat initial
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Le paradoxe du dressing plein à craquer
          </h2>

          {/* Persona scenario note (Required by spec) */}
          <div className="p-3.5 rounded-xl bg-[#FAF8F3]/10 border border-white/15 text-[#DDD6C8] text-xs sm:text-sm mb-12 flex items-start gap-2.5">
            <Info className="w-4 h-4 text-[#8FA68E] shrink-0 mt-0.5" />
            <div>
              <strong className="text-white">Note méthodologique importante :</strong> Scénario fictif de la persona Yasmine, pas un résultat d'enquête. Les entretiens utilisateurs et les tests terrain restent à planifier.
            </div>
          </div>

          {/* Big highlight numbers */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-white/5 p-6 sm:p-10 rounded-3xl border border-white/10">
            <div>
              <div className="text-5xl sm:text-6xl font-black text-[#8FA68E] tracking-tight">
                120 <span className="text-2xl sm:text-3xl font-semibold text-[#DDD6C8]">pièces</span>
              </div>
              <div className="text-lg text-white font-medium mt-1">possédées en moyenne dans les placards</div>
              <p className="text-sm text-[#DDD6C8]/80 mt-3 leading-relaxed">
                Des vêtements empilés, souvent achetés sur un coup de cœur ou en soldes, qui dorment sur leurs cintres sans voir la lumière du jour.
              </p>
            </div>

            <div className="border-t md:border-t-0 md:border-l border-white/10 pt-6 md:pt-0 md:pl-8">
              <div className="text-5xl sm:text-6xl font-black text-[#F1E3C6] tracking-tight">
                ≈15 <span className="text-2xl sm:text-3xl font-semibold text-[#DDD6C8]">pièces</span>
              </div>
              <div className="text-lg text-white font-medium mt-1">portées régulièrement</div>
              <p className="text-sm text-[#DDD6C8]/80 mt-3 leading-relaxed">
                Seulement ~12 % de notre garde-robe tourne réellement au quotidien. Résultat : une sensation trompeuse de « n'avoir rien à se mettre ».
              </p>
            </div>
          </div>

          {/* Visual dots visualization */}
          <div className="mt-10 p-6 rounded-2xl bg-white/5 border border-white/10">
            <div className="flex flex-wrap items-center justify-between text-xs text-[#DDD6C8] mb-3">
              <span>Visualisation des 120 pièces de Yasmine :</span>
              <div className="flex items-center gap-4 mt-2 sm:mt-0">
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-[#8FA68E]"></span>
                  15 pièces portées régulièrement (~12%)
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-white/20"></span>
                  105 pièces sous-utilisées (~88%)
                </span>
              </div>
            </div>

            <div className="grid grid-cols-12 sm:grid-cols-20 md:grid-cols-24 gap-1.5 sm:gap-2 pt-2">
              {Array.from({ length: 120 }).map((_, i) => (
                <div
                  key={i}
                  title={i < 15 ? `Pièce active #${i + 1}` : `Pièce dormante #${i + 1}`}
                  className={`h-2.5 rounded-full transition-all ${
                    i < 15 ? 'bg-[#8FA68E] shadow-[0_0_8px_#8FA68E]' : 'bg-white/20'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Comment ça marche : 4 cartes (Cataloguer, Compter, Repérer, Agir) */}
      <section id="fonctionnement" className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#8FA68E]/20 text-[#4F6B52] text-xs font-semibold mb-3">
            Simplicité & Efficacité
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#2B2F2E]">
            Comment fonctionne l'application ?
          </h2>
          <p className="text-[#2B2F2E]/70 mt-3 text-sm sm:text-base">
            Quatre étapes intuitives conçues pour créer une nouvelle habitude sans friction.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Carte 1 */}
          <div className="p-6 rounded-2xl bg-[#FAF8F3] border border-[#DDD6C8] hover:border-[#8FA68E] shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#F4EFE6] text-[#4F6B52] flex items-center justify-center font-bold text-lg mb-5 group-hover:bg-[#4F6B52] group-hover:text-white transition-colors">
                1
              </div>
              <h3 className="text-xl font-bold text-[#2B2F2E] mb-2">Cataloguer</h3>
              <p className="text-xs sm:text-sm text-[#2B2F2E]/75 leading-relaxed">
                Ajoutez vos vêtements avec leur nom, catégorie, couleur et photo. Vous pouvez aussi noter combien de fois ils ont déjà été portés.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#DDD6C8]/60 text-xs text-[#4F6B52] font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Inventaire visuel clair
            </div>
          </div>

          {/* Carte 2 */}
          <div className="p-6 rounded-2xl bg-[#FAF8F3] border border-[#DDD6C8] hover:border-[#8FA68E] shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#F4EFE6] text-[#4F6B52] flex items-center justify-center font-bold text-lg mb-5 group-hover:bg-[#4F6B52] group-hover:text-white transition-colors">
                2
              </div>
              <h3 className="text-xl font-bold text-[#2B2F2E] mb-2">Compter</h3>
              <p className="text-xs sm:text-sm text-[#2B2F2E]/75 leading-relaxed">
                Un bouton « + » ultra rapide chaque fois que vous enfilez un vêtement. L'historique et la jauge s'actualisent instantanément.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#DDD6C8]/60 text-xs text-[#4F6B52] font-semibold flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              1 seconde par matin
            </div>
          </div>

          {/* Carte 3 */}
          <div className="p-6 rounded-2xl bg-[#FAF8F3] border border-[#DDD6C8] hover:border-[#8FA68E] shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#F4EFE6] text-[#4F6B52] flex items-center justify-center font-bold text-lg mb-5 group-hover:bg-[#4F6B52] group-hover:text-white transition-colors">
                3
              </div>
              <h3 className="text-xl font-bold text-[#2B2F2E] mb-2">Repérer</h3>
              <p className="text-xs sm:text-sm text-[#2B2F2E]/75 leading-relaxed">
                L'algorithme identifie automatiquement les pièces portées 2 fois ou moins avec le badge spécifique <span className="bg-[#F1E3C6] text-[#7A5212] px-1 py-0.5 rounded-sm font-semibold">« À revoir »</span>.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#DDD6C8]/60 text-xs text-[#7A5212] font-semibold flex items-center gap-1">
              <Eye className="w-3.5 h-3.5" />
              Détection automatique
            </div>
          </div>

          {/* Carte 4 */}
          <div className="p-6 rounded-2xl bg-[#FAF8F3] border border-[#DDD6C8] hover:border-[#8FA68E] shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#F4EFE6] text-[#4F6B52] flex items-center justify-center font-bold text-lg mb-5 group-hover:bg-[#4F6B52] group-hover:text-white transition-colors">
                4
              </div>
              <h3 className="text-xl font-bold text-[#2B2F2E] mb-2">Agir</h3>
              <p className="text-xs sm:text-sm text-[#2B2F2E]/75 leading-relaxed">
                Prenez une décision éclairée : Garder, Donner, Échanger ou Vendre (fiche d'annonce pré-remplie automatiquement).
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#DDD6C8]/60 text-xs text-[#4F6B52] font-semibold flex items-center gap-1">
              <RefreshCw className="w-3.5 h-3.5" />
              Économie circulaire
            </div>
          </div>
        </div>
      </section>

      {/* 4. Voir, agir, valoriser : 3 colonnes */}
      <section id="valeurs" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#F4EFE6]/70 border-y border-[#DDD6C8]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#2B2F2E]">
              Voir, agir, valoriser
            </h2>
            <p className="text-[#2B2F2E]/70 mt-2 text-sm sm:text-base">
              Les trois piliers fondamentaux au cœur de notre proposition de valeur.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#FAF8F3] p-8 rounded-3xl border border-[#DDD6C8] shadow-xs">
              <div className="w-12 h-12 rounded-2xl bg-[#8FA68E]/20 text-[#4F6B52] flex items-center justify-center mb-6">
                <Eye className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#2B2F2E] mb-3">1. Voir la réalité</h3>
              <p className="text-sm text-[#2B2F2E]/80 leading-relaxed">
                Sortir du déni : mesurer objectivement la fréquence réelle de portage plutôt que de se fier à une impression vague. La jauge de rotation donne une vision immédiate et bienveillante de son placard.
              </p>
            </div>

            <div className="bg-[#FAF8F3] p-8 rounded-3xl border border-[#DDD6C8] shadow-xs">
              <div className="w-12 h-12 rounded-2xl bg-[#4F6B52] text-[#FAF8F3] flex items-center justify-center mb-6">
                <RefreshCw className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#2B2F2E] mb-3">2. Agir sans culpabilité</h3>
              <p className="text-sm text-[#2B2F2E]/80 leading-relaxed">
                Une pièce ne vous convient plus ? Pas de regret : l'application propose 4 choix clairs. Qu'il s'agisse de la garder en conscience, de la donner ou de l'échanger, l'action est simple et libératrice.
              </p>
            </div>

            <div className="bg-[#FAF8F3] p-8 rounded-3xl border border-[#DDD6C8] shadow-xs">
              <div className="w-12 h-12 rounded-2xl bg-[#F1E3C6] text-[#7A5212] flex items-center justify-center mb-6">
                <Tag className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#2B2F2E] mb-3">3. Valoriser les pièces</h3>
              <p className="text-sm text-[#2B2F2E]/80 leading-relaxed">
                Générez des fiches de vente pré-remplies en 1 clic : le titre, l'historique de ports et une description honnête sont déjà rédigés. Fixez votre prix et remettez la pièce dans le circuit de la seconde main.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. L'équipe (Sadok Driss, Nour Arfaoui, Med Achref Saidi) */}
      <section id="equipe" className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#8FA68E]/20 text-[#4F6B52] text-xs font-semibold mb-3">
            Projet académique & Conception
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#2B2F2E]">
            L'équipe du projet
          </h2>
          <p className="text-[#2B2F2E]/70 mt-2 text-sm sm:text-base">
            Trois étudiants engagés pour réconcilier simplicité numérique et durabilité textile.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Sadok */}
          <div className="p-6 rounded-2xl bg-[#FAF8F3] border border-[#DDD6C8] text-center shadow-2xs">
            <div className="w-20 h-20 rounded-full mx-auto mb-4 overflow-hidden border-2 border-[#4F6B52]/40">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80"
                alt="Sadok Driss"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-lg font-bold text-[#2B2F2E]">Sadok Driss</h3>
            <p className="text-xs text-[#4F6B52] font-semibold mt-0.5">sadokdriss.2003@gmail.com</p>
            <p className="text-xs text-gray-500 mt-2">
              Architecture sans code, modélisation des données & workflows Bubble.
            </p>
          </div>

          {/* Nour */}
          <div className="p-6 rounded-2xl bg-[#FAF8F3] border border-[#DDD6C8] text-center shadow-2xs">
            <div className="w-20 h-20 rounded-full mx-auto mb-4 overflow-hidden border-2 border-[#4F6B52]/40">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80"
                alt="Nour Arfaoui"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-lg font-bold text-[#2B2F2E]">Nour Arfaoui</h3>
            <p className="text-xs text-[#4F6B52] font-semibold mt-0.5">Membre de l'équipe</p>
            <p className="text-xs text-gray-500 mt-2">
              Design d'interaction, charte graphique & parcours utilisateur mobile.
            </p>
          </div>

          {/* Med Achref */}
          <div className="p-6 rounded-2xl bg-[#FAF8F3] border border-[#DDD6C8] text-center shadow-2xs">
            <div className="w-20 h-20 rounded-full mx-auto mb-4 overflow-hidden border-2 border-[#4F6B52]/40">
              <img
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80"
                alt="Med Achref Saidi"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-lg font-bold text-[#2B2F2E]">Med Achref Saidi</h3>
            <p className="text-xs text-[#4F6B52] font-semibold mt-0.5">Membre de l'équipe</p>
            <p className="text-xs text-gray-500 mt-2">
              Logique métier, privacy rules & stratégie d'impact circulaire.
            </p>
          </div>
        </div>

        {/* Required disclaimer note about tests & interviews */}
        <div className="p-4 rounded-2xl bg-[#F4EFE6] border border-[#DDD6C8] text-xs sm:text-sm text-[#2B2F2E]/80 text-center flex items-center justify-center gap-2">
          <Info className="w-4 h-4 text-[#4F6B52] shrink-0" />
          <span>
            <strong>Statut de validation :</strong> Les entretiens utilisateurs et les tests d'utilisabilité restent à réaliser lors des prochaines itérations.
          </span>
        </div>
      </section>

      {/* CTA Footer banner */}
      <section className="bg-[#4F6B52] text-[#FAF8F3] py-14 px-4 sm:px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-extrabold mb-4">
            Prêt à explorer votre propre garde-robe ?
          </h2>
          <p className="text-[#FAF8F3]/80 text-sm sm:text-base mb-8">
            Testez immédiatement le prototype interactif ou consultez le pas-à-pas de configuration Bubble.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => setCurrentView('app')}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#FAF8F3] hover:bg-white text-[#2B2F2E] font-bold text-sm shadow-md transition-all cursor-pointer"
            >
              Tester l'application maintenant
            </button>
            <button
              onClick={() => setCurrentView('guide')}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-transparent hover:bg-white/10 text-[#FAF8F3] border border-white/30 font-semibold text-sm transition-all cursor-pointer"
            >
              Ouvrir le guide Bubble
            </button>
          </div>
        </div>
      </section>

      {/* Minimal Footer */}
      <footer className="bg-[#2B2F2E] text-[#FAF8F3]/60 py-8 px-4 text-center text-xs border-t border-white/10">
        <p className="mb-1 text-white font-medium">REWEAR • Garde-robe durable • Projet no-code Bubble</p>
        <p>Sadok Driss, Nour Arfaoui, Med Achref Saidi — Fait avec passion pour une mode plus sobre et circulaire.</p>
      </footer>
    </div>
  );
};
