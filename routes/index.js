const router = require('express').Router();
const api = require('./api');

router.use('/api/v1', api);

router.get('/', (req, res) => {
	res.render('home');
});

module.exports = router;
