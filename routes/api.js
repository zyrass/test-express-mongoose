const express = require('express');
const router = express.Router();

router.get('api/v1/livres', (req, res) => {
	res.render('books');
});
router.get('api/v1/editeurs', (req, res) => {
	res.render('editors');
});
router.get('api/v1/auteurs', (req, res) => {
	res.render('authors');
});

module.exports = router;
