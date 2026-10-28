import { useMemo, useRef, useState } from "react";
import type { Item } from "../types";
import { melanger, type Exercice } from "../lib/exercises";
import { verifier, type Verdict } from "../lib/answer";
import { Clavier } from "./Clavier";

export type Resultat = { verdict: Verdict; attendu: string };

interface Props<E extends Exercice> {
  ex: E;
  /** Appelé une fois que l'apprenant a validé sa réponse. */
  onRepondu: (r: Resultat) => void;
  verrouille: boolean;
}

function Audio({ item }: { item: Item }) {
  if (!item.audio) return null;
  return (
    <button type="button" className="audio" onClick={() => new window.Audio(item.audio!).play()} aria-label="Écouter">
      🔊
    </button>
  );
}

export function Decouverte({ ex, onRepondu, verrouille }: Props<Extract<Exercice, { type: "decouverte" }>>) {
  return (
    <div className="exercice">
      <p className="consigne">Nouveau mot</p>
      <div className="carte">
        <div className="ngemba">
          {ex.item.ngemba} <Audio item={ex.item} />
        </div>
        <div className="fr">{ex.item.fr}</div>
        {ex.item.note && <div className="note">{ex.item.note}</div>}
      </div>
      {!verrouille && (
        <button className="principal" onClick={() => onRepondu({ verdict: "correct", attendu: ex.item.ngemba! })}>
          Compris
        </button>
      )}
    </div>
  );
}

export function Qcm({ ex, onRepondu, verrouille }: Props<Extract<Exercice, { type: "qcm" }>>) {
  const [choisi, setChoisi] = useState<string | null>(null);
  const versNgemba = ex.sens === "fr-ng";
  const question = versNgemba ? ex.item.fr : ex.item.ngemba!;
  const libelle = (i: Item) => (versNgemba ? i.ngemba! : i.fr);

  return (
    <div className="exercice">
      <p className="consigne">{versNgemba ? "Comment dit-on en ngemba ?" : "Que signifie ce mot ?"}</p>
      <div className="question">
        {question} {!versNgemba && <Audio item={ex.item} />}
      </div>
      <div className="choix">
        {ex.choix.map((c) => (
          <button
            key={c.id}
            disabled={verrouille}
            className={choisi === c.id ? "selection" : ""}
            onClick={() => setChoisi(c.id)}
          >
            {libelle(c)}
          </button>
        ))}
      </div>
      {!verrouille && (
        <button
          className="principal"
          disabled={!choisi}
          onClick={() => onRepondu({ verdict: choisi === ex.item.id ? "correct" : "faux", attendu: libelle(ex.item) })}
        >
          Vérifier
        </button>
      )}
    </div>
  );
}

export function Paires({ ex, onRepondu, verrouille }: Props<Extract<Exercice, { type: "paires" }>>) {
  const droite = useMemo(() => melanger(ex.items), [ex]);
  const [gauche, setGauche] = useState<string | null>(null);
  const [trouves, setTrouves] = useState<string[]>([]);
  const [erreur, setErreur] = useState<string | null>(null);
  const erreurs = useRef(0);

  function choisirDroite(id: string) {
    if (!gauche) return;
    if (gauche === id) {
      const suite = [...trouves, id];
      setTrouves(suite);
      setGauche(null);
      if (suite.length === ex.items.length) {
        onRepondu({ verdict: erreurs.current === 0 ? "correct" : "faux", attendu: "toutes les paires" });
      }
    } else {
      erreurs.current++;
      setErreur(id);
      setTimeout(() => setErreur(null), 500);
    }
  }

  return (
    <div className="exercice">
      <p className="consigne">Associe les paires</p>
      <div className="paires">
        <div>
          {ex.items.map((i) => (
            <button
              key={i.id}
              disabled={verrouille || trouves.includes(i.id)}
              className={gauche === i.id ? "selection" : ""}
              onClick={() => setGauche(i.id)}
            >
              {i.ngemba}
            </button>
          ))}
        </div>
        <div>
          {droite.map((i) => (
            <button
              key={i.id}
              disabled={verrouille || trouves.includes(i.id)}
              className={erreur === i.id ? "erreur" : ""}
              onClick={() => choisirDroite(i.id)}
            >
              {i.fr}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Saisie({ ex, onRepondu, verrouille }: Props<Extract<Exercice, { type: "saisie" }>>) {
  const [texte, setTexte] = useState("");
  const champ = useRef<HTMLInputElement>(null);

  function inserer(car: string) {
    const el = champ.current;
    const debut = el?.selectionStart ?? texte.length;
    const fin = el?.selectionEnd ?? texte.length;
    setTexte(texte.slice(0, debut) + car + texte.slice(fin));
    requestAnimationFrame(() => {
      el?.focus();
      el?.setSelectionRange(debut + car.length, debut + car.length);
    });
  }

  function valider() {
    onRepondu({ verdict: verifier(texte, ex.item.ngemba!), attendu: ex.item.ngemba! });
  }

  return (
    <div className="exercice">
      <p className="consigne">Écris en ngemba</p>
      <div className="question">{ex.item.fr}</div>
      <input
        ref={champ}
        className="saisie"
        value={texte}
        disabled={verrouille}
        onChange={(e) => setTexte(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && texte && !verrouille && valider()}
        autoCapitalize="off"
        autoCorrect="off"
        spellCheck={false}
      />
      {!verrouille && <Clavier onTouche={inserer} />}
      {!verrouille && (
        <button className="principal" disabled={!texte.trim()} onClick={valider}>
          Vérifier
        </button>
      )}
    </div>
  );
}
