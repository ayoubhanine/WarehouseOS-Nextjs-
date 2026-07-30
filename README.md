# WarehouseOS – Partie 2 : Gestion de l'entrepôt

## Description

Cette deuxième partie du projet **WarehouseOS** a pour objectif de développer les principales fonctionnalités d'une application de gestion d'entrepôt en utilisant **Next.js App Router**, **TypeScript**, **MongoDB** et **Zod**.

L'application permet de gérer les produits, les catégories ainsi que les mouvements de stock (entrées et sorties), tout en respectant une architecture Full Stack modulaire.

---

# Technologies utilisées

* Next.js (App Router)
* TypeScript
* React
* MongoDB
* Mongoose
* Zod
* Tailwind CSS

---

# Architecture

Le projet est organisé selon une architecture modulaire.

```text
app/
components/
api/
models/
services/
validators/
types/
```

Chaque couche possède une responsabilité précise :

* **components/** : composants réutilisables de l'interface utilisateur.
* **api/** : appels HTTP vers les Route Handlers.
* **services/** : logique métier exécutée côté serveur.
* **models/** : modèles MongoDB (Mongoose).
* **validators/** : validation des données avec Zod.
* **types/** : interfaces TypeScript.

---

# Gestion des produits

Le module Produits permet de gérer entièrement les produits de l'entrepôt.

## Fonctionnalités

* Afficher la liste des produits
* Consulter le détail d'un produit
* Ajouter un produit
* Modifier un produit
* Archiver un produit

Chaque produit possède les informations suivantes :

* Nom
* SKU
* Description
* Catégorie
* Prix
* Quantité en stock

---

# Gestion des catégories

Les catégories permettent d'organiser les produits.

## Fonctionnalités

* Afficher toutes les catégories
* Ajouter une catégorie
* Modifier une catégorie
* Archiver une catégorie

Chaque catégorie contient :

* Nom
* Description
* Date de création

---

# Gestion des mouvements de stock

Le système permet d'enregistrer les entrées et sorties de stock.

## Types de mouvements

* IN (Entrée)
* OUT (Sortie)

Chaque mouvement contient :

* Produit
* Type
* Quantité
* Note (optionnelle)
* Date de création

---

# Gestion automatique du stock

Lorsqu'un mouvement est enregistré :

### Entrée (IN)

La quantité du produit est augmentée automatiquement.

Exemple :

Stock avant : 20

Entrée : +50

Nouveau stock : 70

---

### Sortie (OUT)

La quantité est diminuée automatiquement.

Exemple :

Stock avant : 70

Sortie : -10

Nouveau stock : 60

---

### Sécurité

Une sortie de stock ne peut jamais être supérieure à la quantité disponible.

Exemple :

Stock disponible : 5

Sortie demandée : 10

Résultat :

L'opération est refusée avec le message :

```
Stock insuffisant
```

---

# Validation des données

Toutes les données reçues par l'API sont validées côté serveur avec **Zod**.

Les principales règles sont :

## Produit

* Nom obligatoire (minimum 3 caractères)
* SKU obligatoire
* Prix positif
* Quantité entière positive ou nulle

## Catégorie

* Nom obligatoire
* Description obligatoire

## Mouvement

* Produit obligatoire
* Type obligatoire (IN ou OUT)
* Quantité entière positive
* Note optionnelle

Les erreurs de validation sont retournées par l'API puis affichées dans les formulaires.

---

# Fonctionnalités réalisées

## Produits

* Liste des produits
* Création
* Modification
* Consultation des détails
* Archivage

## Catégories

* Liste des catégories
* Création
* Modification
* Archivage

## Mouvements

* Entrée de stock
* Sortie de stock
* Historique des mouvements
* Mise à jour automatique des quantités

---

# Bonnes pratiques appliquées

* Architecture modulaire
* Composants réutilisables
* Séparation Frontend / Backend
* TypeScript sur tous les fichiers
* Validation avec Zod
* Services métier côté serveur
* Gestion des erreurs
* MongoDB avec Mongoose
* Respect des principes du cahier des charges

---

# État du projet

Cette deuxième partie couvre l'ensemble des fonctionnalités principales de gestion de l'entrepôt :

* Gestion complète des produits
* Gestion complète des catégories
* Gestion complète des mouvements de stock

Le Dashboard pourra être ajouté ultérieurement comme fonctionnalité complémentaire afin d'afficher des statistiques et des indicateurs sur l'activité de l'entrepôt.
