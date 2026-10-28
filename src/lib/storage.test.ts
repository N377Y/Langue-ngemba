import { describe, expect, it } from "vitest";
import { progresVide, terminerLecon } from "./storage";

describe("terminerLecon", () => {
  const j1 = new Date("2026-10-27T10:00:00Z");
  const j2 = new Date("2026-10-28T10:00:00Z");
  const j4 = new Date("2026-10-30T10:00:00Z");

  it("cumule l'XP et garde le meilleur score", () => {
    let p = terminerLecon(progresVide, "a", 80, 10, j1);
    p = terminerLecon(p, "a", 60, 10, j1);
    expect(p.xp).toBe(20);
    expect(p.leconsFinies.a).toBe(80);
  });

  it("calcule la série de jours", () => {
    let p = terminerLecon(progresVide, "a", 100, 10, j1);
    expect(p.serie).toBe(1);
    p = terminerLecon(p, "a", 100, 10, j1);
    expect(p.serie).toBe(1);
    p = terminerLecon(p, "a", 100, 10, j2);
    expect(p.serie).toBe(2);
    p = terminerLecon(p, "a", 100, 10, j4);
    expect(p.serie).toBe(1);
  });
});
