import { useState } from "react";
import type { Lecon as TLecon } from "../types";
import { construireLecon, type Exercice } from "../lib/exercises";
import { Decouverte, Paires, Pied, Qcm, Saisie, type Resultat } from "./Exercices";
import { Icone } from "./Icone";

const XP_PAR_LECON = 10;

const RETOURS = {
  correct: { titre: "Excellent !", icone: "coche" },
  tons: { titre: "Presque ! Attention aux tons.", icone: "attention" },
  faux: { titre: "Bonne réponse :", icone: "croix" },
} as const;

interface Props {
  lecon: TLecon;
  onFin: (score: number, xp: number) => void;
  onQuitter: () => void;
}

export function Lecon({ lecon, onFin, onQuitter }: Props) {
  const [file, setFile] = useState<Exercice[]>(() => construireLecon(lecon.items));
  const [total] = useState(() => file.filter((e) => e.type !== "decouverte").length);
  const [index, setIndex] = useState(0);
  const [resultat, setResultat] = useState<Resultat | null>(null);
  const [fautes, setFautes] = useState(0);
  const [fini, setFini] = useState(false);

  const ex = file[index];

  function repondre(r: Resultat) {
    if (ex.type === "decouverte") return suivant(r, true);
    setResultat(r);
  }

  function suivant(r = resultat, direct = false) {
    let suite = file;
    // Comme sur Duolingo, un exercice raté revient en fin de leçon.
    if (!direct && r?.verdict === "faux") {
      setFautes((f) => f + 1);
      if (ex.type !== "paires") suite = [...file, ex];
      setFile(suite);
    }
    setResultat(null);
    if (index + 1 >= suite.length) setFini(true);
    else setIndex(index + 1);
  }

  if (fini) {
    const score = Math.max(0, Math.round((100 * (total - fautes)) / total));
    return (
      <div className="ecran-lecon">
        <div className="fin">
          <div className="medaille" aria-hidden="true">
            <Icone nom="etoile" taille={72} />
          </div>
          <h1>Leçon terminée !</h1>
          <p className="fin-sous-titre">{lecon.titre}</p>
          <div className="bilan">
            <div className="bilan-case or">
              <div className="bilan-titre">XP gagnés</div>
              <div className="bilan-valeur">
                <Icone nom="eclair" taille={22} />
                {XP_PAR_LECON}
              </div>
            </div>
            <div className="bilan-case vert">
              <div className="bilan-titre">Précision</div>
              <div className="bilan-valeur">
                <Icone nom="coche" taille={22} />
                {score} %
              </div>
            </div>
          </div>
        </div>
        <Pied>
          <button className="bouton primaire" onClick={() => onFin(score, XP_PAR_LECON)}>
            Continuer
          </button>
        </Pied>
      </div>
    );
  }

  const props = { onRepondu: repondre, verrouille: resultat !== null };
  // `key` force un nouvel état local à chaque exercice, même si le même revient.
  const cle = `${index}-${ex.type}`;
  const retour = resultat && RETOURS[resultat.verdict];

  return (
    <div className="ecran-lecon">
      <div className="lecon-haut">
        <button className="quitter" onClick={onQuitter} aria-label="Quitter la leçon">
          <Icone nom="fermer" taille={26} />
        </button>
        <div className="progression" role="progressbar" aria-valuenow={index} aria-valuemax={file.length}>
          <div style={{ width: `${Math.max(4, (100 * index) / file.length)}%` }} />
        </div>
      </div>

      {ex.type === "decouverte" && <Decouverte key={cle} ex={ex} {...props} />}
      {ex.type === "qcm" && <Qcm key={cle} ex={ex} {...props} />}
      {ex.type === "paires" && <Paires key={cle} ex={ex} {...props} />}
      {ex.type === "saisie" && <Saisie key={cle} ex={ex} {...props} />}

      {resultat && retour && (
        <Pied etat={resultat.verdict}>
          <div className="verdict">
            <span className="verdict-icone">
              <Icone nom={retour.icone} taille={30} />
            </span>
            <div>
              <div className="verdict-titre">{ex.type === "paires" && resultat.verdict === "faux" ? "Quelques erreurs" : retour.titre}</div>
              {ex.type !== "paires" && resultat.verdict !== "correct" && <div className="verdict-reponse">{resultat.attendu}</div>}
            </div>
          </div>
          <button className="bouton primaire" onClick={() => suivant()} autoFocus>
            Continuer
          </button>
        </Pied>
      )}
    </div>
  );
}
