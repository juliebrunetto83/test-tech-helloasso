# Test technique front HelloAsso

[Nuxt documentation](https://nuxt.com/docs/getting-started/introduction)

## Setup

Installer les dépendances

```bash
npm install
```

```bash
npm run dev
```

## Instructions

Affichez une page index correspondant au wireframe fourni

- [x] Vous pouvez récupérer une liste d'élément sur la route /api/events
- [x] Ces événements doivent être affichés dans la liste déroulante à gauche
- [x] Ces événements doivent être affichés sur la carte à droite (choix de la librairie à votre convenance)
- [x] Je peux filtrer la liste par titre d'événement (uniquement les événements déjà chargés). La liste et la carte
  doivent se mettre à jour.
- [x] Je peux filtrer la liste par catégorie d'événement (uniquement les événements déjà chargés). La liste et la carte
  doivent se mettre à jour.
- [x] Les 2 filtres sont cumulatifs
- [x] Lors du clic sur un item (liste ou carte), celui-ci est sélectionné. Il est mis en évidence sur la carte, et s'il
  n'est pas visible sur la liste de gauche, celle-ci défile pour le mettre en évidence.
- [x] La page filtrée doit être partageable.

Vous pouvez utiliser une librairie pour le CSS, à votre convenance.

Même si ce projet est petit, traitez-le comme un projet de plus grande ampleur en matière de pratiques de développement.

Codez bien, et have fun !

### OBSERVATIONS
- Bien que la liste apparaisse visuellement à gauche, d’un point de vue sémantique, elle se trouve après la section des filtres.
- Accessibilité (a11y) :
  - La cartographie a pour fonction d'informer sur la localisation. Pour garantir l’accès a l'information, notamment pour les utilisateurs de lecteurs d’écran (qui peuvent difficilement utiliser les cartographies), l’adresse du lieu a été ajoutée dans les "cartes UI" via l’API.
  - Pour aller plus loin, il serait pertinent d’ajouter un filtre par localisation, correspondant au besoin initial de cette cartographie.
  - CSS : Je n'ai pas utilisé de librairie. Pour aller plus loin, il aurait été intéressant de tokeniser les variables CSS.

### AMÉLIORATIONS
- Les filtres auraient pu être extrait dans un composant dédié.
- Les "cartes UI" devraient être déplacées dans un composant générique réutilisable.
- Pour améliorer l’accessibilité, il serait utile d’ajouter un attribut aria-live sur le nombre de résultats, afin qu’il soit annoncé lors de sa mise à jour.
- Les tests unitaires ne sont pas terminés, mais les cas à tester ont été notés via des it.todo.
