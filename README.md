# Le Fellah Intelligent

Application mobile React Native/Expo pour aider les agriculteurs (diagnostic, météo, marché, irrigation).

## Pourquoi "je ne peux pas faire l'exécution / l'extraction" ?
Les causes les plus fréquentes sont :

1. **Dépendances non installées** (`expo: not found`).
2. **Problème réseau/proxy** vers `registry.npmjs.org` (erreurs `403` pendant `npm install`).
3. **Cache npm corrompu**.

## Démarrage rapide

```bash
npm install
npm run start
```

Puis :
- `a` pour Android,
- `i` pour iOS,
- `w` pour Web.

## Si vous êtes derrière un proxy

Vérifiez la config npm :

```bash
npm config get registry
npm config get proxy
npm config get https-proxy
```

Forcer le registre officiel :

```bash
npm config set registry https://registry.npmjs.org/
```

Si besoin, nettoyer puis réinstaller :

```bash
npm cache clean --force
rm -rf node_modules
npm install
```

## Remarque
Si `npm install` retourne encore `403 Forbidden`, c'est un blocage d'accès réseau/policy à la registry. Dans ce cas, il faut corriger l'accès proxy/firewall de votre machine ou réseau entreprise.

## Erreur "Les fichiers binaires ne sont pas pris en charge"
Si votre plateforme d'extraction refuse les fichiers binaires, évitez d'ajouter des images locales (`.png`, `.jpg`) dans le patch.
Cette version utilise maintenant une icône vectorielle (Expo Icons) dans l'écran d'accueil au lieu d'un fichier image binaire, pour rester compatible avec l'extraction.
