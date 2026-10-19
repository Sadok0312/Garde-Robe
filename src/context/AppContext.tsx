import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Vetement, Port, Annonce, Statut, Categorie } from '../types';
import { INITIAL_USERS, INITIAL_VETEMENTS_YASMINE, INITIAL_VETEMENTS_SADOK, INITIAL_PORTS } from '../data/initialData';

interface AppContextType {
  currentUser: User | null;
  users: User[];
  setCurrentUser: (u: User | null) => void;
  switchUser: (userId: string) => void;
  registerUser: (nom: string, email: string) => void;

  currentView: 'site' | 'app' | 'guide';
  setCurrentView: (view: 'site' | 'app' | 'guide') => void;

  appTab: 'garde-robe' | 'compteur' | 'options';
  setAppTab: (tab: 'garde-robe' | 'compteur' | 'options') => void;

  phoneFrame: boolean;
  setPhoneFrame: (val: boolean) => void;

  vetements: Vetement[];
  allVetementsCount: number;
  addVetement: (data: { nom: string; categorie: Categorie; couleur: any; photo?: string; nb_ports?: number }) => void;
  incrementPort: (vetementId: string) => void;
  updateStatut: (vetementId: string, statut: Statut) => void;

  ports: Port[];
  annonces: Annonce[];
  creerAnnonce: (vetementId: string, titre: string, description: string, prix: number) => void;

  filtreGardeRobe: 'toutes' | 'a_revoir';
  setFiltreGardeRobe: (f: 'toutes' | 'a_revoir') => void;
  selectedCategorie: Categorie | 'Toutes';
  setSelectedCategorie: (c: Categorie | 'Toutes') => void;

  isAddModalOpen: boolean;
  setIsAddModalOpen: (b: boolean) => void;
  vêtementÀVendre: Vetement | null;
  setVêtementÀVendre: (v: Vetement | null) => void;
  isLoginModalOpen: boolean;
  setIsLoginModalOpen: (b: boolean) => void;

