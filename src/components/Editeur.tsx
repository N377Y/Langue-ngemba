import { useRef } from "react";
import type { Cours, Item, Statut } from "../types";
import type { Saisies } from "../lib/storage";
import { Clavier } from "./Clavier";

interface Props {
  cours: Cours; // cours de base fusionné avec les saisies
  saisies: Saisies;
  onChange: (s: Saisies) => void;
}

const STATUTS: Record<Statut, string> = { a_saisir: "À saisir", a_valider: "À valider", valide: "Validé" };

function telecharger(nom: string, contenu: string) {
  const url = URL.createObjectURL(new Blob([contenu], { type: "application/json" }));
  const a = Object.assign(document.createElement("a"), { href: url, download: nom });
  a.click();
  URL.revokeObjectURL(url);
}

export function Editeur({ cours, saisies, onChange }: Props) {
  const dernierChamp = useRef<HTMLInputElement | null>(null);
  const fichier = useRef<HTMLInputElement>(null);

  function maj(item: Item, champ: Partial<Item>) {
    const suite = { ...saisies[item.id], ...champ };
    // Une forme saisie passe automatiquement « à valider ».
    if (champ.ngemba !== undefined && item.statut === "a_saisir" && champ.ngemba) suite.statut = "a_valider";
    onChange({ ...saisies, [item.id]: suite });
  }

  function inserer(car: string) {
    const el = dernierChamp.current;
    if (!el) return;
    const debut = el.selectionStart ?? el.value.length;
    const fin = el.selectionEnd ?? el.value.length;
    // Passe par le setter natif pour que React voie le changement.
    const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value")!.set!;
    setter.call(el, el.value.slice(0, debut) + car + el.value.slice(fin));
    el.dispatchEvent(new Event("input", { bubbles: true }));
    el.focus();
    el.setSelectionRange(debut + car.length, debut + car.length);
  }

  function importer(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    f.text().then((t) => {
      const importe = JSON.parse(t) as Cours;
      const s: Saisies = { ...saisies };
      for (const u of importe.unites) for (const l of u.lecons) for (const i of l.items) {
        if (i.ngemba) s[i.id] = { ngemba: i.ngemba, note: i.note, statut: i.statut, source: i.source };
      }
      onChange(s);
    });
    e.target.value = "";
  }

  const tous = cours.unites.flatMap((u) => u.lecons.flatMap((l) => l.items));
  const remplis = tous.filter((i) => i.ngemba).length;
  const valides = tous.filter((i) => i.statut === "valide").length;

  return (
    <div className="editeur">
      <section className="editeur-bilan">
        <h1>Contenu du cours</h1>
        <p>
          Saisissez les mots en ngemba de Bamougoum à partir des ouvrages de référence, en notant l'ouvrage et la page. Les saisies sont
          gardées dans ce navigateur. <em>Exporter</em> produit le fichier <code>cours.json</code> à placer dans <code>src/content/</code>.
        </p>
        <div className="jauge" aria-hidden="true">
          <div className="jauge-valide" style={{ width: `${(100 * valides) / tous.length}%` }} />
          <div className="jauge-saisi" style={{ width: `${(100 * (remplis - valides)) / tous.length}%` }} />
        </div>
        <div className="editeur-actions">
          <span>
            <strong>{remplis}</strong> / {tous.length} mots saisis · <strong>{valides}</strong> validés
          </span>
          <button className="bouton secondaire petit" onClick={() => telecharger("cours.json", JSON.stringify(cours, null, 2) + "\n")}>
            Exporter
          </button>
          <button className="bouton secondaire petit" onClick={() => fichier.current?.click()}>
            Importer
          </button>
          <input ref={fichier} type="file" accept="application/json" hidden onChange={importer} />
        </div>
      </section>

      <div className="clavier-collant">
        <Clavier onTouche={inserer} />
      </div>

      {cours.unites.map((u) =>
        u.lecons.map((l) => (
          <section key={l.id} className="editeur-lecon">
            <h2>
              {u.titre} <span>· {l.titre}</span>
            </h2>
            <div className="lignes">
              {l.items.map((i) => (
                <div key={i.id} className="ligne">
                  <div className="ligne-fr">
                    {i.fr}
                    <span className={`pastille-statut ${i.statut}`}>{STATUTS[i.statut]}</span>
                  </div>
                  <label className="champ ngemba">
                    <span>Ngemba</span>
                    <input
                      id={`ng-${i.id}`}
                      value={i.ngemba ?? ""}
                      onFocus={(e) => (dernierChamp.current = e.target)}
                      onChange={(e) => maj(i, { ngemba: e.target.value.normalize("NFC") || null })}
                    />
                  </label>
                  <label className="champ">
                    <span>Ouvrage</span>
                    <input
                      id={`ouv-${i.id}`}
                      value={i.source?.ouvrage ?? ""}
                      placeholder="ex. Longam"
                      onChange={(e) => maj(i, { source: { ...i.source, ouvrage: e.target.value } })}
                    />
                  </label>
                  <label className="champ court">
                    <span>Page</span>
                    <input
                      id={`p-${i.id}`}
                      value={i.source?.page ?? ""}
                      onChange={(e) => maj(i, { source: { ouvrage: i.source?.ouvrage ?? "", page: e.target.value } })}
                    />
                  </label>
                  <label className="champ">
                    <span>Statut</span>
                    <select id={`st-${i.id}`} value={i.statut} onChange={(e) => maj(i, { statut: e.target.value as Statut })}>
                      {Object.entries(STATUTS).map(([v, t]) => (
                        <option key={v} value={v}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
              ))}
            </div>
          </section>
        )),
      )}
    </div>
  );
}
