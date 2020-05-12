const express = require('express');
const router = express.Router();

const authors = require('./collections/authors');
const books = require('./collections/books');
const editors = require('./collections/editors');

router.use('/auteurs', authors);
router.use('/livres', books);
router.use('/editeurs', editors);

router.get('/editeurs/create', (req, res) => {
    res.render('editorsCreate');
})

module.exports = router;