  toastMessage: string | null;
  showToast: (msg: string) => void;
  resetDemoData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEY_VETEMENTS = 'garde_robe_vetements_v1';
const STORAGE_KEY_PORTS = 'garde_robe_ports_v1';
const STORAGE_KEY_ANNONCES = 'garde_robe_annonces_v1';
const STORAGE_KEY_USERS = 'garde_robe_users_v1';
const STORAGE_KEY_CURRENT_USER = 'garde_robe_current_user_v1';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_USERS);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return INITIAL_USERS;
  });

  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_CURRENT_USER);
    if (saved) {
      try {
        const u = JSON.parse(saved);
        if (u) return u;
      } catch (e) { /* ignore */ }
    }
    return INITIAL_USERS[0]; // Par défaut, Yasmine pour démarrer directement avec les données de démo
  });

  const [allVetements, setAllVetements] = useState<Vetement[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_VETEMENTS);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return [...INITIAL_VETEMENTS_YASMINE, ...INITIAL_VETEMENTS_SADOK];
  });

  const [allPorts, setAllPorts] = useState<Port[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_PORTS);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return INITIAL_PORTS;
  });

  const [allAnnonces, setAllAnnonces] = useState<Annonce[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_ANNONCES);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return [];
  });

  const [currentView, setCurrentView] = useState<'site' | 'app' | 'guide'>('site');
  const [appTab, setAppTab] = useState<'garde-robe' | 'compteur' | 'options'>('garde-robe');
  const [phoneFrame, setPhoneFrame] = useState<boolean>(true);

  const [filtreGardeRobe, setFiltreGardeRobe] = useState<'toutes' | 'a_revoir'>('toutes');
  const [selectedCategorie, setSelectedCategorie] = useState<Categorie | 'Toutes'>('Toutes');

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [vêtementÀVendre, setVêtementÀVendre] = useState<Vetement | null>(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync with localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_CURRENT_USER, JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_VETEMENTS, JSON.stringify(allVetements));
  }, [allVetements]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_PORTS, JSON.stringify(allPorts));
  }, [allPorts]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_ANNONCES, JSON.stringify(allAnnonces));
  }, [allAnnonces]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3200);
  };

  // Privacy rules filtering: each user sees ONLY their own clothes, ports, and annonces!
  const userVetements = currentUser
    ? allVetements.filter((v) => v.proprietaireId === currentUser.id)
    : [];

  const userPorts = currentUser
    ? allPorts.filter((p) => p.utilisateurId === currentUser.id)
    : [];

  const userAnnonces = currentUser
    ? allAnnonces.filter((a) => {
        const v = allVetements.find((item) => item.id === a.vetementId);
        return v && v.proprietaireId === currentUser.id;
      })
    : [];

  const switchUser = (userId: string) => {
    const target = users.find((u) => u.id === userId);
    if (target) {
      setCurrentUser(target);
      showToast(`Connecté en tant que ${target.nom_affiche}`);
    }
  };

  const registerUser = (nom: string, email: string) => {
    const newUser: User = {
      id: `user_${Date.now()}`,
      email,
      nom_affiche: nom,
      avatar: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80`,
      roleDescription: 'Nouvel utilisateur',
    };
    setUsers((prev) => [...prev, newUser]);
    setCurrentUser(newUser);
    showToast(`Compte créé avec succès ! Bienvenue, ${nom}.`);
  };

  const addVetement = (data: {
    nom: string;
    categorie: Categorie;
    couleur: any;
    photo?: string;
    nb_ports?: number;
  }) => {
    if (!currentUser) {
      showToast('Veuillez vous connecter pour ajouter une pièce.');
      return;
    }
    const defaultPlaceholder =
      'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=600&q=80';

    const newPiece: Vetement = {
      id: `vet_${Date.now()}`,
      nom: data.nom.trim(),
      proprietaireId: currentUser.id,
      categorie: data.categorie,
      couleur: data.couleur,
      photo: data.photo && data.photo.trim() !== '' ? data.photo : defaultPlaceholder,
      nb_ports: Number(data.nb_ports) || 0,
      statut: 'Actif',
      date_creation: new Date().toISOString(),
      dernier_port: Number(data.nb_ports) > 0 ? new Date().toISOString() : undefined,
    };

    setAllVetements((prev) => [newPiece, ...prev]);
    showToast(`« ${newPiece.nom} » ajouté à votre garde-robe !`);
  };

  const incrementPort = (vetementId: string) => {
    if (!currentUser) return;
    const now = new Date().toISOString();

    let clothName = '';
    setAllVetements((prev) =>
      prev.map((v) => {
        if (v.id === vetementId) {
          clothName = v.nom;
          return {
            ...v,
            nb_ports: v.nb_ports + 1,
            dernier_port: now,
          };
        }
        return v;
      })
    );

    const newPort: Port = {
      id: `port_${Date.now()}`,
      vetementId,
      nomVetement: clothName,
      utilisateurId: currentUser.id,
      date_port: now,
    };

    setAllPorts((prev) => [newPort, ...prev]);
    showToast(`+1 port enregistré pour « ${clothName} » !`);
  };

  const updateStatut = (vetementId: string, statut: Statut) => {
    setAllVetements((prev) =>
      prev.map((v) => (v.id === vetementId ? { ...v, statut } : v))
    );
    const label =
      statut === 'Gardé'
        ? 'gardé dans votre vestiaire'
        : statut === 'Donné'
        ? 'marqué comme donné'
        : statut === 'Échangé'
        ? 'marqué comme échangé'
        : 'remis en actif';
    showToast(`Vêtement ${label}.`);
  };

  const creerAnnonce = (vetementId: string, titre: string, description: string, prix: number) => {
    const newAnnonce: Annonce = {
      id: `ann_${Date.now()}`,
      vetementId,
      titre,
      description,
      prix,
      publiee: true,
      date_creation: new Date().toISOString(),
    };

    setAllAnnonces((prev) => [newAnnonce, ...prev]);
    updateStatut(vetementId, 'En vente');
    showToast(`Fiche de vente publiée pour « ${titre} » (${prix} €) !`);
  };

  const resetDemoData = () => {
    setAllVetements([...INITIAL_VETEMENTS_YASMINE, ...INITIAL_VETEMENTS_SADOK]);
    setAllPorts(INITIAL_PORTS);
    setAllAnnonces([]);
    setCurrentUser(INITIAL_USERS[0]);
    showToast('Données de démonstration réinitialisées.');
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        users,
        setCurrentUser,
        switchUser,
        registerUser,
        currentView,
        setCurrentView,
        appTab,
        setAppTab,
        phoneFrame,
        setPhoneFrame,
        vetements: userVetements,
        allVetementsCount: userVetements.length,
        addVetement,
        incrementPort,
        updateStatut,
        ports: userPorts,
        annonces: userAnnonces,
        creerAnnonce,
        filtreGardeRobe,
        setFiltreGardeRobe,
        selectedCategorie,
        setSelectedCategorie,
        isAddModalOpen,
        setIsAddModalOpen,
        vêtementÀVendre,
        setVêtementÀVendre,
        isLoginModalOpen,
        setIsLoginModalOpen,
        toastMessage,
        showToast,
        resetDemoData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
