const express = require('express');
const router = express.Router();

/* GET login page. */
router.get('/', function (req, res) {
	res.render('docs');
});

module.exports = router;
