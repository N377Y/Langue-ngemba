import type { Item } from "../types";

export type Exercice =
  | { type: "decouverte"; item: Item }
  | { type: "qcm"; sens: "fr-ng" | "ng-fr"; item: Item; choix: Item[] }
  | { type: "paires"; items: Item[] }
  | { type: "saisie"; item: Item };

export type Aleatoire = () => number;

/** Nombre minimal de mots renseignés pour qu'une leçon soit jouable (il faut des distracteurs). */
export const MIN_ITEMS = 4;

export function melanger<T>(liste: readonly T[], rnd: Aleatoire = Math.random): T[] {
  const copie = [...liste];
  for (let i = copie.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [copie[i], copie[j]] = [copie[j], copie[i]];
  }
  return copie;
}

export function itemsJouables(items: readonly Item[]): Item[] {
  return items.filter((i) => i.ngemba && i.ngemba.trim() !== "");
}

function choix(cible: Item, pool: readonly Item[], rnd: Aleatoire): Item[] {
  const distracteurs = melanger(
    pool.filter((i) => i.id !== cible.id),
    rnd,
  ).slice(0, 3);
  return melanger([cible, ...distracteurs], rnd);
}

/**
 * Construit la séquence d'exercices d'une leçon :
 * découverte de chaque mot, QCM dans les deux sens, une association de paires, puis une saisie au clavier.
 */
export function construireLecon(items: readonly Item[], rnd: Aleatoire = Math.random): Exercice[] {
  const jouables = itemsJouables(items);
  if (jouables.length < MIN_ITEMS) return [];

  const ex: Exercice[] = [];
  for (const [n, item] of jouables.entries()) {
    ex.push({ type: "decouverte", item });
    // Après chaque paire de nouveaux mots, on vérifie le précédent.
    if (n % 2 === 1) ex.push({ type: "qcm", sens: "ng-fr", item: jouables[n - 1], choix: choix(jouables[n - 1], jouables, rnd) });
  }
  for (const item of melanger(jouables, rnd)) {
    ex.push({ type: "qcm", sens: "fr-ng", item, choix: choix(item, jouables, rnd) });
  }
  ex.push({ type: "paires", items: melanger(jouables, rnd).slice(0, 5) });
  for (const item of melanger(jouables, rnd).slice(0, 3)) {
    ex.push({ type: "saisie", item });
  }
  return ex;
}
