import { useState } from "react";
import type { Lecon as TLecon } from "../types";
import { construireLecon, type Exercice } from "../lib/exercises";
import { Decouverte, Paires, Qcm, Saisie, type Resultat } from "./Exercices";

const XP_PAR_LECON = 10;

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
      <div className="fin">
        <div className="trophee">🎉</div>
        <h2>Leçon terminée !</h2>
        <p>
          Précision : <strong>{score} %</strong> · +{XP_PAR_LECON} XP
        </p>
        <button className="principal" onClick={() => onFin(score, XP_PAR_LECON)}>
          Continuer
        </button>
      </div>
    );
  }

  const props = { onRepondu: repondre, verrouille: resultat !== null };
  // `key` force un nouvel état local à chaque exercice, même si le même revient.
  const cle = `${index}-${ex.type}`;

  return (
    <div className="lecon">
      <div className="barre-haut">
        <button className="quitter" onClick={onQuitter} aria-label="Quitter la leçon">
          ✕
        </button>
        <div className="progression">
          <div style={{ width: `${(100 * index) / file.length}%` }} />
        </div>
      </div>

      {ex.type === "decouverte" && <Decouverte key={cle} ex={ex} {...props} />}
      {ex.type === "qcm" && <Qcm key={cle} ex={ex} {...props} />}
      {ex.type === "paires" && <Paires key={cle} ex={ex} {...props} />}
      {ex.type === "saisie" && <Saisie key={cle} ex={ex} {...props} />}

      {resultat && (
        <div className={`retour ${resultat.verdict}`}>
          <div>
            {resultat.verdict === "correct" && <strong>Bravo !</strong>}
            {resultat.verdict === "tons" && (
              <>
                <strong>Presque ! Attention aux tons.</strong>
                <div>Bonne réponse : {resultat.attendu}</div>
              </>
            )}
            {resultat.verdict === "faux" && (
              <>
                <strong>Pas tout à fait.</strong>
                {ex.type !== "paires" && <div>Bonne réponse : {resultat.attendu}</div>}
              </>
            )}
          </div>
          <button className="principal" onClick={() => suivant()}>
            Continuer
          </button>
        </div>
      )}
    </div>
  );
}
