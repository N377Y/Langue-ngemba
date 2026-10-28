import { useMemo, useState } from "react";
import type { Lecon as TLecon } from "./types";
import { coursDeBase, fusionner, remplirDemo } from "./lib/content";
import { chargerProgres, chargerSaisies, sauverProgres, sauverSaisies, terminerLecon, type Saisies } from "./lib/storage";
import { Parcours } from "./components/Parcours";
import { Lecon } from "./components/Lecon";
import { Editeur } from "./components/Editeur";
import { Icone } from "./components/Icone";
import { Logo } from "./components/Logo";

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
    );
  }

  return (
    <div className="ecran">
      <header className="entete">
        <div className="entete-int">
          <div className="marque">
            <Logo taille={46} />
            <div>
              <div className="marque-nom">poksong</div>
              <div className="marque-devise">Parlons ensemble</div>
            </div>
          </div>
          <div className="compteurs">
            <span className="compteur serie" title="Jours d'affilée">
              <Icone nom="flamme" taille={22} />
              {progres.serie}
            </span>
            <span className="compteur xp" title="Points d'expérience">
              <Icone nom="eclair" taille={22} />
              {progres.xp}
            </span>
          </div>
        </div>
      </header>

      <main className="contenu">
        {vue === "parcours" ? (
          <Parcours cours={coursJoue} scores={progres.leconsFinies} demo={demo} onDemo={setDemo} onLecon={setLecon} />
        ) : (
          <Editeur cours={cours} saisies={saisies} onChange={changerSaisies} />
        )}
      </main>

      <nav className="navigation">
        <div className="navigation-int">
          <button className={vue === "parcours" ? "actif" : ""} onClick={() => setVue("parcours")}>
            <Icone nom="livre" taille={26} />
            Apprendre
          </button>
          <button className={vue === "editeur" ? "actif" : ""} onClick={() => setVue("editeur")}>
            <Icone nom="crayon" taille={26} />
            Contenu
          </button>
        </div>
      </nav>
    </div>
  );
}
