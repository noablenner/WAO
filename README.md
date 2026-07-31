# WAO — We Are One

Landing page de recrutement (marketing de réseau / bien-être) pour **Pascal Blenner**.
Site statique, sans dépendance à installer : il suffit d'ouvrir les fichiers `.html`.

## 📄 Les pages

| Fichier | Rôle |
|---|---|
| `index.html` | Page d'accueil : teaser, concept & avantages, présentation de Pascal, vidéo, et **le choix entre 2 parcours**. |
| `physique.html` | Formulaire du parcours **« Transformer mon physique »** (accent rouge). |
| `lifestyle.html` | Formulaire du parcours **« Transformer ma vie »** / lifestyle & business (accent or). |
| `assets/` | `styles.css`, `main.js`, `form.js` et la photo `pascal.jpg`. |

Les deux boutons de la section « Rejoindre » de l'accueil mènent chacun vers un formulaire différent.

## 🚀 Voir le site en local

Double-clique simplement sur `index.html`, ou lance un petit serveur :

```bash
npx http-server .      # puis ouvre http://localhost:8080
```

## 🌐 Mettre en ligne (gratuit)

- **GitHub Pages** : Settings → Pages → Branch `main` (ou la branche du site) → dossier `/root`.
- Ou dépose le dossier sur **Netlify** / **Vercel** (glisser-déposer).

## ✉️ Recevoir les réponses des formulaires

Le site est statique : pour recevoir les candidatures, connecte un service (aucun code serveur).
Ouvre `assets/form.js` et renseigne **une** de ces deux options en haut du fichier :

1. **Formspree (recommandé)** — crée un formulaire sur [formspree.io](https://formspree.io),
   récupère ton URL puis :
   ```js
   var FORM_ENDPOINT = "https://formspree.io/f/xxxxxx";
   ```
2. **E-mail de secours** — ouvre le logiciel mail pré-rempli du visiteur :
   ```js
   var CONTACT_EMAIL = "pascal@exemple.com";
   ```

Sans configuration, le formulaire affiche quand même le message de confirmation
(les données s'affichent dans la console du navigateur — utile pour tester).

## 🎬 Ajouter la vidéo « Forcer votre destin »

Dans `assets/main.js`, renseigne l'identifiant YouTube :

```js
var YOUTUBE_ID = "xxxxxxxxxxx"; // l'ID après ?v= dans l'URL YouTube
```

La vidéo se lancera alors au clic sur l'aperçu de la section vidéo.

## 🎨 Personnaliser

- **Couleurs / typos** : tout est centralisé en haut de `assets/styles.css` (bloc `:root`).
- **Textes & chiffres** : directement dans les fichiers `.html`.
- **Réseaux sociaux** : remplace les `href="#"` du pied de page (`index.html`) par les vrais liens.
- **Bouton « Nous contacter »** : renseigne l'adresse dans `mailto:` (pied de page).
- **Photo** : `assets/pascal.jpg`. Un vrai détourage (fond transparent) pourra être fait plus tard.

---

> Prochaines étapes possibles : détourage propre de la photo, mentions légales,
> vraie vidéo, et branchement du service de formulaire.
