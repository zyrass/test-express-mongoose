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
- [ ] Ajout de `node_modules` dans le fichier **.gitignore**
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
- [ ] Dans le dossier **database**, je dois créér un fichier **index.js**
- [ ] A nouveau dans le dossier **database**, je dois créér un dossiers **models** qui contiendra les fichiers suivant :
  - [ ] **authors.model.js**
  - [ ] **books.model.js**
  - [ ] **editors.model.js**


### Le contenu de tous mes fichiers

#### ./app.js
```js
require('colors');
const path          = require('path');      // Module natif de node
const morgan        = require('morgan');    // Dépendance Morgan
const express       = require('express');   // Dépendance Express

const app           = express();

// Utilisation de la base de donnée MongoDB Atlas
require('./database/index');

// Imports de mes routes
const api           = require('./routes/api');
const index         = require('./routes/index');

// Définition d'un port et si il est utilisé on va prendre 5001
const port          = process.env.PORT || 5001;

// Définition du dossier ou sera stocké mes vues
// Définition de l'extension des fichiers qui sera utilisé.
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(morgan('short')); // Permets d'avoir des logs dans la console.'
app.use(express.static(path.join(__dirname, 'public'))); // Définit ou je vais récupérer mes images/css/js perso
app.use(express.json());
app.use(express.urlencoded({ extended   : true })); // Permet d'être tranquille avec un content-type spécifique des formulaires.

app.use('/api/v1', api);  // Tout ce qui touche à l'URL : /api/v1
app.use(index);           // URL par défaut : /  

app.listen(port);
```

#### views/layout.pug
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
#### views/home.pug
```pug
extends layout.pug

block content
    .row
        .col-12
            h1 Accueil
```

#### views/includes/topBar.pug
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
#### views/authors.pug
```pug
extends layout.pug

block content
    .row
        .col-12
            h1 Auteurs
```
#### views/books.pug
```pug
extends layout.pug

block content
    .row
        .col-12
            h1 Livres
```
#### views/editors.pug
```pug
extends layout.pug

block content
    .row
        .col-12
            h1 Editeurs
```
#### routes/api.js
```js
const express = require('express');
const router = express.Router();

// J'importe tous les modèles
const Authors = require('../database/models/authors.model');
const Books = require('../database/models/books.models');
const Editors = require('../database/models/editors.model');

router.get('/livres', async (req, res) => {
    Books.find({}).exec().then(docs => {
        res.json(docs)
    });
	// res.render('books');
});

router.get('/editeurs', (req, res) => {
    const newEditor = new Editors({
        name: "Eyrolles"
    });
    Editors.countDocuments({ name: newEditor.name }, (err, compteur) => {
        if(err) throw err;
        if ( compteur > 0 ) {
            console.log('❌ - Création impossible (Editors) :'.bold.brightRed,
            `${newEditor.name} existe déjà.`.red);
        } else {
            Editors.create(newEditor).then(() => {
                console.log(`✅ - ${newEditor.name} à bien été enregistré!`.bold.brightGreen);
            }).catch(err => console.error({err}));
        }
    })

    Editors.find({}).exec().then((docs) => res.json(docs));
    res.render('editors');
});

router.get('/auteurs', (req, res) => {
    Authors.find({}).exec().then(docs => res.json(docs));
	res.render('authors');
});

module.exports = router;

```

#### routes/index.js
```js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
	res.render('home');
});

module.exports = router;
```

