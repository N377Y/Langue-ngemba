import type { Cours, Lecon } from "../types";
import { itemsJouables, MIN_ITEMS } from "../lib/exercises";

interface Props {
  cours: Cours;
  scores: Record<string, number>;
  onLecon: (l: Lecon) => void;
}

export function Parcours({ cours, scores, onLecon }: Props) {
  return (
    <div className="parcours">
      {cours.unites.map((u) => (
        <section key={u.id} className="unite">
          <h2>
            <span>{u.icone}</span> {u.titre}
          </h2>
          <div className="lecons">
            {u.lecons.map((l) => {
              const prets = itemsJouables(l.items).length;
              const jouable = prets >= MIN_ITEMS;
              const score = scores[l.id];
              return (
                <button key={l.id} className={`pastille ${score !== undefined ? "finie" : ""}`} disabled={!jouable} onClick={() => onLecon(l)}>
                  <span className="titre">{l.titre}</span>
                  <span className="etat">
                    {!jouable
                      ? `Contenu à saisir (${prets}/${l.items.length})`
                      : score !== undefined
                        ? `★ ${score} %`
                        : `${l.items.length} mots`}
                  </span>
                </button>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
