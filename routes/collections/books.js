const util = require('util');
const router = require('express').Router();
const Books = require('../../database/models/books.model');

router.get('/', async(req, res, next) => {
    try {
        const listBooks = await Books.find({}).exec();
        console.log(listBooks);
    } catch (err) {
        console.log(util.inspect(err, { compact: true, depth: 5, breakLength: 80 , colors: true}));
    }
    next();

});
