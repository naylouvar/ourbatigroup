# OURBATI GROUP — site vitrine

Site vitrine moderne d'OURBATI GROUP (fondée en 2009) : installation de serveurs, infrastructure web,
hébergement, noms de domaine, certificats SSL, contrats de maintenance et infogérance.

Site statique (HTML / CSS / JavaScript, sans dépendance ni étape de build), connecté à l'espace client
WHMCS existant installé dans `/members/`.

## Structure

```
index.html            Page unique (accueil, services, hébergement, domaines, SSL, infogérance, contact…)
assets/css/style.css  Styles (responsive, mode sombre automatique)
assets/js/main.js     Menu mobile, animations, recherche de domaine, formulaire de contact
assets/img/           Logo officiel (logo-ourbati.png), icône globe et favicon
robots.txt, sitemap.xml
```

## Déploiement

Copier le contenu du dépôt à la racine web de `www.ourbatigroup.com`, **sans toucher au dossier `members/`**
(WHMCS). Faire une sauvegarde de l'ancien `index.*` avant de le remplacer.

## Intégration WHMCS

| Élément du site                  | URL WHMCS                                         |
|----------------------------------|---------------------------------------------------|
| Bouton « Espace client »         | `/members/clientarea.php`                         |
| Recherche de domaine             | `/members/cart.php?a=add&domain=register&query=…` |
| Transfert de domaine             | `/members/cart.php?a=add&domain=transfer&query=…` |
| Boutons « Voir les tarifs »      | `/members/cart.php`                               |
| Créer un compte / factures       | `/members/register.php`, `clientarea.php?action=invoices` |
| Support / tickets                | `/members/submitticket.php`                       |
| Base de connaissances / état     | `/members/knowledgebase.php`, `serverstatus.php`  |

Si le chemin de WHMCS change, remplacer `https://www.ourbatigroup.com/members` dans `index.html`
et `CONFIG.whmcsUrl` dans `assets/js/main.js`.

## À personnaliser

- **Formulaire de contact** : ouvre un e-mail vers `sales@ourbatigroup.com` (`CONFIG.contactEmail`
  dans `assets/js/main.js`). Laisser vide pour rediriger vers `/members/contact.php`.
- **Prix des domaines** (accueil) : .com/.net/.org 20 $, .store 17,99 $ — repris de l'ancien site, à vérifier.
- **Liens de commande précis** : remplacer `cart.php` par `cart.php?gid=X` (groupe de produits WHMCS)
  sur chaque pack (Smart, Advanced, Premium, VPS).
- **Logo** : l'image fournie fait 200×85 px ; une version haute définition ou SVG donnera un rendu plus net.
- **Indicateurs** (disponibilité, etc.) de la bande de chiffres selon vos engagements réels.

Conseil : appliquer au thème WHMCS (Twenty-One) les mêmes couleurs (`#1f5eff` → `#22d3ee`, fond `#070f24`)
pour une transition homogène entre le site et l'espace client.
