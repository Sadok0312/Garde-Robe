export type Categorie = 'Haut' | 'Bas' | 'Robe' | 'Veste' | 'Chaussures';

export type Statut = 'Actif' | 'Gardé' | 'En vente' | 'Donné' | 'Échangé';

export type CouleurNom = 'Sauge' | 'Beige' | 'Anthracite' | 'Blanc cassé' | 'Vert foncé';

export interface Couleur {
  nom: CouleurNom;
  hex: string;
}

export const COULEURS: Record<CouleurNom, { nom: CouleurNom; hex: string; bgClass: string; textClass: string }> = {
  Sauge: { nom: 'Sauge', hex: '#8FA68E', bgClass: 'bg-[#8FA68E]', textClass: 'text-white' },
  Beige: { nom: 'Beige', hex: '#F4EFE6', bgClass: 'bg-[#F4EFE6]', textClass: 'text-[#2B2F2E]' },
  Anthracite: { nom: 'Anthracite', hex: '#2B2F2E', bgClass: 'bg-[#2B2F2E]', textClass: 'text-white' },
  'Blanc cassé': { nom: 'Blanc cassé', hex: '#FAF8F3', bgClass: 'bg-[#FAF8F3]', textClass: 'text-[#2B2F2E]' },
  'Vert foncé': { nom: 'Vert foncé', hex: '#4F6B52', bgClass: 'bg-[#4F6B52]', textClass: 'text-white' },
};

export interface User {
  id: string;
  email: string;
  nom_affiche: string;
  avatar?: string;
  roleDescription?: string;
}

export interface Vetement {
  id: string;
  nom: string;
  proprietaireId: string;
  categorie: Categorie;
  couleur: CouleurNom;
  photo: string;
  nb_ports: number;
  statut: Statut;
  dernier_port?: string; // ISO date
  date_creation: string;
}

export interface Port {
  id: string;
  vetementId: string;
  nomVetement: string;
  utilisateurId: string;
  date_port: string;
}

export interface Annonce {
  id: string;
  vetementId: string;
  titre: string;
  description: string;
  prix: number;
  publiee: boolean;
  date_creation: string;
}
