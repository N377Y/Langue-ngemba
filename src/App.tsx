import { useMemo, useState } from "react";
import type { Lecon as TLecon } from "./types";
import { coursDeBase, fusionner, remplirDemo } from "./lib/content";
import { chargerProgres, chargerSaisies, sauverProgres, sauverSaisies, terminerLecon, type Saisies } from "./lib/storage";
import { Parcours } from "./components/Parcours";
import { Lecon } from "./components/Lecon";
import { Editeur } from "./components/Editeur";

type Vue = "parcours" | "editeur";

export default function App() {
  const [vue, setVue] = useState<Vue>("parcours");
  const [progres, setProgres] = useState(chargerProgres);
  const [saisies, setSaisies] = useState<Saisies>(chargerSaisies);
  const [demo, setDemo] = useState(false);
  const [lecon, setLecon] = useState<TLecon | null>(null);

  const cours = useMemo(() => fusionner(coursDeBase, saisies), [saisies]);
  const coursJoue = demo ? remplirDemo(cours) : cours;

  function changerSaisies(s: Saisies) {
    setSaisies(s);
    sauverSaisies(s);
  }

  if (lecon) {
    return (
      <main className="app">
        <Lecon
          lecon={lecon}
          onQuitter={() => setLecon(null)}
          onFin={(score, xp) => {
            const p = terminerLecon(progres, lecon.id, score, xp);
            setProgres(p);
            sauverProgres(p);
            setLecon(null);
          }}
        />
      </main>
    );
  }

  return (
    <main className="app">
      <header>
        <h1>Ngemba</h1>
        <div className="stats">
          <span title="Série de jours">🔥 {progres.serie}</span>
          <span title="Points d'expérience">⭐ {progres.xp} XP</span>
        </div>
      </header>
      <nav className="onglets">
        <button className={vue === "parcours" ? "actif" : ""} onClick={() => setVue("parcours")}>
          Apprendre
        </button>
        <button className={vue === "editeur" ? "actif" : ""} onClick={() => setVue("editeur")}>
          Contenu
        </button>
      </nav>

      {vue === "parcours" && (
        <>
          <label className="demo">
            <input type="checkbox" checked={demo} onChange={(e) => setDemo(e.target.checked)} />
            Mode démonstration (remplace les mots manquants par ‹le français›, ce n'est pas du ngemba)
          </label>
          <Parcours cours={coursJoue} scores={progres.leconsFinies} onLecon={setLecon} />
        </>
      )}
      {vue === "editeur" && <Editeur cours={cours} saisies={saisies} onChange={changerSaisies} />}
    </main>
  );
}
