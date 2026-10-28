/** Lettres de l'Alphabet Général des Langues Camerounaises absentes d'un clavier français. */
const LETTRES = ["ɛ", "ɔ", "ə", "ʉ", "ŋ", "ɑ", "'"];
/** Tons, en diacritiques combinants : ils s'appliquent à la lettre qui précède. */
const TONS = [
  { car: "́", nom: "haut" },
  { car: "̀", nom: "bas" },
  { car: "̂", nom: "descendant" },
  { car: "̌", nom: "montant" },
  { car: "̄", nom: "moyen" },
];

export function Clavier({ onTouche }: { onTouche: (car: string) => void }) {
  return (
    <div className="clavier" aria-label="Caractères spéciaux">
      {LETTRES.map((c) => (
        <button key={c} type="button" onClick={() => onTouche(c)}>
          {c}
        </button>
      ))}
      {TONS.map((t) => (
        <button key={t.nom} type="button" title={`ton ${t.nom}`} onClick={() => onTouche(t.car)}>
          {"a" + t.car}
        </button>
      ))}
    </div>
  );
}
