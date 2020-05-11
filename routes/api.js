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
