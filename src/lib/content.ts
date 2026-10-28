import base from "../content/cours.json";
import type { Cours, Item } from "../types";
import type { Saisies } from "./storage";

export const coursDeBase = base as Cours;

/** Applique les saisies de l'éditeur au cours de base. */
export function fusionner(cours: Cours, saisies: Saisies): Cours {
  return {
    ...cours,
    unites: cours.unites.map((u) => ({
      ...u,
      lecons: u.lecons.map((l) => ({
        ...l,
        items: l.items.map((i): Item => ({ ...i, ...saisies[i.id] })),
      })),
    })),
  };
}

/**
 * Mode démonstration : remplace les formes manquantes par le mot français entre chevrons.
 * Ce n'est PAS du ngemba : cela sert seulement à essayer les exercices avant la saisie du contenu.
 */
export function remplirDemo(cours: Cours): Cours {
  return {
    ...cours,
    unites: cours.unites.map((u) => ({
      ...u,
      lecons: u.lecons.map((l) => ({
        ...l,
        items: l.items.map((i) => (i.ngemba ? i : { ...i, ngemba: `‹${i.fr}›` })),
      })),
    })),
  };
}
