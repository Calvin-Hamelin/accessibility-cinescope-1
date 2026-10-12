# Accessibilité CinéScope

## 5 constats

1. Cartes inaccessibles au clavier.
2. Focus invisible.
3. Boutons favoris sans nom accessible.
4. Recherche sans label.
5. Disponibilité indiquée uniquement par couleur.

## 3 corrections

### 1. Cartes

- Avant : `div` avec `onClick`.
- Après : bouton HTML.
- Impact : navigation avec Tab, Entrée et Espace.

### 2. Focus

- Avant : `outline: none`.
- Après : `:focus-visible`.
- Impact : élément actif visible.

### 3. Favoris

- Avant : étoile seule.
- Après : `aria-label` et `aria-pressed`.
- Impact : action et état annoncés par les lecteurs d'écran.
