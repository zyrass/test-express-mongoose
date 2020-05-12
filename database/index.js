require('colors');
const mongoose = require('mongoose');

/**
 * * ---------------------------------------------------------------------
 * * Connexion à MongoDB
 * * ---------------------------------------------------------------------
 */
mongoose
    .connect('mongodb+srv://alain:Aa2fe1aec4.2020@dyma-noq8b.mongodb.net/test?retryWrites=true', {
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