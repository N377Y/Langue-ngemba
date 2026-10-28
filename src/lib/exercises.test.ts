import { describe, expect, it } from "vitest";
import type { Item } from "../types";
import { construireLecon, MIN_ITEMS } from "./exercises";

const item = (n: number, ngemba: string | null = `mot${n}`): Item => ({ id: `i${n}`, fr: `fr${n}`, ngemba, statut: "valide" });
const rnd = () => 0.42;

describe("construireLecon", () => {
  it("ne produit rien sans assez de mots renseignés", () => {
    const items = [item(1), item(2), item(3), item(4, null), item(5, " ")];
    expect(construireLecon(items, rnd)).toEqual([]);
  });

  it("présente chaque mot puis le fait pratiquer", () => {
    const items = [1, 2, 3, 4, 5].map((n) => item(n));
    const ex = construireLecon(items, rnd);
    const decouvertes = ex.filter((e) => e.type === "decouverte").map((e) => e.type === "decouverte" && e.item.id);
    expect(decouvertes).toEqual(items.map((i) => i.id));
    expect(ex.filter((e) => e.type === "saisie")).toHaveLength(3);
    expect(ex.filter((e) => e.type === "paires")).toHaveLength(1);
  });

  it("propose des QCM à 4 choix contenant la bonne réponse, sans doublon", () => {
    const ex = construireLecon([1, 2, 3, 4, 5, 6].map((n) => item(n)), rnd);
    for (const e of ex) {
      if (e.type !== "qcm") continue;
      expect(e.choix).toHaveLength(MIN_ITEMS);
      expect(e.choix.map((c) => c.id)).toContain(e.item.id);
      expect(new Set(e.choix.map((c) => c.id)).size).toBe(e.choix.length);
    }
  });

  it("ne fait découvrir un mot qu'avant de l'interroger", () => {
    const ex = construireLecon([1, 2, 3, 4].map((n) => item(n)), rnd);
    const vus = new Set<string>();
    for (const e of ex) {
      if (e.type === "decouverte") vus.add(e.item.id);
      else if (e.type === "qcm" || e.type === "saisie") expect(vus.has(e.item.id)).toBe(true);
    }
  });
});
