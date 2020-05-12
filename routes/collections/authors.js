const util = require('util');
const router = require('express').Router();
const Authors = require('../../database/models/authors.model');

router.get('/', async (req, res, next) => {
    try {
        const data = await Authors.find({}).exec();
        console.log(data);
    } catch (err) {
        console.log(util.inspect(err, { compact: true, depth: 5, breakLength: 80 , colors: true}));
    }
    next();
});

router.post('/create', (req, res, next) => {
    
    const newAuthor = new Authors({
        firstname: "Nick",
        lastname: "Morgan"
    });

    newAuthor.countDocuments({ 
        firstname: newAuthor.firstname,
        lastname: newAuthor.lastname,
    }, (err, compteur) => {
        if(err) throw err;
        if ( compteur > 0 ) {
            console.log('❌ - Création impossible (Editors) :'.bold.brightRed,
            `L'auteur "${newAuthor.firstname} ${newAuthor.lastname}" existe déjà dans la base de donnée.`.red);
        } else {
            Authors.create(newAuthor).then(() => {
                console.log(`✅ - L'auteur "${newAuthor.firstname} ${newAuthor.lastname}" a bien été enregistré dans la base de donnée!`.bold.brightGreen);
            }).catch(err => console.log(util.inspect(err, { compact: true, depth: 5, breakLength: 80 , colors: true})));
        }
    })

    next();
})
