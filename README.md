# WAO — We Are One

Landing page de recrutement (marketing de réseau / bien-être) pour **Pascal Blenner**.
Site statique, sans dépendance à installer : il suffit d'ouvrir les fichiers `.html`.

## 📄 Les pages

| Fichier | Rôle |
|---|---|
| `index.html` | Page d'accueil : teaser, concept & avantages, présentation de Pascal, vidéo, et **le choix entre 2 parcours**. |
| `physique.html` | Formulaire du parcours **« Transformer mon physique »** (accent rouge). |
| `lifestyle.html` | Formulaire du parcours **« Transformer ma vie »** / lifestyle & business (accent or). |
| `assets/` | `styles.css`, `main.js`, la photo `pascal.jpg`, le logo (`logo-wao.png`, `logo-wao-full.png`) et les favicons. |

Les deux boutons de la section « Rejoindre » de l'accueil mènent chacun vers un formulaire différent.

## 🚀 Voir le site en local

Double-clique simplement sur `index.html`, ou lance un petit serveur :

```bash
npx http-server .      # puis ouvre http://localhost:8080
```

## 🌐 Mettre en ligne (gratuit)

- **GitHub Pages** : Settings → Pages → Branch `main` (ou la branche du site) → dossier `/root`.
- Ou dépose le dossier sur **Netlify** / **Vercel** (glisser-déposer).

## ✉️ Les formulaires (Fillout)

Les deux parcours intègrent directement un formulaire **Fillout** (embed) :

| Parcours | Page | Formulaire Fillout |
|---|---|---|
| Physique | `physique.html` | `https://forms.fillout.com/t/wJxnXDSZrEus` |
| Lifestyle / business | `lifestyle.html` | `https://forms.fillout.com/t/9iiL7oXfWtus` |

Les réponses arrivent donc directement dans **ton compte Fillout** (rien à configurer côté site).
Pour changer un formulaire, remplace l'`data-fillout-id` dans la page concernée.

> Remarque : dans l'aperçu claude.ai, le formulaire ne s'affiche pas (les contenus
> externes y sont bloqués) — il s'affiche normalement sur le site en ligne (GitHub Pages).

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
- **Logo & favicon** : versions blanches détourées dans `assets/` (`logo-wao.png` = mark seul,
  `logo-wao-full.png` = avec « WE ARE ONE ») + `favicon.png` / `favicon-32.png`.

---

> Prochaines étapes possibles : détourage propre de la photo, mentions légales,
> vraie vidéo, et branchement du service de formulaire.
