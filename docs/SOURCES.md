# Sources pour l'apprentissage du Ngemba

> Document de travail : il recense les sources candidates, leur rôle dans l'application et les points à vérifier avant de les utiliser.

## 1. Bien identifier la langue (point bloquant)

Le nom « Ngemba » désigne plusieurs langues différentes au Cameroun. Il faut fixer la variété ciblée avant de produire du contenu :

| Nom | Région | Code ISO 639-3 | Remarque |
|---|---|---|---|
| **Ngemba / Nguemba (bamiléké)** des ouvrages du Pr Ndé mu Fopinn | Ouest (Bamboutos / Menoua). Le dictionnaire *Longam* cite Bansoa, Bamendjou et les communautés voisines | à confirmer | **Variété cible du projet** |
| Ngomba (aussi appelé Ngemba, Nda'a) | Ouest, Bamboutos, au sud-est de Mbouda. Dialectes : Bamesso, Babete, Bamendjinda, Bamendjo, Bamenkumbo | `jgo` | Probablement la même langue ou une langue très proche : **à vérifier** |
| Ngemba (Mbili-Mbui, Grassfields) | Nord-Ouest, autour de Bamenda (Mankon, Bafut…) | `nge` | Langue **différente** : à ne pas confondre |

**Action :** demander confirmation (au Pr Ndé mu Fopinn, à son éditeur ou à des locuteurs) de la zone et des villages couverts par ses ouvrages, puis comparer un échantillon de vocabulaire avec le lexique Ngomba (`jgo`) de SIL.

## 2. Source principale : ouvrages du Pr Ndé mu Fopinn

Éditeur principal : **Les Éditions ACCOM (Yaoundé)**. L'auteur a aussi publié des syllabaires pour d'autres langues camerounaises (aka, bafia, boulou…), ce qui est utile pour étendre l'application ensuite.

| Ouvrage | Contenu | Usage dans l'appli |
|---|---|---|
| **NGEMBA Syllabaire – Jé'nettò** (version numérique disponible) | Alphabet, sons, syllabes, apprentissage progressif | Ossature des **niveaux 1-2** : alphabet, tons, lecture |
| **Grammaire du Ngemba – *Ntundò'tche Ngemba*** | Genre, nombre, conjugaison, accords | Ordre des **leçons de grammaire**, notes explicatives |
| **Longam – Dictionnaire français-ngemba** (~25 000 mots selon le vendeur) | Lexique | **Base de vocabulaire** pour les exercices et la recherche |
| **Ngemba Me Tsetseng** (au moins un tome 3 : objets manufacturés) | Vocabulaire thématique | **Unités thématiques** (maison, objets, etc.) |
| ***Me Fa' Mangakwu*** (théâtre, ACCOM, 2021) | Texte littéraire en ngemba | Lectures et dialogues pour les **niveaux avancés** |

Points de vente et de diffusion trouvés : [apprendrelengemba.com](https://www.apprendrelengemba.com/), [alainxavier.systeme.io/ngemba](https://alainxavier.systeme.io/ngemba), [paiement du syllabaire numérique (Flutterwave)](https://flutterwave.com/pay/1kmacyfim8cw) et le [catalogue du CERDOTOLA](https://cerdotola.center/pmb/opac_css/index.php?lvl=section_see&id=28&location=1&page=1&nbr_lignes=114&dcote=&lcote=&nc=&main=&ssub=&plettreaut=&nb_per_page_custom=114).

> ⚠️ **Droits d'auteur** : ces ouvrages sont protégés et vendus. Il est impossible de reprendre leur contenu (listes de mots, exemples, exercices) dans une application publique sans **autorisation écrite** de l'auteur et/ou des Éditions ACCOM. Il faut prévoir une prise de contact pour un partenariat ou une licence, ce qui donnerait aussi une caution scientifique au projet.

## 3. Sources complémentaires (pour recouper et valider)

- **SIL Cameroun** : [*Ngomba – French – English lexicon*](https://www.silcam.org/fr/resources/archives/47268) (2003, environ 2 160 entrées avec exemples) et un *Dictionnaire Ngomba : français – anglais* (2023, S. Satre et E. Olson, avec une application).
- **Scott A. Satre** (SIL) : *Phonological sketch of Ngomba* (1997), *Exposé de l'alphabet et de l'orthographe du ngomba* (1998), *The simple clause in Ngomba* (1999), *Tense/aspect and verbal negation in Ngomba* (2002), *Structure of the verb phrase in Ngomba* (2004), *The consecutive morpheme in Bamileke-Ngomba* (2010). Ces travaux servent de référence pour les **tons** et l'**orthographe**.
- **Alphabet Général des Langues Camerounaises (AGLC)** : norme d'écriture (tons, voyelles spéciales ɛ ɔ ə ʉ, consonnes ŋ, ' pour le coup de glotte). L'application doit supporter ces caractères (Unicode, clavier personnalisé).
- [Omniglot – Ngomba](https://omniglot.com/writing/ngomba.htm) : présentation rapide de l'alphabet.
- [Living Dictionaries – ngemba](https://livingdictionaries.app/ngemba/) : dictionnaire en ligne communautaire. Il faut vérifier la variété et la licence.
- [Global Recordings Network](https://globalrecordings.net/en/language/14925) : enregistrements audio (Bamesso, etc.), utiles pour la prononciation. Vérifier la licence.

## 3 bis. Sources gratuites

| Source | Type | Accès | Utilité |
|---|---|---|---|
| [*Aperçu grammatical de la langue ngomba*, Scott A. Satre (SIL)](https://www.sil.org/system/files/reapdata/13/93/43/139343318718198817360097139579754827049/Apercu_grammatical_de_la_langue_ngomba.pdf) | Grammaire en français (PDF) | Gratuit, téléchargeable | Meilleure source gratuite pour la grammaire, à recouper avec celle du Pr Ndé mu Fopinn |
| [*Dictionnaire Ngomba : français – anglais*, SIL, 2023](https://www.silcam.org/resources/archives/98952) | Application Android, 2 159 entrées | Gratuit a priori (application SIL / Webonary) | Vocabulaire de contrôle, orthographe standard |
| [Archives SIL Cameroun – langue `jgo`](https://www.silcam.org/fr/resources/search/publisher/17604/language/jgo/availability/1) | Lexique 2003, phonologie, orthographe, articles de S. Satre | Certains documents en ligne, sinon sur demande aux archives | Tons, alphabet, conjugaison |
| [*Grassfields Bantu Fieldwork: Ngomba Tone Paradigms* (LDC2001S16)](https://catalog.ldc.upenn.edu/LDC2001S16) | Enregistrements audio + transcriptions des tons | Gratuit pour les chercheurs qualifiés (frais d'envoi) | Rare source audio : référence pour les tons |
| [*Ŋgəmba : premier livre* (J.-J. Fogang, 1984), Indiana University](https://collections.libraries.indiana.edu/africancollections/items/show/1659) | Livre de lecture ngemba-français | Fiche de collection (numérisation à vérifier) | Matériel pédagogique historique |
| [Omniglot – Ngomba](https://omniglot.com/writing/ngomba.htm) | Alphabet, prononciation | Gratuit | Aperçu rapide |
| [Living Dictionaries – ngemba](https://livingdictionaries.app/ngemba/entry/bWsncETERXqnt1elFqbI) | Dictionnaire communautaire en ligne | Gratuit | Vocabulaire, peut-être de l'audio (licence à vérifier) |
| [Blog apprendrelengemba.com](https://apprendrelengemba.com/blog-articles/) | Articles d'initiation | Gratuit (les cours sont payants) | Expressions courantes |
| [Global Recordings Network – Bamesso](https://globalrecordings.net/en/language/14925) | Audio | Gratuit | Peu de contenu. La présence d'un film *JESUS* en ngomba n'est pas confirmée |
| Wikipédia [EN](https://en.wikipedia.org/wiki/Bamileke_languages) / [FR](https://franco.wiki/fr/Ngomba.html), [Joshua Project (`jgo`)](https://joshuaproject.net/languages/jgo) | Données générales | Gratuit | Dialectes, villages, nombre de locuteurs |

**Licence :** « gratuit » ne veut pas dire « réutilisable ». Les documents SIL sont en général sous licence Creative Commons (souvent BY-NC-ND), ce qui interdit les œuvres dérivées et l'usage commercial. Il faut lire la licence de chaque document et, en cas de doute, demander une autorisation : SIL Cameroun accorde souvent des autorisations pour des projets de revitalisation linguistique.

**Variété :** les sources SIL décrivent le **ngomba (`jgo`)**. Il faut confirmer qu'il s'agit bien du même ngemba que celui du Pr Ndé mu Fopinn.

## 4. Ce qui manque et devra être produit

1. **Audio natif** : aucune source trouvée ne fournit un corpus audio exploitable. Il faudra enregistrer des locuteurs pour chaque mot et chaque phrase, ce qui est indispensable pour une langue à tons.
2. **Validation par des locuteurs** des différents villages, pour gérer les variantes dialectales.
3. **Accords de licence** avec l'auteur ou l'éditeur.

## 5. Prochaines étapes proposées

1. Acquérir le syllabaire, la grammaire et *Longam*, puis confirmer la variété et l'orthographe utilisées.
2. Contacter le Pr Ndé mu Fopinn / les Éditions ACCOM pour proposer un partenariat.
3. Définir le format de données des leçons (unités → leçons → exercices, mots avec tons + audio).
4. Construire un prototype avec 2 ou 3 unités : salutations, nombres et famille.
