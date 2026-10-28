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

  return (
    <div className="editeur">
      <p className="aide">
        Saisissez les formes en ngemba de Bamougoum à partir des ouvrages de référence, en notant l'ouvrage et la page. Les saisies
        restent dans ce navigateur. Utilisez <em>Exporter</em> pour obtenir le fichier <code>cours.json</code> à placer dans{" "}
        <code>src/content/</code>.
      </p>
      <div className="outils">
        <span>
          {remplis}/{tous.length} mots saisis
        </span>
        <button onClick={() => telecharger("cours.json", JSON.stringify(cours, null, 2) + "\n")}>Exporter</button>
        <button onClick={() => fichier.current?.click()}>Importer</button>
        <input ref={fichier} type="file" accept="application/json" hidden onChange={importer} />
      </div>
      <div className="clavier-collant">
        <Clavier onTouche={inserer} />
      </div>
      {cours.unites.map((u) =>
        u.lecons.map((l) => (
          <section key={l.id}>
            <h3>
              {u.icone} {u.titre} – {l.titre}
            </h3>
            <table>
              <thead>
                <tr>
                  <th>Français</th>
                  <th>Ngemba</th>
                  <th>Ouvrage</th>
                  <th>Page</th>
                  <th>Statut</th>
                </tr>
              </thead>
              <tbody>
                {l.items.map((i) => (
                  <tr key={i.id} className={i.statut}>
                    <td>{i.fr}</td>
                    <td>
                      <input
                        value={i.ngemba ?? ""}
                        onFocus={(e) => (dernierChamp.current = e.target)}
                        onChange={(e) => maj(i, { ngemba: e.target.value.normalize("NFC") || null })}
                      />
                    </td>
                    <td>
                      <input
                        value={i.source?.ouvrage ?? ""}
                        placeholder="ex. Longam"
                        onChange={(e) => maj(i, { source: { ...i.source, ouvrage: e.target.value } })}
                      />
                    </td>
                    <td>
                      <input
                        className="court"
                        value={i.source?.page ?? ""}
                        onChange={(e) => maj(i, { source: { ouvrage: i.source?.ouvrage ?? "", page: e.target.value } })}
                      />
                    </td>
                    <td>
                      <select value={i.statut} onChange={(e) => maj(i, { statut: e.target.value as Statut })}>
                        {Object.entries(STATUTS).map(([v, t]) => (
                          <option key={v} value={v}>
                            {t}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )),
      )}
    </div>
  );
}
