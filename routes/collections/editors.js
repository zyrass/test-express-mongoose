const util = require('util');
const router = require('express').Router();
const Editors = require('../../database/models/editors.model');

router.get('/', (req, res, next) => {
    Editors.find({}).exec().then((docs) => res.json(docs)).catch(err => console.log(err));
    // res.render('editors');
    next();
});

router.post('/', (req,res, next) => {
    const body = req.body;
    console.log("ETAPE 1 - req.body".brightBlue);
    console.log( body );

    console.log("ETAPE 2 - passage de active en boolean".brightGreen);
    const newEditor = new Editors({
        ...body,
        active: body.active ? true : false
    });

    console.log("ETAPE 3 - vérification de newEditor".white);
    console.log(newEditor);

    console.log("ETAPE 4 - Savegarde de newEditor".brightYellow);
    newEditor.save().then( editeur => {

        console.log("ETAPE 5 - Affichage de l'éditeur".brightCyan);
        console.log( editeur );
        res.end();
        // res.redirect('/');
    }).catch(err => {
        console.table(err);
        const errors = Object.keys(err.errors).map( key => err.errors[key].message );
        console.log(util.inspect(err, { compact: true, depth: 5, breakLength: 80 , colors: true}));
        res.status(400).render('editeurs', { errors: errors });
    })
    next();
})


router.post('/create', (req, res, next) => {
    const newEditor = new Editors({
        name: "Eyrolles"
    });
    Editors.countDocuments({ name: newEditor.name }, (err, compteur) => {
        if(err) throw err;
        if ( compteur > 0 ) {
            console.log('❌ - Création impossible (Editors) :'.bold.brightRed,
            `L'éditeur "${newEditor.name}" existe déjà dans la base de donnée.`.red);
        } else {
            Editors.create(newEditor).then(() => {
                console.log(`✅ - L'éditeur "${newEditor.name}" a bien été enregistré dans la base de donnée!`.bold.brightGreen);
                location('/editeurs');
            }).catch(err => res.status(400).render('editors'));
        }
    })
    next();
})

module.exports = router