#### database/index.js
```js
require('colors');
const mongoose = require('mongoose');

/**
 * * ---------------------------------------------------------------------
 * * Connexion à MongoDB
 * * ---------------------------------------------------------------------
 */
mongoose
    .connect('mongodb+srv://public:public@dyma-noq8b.mongodb.net/test?retryWrites=true', {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
		useCreateIndex: true
    }).then( async () => {

		/**
         * *******************************************************************************
         * Test du bon fonctionnement de la connexion à la base de donnée.
         * *******************************************************************************
         */
		console.log('----------------------------------------------------------------------------------'.brightMagenta);
		console.log('\t👌 - La connexion au serveur a bien été établie avec succès - 👌'.brightMagenta);
        console.log('----------------------------------------------------------------------------------'.brightMagenta);
        
    }).catch(error => {
        if( error ) throw error;
    })
```
#### database/models/authors.model.js
```js
require('colors');
const mongoose = require('mongoose');

/**
 * * *******************************************************************************
 * * AuthorSchema
 * * *******************************************************************************
 */
const authorSchema = mongoose.Schema(
	{
		firstname: {
			type: String,
            required: [true, "Le champ Prénom est requis"],
			index: true,
			minLength: [3, "Le Prénom doit contenir minimum 3 caractères"],
			maxLength: [20, "Le Prénom doit contenir maximum 20 caractères"]
		},
		lastname: {
			type: String,
			required: [true, "Le champ Nom est requis"],
			index: true,
			minLength: [3, "Le Nom doit contenir minimum 3 caractères"],
			maxLength: [25, "Le Nom doit contenir maximum 25 caractères"]
		},
		index: Number
	},
	{
		timestamps: true
	}
);

/**
 * * *******************************************************************************
 * * AuthorSchema.pre('save')
 * * *******************************************************************************
 */
authorSchema.pre('save', function() {
	return Authors.countDocuments().exec().then((currentAuthorIndex) => {
		this.index = currentAuthorIndex + 1;
	});
});

/**
 * * *******************************************************************************
 * * Modèle Author
 * * *******************************************************************************
 */
const Authors = mongoose.model('authors', authorSchema);

module.exports = Authors;

```
#### database/models/books.model.js
```js
require('colors');
const mongoose = require('mongoose');

/**
 * * *******************************************************************************
 * * BookSchema
 * * *******************************************************************************
 */
const bookSchema = mongoose.Schema(
	{
		title: {
			type: String,
			required: [true, "Le champ Titre est requis"],
			index: true,
			minLength: [8, "Le Titre doit avoir minimum 8 caractères."],
			maxLength: [255, "Le Titre ne peut exéder 255 caractères."]
		},
		index: Number,
		info: {
			color: Boolean,
			pages: { type: Number, default: 1 },
			chapters: { type: Number, default: 1 },
			genre: { type: String, default: 'Developpeur Web' }
		},
		editor_id: { type: mongoose.Types.ObjectId, required: true, ref: 'editors' },
		author_id: { type: mongoose.Types.ObjectId, required: false, ref: 'authors' }
	},
	{
		timestamps: true
	}
);

/**
 * * *******************************************************************************
 * * BookSchema.pre('save')
 * * *******************************************************************************
 */
bookSchema.pre('save', function() {
	return Books.countDocuments().exec().then((currentBookIndex) => {
		this.index = currentBookIndex + 1;
	});
});

/**
 * * *******************************************************************************
 * * Modèle Book
 * * *******************************************************************************
 */
const Books = mongoose.model('books', bookSchema);

module.exports = Books;

```
#### database/models/editors.model.js
```js
require('colors');
const mongoose = require('mongoose');

/**
 * * *******************************************************************************
 * * EditorSchema
 * * *******************************************************************************
 */
const editorSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, "Le champ Nom est requis"],
			index: true,
			minLength: [5, "Le Nom doit contenir 5 caractères minimum"],
			maxLength: [25, "Le Nom doit contenir 25 caractères maximum"]
		},
		index: Number
	},
	{
		timestamps: true
	}
);

/**
 * * *******************************************************************************
 * * EditorSchema.pre('save')
 * * *******************************************************************************
 */
editorSchema.pre('save', function() {
	return Editors.countDocuments().exec().then((currentEditorIndex) => {
		this.index = currentEditorIndex + 1;
	});
});

/**
 * * *******************************************************************************
 * * Modèle Editor
 * * *******************************************************************************
 */
const Editors = mongoose.model('editors', editorSchema);

module.exports = Editors;
```