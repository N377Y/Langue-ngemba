import { describe, expect, it } from "vitest";
import { normaliser, sansTons, verifier } from "./answer";

describe("verifier", () => {
  it("accepte la forme exacte, quelle que soit la composition Unicode", () => {
    expect(verifier("mɔ́", "mɔ́")).toBe("correct");
    expect(verifier("mɔ́", "mɔ́".normalize("NFC"))).toBe("correct");
  });

  it("unifie les variantes d'apostrophe et ignore la ponctuation finale et la casse", () => {
    expect(verifier("Ka’a !", "ka'a")).toBe("correct");
    expect(verifier("kaꞌa", "ka'a")).toBe("correct");
  });

  it("signale une erreur de ton seulement", () => {
    expect(verifier("mɔ̀", "mɔ́")).toBe("tons");
    expect(verifier("mɔ", "mɔ́")).toBe("tons");
  });

  it("ne confond pas les lettres spéciales avec les lettres latines", () => {
    expect(verifier("mo", "mɔ́")).toBe("faux");
    expect(sansTons("ŋə́")).toBe("ŋə");
  });

  it("normalise les espaces", () => {
    expect(normaliser("  a   b ")).toBe("a b");
  });
});
