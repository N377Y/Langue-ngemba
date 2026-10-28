/** Statut éditorial d'un élément de vocabulaire. */
export type Statut = "a_saisir" | "a_valider" | "valide";

export interface Source {
  /** Ouvrage de référence, ex. « Longam », « Syllabaire Jé'nettò ». */
  ouvrage: string;
  page?: string;
}

export interface Item {
  id: string;
  fr: string;
  /** Forme en ngemba (Bamougoum), avec tons. `null` tant qu'elle n'est pas saisie. */
  ngemba: string | null;
  /** Lecture approximative à la française, pour les débutants (ex. « o li a »). */
  prononciation?: string;
  /** Remarque d'usage (contexte, registre…). */
  note?: string;
  /** Chemin d'un fichier audio, enregistré par un locuteur. */
  audio?: string | null;
  source?: Source | null;
  statut: Statut;
}

export interface Lecon {
  id: string;
  titre: string;
  items: Item[];
}

export interface Unite {
  id: string;
  titre: string;
  description: string;
  /** Nom d'une icône de `components/Icone.tsx`. */
  icone: string;
  lecons: Lecon[];
}

export interface Cours {
  langue: string;
  variete: string;
  version: number;
  unites: Unite[];
}
