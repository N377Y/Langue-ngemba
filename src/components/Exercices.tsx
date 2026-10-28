import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import type { Item } from "../types";
import { melanger, type Exercice } from "../lib/exercises";
import { verifier, type Verdict } from "../lib/answer";
import { Clavier } from "./Clavier";
import { Icone } from "./Icone";

export type Resultat = { verdict: Verdict; attendu: string };

interface Props<E extends Exercice> {
  ex: E;
  /** Appelé une fois que l'apprenant a validé sa réponse. */
  onRepondu: (r: Resultat) => void;
  verrouille: boolean;
}

/** Barre fixée en bas de l'écran, qui porte le bouton principal. */
export function Pied({ children, etat = "neutre" }: { children: ReactNode; etat?: Verdict | "neutre" }) {
  return (
    <footer className={`pied ${etat}`}>
      <div className="pied-int">{children}</div>
    </footer>
  );
}

function BoutonAudio({ item }: { item: Item }) {
  if (!item.audio) return null;
  return (
    <button type="button" className="audio" onClick={() => new window.Audio(item.audio!).play()} aria-label="Écouter">
      <Icone nom="hautParleur" taille={26} />
    </button>
  );
}

export function Decouverte({ ex, onRepondu, verrouille }: Props<Extract<Exercice, { type: "decouverte" }>>) {
  return (
    <>
      <div className="exercice">
        <h1 className="consigne">Nouveau mot</h1>
        <div className="carte-mot">
          <span className="etiquette">Nouveau</span>
          <div className="mot-ngemba">
            {ex.item.ngemba}
            <BoutonAudio item={ex.item} />
          </div>
          {ex.item.prononciation && <div className="mot-prononciation">Se lit à peu près « {ex.item.prononciation} »</div>}
          <div className="mot-fr">{ex.item.fr}</div>
          {ex.item.note && <div className="mot-note">{ex.item.note}</div>}
        </div>
      </div>
      {!verrouille && (
        <Pied>
          <button className="bouton primaire" onClick={() => onRepondu({ verdict: "correct", attendu: ex.item.ngemba! })}>
            Continuer
          </button>
        </Pied>
      )}
    </>
  );
}

export function Qcm({ ex, onRepondu, verrouille }: Props<Extract<Exercice, { type: "qcm" }>>) {
  const [choisi, setChoisi] = useState<string | null>(null);
  const versNgemba = ex.sens === "fr-ng";
  const question = versNgemba ? ex.item.fr : ex.item.ngemba!;
  const libelle = (i: Item) => (versNgemba ? i.ngemba! : i.fr);

  // Raccourcis clavier 1 à 4, comme sur Duolingo.
  useEffect(() => {
    if (verrouille) return;
    const ecoute = (e: KeyboardEvent) => {
      const n = Number(e.key);
      if (n >= 1 && n <= ex.choix.length) setChoisi(ex.choix[n - 1].id);
    };
    window.addEventListener("keydown", ecoute);
    return () => window.removeEventListener("keydown", ecoute);
  }, [ex, verrouille]);

  return (
    <>
      <div className="exercice">
        <h1 className="consigne">{versNgemba ? "Comment dit-on en ngemba ?" : "Que veut dire ce mot ?"}</h1>
        <div className={`enonce ${versNgemba ? "" : "ngemba"}`}>
          {question}
          {!versNgemba && <BoutonAudio item={ex.item} />}
        </div>
        <div className="choix">
          {ex.choix.map((c, n) => (
            <button key={c.id} disabled={verrouille} className={`tuile ${versNgemba ? "ngemba" : ""} ${choisi === c.id ? "choisie" : ""}`} onClick={() => setChoisi(c.id)}>
              <span className="touche">{n + 1}</span>
              <span>{libelle(c)}</span>
            </button>
          ))}
        </div>
      </div>
      {!verrouille && (
        <Pied>
          <button
            className="bouton primaire"
            disabled={!choisi}
            onClick={() => onRepondu({ verdict: choisi === ex.item.id ? "correct" : "faux", attendu: libelle(ex.item) })}
          >
            Vérifier
          </button>
        </Pied>
      )}
    </>
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
    <>
      <div className="exercice">
        <h1 className="consigne">Associe les paires</h1>
        <div className="paires">
          <div>
            {ex.items.map((i) => (
              <button
                key={i.id}
                disabled={verrouille || trouves.includes(i.id)}
                className={`tuile ngemba ${gauche === i.id ? "choisie" : ""}`}
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
                className={`tuile ${erreur === i.id ? "erreur" : ""}`}
                onClick={() => choisirDroite(i.id)}
              >
                {i.fr}
              </button>
            ))}
          </div>
        </div>
      </div>
      {!verrouille && (
        <Pied>
          <button className="bouton primaire" disabled>
            Vérifier
          </button>
        </Pied>
      )}
    </>
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
    <>
      <div className="exercice">
        <h1 className="consigne">Écris en ngemba</h1>
        <div className="enonce">{ex.item.fr}</div>
        <input
          ref={champ}
          id="reponse"
          className="champ-reponse"
          placeholder="Ta réponse"
          value={texte}
          disabled={verrouille}
          onChange={(e) => setTexte(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && texte.trim() && !verrouille && valider()}
          autoCapitalize="off"
          autoCorrect="off"
          autoComplete="off"
          spellCheck={false}
        />
        {!verrouille && <Clavier onTouche={inserer} />}
      </div>
      {!verrouille && (
        <Pied>
          <button className="bouton primaire" disabled={!texte.trim()} onClick={valider}>
            Vérifier
          </button>
        </Pied>
      )}
    </>
  );
}
