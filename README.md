# Langue Ngemba

Application d'apprentissage des langues camerounaises (dans l'esprit de Duolingo / HelloChinese), en commençant par le **ngemba / nguemba de Bamougoum** (groupe ghomálá' de l'Ouest).

- Sources pédagogiques : [`docs/SOURCES.md`](docs/SOURCES.md)

## Prototype

Application web (React + TypeScript + Vite) avec 3 unités : **Salutations**, **Nombres** et **Famille**.

```bash
npm install
npm run dev      # serveur de développement
npm test         # tests unitaires
npm run build    # version de production dans dist/
```

### Fonctionnalités
- **Parcours** : unités → leçons, avec score par leçon, XP et série de jours (sauvegardés dans le navigateur).
- **Exercices** : découverte du mot, QCM dans les deux sens (ngemba → français et français → ngemba), association de paires, saisie au clavier. Un exercice raté revient en fin de leçon.
- **Clavier AGLC** : ɛ ɔ ə ʉ ŋ ɑ ' et les tons (haut, bas, descendant, montant, moyen). Une réponse juste à l'exception des tons est signalée « Presque ! Attention aux tons ».
- **Éditeur de contenu** (onglet *Contenu*) : saisie des formes en ngemba à partir des ouvrages, avec l'ouvrage, la page et un statut (à saisir / à valider / validé). Le bouton *Exporter* produit le fichier `cours.json`.

### Contenu
Le contenu se trouve dans [`src/content/cours.json`](src/content/cours.json). **Aucune forme en ngemba n'y est encore saisie**, volontairement : elles doivent venir des ouvrages de référence (Pr Ndé mu Fopinn) et être validées par des locuteurs de Bamougoum, pour éviter d'enseigner des formes inexactes.

Une leçon devient jouable dès que 4 de ses mots sont renseignés. En attendant, le **mode démonstration** permet d'essayer les exercices : les mots manquants y sont remplacés par le français entre chevrons (‹Bonjour›), ce qui n'est pas du ngemba.

Pour ajouter du contenu : onglet *Contenu* → saisir les mots → *Exporter* → remplacer `src/content/cours.json` → commit.

### Prochaines étapes
- Saisir et faire valider le vocabulaire des 3 unités.
- Enregistrer l'audio avec des locuteurs (le champ `audio` est déjà prévu dans le format).
- Ajouter des exercices de phrases (remettre des mots dans l'ordre) et d'écoute.
- Mode hors ligne (PWA), puis application mobile.
