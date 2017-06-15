const express = require('express');
const router = express.Router();
const firebase = require("firebase");
const config = require('../config')();

/* GET home page. */
router.get('/', function (req, res) {
	config.pageTitle = 'Search Now';
	res.render('index', {title: 'Express', config: config});
});

module.exports = router;
