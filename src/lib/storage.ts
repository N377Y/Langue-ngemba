import type { Item } from "../types";

const CLE_PROGRES = "ngemba.progres.v1";
const CLE_SAISIES = "ngemba.saisies.v1";

export interface Progres {
  xp: number;
  leconsFinies: Record<string, number>; // id de leçon → meilleur score (%)
  dernierJour: string | null; // AAAA-MM-JJ
  serie: number; // jours consécutifs
}

/** Modifications faites dans l'éditeur, par id d'élément. */
export type Saisies = Record<string, Partial<Pick<Item, "ngemba" | "prononciation" | "note" | "statut" | "source">>>;

function lire<T>(cle: string, defaut: T): T {
  try {
    const brut = localStorage.getItem(cle);
    return brut ? { ...defaut, ...JSON.parse(brut) } : defaut;
  } catch {
    return defaut;
  }
}

function ecrire(cle: string, valeur: unknown) {
  try {
    localStorage.setItem(cle, JSON.stringify(valeur));
  } catch {
    // stockage indisponible (navigation privée) : l'appli reste utilisable sans sauvegarde
  }
}

export const progresVide: Progres = { xp: 0, leconsFinies: {}, dernierJour: null, serie: 0 };

export const chargerProgres = () => lire(CLE_PROGRES, progresVide);
export const sauverProgres = (p: Progres) => ecrire(CLE_PROGRES, p);
export const chargerSaisies = () => lire<Saisies>(CLE_SAISIES, {});
export const sauverSaisies = (s: Saisies) => ecrire(CLE_SAISIES, s);

function jour(d: Date) {
  return d.toISOString().slice(0, 10);
}

/** Enregistre une leçon terminée : XP, meilleur score et série de jours. */
export function terminerLecon(p: Progres, leconId: string, score: number, xp: number, maintenant = new Date()): Progres {
  const aujourdhui = jour(maintenant);
  const hier = jour(new Date(maintenant.getTime() - 86_400_000));
  const serie = p.dernierJour === aujourdhui ? p.serie : p.dernierJour === hier ? p.serie + 1 : 1;
  return {
    xp: p.xp + xp,
    leconsFinies: { ...p.leconsFinies, [leconId]: Math.max(score, p.leconsFinies[leconId] ?? 0) },
    dernierJour: aujourdhui,
    serie,
  };
}
