# Express / Mongoose

> Je vais via tenter via ce mini projet perso, de mettre en application ce que j'ai appris sur Dyma.fr avec la création d'un serveur sur la gestion des livres.
> Je vais tenter de créer des pages spécifique selon la requête souhaité.

## Ressources utile pour le projet

```md
## Bootstrap
link(rel="stylesheet", href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous")


```

## Détails des opérations

1. [] - Créer un micro server avec node.js + express
   1. [] - Donc initialiser le projet avec : `npm init` en définissant **app.js** comme point d'entrée.
   2. [] - Installez les packages qui seront nécessaires
      1. [] - Morgan -D
      2. [] - Express
      3. [] - Pug
      4. [] - Mongoose
      5. [] - Nodemon
      6. [] - Colors
   3. Ajout du script : `"start": "nodemon app.js"` dans le fichier package.json
   4. [] - Ajout d'un fichier **.gitignore**
   5. [] - Conception de plusieurs dossiers à la racines: 
      1. [] - **views**
      2. [] - **public**
      3. [] - **routes**
      4. [] - **database**
   6. [] - Conception de plusieurs sous-dossiers dans le répertoire **public**
      1. [] - css
      2. [] - images
      3. [] - javascript
   7. [] - Conception d'un fichier **index.js** dans le dossier **routes**
   8. [] - Conception d'un sous-dossier **includes** dans le dossier **views**
   9. [] - Dans le dossier **views**, il faut créer plusieurs fichiers :
      1.  [] - home.pug
      2.  [] - layout.pug
      3.  [] - Conception d'un sous-dossier **pages**
          1.  [] - Création d'un fichier books.pug
          2.  [] - Création d'un fichier editors.pug
          3.  [] - Création d'un fichier authors.pug
2. a suivre...