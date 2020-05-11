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
