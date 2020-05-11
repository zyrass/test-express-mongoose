# Express / Mongoose

> Je vais via tenter via ce mini projet perso, de mettre en application ce que j'ai appris sur Dyma.fr avec la création d'un serveur sur la gestion des livres.
> Je vais tenter de créer des pages spécifique selon la requête souhaité.

## Ressources utile pour le projet

```pug
link(rel="stylesheet", href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous")
```

## Détails des opérations

Objectif : Création d'un micro server avec node.js + express + mongoose

- [ ] Donc initialiser le projet avec : `npm init` en définissant **app.js** comme point d'entrée.
- [ ] Création du fichier **app.js**.
- [ ] Installez les packages qui seront nécessaires : 
  - [ ] **Morgan**, 
  - [ ] **Express**, 
  - [ ] **Pug**, 
  - [ ] **Mongoose**, 
  - [ ] **Nodemon**, 
  - [ ] **Colors**
- [ ] Ajout du script : `"start": "nodemon app.js"` dans le fichier package.json
- [ ] Ajout d'un fichier **.gitignore**
- [ ] Conception de plusieurs dossiers à la racines: 
  - [ ] **views**, 
  - [ ] **public**, 
  - [ ] **routes**, 
  - [ ] **database**, 
- [ ] Conception de plusieurs sous-dossiers dans le répertoire **public** : 
  - [ ] **css**, 
  - [ ] **images**, 
  - [ ] **javascript**
- [ ] Conception d'un fichier **index.js** dans le dossier **routes**
- [ ] Conception d'un sous-dossier **includes** dans le dossier **views**
  - [ ] Dans ce sous-dossier il faut créer le fichier **topBar.pug**
- [ ] Dans le dossier **views**, il faut créer plusieurs fichiers : 
  - [ ] **home.pug**, 
  - [ ] **layout.pug**, 
  - [ ] **books.pug**, 
  - [ ] **editors.pug**, 
  - [ ] **authors.pug**
- [ ] Dans le dossier **database**, je dois créér ces fichiers :
  - [ ] **authors.model.js**
  - [ ] **books.model.js**
  - [ ] **editors.model.js**

### Le contenu des fichiers pug

#### includes/topBar.pug
```pug
nav(class="navbar navbar-expand-lg navbar-dark bg-dark")
    a(class="navbar-brand" href="/") Bibliothèque Perso
    button(
        class="navbar-toggler" 
        type="button"
        data-toggle="collapse" data-target="#navbarBP")
        span(class="navbar-toggler-icon")

    div(class="collapse navbar-collapse" id="navbarBP")
        ul(class="navbar-nav ml-auto")
            li(class="nav-item active")
                a(class="nav-link" href="/") Accueil
            li(class="nav-item")
                a(class="nav-link" href="/api/v1/livres") Livres
            li(class="nav-item")
                a(class="nav-link" href="/api/v1/editeurs") Editeurs
            li(class="nav-item")
                a(class="nav-link" href="/api/v1/auteurs") Auteurs
            li(class="nav-item")
```
#### authors.pug
```pug
extends layout.pug

block content
.row
    .col-12
        h1 Auteurs
```
#### books.pug
```pug
extends layout.pug

block content
.row
    .col-12
        h1 Livres
```
#### editors.pug
```pug
extends layout.pug

block content
.row
    .col-12
        h1 Editeurs
```
#### home.pug
```pug
extends layout.pug

block content
.row
    .col-12
        h1 Accueil
```
#### layout.pug
```pug
<!DOCTYPE html>
html(lang="en")
    head
        meta(charset="UTF-8")
        meta(name="viewport", content="width=device-width, initial-scale=1.0")

        //- CSS Bootstrap
        link(rel="stylesheet", href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous")
        title Mes livres perso
    body
        include includes/topBar.pug
        .container-fluid
            block content

```