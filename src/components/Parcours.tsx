import type { CSSProperties } from "react";
import type { Cours, Lecon } from "../types";
import { itemsJouables, MIN_ITEMS } from "../lib/exercises";
import { Icone } from "./Icone";

interface Props {
  cours: Cours;
  scores: Record<string, number>;
  demo: boolean;
  onDemo: (actif: boolean) => void;
  onLecon: (l: Lecon) => void;
}

/** Décalage horizontal des pastilles, pour un chemin qui serpente. */
const DECALAGES = [0, 44, 66, 44, 0, -44, -66, -44];

export function Parcours({ cours, scores, demo, onDemo, onLecon }: Props) {
  const jouable = (l: Lecon) => itemsJouables(l.items).length >= MIN_ITEMS;
  const toutes = cours.unites.flatMap((u) => u.lecons);
  const actuelle = toutes.find((l) => jouable(l) && scores[l.id] === undefined);
  let rang = 0;

  return (
    <div className="parcours">
      <label className="apercu">
        <span>
          <strong>Mode démonstration</strong>
          <small>Remplace les mots pas encore saisis par ‹le français›. Ce n'est pas du ngemba.</small>
        </span>
        <input type="checkbox" role="switch" className="interrupteur" checked={demo} onChange={(e) => onDemo(e.target.checked)} />
      </label>

      {cours.unites.map((u, iu) => (
        <section key={u.id} className="unite" style={{ "--u": `var(--unite-${iu % 5})`, "--u-ombre": `var(--unite-${iu % 5}-ombre)` } as CSSProperties}>
          <div className="banniere">
            <div>
              <div className="surtitre">Unité {iu + 1}</div>
              <h2>{u.titre}</h2>
              <p>{u.description}</p>
            </div>
            <div className="banniere-icone">
              <Icone nom={u.icone} taille={34} />
            </div>
          </div>

          <ol className="chemin">
            {u.lecons.map((l) => {
              const prets = itemsJouables(l.items).length;
              const ok = jouable(l);
              const score = scores[l.id];
              const etat = !ok ? "verrouillee" : score !== undefined ? "finie" : "ouverte";
              const decalage = DECALAGES[rang++ % DECALAGES.length];
              return (
                <li key={l.id} style={{ "--decalage": `${decalage}px` } as CSSProperties}>
                  {l === actuelle && <div className="bulle">Commencer</div>}
                  <button className={`noeud ${etat}`} disabled={!ok} onClick={() => onLecon(l)} aria-label={l.titre}>
                    <Icone nom={etat === "finie" ? "coche" : etat === "verrouillee" ? "cadenas" : u.icone} taille={34} />
                  </button>
                  <div className="noeud-titre">{l.titre}</div>
                  <div className="noeud-etat">
                    {!ok ? `${prets} / ${l.items.length} mots saisis` : score !== undefined ? `${score} % de réussite` : `${l.items.length} mots`}
                  </div>
                </li>
              );
            })}
          </ol>
        </section>
      ))}
    </div>
  );
}
