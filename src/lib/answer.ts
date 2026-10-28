export type Verdict = "correct" | "tons" | "faux";

const APOSTROPHES = /[‘’ʼʻꞋꞌ`´]/g;

/** Forme canonique : Unicode NFC, apostrophe standard, espaces et casse normalisés. */
export function normaliser(s: string): string {
  return s
    .normalize("NFC")
    .replace(APOSTROPHES, "'")
    .replace(/[.!?,;:…]+$/u, "")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

/** Retire les tons et autres diacritiques combinants, en gardant les lettres spéciales (ɛ, ɔ, ə, ʉ, ŋ). */
export function sansTons(s: string): string {
  return normaliser(s).normalize("NFD").replace(/\p{M}/gu, "").normalize("NFC");
}

/**
 * Compare la réponse de l'apprenant à la forme attendue.
 * « tons » signifie que seules les marques de ton diffèrent : la réponse est acceptée avec un avertissement.
 */
export function verifier(reponse: string, attendu: string): Verdict {
  if (normaliser(reponse) === normaliser(attendu)) return "correct";
  if (sansTons(reponse) === sansTons(attendu)) return "tons";
  return "faux";
}
