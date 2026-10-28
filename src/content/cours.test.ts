import { describe, expect, it } from "vitest";
import cours from "./cours.json";
import type { Cours } from "../types";

const c = cours as Cours;
const items = c.unites.flatMap((u) => u.lecons.flatMap((l) => l.items));

describe("cours.json", () => {
  it("a des identifiants uniques", () => {
    const ids = items.map((i) => i.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("stocke le ngemba en Unicode NFC, pour que la comparaison des réponses soit fiable", () => {
    for (const i of items) if (i.ngemba) expect(i.ngemba, i.id).toBe(i.ngemba.normalize("NFC"));
  });

  it("n'a pas de doublon dans une même leçon (sinon le QCM aurait deux bonnes réponses)", () => {
    for (const l of c.unites.flatMap((u) => u.lecons)) {
      const remplis = l.items.filter((i) => i.ngemba);
      expect(new Set(remplis.map((i) => i.ngemba)).size, l.id).toBe(remplis.length);
      expect(new Set(remplis.map((i) => i.fr)).size, l.id).toBe(remplis.length);
    }
  });

  it("indique la source de chaque mot saisi", () => {
    for (const i of items) if (i.ngemba) expect(i.source?.ouvrage, i.id).toBeTruthy();
  });
});
